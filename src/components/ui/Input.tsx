"use client";
import { ICONS } from "@/constants/icon";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  showSearchIcon?: boolean;
  showClearIcon?: boolean;
  debounceMs?: number;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export default function SearchInput({
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  onClear,
  disabled = false,
  className = "",
  size = "md",
  showSearchIcon = true,
  showClearIcon = true,
  debounceMs = 300,
  suggestions = [],
  onSuggestionClick,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  // Icon sizes
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue && suggestions.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestionIndex(-1);
  }, [inputValue, suggestions]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (onSearch && inputValue) {
        onSearch(inputValue);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue, onSearch, debounceMs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setInputValue("");
    setShowSuggestions(false);
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestionIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[activeSuggestionIndex]);
        } else if (onSearch) {
          onSearch(inputValue);
          setShowSuggestions(false);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    onChange?.(suggestion);
    onSuggestionClick?.(suggestion);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {/* Input Container */}
      <div className="relative">
        {/* Search Icon */}
        {showSearchIcon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconSizes[size]}`}>
            <Image 
              src= {ICONS.search}
              alt="Search Icon"
              width={20}
              height={20}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full border border-gray-300 rounded-lg
            ${sizeClasses[size]}
            ${showSearchIcon ? "pl-10" : ""}
            ${showClearIcon && inputValue ? "pr-10" : ""}
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
            ${className}
          `}
        />

        {/* Clear Icon */}
        {showClearIcon && inputValue && (
          <button
            onClick={handleClear}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${iconSizes[size]}`}
            disabled={disabled}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              ref={(el) => { suggestionRefs.current[index] = el; }}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                px-4 py-3 cursor-pointer transition-colors
                ${index === activeSuggestionIndex ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}
                ${index === filteredSuggestions.length - 1 ? "" : "border-b border-gray-100"}
              `}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Example usage component
export function SearchInputExample() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const suggestions = [
    "React components",
    "Next.js routing",
    "TypeScript interfaces",
    "Tailwind CSS",
    "API endpoints",
    "Database queries",
  ];

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Simulate API call
    setResults([`Result 1 for "${value}"`, `Result 2 for "${value}"`]);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Search Example</h2>
      
      <SearchInput
        placeholder="Search anything..."
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch}
        suggestions={suggestions}
        size="md"
        debounceMs={500}
      />

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Results:</h3>
          <ul className="space-y-1">
            {results.map((result, index) => (
              <li key={index} className="text-sm text-gray-600">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}