'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdMarkEmailRead } from 'react-icons/md';

export default function EmailVerificationPage() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <MdMarkEmailRead className="text-4xl text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#3a2415] mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We sent a verification link to your email address. Click the link to verify your account.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-800">
              {`Didn't receive the email? Check your spam folder or wait ${timeLeft}s to resend.`}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                canResend
                  ? 'bg-gradient-to-r from-[#3a2415] to-[#5d3a24] text-white hover:from-[#5d3a24] hover:to-[#3a2415] transform hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canResend ? 'Resend Email' : `Resend in ${timeLeft}s`}
            </button>

            <Link
              href="/auth/reset-password"
              className="block w-full bg-white border-2 border-[#3a2415] text-[#3a2415] py-3 rounded-xl font-semibold hover:bg-[#3a2415] hover:text-white transition-all"
            >
              I Got The Email
            </Link>
          </div>

          <div className="mt-6">
            <Link href="/auth/login" className="text-sm text-[#3a2415] hover:text-[#5d3a24] font-medium">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}