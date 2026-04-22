import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import aidanImg from '../../aidan.png';


export function About() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-20 md:py-28 flex items-center bg-slate-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent-blue z-0"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent-green z-0"></div>
          <div className="relative z-10 overflow-hidden aspect-[4/5] w-full">
            <img 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Portrait of Aidan Kramer looking thoughtful" 
              src={aidanImg}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-accent-green font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Filmmaker</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">Aidan Kramer</h2>
          <div className="space-y-6 text-slate-300 font-light leading-relaxed text-lg">
            <p>I believe film should make you feel something, not just look good.</p>
            <p>Somewhere along the way, a lot of video got safe. Predictable. The same shots, the same pacing, the same polished but forgettable style. That’s not what I’m here to do.</p>
            <p>I got into this because I wanted to make things that actually hit.. films that feel alive, that people want to watch more than once, that don’t just document a moment but bring it back to life.</p>
            <p>Since starting Double Take Films, I’ve focused on keeping that energy in everything I shoot. Whether it’s a wedding, a brand, or a story that matters to you, I’m always chasing movement, emotion, and moments that feel real—not staged, not forced.</p>
            <p>At the end of the day, I don’t care about making something that looks like everyone else’s work.</p>
            <p>I care about making something you feel.</p>
            <p className="font-serif italic text-white text-xl">“Good films are seen. Great films are felt.”</p>
          </div>
          <div className="mt-6 flex gap-6 grayscale opacity-50">
             {/* Note: The user's snippet ended here abruptly, probably meant for social icons or similar. Adding a placeholder or leaving it empty as per snippet */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
