'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center font-poppins justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-[#5d3a24] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🔑</span>
            </div>
            <h2 className="text-2xl  text-primary mb-2">Forgot Password?</h2>
            <p className="text-gray-600">{`No worries, we'll send you reset instructions.`}</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3a2415] focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-[#5d3a24] text-white py-3 rounded-xl  hover:from-[#5d3a24] hover:to-primary transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Reset Password
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl text-green-600">✓</span>
              </div>
              <p className="text-gray-600">
                {`We've sent a password reset link to `}<strong>{email}</strong>
              </p>
              <Link
                href="/auth/email-verification"
                className="inline-block bg-gradient-to-r from-[#8b6b47] via-[#a67c52] to-[#c49a73] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#5d3a24] hover:to-primary transition-all"
              >
                Check Your Email
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-sm text-[#3a2415] hover:text-[#5d3a24] font-medium">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}