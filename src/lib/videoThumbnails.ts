import { useEffect, useState } from "react";

export function extractDriveFileId(url: string) {
  try {
    const parsed = new URL(url);
    const idFromQuery = parsed.searchParams.get("id");
    if (idFromQuery) return idFromQuery;

    const pathMatch = parsed.pathname.match(/\/d\/([^/]+)/);
    if (pathMatch?.[1]) return pathMatch[1];
  } catch {
  }

  return null;
}

export function resolveDriveEmbedUrl(url: string) {
  const fileId = extractDriveFileId(url);
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
}

export function resolveDriveMediaUrl(url: string) {
  const fileId = extractDriveFileId(url);
  return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : url;
}

export function resolveDrivePosterUrl(url: string) {
  const fileId = extractDriveFileId(url);
  return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : undefined;
}

function parseUrl(url: string) {
  try {
    return new URL(url, window.location.href);
  } catch {
    return null;
  }
}

function isDriveUrl(url: string) {
  const parsed = parseUrl(url);
  if (!parsed) return false;
  return parsed.hostname === "drive.google.com" || parsed.hostname.endsWith(".drive.google.com");
}

function isSameOriginUrl(url: string) {
  const parsed = parseUrl(url);
  if (!parsed) return false;

  if (parsed.protocol === "blob:" || parsed.protocol === "data:") {
    return true;
  }

  return parsed.origin === window.location.origin;
}

async function isCorsEnabledUrl(url: string) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      mode: "cors",
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function captureVideoThumbnail(videoUrl: string, seekTime = 2, timeoutMs = 12000) {
  if (!videoUrl) {
    return null;
  }

  if (isDriveUrl(videoUrl)) {
    return resolveDrivePosterUrl(videoUrl) ?? null;
  }

  const canAttemptCapture = isSameOriginUrl(videoUrl) || (await isCorsEnabledUrl(videoUrl));
  if (!canAttemptCapture) {
    return null;
  }

  return new Promise<string | null>((resolve) => {
    const video = document.createElement("video");
    let settled = false;

    const settle = (value: string | null) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(value);
    };

    const cleanup = () => {
      video.removeAttribute("src");
      video.load();
      video.onloadedmetadata = null;
      video.onseeked = null;
      video.onerror = null;
    };

    const timer = window.setTimeout(() => settle(null), timeoutMs);

    if (!isSameOriginUrl(videoUrl)) {
      video.crossOrigin = "anonymous";
    }
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";

    video.onerror = () => {
      window.clearTimeout(timer);
      settle(null);
    };

    video.onloadedmetadata = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const targetTime = duration > 0.5
        ? Math.min(Math.max(seekTime, 0), Math.max(duration - 0.25, 0))
        : 0;

      try {
        video.currentTime = targetTime;
      } catch {
        window.clearTimeout(timer);
        settle(null);
      }
    };

    video.onseeked = () => {
      try {
        const width = video.videoWidth || 1280;
        const height = video.videoHeight || 720;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          window.clearTimeout(timer);
          settle(null);
          return;
        }

        ctx.drawImage(video, 0, 0, width, height);
        const data = canvas.toDataURL("image/jpeg", 0.86);
        window.clearTimeout(timer);
        settle(data);
      } catch {
        window.clearTimeout(timer);
        settle(null);
      }
    };

    video.src = videoUrl;
    video.load();
  });
}

interface UseVideoThumbnailOptions {
  videoUrl: string;
  fallbackSrc?: string;
  seekTime?: number;
  enabled?: boolean;
}

export function useVideoThumbnail({
  videoUrl,
  fallbackSrc,
  seekTime = 2,
  enabled = true,
}: UseVideoThumbnailOptions) {
  const [thumbnailSrc, setThumbnailSrc] = useState<string | undefined>(fallbackSrc);

  useEffect(() => {
    setThumbnailSrc(fallbackSrc);
  }, [fallbackSrc]);

  useEffect(() => {
    let isCancelled = false;

    if (!enabled || !videoUrl) {
      return () => {
        isCancelled = true;
      };
    }

    (async () => {
      const frame = await captureVideoThumbnail(videoUrl, seekTime);
      if (!isCancelled && frame) {
        setThumbnailSrc(frame);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [videoUrl, seekTime, enabled]);

  return thumbnailSrc;
}
