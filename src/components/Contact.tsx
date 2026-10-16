import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  RotateCcw,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    eventType: string;
    eventDate: string;
  } | null>(null);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEventTypeTouched(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const selectedEventType = eventType || String(formData.get("eventType") ?? "").trim() || "General Inquiry";
    const eventDate = String(formData.get("eventDate") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    // Check honeypot field
    const honey = String(formData.get("_honey") ?? "").trim();
    if (honey) {
      // Silently ignore bot submission
      setSubmitted(true);
      return;
    }

    if (!name || !email || !message) {
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      Name: name,
      Email: email,
      "Event Type": selectedEventType,
      "Target Date": eventDate || "Flexible / To be decided",
      Message: message,
      _subject: `New Inquiry from ${name} - ${selectedEventType}`,
      _replyto: email,
      _template: "table",
      _captcha: "false",
    };

    try {
      const primaryEndpoint =
        import.meta.env.VITE_CONTACT_ENDPOINT ||
        "https://formsubmit.co/ajax/ef6ff2667a8338b95c99b9d3f8aa3b52";

      let response: Response;
      let data: any = null;

      try {
        response = await fetch(primaryEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        data = await response.json().catch(() => null);
      } catch (networkErr) {
        // Fallback to local dev API if primary endpoint is unreachable
        response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        data = await response.json().catch(() => null);
      }

      // Check if delivery was registered (including first-time activation notice from FormSubmit)
      const isSuccess =
        response.ok ||
        Boolean(data && (data.success === "true" || data.success === true || (data.message && data.message.includes("Activation"))));

      if (isSuccess) {
        setSubmitted(true);
        setSubmittedData({
          name,
          email,
          eventType: selectedEventType,
          eventDate: eventDate || "Flexible / TBD",
        });
        form.reset();
        setEventType("");
      } else {
        throw new Error(data?.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err: any) {
      console.error("Error submitting inquiry:", err);
      setErrorMessage(
        err?.message ||
          "Unable to send your inquiry right now. Please try again or email aidank0125@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
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
                  className="flex flex-col items-start gap-5 py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={28} />
                  </div>
                  
                  <div>
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium inline-block mb-1">
                      Inquiry Delivered
                    </span>
                    <h4 className="text-2xl md:text-3xl font-serif text-white mb-2">
                      Thank you, {submittedData?.name || "there"}!
                    </h4>
                    <p className="text-white/70 font-light text-sm leading-relaxed max-w-md">
                      Your inquiry has been sent directly to Aidan Kramer. We've received your request and will review your details and get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-4 my-1 flex flex-col gap-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-white/40 uppercase tracking-wider">Project Type</span>
                      <span className="font-medium text-white">{submittedData?.eventType}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-white/40 uppercase tracking-wider">Target Date</span>
                      <span className="font-medium text-white">{submittedData?.eventDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 uppercase tracking-wider">Reply To</span>
                      <span className="font-medium text-white">{submittedData?.email}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmittedData(null);
                      setEventType("");
                    }}
                    className="flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-wider uppercase transition-colors pt-2 cursor-pointer"
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
                  {/* Spam honeypot */}
                  <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start gap-3">
                      <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p>{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isSubmitting}
                        className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
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
                        disabled={isSubmitting}
                        className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
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
                          disabled={isSubmitting}
                          onClick={() => setEventTypeOpen((prev) => !prev)}
                          className={`w-full bg-transparent border-b py-3 pr-10 text-left focus:outline-none transition-colors disabled:opacity-50 ${
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
                        disabled={isSubmitting}
                        className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors [color-scheme:dark] disabled:opacity-50"
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
                      disabled={isSubmitting}
                      className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors resize-none disabled:opacity-50"
                      placeholder="Tell us about your vision..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm transition-all mt-4 w-full md:w-auto self-start ${
                      isSubmitting ? "opacity-75 cursor-wait" : "hover:bg-white/90 cursor-pointer shadow-lg hover:shadow-white/10"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-black" />
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
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
