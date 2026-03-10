import { motion } from "motion/react";
import { Video, Briefcase, CalendarHeart, Share2 } from "lucide-react";

const services = [
  {
    title: "Wedding Videography",
    description: "Cinematic and emotional wedding films that capture the authentic love, joy, and chaos of your special day.",
    icon: CalendarHeart,
  },
  {
    title: "Brand Storytelling",
    description: "High-quality, purposeful videos designed to elevate your brand and connect with your audience on a deeper level.",
    icon: Briefcase,
  },
  {
    title: "Event Videography",
    description: "Professional coverage for corporate events, private parties, and once-in-a-lifetime celebrations.",
    icon: Video,
  },
  {
    title: "Social Media Content",
    description: "Short-form, engaging video content tailored for Instagram, TikTok, and modern digital platforms.",
    icon: Share2,
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-brand-black text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4"
          >
            Our Services
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-balance leading-tight"
          >
            Crafting visual stories that leave a lasting impact.
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-brand-gray flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform duration-500">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-2xl font-serif mb-4 group-hover:text-white/90 transition-colors">{service.title}</h4>
              <p className="text-white/60 font-light leading-relaxed text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
