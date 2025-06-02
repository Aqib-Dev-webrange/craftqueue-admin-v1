'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGES } from '@/constants/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by not rendering interactive elements on server
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-32 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-blue-500 font-bold text-lg">Logo</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">Login to your account</h1>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {/* Logo/Brand */}
        <div className="text-center mb-8 ">
          <div className="w-36 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Image
              src={IMAGES.logo}            
              alt="CraftQueue Logo"
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">Login to your account</h1>
        </div>

        {/* Login Form */}
        <div className=" ">
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl  focus:ring-2 focus:ring-[#8b6b47] focus:border-transparent transition-all bg-gray-50"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8b6b47] focus:border-transparent transition-all pr-12 bg-gray-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8b6b47] via-[#a67c52] to-[#c49a73] py-3 rounded-xl font-semibold hover:from-[#c49a73] hover:to-[#8b6b47] transform hover:scale-[1.02] transition-all duration-200 shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8b6b47] focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          {/* Change Password Link */}
          <div className="mt-6 text-center">
            <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:text-[#8b6b47] underline font-medium">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}