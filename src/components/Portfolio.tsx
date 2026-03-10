import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "../lib/utils";

const projects = [
  { id: 1, title: "Sarah & James", category: "Wedding Films", image: "https://picsum.photos/seed/wedding1/800/600" },
  { id: 2, title: "Lumina Tech", category: "Business Videos", image: "https://picsum.photos/seed/business1/800/600" },
  { id: 3, title: "Midnight Echo", category: "Creative Projects", image: "https://picsum.photos/seed/creative1/800/600" },
  { id: 4, title: "Emma & Noah", category: "Wedding Films", image: "https://picsum.photos/seed/wedding2/800/600" },
  { id: 5, title: "Artisan Coffee", category: "Business Videos", image: "https://picsum.photos/seed/business2/800/600" },
  { id: 6, title: "Urban Pulse", category: "Creative Projects", image: "https://picsum.photos/seed/creative2/800/600" },
];

const categories = ["All", "Wedding Films", "Business Videos", "Creative Projects"];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="portfolio" className="py-32 bg-brand-gray text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4">Selected Works</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-balance">
              A collection of our finest moments.
            </h3>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300",
                  activeCategory === category
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/70 hover:text-white hover:border-white/50"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              key={project.id}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-brand-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                
                {/* Hover Play Preview */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-white">
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-serif group-hover:text-white/80 transition-colors">{project.title}</h4>
                <span className="text-xs uppercase tracking-widest text-white/50">{project.category}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
