import React from "react";

const stats = [
  { value: "10,000+", label: "E-Books Available" },
  { value: "50,000+", label: "Active Users" },
  { value: "150+", label: "Countries" },
  { value: "98%", label: "Satisfaction Rate" },
];

const AboutStats = () => (
  <section className="py-16 bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((s, i) => (
        <div key={i}>
          <div className="text-5xl text-[#bf2026] mb-2">{s.value}</div>
          <p className="text-gray-600">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default AboutStats;
