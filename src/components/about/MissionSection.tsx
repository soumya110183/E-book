import React from "react";
import{ImageWithFallback} from "../figma/ImageWithFallback";

const MissionSection = () => (
  <section className="py-20 bg-[#f5f6f8]">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl text-[#1d4d6a] mb-6">Our Mission</h2>
        <p className="text-gray-700 mb-6">
At FarmInk Forum, we’re dedicated to empowering agricultural students, educators, and rural communities through accessible, high-quality learning resources. Our platform offers a growing collection of e-books, research materials, and extension education tools — designed to support agricultural development, lifelong learning, and sustainable rural advancement across India.        </p>
        <p className="text-gray-700">
          We believe everyone deserves access to world-class educational materials, regardless of their location or economic background.
        </p>
      </div>
      <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1544132998-ae26c2655274?auto=format&fit=crop&w=1080&q=80"
          alt="Library"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>
);

export default MissionSection;
