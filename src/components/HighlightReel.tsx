import { motion } from "motion/react";
import { resolveDriveEmbedUrl } from "../lib/videoThumbnails";

export function HighlightReel() {
  const showReelEmbedUrl = resolveDriveEmbedUrl("https://drive.google.com/open?id=1kh0qT4ZY3DPNA6V_mFYJqEia64SG86j9&usp=drive_copy");
  const openInDriveUrl = "https://drive.google.com/open?id=1kh0qT4ZY3DPNA6V_mFYJqEia64SG86j9";

  return (
    <section className="py-24 bg-brand-gray text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe
            src={showReelEmbedUrl}
            title="Showreel"
            className="w-full h-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </motion.div>

        <div className="mt-4 text-center">
          <a
            href={openInDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Open showreel in Google Drive
          </a>
        </div>
      </div>
    </section>
  );
}
