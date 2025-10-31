import React from 'react';

const FAQSection = () => (
  <div className="mt-20">
    <h2 className="text-3xl text-[#1d4d6a] text-center mb-12">
      Frequently Asked Questions
    </h2>
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div>
        <h3 className="text-[#1d4d6a] mb-2">Can I switch plans anytime?</h3>
        <p className="text-gray-600 text-sm">
          Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
        </p>
      </div>
      <div>
        <h3 className="text-[#1d4d6a] mb-2">What payment methods do you accept?</h3>
        <p className="text-gray-600 text-sm">
          We accept all major credit cards, PayPal, and institutional purchase orders.
        </p>
      </div>
      <div>
        <h3 className="text-[#1d4d6a] mb-2">Is there a free trial?</h3>
        <p className="text-gray-600 text-sm">
          Yes! All plans come with a 14-day free trial. No credit card required to start.
        </p>
      </div>
      <div>
        <h3 className="text-[#1d4d6a] mb-2">What's your refund policy?</h3>
        <p className="text-gray-600 text-sm">
          30-day money-back guarantee. If you're not satisfied, we'll refund you in full.
        </p>
      </div>
    </div>
  </div>
);

export default FAQSection;
