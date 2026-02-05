
import React, { useState } from 'react';

const TRNValidator: React.FC = () => {
  const [trn, setTrn] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [message, setMessage] = useState('');

  const validateTRN = () => {
    const cleanTrn = trn.replace(/\D/g, '');
    
    if (cleanTrn.length === 0) {
      setStatus('idle');
      setMessage('');
      return;
    }

    // Basic UAE TRN Validation logic
    // 1. Must be 15 digits
    // 2. Must start with '100'
    const isValid = /^(100)\d{12}$/.test(cleanTrn);

    if (isValid) {
      setStatus('valid');
      setMessage('This appears to be a valid formatted UAE TRN (Starts with 100, 15 digits).');
    } else {
      setStatus('invalid');
      if (cleanTrn.length !== 15) {
        setMessage(`Invalid length: ${cleanTrn.length}/15 digits.`);
      } else if (!cleanTrn.startsWith('100')) {
        setMessage('Invalid prefix: UAE TRNs must start with 100.');
      } else {
        setMessage('Format is incorrect.');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-uae-green px-6 py-4">
        <h2 className="text-white font-semibold flex items-center">
          <i className="fas fa-id-card mr-2"></i>
          TRN Validator
        </h2>
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-600 mb-6">
          Check if a Tax Registration Number (TRN) follows the mandatory 15-digit UAE FTA format.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter 15-digit TRN
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={trn}
                onChange={(e) => setTrn(e.target.value)}
                onBlur={validateTRN}
                className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-uae-green focus:border-transparent transition-all font-mono tracking-widest text-lg"
                placeholder="100XXXXXXXXXXXX"
                maxLength={15}
              />
              <button
                onClick={validateTRN}
                className="px-6 py-3 bg-uae-green text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all active:scale-95"
              >
                Validate
              </button>
            </div>
          </div>

          {status !== 'idle' && (
            <div className={`p-4 rounded-xl flex items-start space-x-3 animate-in fade-in duration-300 ${
              status === 'valid' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <i className={`fas ${status === 'valid' ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} mt-1`}></i>
              <div>
                <p className={`font-semibold ${status === 'valid' ? 'text-green-800' : 'text-red-800'}`}>
                  {status === 'valid' ? 'Verification Success' : 'Invalid TRN'}
                </p>
                <p className={`text-sm ${status === 'valid' ? 'text-green-700' : 'text-red-700'}`}>
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-amber-50 rounded-xl p-4 border border-amber-100">
          <h4 className="text-amber-800 text-sm font-bold flex items-center mb-1">
            <i className="fas fa-lightbulb mr-2"></i>
            Pro Tip
          </h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            Always verify the TRN of your suppliers before claiming Input VAT. 
            You can also use the official FTA portal to check if a TRN is currently active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TRNValidator;
