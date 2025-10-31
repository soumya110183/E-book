import React from "react";
import{ImageWithFallback} from "../figma/ImageWithFallback";
import { Card, CardContent } from "../ui/card";

const team = [
  { name: "Dr. Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1642522029691-029b5a432954?auto=format&w=1080&q=80" },
  { name: "Prof. Michael Chen", role: "Chief Academic Officer", image: "https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?auto=format&w=1080&q=80" },
  { name: "Emily Rodriguez", role: "Head of Technology", image: "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?auto=format&w=1080&q=80" },
];

const TeamSection = () => (
  <section className="py-20 bg-[#f5f6f8]">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl text-[#1d4d6a] mb-4">Meet Our Leadership</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-16">
        Experienced educators and technologists transforming education
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {team.map((m, i) => (
          <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all overflow-hidden">
            <div className="h-64">
              <ImageWithFallback src={m.image} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-[#1d4d6a] mb-1">{m.name}</h3>
              <p className="text-sm text-gray-600">{m.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
