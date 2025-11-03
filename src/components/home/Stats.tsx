import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

export function StatsSection() {
  const stats = [
    { icon: BookOpen, value: "10,000+", label: "E-Books Available" },
    { icon: Users, value: "50,000+", label: "Active Readers" },
    { icon: Award, value: "500+", label: "Expert Authors" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="py-6 bg-white border-b border-gray-200 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon className="w-6 h-6 text-[#bf2026]" />
                <p className="text-[#1d4d6a] text-lg font-semibold">{value}</p>
              </div>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
