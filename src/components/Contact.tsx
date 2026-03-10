import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    
    // IMPORTANT: Replace this with your actual Web3Forms access key
    // Get one for free at https://web3forms.com/
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Form submission error:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 bg-brand-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4">Get in Touch</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-balance leading-tight mb-8">
              Let's create something unforgettable.
            </h3>
            <p className="text-white/70 font-light text-lg leading-relaxed max-w-md mb-12">
              Whether you're planning a wedding, launching a brand, or hosting an event, we'd love to hear your story.
            </p>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:hello@doubletakefilms.com" className="text-2xl font-serif hover:text-white/70 transition-colors w-fit">
                hello@doubletakefilms.com
              </a>
              <a href="tel:+919963830194" className="text-lg font-light text-white/70 hover:text-white transition-colors w-fit">
                +91 9963830194
              </a>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-gray p-8 md:p-12 rounded-2xl border border-white/5"
          >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Hidden field for Web3Forms subject */}
              <input type="hidden" name="subject" value="New Inquiry from Double Take Films Portfolio" />
              {/* Honeypot field to prevent spam */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventType" className="text-xs uppercase tracking-widest text-white/50">Event Type</label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    defaultValue=""
                    className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none"
                  >
                    <option value="" disabled className="text-black">Select an option</option>
                    <option value="wedding" className="text-black">Wedding</option>
                    <option value="brand" className="text-black">Brand / Business</option>
                    <option value="event" className="text-black">Event</option>
                    <option value="other" className="text-black">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventDate" className="text-xs uppercase tracking-widest text-white/50">Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/50">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
                  <CheckCircle2 size={16} />
                  <span>Message sent successfully! We'll be in touch soon.</span>
                </div>
              )}
              
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <AlertCircle size={16} />
                  <span>Something went wrong. Please try emailing us directly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm transition-all mt-4 w-full md:w-auto self-start ${
                  status === "submitting" ? "opacity-70 cursor-not-allowed" : "hover:bg-white/90"
                }`}
              >
                {status === "submitting" ? "Sending..." : "Send Inquiry"}
                <ArrowRight size={16} className={`transition-transform ${status !== "submitting" && "group-hover:translate-x-1"}`} />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
