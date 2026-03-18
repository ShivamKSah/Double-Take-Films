import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, Fragment } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import {
  resolveDriveEmbedUrl,
  resolveDriveMediaUrl,
  resolveDrivePosterUrl,
  useVideoThumbnail,
} from "../lib/videoThumbnails";

type Category = "Wedding Films" | "Business Videos" | "Creative Projects";

interface Project {
  id: string;
  title: string;
  category: Category;
  url: string;
  poster?: string;
}

const projects: Project[] = [
  // ── Wedding Films ──────────────────────────────────────────────
  { id: "w-hw",       title: "H&W Wedding",            category: "Wedding Films",    url: "https://drive.google.com/file/d/1BmchTztsAjOodQGvsxkaNFS94gG7IOjL/view?usp=sharing" },
  { id: "w-j1",       title: "J Wedding (Extended)",   category: "Wedding Films",    url: "https://drive.google.com/file/d/1ilO59ahY_LvMZBalv2pNUeEd51uC1uQc/view?usp=sharing" },
  { id: "w-jk",       title: "J&K Wedding",            category: "Wedding Films",    url: "https://drive.google.com/file/d/1iQqns4YYZmDTcRL4wCQaqUIvw4YcqDo0/view?usp=sharing", poster: "/wedding-thumbnails/j-and-k.png" },
  { id: "w-j",        title: "J Wedding",              category: "Wedding Films",    url: "https://drive.google.com/file/d/1si8R8YRmEe3SL9xoDMJ1tPzXt2-IYog0/view?usp=sharing", poster: "/wedding-thumbnails/j.png" },
  { id: "w-jake",     title: "Jake",                   category: "Wedding Films",    url: "https://drive.google.com/file/d/1XqjffeM8lZsyAgm0utl0uZg8PyWOiPqF/view?usp=sharing" },
  { id: "w-lover",    title: "Lover",                  category: "Wedding Films",    url: "https://drive.google.com/file/d/1F2aj1e-fKjluVWy3lVqaDNQEbQvHN7B0/view?usp=sharing" },
  { id: "w-pinner",   title: "Pinner Wedding",         category: "Wedding Films",    url: "https://drive.google.com/file/d/1c02Cn7L0TScEEctIKCBwXnFDrAmcEa2r/view?usp=sharing" },
  { id: "w-pollard-1", title: "Pollard Wedding (1)",    category: "Wedding Films",    url: "https://drive.google.com/file/d/12VmUr_pI0r4pF8tAJ2MueqQf-waijEOz/view?usp=sharing" },
  { id: "w-pollard",  title: "Pollard Wedding",        category: "Wedding Films",    url: "https://drive.google.com/file/d/1Gs1sR19U_udDoYkEakg7KKTEr4a9Yqup/view?usp=sharing" },
  { id: "w-timeline", title: "Timeline",               category: "Wedding Films",    url: "https://drive.google.com/file/d/1RT9ItDrqX_nun8NpAc2QmsIQuAtPtQMO/view?usp=sharing" },
  { id: "w-wedding",  title: "Wedding",                category: "Wedding Films",    url: "https://drive.google.com/file/d/1kh0qT4ZY3DPNA6V_mFYJqEia64SG86j9/view?usp=sharing" },

  // ── Business Videos ────────────────────────────────────────────
  { id: "b-flight",   title: "FLIGHT",                 category: "Business Videos",  url: "https://drive.google.com/file/d/1PTJbED0F5NLPJH8TVF8HWA4HfLSj9hmP/view?usp=sharing" },
  { id: "b-gabe",     title: "Gabe",                   category: "Business Videos",  url: "https://drive.google.com/file/d/1IkooLTcZlS5dD_OjulhTZ9ERBUMLbY77/view?usp=sharing" },
  { id: "b-gabe2",    title: "Gabe2",                  category: "Business Videos",  url: "https://drive.google.com/file/d/1oM8pJa2fr8siOj12xKnju-v4abqybCu6/view?usp=sharing" },
  { id: "b-hes",      title: "HES",                    category: "Business Videos",  url: "https://drive.google.com/file/d/1sLoFgoRqZBTl95tV30_15NUFx9Po2a0q/view?usp=sharing", poster: "/brand-thumbnails/HES.png" },
  { id: "b-homex",    title: "HomeX",                  category: "Business Videos",  url: "https://drive.google.com/file/d/1HSq3qvNRS9ZzNs9Bb9i_ftkJpGiPp-Uw/view?usp=sharing" },
  { id: "b-homex1",   title: "HomeX (1)",              category: "Business Videos",  url: "https://drive.google.com/file/d/1viEgWqE_loaaKPGTD0b7G2MA67tekWum/view?usp=sharing" },
  { id: "b-homex2",   title: "HomeX (2)",              category: "Business Videos",  url: "https://drive.google.com/file/d/1eCWyF1F7g0KaWajikru7XHpQBtNOWWdj/view?usp=sharing" },
  { id: "b-homex3",   title: "HomeX (3)",              category: "Business Videos",  url: "https://drive.google.com/file/d/17HKHrkWo5FbN_EM1-LjxPK1NppaPhUzQ/view?usp=sharing" },
  { id: "b-jdm",      title: "JDM",                    category: "Business Videos",  url: "https://drive.google.com/file/d/16vwbof85Z6nKubs5DDSMh44-lYv19M9X/view?usp=sharing" },
  { id: "b-kl",       title: "KL",                     category: "Business Videos",  url: "https://drive.google.com/file/d/1Vo17Fq_-rRDY9KVIvKkW2-1J4-uOfzjs/view?usp=sharing" },
  { id: "b-lugos",    title: "Lugos",                  category: "Business Videos",  url: "https://drive.google.com/file/d/1FHHqzpVCDm6RaEfCg-_yBf2-0kh79kXX/view?usp=sharing" },
  { id: "b-lugos1",   title: "Lugos (1)",              category: "Business Videos",  url: "https://drive.google.com/file/d/1973sgn8XI-5vB-S914hw1b0Rnc_QGpml/view?usp=sharing" },
  { id: "b-primary",  title: "Primary",                category: "Business Videos",  url: "https://drive.google.com/file/d/18HisolNQNxHYEIWbC-wQUfDXFosPUWUh/view?usp=sharing" },
  { id: "b-recolor",  title: "Re-Color",               category: "Business Videos",  url: "https://drive.google.com/file/d/1oT3HotNqLLIWLrqM4B8pw0z8ZsW9IO8V/view?usp=sharing" },

  // ── Creative Projects ──────────────────────────────────────────
  { id: "c-co",       title: "CO",                     category: "Creative Projects", url: "https://drive.google.com/file/d/1UG9hWk65GzHkK4L2Uq9NM2dYAC-jZIqo/view?usp=sharing" },
  { id: "c-flight",   title: "FLIGHT",                 category: "Creative Projects", url: "https://drive.google.com/file/d/10_K_41nk2aiibkHyG--fOT5teMMhEhdy/view?usp=sharing" },
  { id: "c-kadrian",  title: "Kelly Adrian Interview", category: "Creative Projects", url: "https://drive.google.com/file/d/1FvnwdTU8mnVNPs5ukE9fSM1HUF0KeO1z/view?usp=sharing", poster: "/capture-thumbnails/kelly-adrian-interview.png" },
  { id: "c-kdalton",  title: "Kelly Dalton Interview", category: "Creative Projects", url: "https://drive.google.com/file/d/1DFZPtoA496eJW-XDopy1sAxzXgoXmpqh/view?usp=sharing", poster: "/capture-thumbnails/kelly-dalton-interview.png" },
  { id: "c-kstage",   title: "Kelly Stage Talk",       category: "Creative Projects", url: "https://drive.google.com/file/d/1RcZdX0H_H2gYLzrbRNnqzHRw7kll2frv/view?usp=sharing" },
  { id: "c-ksummit",  title: "Kelly Summit Hype",      category: "Creative Projects", url: "https://drive.google.com/file/d/1aWx08QMzpb9p4sq0vMyrHUwZ4WXst_Ho/view?usp=sharing" },
  { id: "c-ky",       title: "KY",                     category: "Creative Projects", url: "https://drive.google.com/file/d/11cJKXokE7jXimQhQTyBIgOZ07SiSS4Fa/view?usp=sharing" },
  { id: "c-thai",     title: "Thai",                   category: "Creative Projects", url: "https://drive.google.com/file/d/1ZshVcl_qh56VtObEhqscyvhuEwhQdlaA/view?usp=sharing" },
  { id: "c-tourney",  title: "Tourney",                category: "Creative Projects", url: "https://drive.google.com/file/d/1U-PNexinuidbFdIynYVxQq7NE1jMhFHD/view?usp=sharing" },
  { id: "c-wedding",  title: "Wedding",                category: "Creative Projects", url: "https://drive.google.com/file/d/1cTskHY1mahOpsixpGIn7ZEUE_LgfZxvk/view?usp=sharing" },
];

const TAB_LABELS = ["All", "Wedding Films", "Business Videos", "Creative Projects"] as const;
type Tab = (typeof TAB_LABELS)[number];

function createFallbackPoster(label: string, category: Category) {
  const safeLabel = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeCategory = category.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#18181b"/><stop offset="100%" stop-color="#27272a"/></linearGradient></defs><rect width="1280" height="720" fill="url(#g)"/><circle cx="640" cy="360" r="58" fill="#ffffff22" stroke="#ffffff55" stroke-width="2"/><polygon points="628,334 628,386 674,360" fill="#ffffff"/><text x="640" y="624" text-anchor="middle" fill="#f4f4f5" font-size="44" font-family="Georgia, serif">${safeLabel}</text><text x="640" y="664" text-anchor="middle" fill="#a1a1aa" font-size="26" font-family="Arial, sans-serif">${safeCategory}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ── Video Modal ────────────────────────────────────────────────────────────────

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

function VideoModal({ project, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
            <iframe
              key={project.id}
              src={resolveDriveEmbedUrl(project.url)}
              className="w-full h-[80vh] rounded-xl shadow-2xl bg-black"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title={project.title}
            />
            <p className="mt-4 text-center text-white/80 text-sm tracking-wider uppercase">
              {project.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Portfolio Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  onOpen: (p: Project) => void;
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const fallbackPoster = createFallbackPoster(project.title, project.category);
  const fallbackSrc = project.poster ?? resolveDrivePosterUrl(project.url) ?? fallbackPoster;
  const posterSrc = useVideoThumbnail({
    videoUrl: resolveDriveMediaUrl(project.url),
    fallbackSrc,
    seekTime: 2,
  }) ?? fallbackSrc;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
      className="group cursor-pointer flex flex-col gap-4"
      onClick={() => onOpen(project)}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-brand-black">
        {posterSrc && (
          <img
            src={posterSrc}
            alt={`${project.title} thumbnail`}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackPoster;
            }}
          />
        )}

        {/* Dark scrim */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
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
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAllInAllTab, setShowAllInAllTab] = useState(false);
  const initialAllCount = 9;

  const filtered = activeTab === "All"
    ? projects
    : projects.filter((p) => p.category === activeTab);
  const visibleProjects = activeTab === "All" && !showAllInAllTab
    ? filtered.slice(0, initialAllCount)
    : filtered;

  return (
    <section id="portfolio" className="py-32 bg-brand-gray text-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header row */}
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
            className="flex flex-wrap gap-3"
          >
            {TAB_LABELS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setShowAllInAllTab(false);
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300",
                  activeTab === tab
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/70 hover:text-white hover:border-white/50"
                )}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <Fragment key={project.id}>
              <ProjectCard project={project} onOpen={setActiveProject} />
            </Fragment>
          ))}
        </motion.div>

        {activeTab === "All" && filtered.length > initialAllCount && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllInAllTab((prev) => !prev)}
              className="px-6 py-2 rounded-full text-sm uppercase tracking-wider border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300"
            >
              {showAllInAllTab ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
