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
      <h1 className="text-6xl mb-6">Empowering Knowledge and Growth Everywhere</h1>
      <p className="text-xl text-gray-200">
Since 2020, EduFarm Connect has been dedicated to supporting learners, mentors, and institutions with quality academic content, practice modules, and digital resources. Our vision is to create an inclusive learning environment that inspires curiosity, encourages innovation, and connects education with real-world progress.</p>
    </div>
  </section>
);

export default AboutHero;
