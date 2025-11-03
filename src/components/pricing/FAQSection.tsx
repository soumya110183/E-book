import React from "react";
import { Card, CardContent } from "../ui/card";

const faqs = [
  {
    question: "What’s included in the monthly and annual subscriptions?",
    answer:
      "Both plans give you full access to our entire e-book library, offline reading, bookmarks, and note syncing. Annual plans also include exclusive premium titles and 2 months free compared to monthly billing.",
  },
  {
    question: "Can I switch from a monthly to an annual plan later?",
    answer:
      "Absolutely! You can upgrade to the annual plan anytime from your account’s billing section. Your remaining monthly balance will be adjusted automatically.",
  },
  {
    question: "Do you offer refunds or cancellations?",
    answer:
      "You can cancel anytime before your next billing cycle. Annual plans canceled within 14 days of purchase are eligible for a full refund as per our refund policy.",
  },
  {
    question: "Are there any student or academic discounts?",
    answer:
      "Yes! Students and educators can enjoy up to 30% off on both monthly and annual plans. Simply verify your academic email to unlock the discount.",
  },
];


const FAQSection = () => (
  <div>
    <h2 className="text-3xl text-[#1d4d6a] text-center mb-12 mt-16">
      Frequently Asked Questions
    </h2>
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {faqs.map((faq, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardContent className="p-6">
            <h3 className="text-[#1d4d6a] mb-3">{faq.question}</h3>
            <p className="text-sm text-gray-600">{faq.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default FAQSection;
