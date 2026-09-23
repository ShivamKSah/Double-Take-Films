import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, CheckCircle2, ExternalLink, Mail, RotateCcw } from "lucide-react";

export function Contact() {
  const eventTypeOptions = [
    "Wedding Film",
    "Brand / Business Video",
    "Creative Project",
    "Event Coverage",
    "Showreel / Social Content",
    "Other",
  ];
  const [eventType, setEventType] = useState("");
  const [eventTypeOpen, setEventTypeOpen] = useState(false);
  const [eventTypeTouched, setEventTypeTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draftLinks, setDraftLinks] = useState<{ gmail: string; mailto: string } | null>(null);
  const eventTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!eventTypeRef.current?.contains(e.target as Node)) {
        setEventTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEventTypeTouched(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const selectedEventType = eventType || String(formData.get("eventType") ?? "").trim() || "General Inquiry";
    const eventDate = String(formData.get("eventDate") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email) return;

    const subject = `New Inquiry from ${name}${selectedEventType ? ` - ${selectedEventType}` : ""}`;
    const body = `Hi Aidan,

I'm reaching out through Double Take Films regarding a ${selectedEventType}${eventDate ? ` planned for ${eventDate}` : ""}.

Inquiry Details:
• Name: ${name}
• Email: ${email}
• Event Type: ${selectedEventType}
• Event Date: ${eventDate || "To be decided"}

Message:
${message}

Best regards,
${name}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aidank0125@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const mailtoUrl = `mailto:aidank0125@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );

    setDraftLinks({ gmail: gmailUrl, mailto: mailtoUrl });
    setSubmitted(true);

    if (isMobile) {
      // On mobile, mailto: directly launches the device's default mail app (e.g. Gmail App or Apple Mail)
      window.location.href = mailtoUrl;
    } else {
      // On desktop, open Gmail Web compose directly in a new tab
      const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = gmailUrl;
      }
    }
  };

  return (
    <section id="contact" className="py-16 bg-brand-black text-white relative overflow-hidden">
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
              <a href="mailto:aidank0125@gmail.com" className="text-2xl font-serif hover:text-white/70 transition-colors w-fit">
                aidank0125@gmail.com
              </a>
              <a href="tel:+18632896311" className="text-lg font-light text-white/70 hover:text-white transition-colors w-fit">
                +1 (863) 289-6311
              </a>
              <a href="https://instagram.com/doubletakefilms_" target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors w-fit">
                 @doubletakefilms_
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
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-start gap-6 py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 size={30} />
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-serif text-white mb-2">
                      Opening your draft in Gmail...
                    </h4>
                    <p className="text-white/70 font-light text-sm leading-relaxed max-w-md">
                      Your inquiry details have been pre-filled directly into a Gmail draft. Please review and click <strong>Send</strong> in Gmail.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                    {draftLinks?.gmail && (
                      <a
                        href={draftLinks.gmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full font-medium tracking-wide uppercase text-xs transition-all hover:bg-white/90"
                      >
                        <Mail size={15} />
                        Open in Gmail
                        <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
                      </a>
                    )}
                    {draftLinks?.mailto && (
                      <a
                        href={draftLinks.mailto}
                        className="flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3.5 rounded-full font-medium tracking-wide uppercase text-xs transition-all hover:bg-white/20 border border-white/15"
                      >
                        Default Mail App
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setEventType("");
                    }}
                    className="flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-wider uppercase transition-colors pt-4"
                  >
                    <RotateCcw size={14} />
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit}
                >
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
                      <div className="relative" ref={eventTypeRef}>
                        <input type="hidden" name="eventType" value={eventType} />
                        <button
                          id="eventType"
                          type="button"
                          onClick={() => setEventTypeOpen((prev) => !prev)}
                          className={`w-full bg-transparent border-b py-3 pr-10 text-left focus:outline-none transition-colors ${
                            eventTypeTouched && !eventType ? "border-amber-400/50" : "border-white/20 focus:border-white hover:border-white/50"
                          }`}
                          aria-haspopup="listbox"
                          aria-expanded={eventTypeOpen}
                        >
                          <span className={eventType ? "text-white" : "text-white/40"}>
                            {eventType || "Select your project type"}
                          </span>
                        </button>
                        <ChevronDown
                          size={16}
                          className={`pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white/60 transition-transform ${eventTypeOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />

                        {eventTypeOpen && (
                          <div
                            className="absolute left-0 right-0 mt-2 z-20 rounded-lg border border-white/15 bg-brand-black overflow-hidden shadow-2xl"
                            role="listbox"
                          >
                            {eventTypeOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setEventType(option);
                                  setEventTypeOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                  option === eventType
                                    ? "bg-white/15 text-white"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                                role="option"
                                aria-selected={option === eventType}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
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

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm transition-all mt-4 w-full md:w-auto self-start hover:bg-white/90 cursor-pointer"
                  >
                    Send Inquiry
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
