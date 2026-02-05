
import React, { useState } from 'react';
import TRNValidator from './components/TRNValidator';
import VATCalculator from './components/VATCalculator';
import TaxAssistant from './components/TaxAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'validator' | 'assistant'>('calculator');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-uae-green text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-uae-green">
              <i className="fas fa-landmark text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">UAE VAT Toolkit</h1>
              <p className="text-xs opacity-80">Compliance & Calculation Suite</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 bg-white/10 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'calculator' ? 'bg-white text-uae-green' : 'hover:bg-white/20'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('validator')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'validator' ? 'bg-white text-uae-green' : 'hover:bg-white/20'
              }`}
            >
              TRN Validator
            </button>
            <button
              onClick={() => setActiveTab('assistant')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'assistant' ? 'bg-white text-uae-green' : 'hover:bg-white/20'
              }`}
            >
              AI Assistant
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Workspace */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'calculator' && <VATCalculator />}
            {activeTab === 'validator' && <TRNValidator />}
            {activeTab === 'assistant' && (
              <div className="lg:hidden">
                <TaxAssistant />
              </div>
            )}
            
            {/* Quick Info Section (Visible on calculator/validator tabs) */}
            {activeTab !== 'assistant' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <i className="fas fa-info-circle text-uae-green mr-2"></i>
                    VAT Rate
                  </h3>
                  <p className="text-sm text-gray-600">
                    The standard VAT rate in the UAE is 5%, applied to most goods and services.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <i className="fas fa-clipboard-check text-uae-green mr-2"></i>
                    Registration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Mandatory for businesses with taxable supplies exceeding AED 375,000 annually.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sidebar AI Assistant */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <TaxAssistant />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} UAE VAT Toolkit. Developed for professional compliance assistance.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="text-xs text-gray-400 hover:text-uae-green transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-uae-green transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-uae-green transition-colors">FTA Official Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
