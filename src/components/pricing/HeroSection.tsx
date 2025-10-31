import React from 'react';

interface HeroProps {
  billingCycle: 'monthly' | 'annual';
  setBillingCycle: React.Dispatch<React.SetStateAction<'monthly' | 'annual'>>;
}

const HeroSection: React.FC<HeroProps> = ({ billingCycle, setBillingCycle }) => {
  return (
    <section className="bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-200 mb-8">
          Choose the plan that fits your academic journey. Cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-[#1d4d6a] shadow-lg'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-md transition-all ${
              billingCycle === 'annual'
                ? 'bg-white text-[#1d4d6a] shadow-lg'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Annual
            <span className="ml-2 text-xs bg-[#bf2026] text-white px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
