import React from "react";

const AboutHero = () => (
  <section className="relative bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] text-white py-32 overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h1 className="text-6xl mb-6">Empowering Academic Excellence Worldwide</h1>
      <p className="text-xl text-gray-200">
        Since 2020, we've been on a mission to democratize access to quality academic resources for students and researchers globally.
      </p>
    </div>
  </section>
);

export default AboutHero;
