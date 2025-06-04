'use client';
import React from 'react';
import Link from 'next/link';

export default function ResetConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <span className="text-4xl text-white">✓</span>
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-75"></div>
          </div>

          <h2 className="text-2xl font-bold text-[#3a2415] mb-4">Password Reset Successfully!</h2>
          <p className="text-gray-600 mb-8">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>

          {/* Success Details */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-green-800">
              <span className="text-lg">🎉</span>
              <p className="text-sm font-medium">
                Your account is now secure with the new password
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="block w-full bg-primary text-white py-3 rounded-xl  hover:from-[#5d3a24] hover:to-[#3a2415] transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Continue to Login
            </Link>

            <Link
              href="/admin"
              className="block w-full bg-white border border-primary text-primary py-3 rounded-xl hover:bg-primary hover:text-white transition-all"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Security Tip */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-800">
              💡 <strong>Security Tip:</strong> {`Keep your password safe and don't share it with anyone.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}