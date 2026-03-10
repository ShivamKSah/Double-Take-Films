import { motion } from "motion/react";

const testimonials = [
  {
    quote: "Aidan captured our wedding day with such raw emotion and beauty. We watch our video every anniversary and it still brings us to tears.",
    author: "Sarah & James",
    role: "Wedding Clients",
  },
  {
    quote: "Double Take Films elevated our brand's visual identity. The storytelling was sharp, purposeful, and exactly what we needed.",
    author: "Mark T.",
    role: "CEO, Lumina Tech",
  },
  {
    quote: "Working with Aidan was a dream. He made us feel so comfortable, and the final product was nothing short of cinematic magic.",
    author: "Emma W.",
    role: "Event Client",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-brand-gray text-white overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4"
          >
            Client Stories
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-balance"
          >
            Words from the people we've worked with.
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-10 rounded-2xl bg-brand-black border border-white/5 flex flex-col justify-between gap-8 hover:border-white/20 transition-colors duration-500"
            >
              <p className="text-white/80 font-serif text-xl md:text-2xl leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="text-white font-medium tracking-wide uppercase text-sm mb-1">{testimonial.author}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
}
