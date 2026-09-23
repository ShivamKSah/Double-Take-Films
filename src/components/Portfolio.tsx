import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, Fragment } from "react";
import { X } from "lucide-react";

type Category = "All";

interface Project {
  id: string;
  category?: Category;
  url: string;
  poster?: string;
  title?: string;
}

const projects: Project[] = [
  { id: "nixrprmuceq", url: "https://youtu.be/nIxrprmuCeQ?si=nW4QX1iPVQ_NliZN" },
  { id: "pdvhvgo2dy", url: "https://youtu.be/pdvhVgo-2DY?si=NfVmtByecNTPHL-z" },
  { id: "kr1vw5hjao", url: "https://youtu.be/kR1vW5hJaoI?si=RmDx9-UfBke6yPoZ" },
  { id: "cltiwz_u0xw", url: "https://youtu.be/zBdqlUPKJ-o?si=OYoiWHViWF6RAZlQ" },
  { id: "yntxzcpdtu0a", url: "https://youtu.be/yNTxZcpDTu0?si=GyRi4LwvBVGgGDMF" },
  { id: "c_6yfief58g", url: "https://youtu.be/EdlBRab60-I?si=jrd1QN_woIrB4VWv" },
  { id: "9q_nlfbzc2g", url: "https://youtu.be/-H5BVMOyyeI?si=U4i7v9UzNtwBCR6D" },
  { id: "ibk4hojlagm", url: "https://youtu.be/IBk4HoJlaGM?si=6yv3r3fN1z-C0yvH" },
  { id: "qvbscf02pkq", url: "https://youtu.be/mD5_5ieRrQ4?si=Yltve3gtIAepH1AM" },
  { id: "zqgpvpzr62i", url: "https://youtu.be/ZQGPVpZR62I?si=_2MUxKDJmHoE17Uk" },
];

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

  // Helper to get YouTube embed URL with autoplay
  function getYouTubeEmbed(url: string) {
    const match = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
    const id = match ? match[1] : null;
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1&showinfo=0`;
  }
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
            {getYouTubeEmbed(project.url) ? (
              <iframe
                key={project.id}
                src={getYouTubeEmbed(project.url)}
                className="w-full h-[80vh] rounded-xl shadow-2xl bg-black"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={project.title}
              />
            ) : (
              <div className="w-full h-[80vh] flex items-center justify-center bg-black text-white">Invalid video link</div>
            )}
            {/* Removed title display as requested */}
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
  // Helper to extract YouTube video ID
  function getYouTubeId(url: string) {
    const match = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  const youtubeId = getYouTubeId(project.url);
  const youtubeThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : undefined;

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
        {youtubeThumbnail && (
          <img
            src={youtubeThumbnail}
            alt={`${project.title} thumbnail`}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
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
        {/* Removed title from card as requested */}
        <span className="text-xs uppercase tracking-widest text-white/50">{project.category}</span>
      </div>
    </motion.div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────

export function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const visibleProjects = projects;

  return (
    <section id="portfolio" className="py-16 bg-brand-gray text-white">
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

          {/* Filter Tabs removed as only 'All' remains */}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <Fragment key={project.id}>
              <ProjectCard project={project} onOpen={setActiveProject} />
            </Fragment>
          ))}
        </motion.div>

        {/* View More/View Less button removed as requested */}
      </div>

      {/* Modal */}
      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
