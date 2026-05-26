import React from 'react';
import { Link } from 'wouter';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-inter">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-brand-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-xl w-full flex items-center justify-center gap-2 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
