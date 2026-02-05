
import React, { useState, useEffect } from 'react';

const VATCalculator: React.FC = () => {
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [inputValue, setInputValue] = useState<string>('0');
  const [results, setResults] = useState({
    base: 0,
    vat: 0,
    total: 0
  });

  useEffect(() => {
    const num = parseFloat(inputValue) || 0;
    if (mode === 'exclusive') {
      const vat = num * 0.05;
      setResults({
        base: num,
        vat: vat,
        total: num + vat
      });
    } else {
      const base = num / 1.05;
      setResults({
        base: base,
        vat: num - base,
        total: num
      });
    }
  }, [inputValue, mode]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-uae-green px-6 py-4 flex justify-between items-center">
        <h2 className="text-white font-semibold flex items-center">
          <i className="fas fa-calculator mr-2"></i>
          VAT Calculator
        </h2>
        <div className="flex bg-black/20 p-1 rounded-lg">
          <button 
            onClick={() => setMode('exclusive')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${mode === 'exclusive' ? 'bg-white text-uae-green' : 'text-white/70'}`}
          >
            VAT Exclusive
          </button>
          <button 
            onClick={() => setMode('inclusive')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${mode === 'inclusive' ? 'bg-white text-uae-green' : 'text-white/70'}`}
          >
            VAT Inclusive
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'exclusive' ? 'Amount (excluding VAT)' : 'Total Amount (including VAT)'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 font-semibold">AED</span>
            </div>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="block w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-uae-green focus:border-transparent transition-all text-xl font-bold"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-600 font-medium">Base Amount</span>
            <span className="text-lg font-semibold text-gray-800">{formatCurrency(results.base)}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">VAT Amount (5%)</span>
              {mode === 'inclusive' && <span className="text-[10px] text-gray-400 italic">Reverse Charge logic applied</span>}
            </div>
            <span className="text-lg font-semibold text-uae-green">{formatCurrency(results.vat)}</span>
          </div>

          <div className="flex justify-between items-center p-4 rounded-xl bg-uae-green/5 border border-uae-green/10">
            <span className="text-uae-green font-bold">Total Amount</span>
            <span className="text-2xl font-black text-uae-green">{formatCurrency(results.total)}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
          <p className="text-xs text-gray-400 leading-relaxed">
            Note: Standard calculation based on 5% UAE Federal Tax Authority VAT rate. 
            For specific industries (Real Estate, Oil & Gas, etc.), zero-rated or exempt status may apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VATCalculator;
