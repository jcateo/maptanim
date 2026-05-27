import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Globe2, Settings as SettingsIcon, Languages, Eye, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [language, setLanguage] = useState<'en' | 'fil'>('en');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    toast.success(highContrast ? 'High contrast disabled' : 'High contrast enabled');
  };

  const toggleLargeText = () => {
    setLargeText(!largeText);
    toast.success(largeText ? 'Standard text restored' : 'Large text enabled');
  };

  return (
    <DashboardLayout>
      <div className={`p-6 max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter ${largeText ? 'text-lg' : 'text-base'}`}>

        <div className="mb-8 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Platform Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your account, language, and accessibility preferences.</p>
          </div>
          <div className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5" />
            Phase 13: Active
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">

          {/* Account Settings */}
          <div className={`border rounded-xl shadow-sm overflow-hidden ${highContrast ? 'bg-black border-gray-600' : 'bg-white border-gray-200'}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-2 ${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <Shield className={`w-5 h-5 ${highContrast ? 'text-white' : 'text-gray-500'}`} />
              <h2 className={`text-base font-semibold ${highContrast ? 'text-white' : 'text-gray-800'}`}>Account Security</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-medium ${highContrast ? 'text-white' : 'text-gray-800'} ${largeText ? 'text-base' : 'text-sm'}`}>Change Password</h3>
                  <p className={`mt-0.5 ${highContrast ? 'text-gray-300' : 'text-gray-500'} ${largeText ? 'text-sm' : 'text-xs'}`}>Update your password to keep your account secure.</p>
                </div>
                <button
                  onClick={() => toast.success('Password update dialog opened')}
                  className={`px-4 py-2 border rounded-lg font-medium transition-colors ${largeText ? 'text-base' : 'text-sm'} ${highContrast ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Localization & Language */}
          <div className={`border rounded-xl shadow-sm overflow-hidden ${highContrast ? 'bg-black border-gray-600' : 'bg-white border-gray-200'}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-2 ${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <Languages className={`w-5 h-5 ${highContrast ? 'text-white' : 'text-brand-500'}`} />
              <h2 className={`text-base font-semibold ${highContrast ? 'text-white' : 'text-gray-800'}`}>Language & Localization</h2>
            </div>
            <div className="p-6">
              <p className={`mb-4 ${highContrast ? 'text-gray-300' : 'text-gray-600'} ${largeText ? 'text-base' : 'text-sm'}`}>
                Select your preferred interface language. (Note: Full bilingual translation is simulated in this prototype version).
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <label
                  onClick={() => setLanguage('en')}
                  className={`border-2 rounded-lg p-4 cursor-pointer text-center relative overflow-hidden transition-all ${language === 'en' ? 'border-brand-500 bg-brand-50' : highContrast ? 'border-gray-600 hover:border-gray-400' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {language === 'en' && <div className="absolute top-2 right-2 w-3 h-3 bg-brand-500 rounded-full"></div>}
                  <span className={`block font-bold mt-1 ${language === 'en' ? 'text-brand-900' : highContrast ? 'text-white' : 'text-gray-700'
                    } ${largeText ? 'text-base' : 'text-sm'}`}>English</span>
                </label>

                <label
                  onClick={() => setLanguage('fil')}
                  className={`border-2 rounded-lg p-4 cursor-pointer text-center relative overflow-hidden transition-all ${language === 'fil' ? 'border-brand-500 bg-brand-50' : highContrast ? 'border-gray-600 hover:border-gray-400' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {language === 'fil' && <div className="absolute top-2 right-2 w-3 h-3 bg-brand-500 rounded-full"></div>}
                  <span className={`block font-bold mt-1 ${language === 'fil' ? 'text-brand-900' : highContrast ? 'text-white' : 'text-gray-700'
                    } ${largeText ? 'text-base' : 'text-sm'}`}>Filipino</span>
                </label>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className={`border rounded-xl shadow-sm overflow-hidden ${highContrast ? 'bg-black border-gray-600' : 'bg-white border-gray-200'}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-2 ${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <Eye className={`w-5 h-5 ${highContrast ? 'text-white' : 'text-sky-500'}`} />
              <h2 className={`text-base font-semibold ${highContrast ? 'text-white' : 'text-gray-800'}`}>Accessibility Features</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-medium ${highContrast ? 'text-white' : 'text-gray-800'} ${largeText ? 'text-base' : 'text-sm'}`}>High Contrast Mode</h3>
                  <p className={`mt-0.5 ${highContrast ? 'text-gray-300' : 'text-gray-500'} ${largeText ? 'text-sm' : 'text-xs'}`}>Applies a dark, high-contrast color scheme to the settings view.</p>
                </div>
                <div
                  onClick={toggleHighContrast}
                  className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${highContrast ? 'bg-brand-500' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${highContrast ? 'left-7' : 'left-1'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-medium ${highContrast ? 'text-white' : 'text-gray-800'} ${largeText ? 'text-base' : 'text-sm'}`}>Large Text</h3>
                  <p className={`mt-0.5 ${highContrast ? 'text-gray-300' : 'text-gray-500'} ${largeText ? 'text-sm' : 'text-xs'}`}>Increases font size for improved readability in the settings view.</p>
                </div>
                <div
                  onClick={toggleLargeText}
                  className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${largeText ? 'bg-brand-500' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${largeText ? 'left-7' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
