import { useState, useRef, useEffect } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const videoModules = import.meta.glob('../assets/VIDEO/*.mp4', { eager: true, query: '?url', import: 'default' });
const posterModules = import.meta.glob('../assets/**/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });

const fallbackPoster = Object.entries(posterModules).find(([p]) => p.includes('Bungalow'))?.[1] as string;

const videos = Object.entries(videoModules).map(([path, url], index) => {
  const name = path.split('/').pop()!.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  return { id: index + 1, title: name, src: url as string };
});

// ─── Intersection-aware video wrapper ─────────────────────────────────────────
const AutoPauseVideo = ({
  src, poster, controls, controlsList, disablePictureInPicture, autoPlay, style
}: {
  src: string;
  poster?: string;
  controls?: boolean;
  controlsList?: string;
  disablePictureInPicture?: boolean;
  autoPlay?: boolean;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.25 } // pause when less than 25% visible
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      key={src}
      src={src}
      poster={poster}
      controls={controls}
      controlsList={controlsList}
      disablePictureInPicture={disablePictureInPicture}
      autoPlay={autoPlay}
      style={style}
    />
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const VideoSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featured = videos[0];

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex - 1 + videos.length) % videos.length);
  const next = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex + 1) % videos.length);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section id="videos" style={{ padding: '8rem 5%', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">Visuals in Motion</span>
          <h2 className="section-title">Featured Video</h2>
        </div>

        {/* Featured video — fullscreen allowed, no download / pip */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <AutoPauseVideo
            src={featured.src}
            poster={fallbackPoster}
            controls
            controlsList="nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* View All / Collapse toggle */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={() => setExpanded(v => !v)}
            className="btn-outline"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.85rem 2rem', fontSize: '0.9rem', letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer',
              background: 'transparent', color: 'var(--accent-color)',
              border: '1px solid var(--accent-color)', borderRadius: '4px',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-bg)'; e.currentTarget.style.boxShadow = 'var(--gold-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Play size={16} fill="currentColor" />
            {expanded ? 'Collapse Videos' : `View All Videos (${videos.length})`}
          </button>
        </div>

        {/* All Videos Grid */}
        {expanded && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setLightboxIndex(index)}
                className="video-card"
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
              >
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                  <video
                    src={video.src}
                    muted
                    preload="metadata"
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%', objectFit: 'cover',
                      pointerEvents: 'none',
                    }}
                  />
                  <div className="video-play-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s ease',
                  }}>
                    <div className="play-btn-circle" style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: 'rgba(212,175,55,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}>
                      <Play size={22} fill="#000" color="#000" style={{ marginLeft: '3px' }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: '1rem 1.25rem' }}>
                  <p style={{
                    color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem',
                    textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <button onClick={closeLightbox} style={iconBtnStyle('1.5rem', '1.5rem')}>
            <X size={22} />
          </button>
          <button onClick={e => { e.stopPropagation(); prev(); }} style={iconBtnStyle('50%', undefined, '1.5rem')}>
            <ChevronLeft size={24} />
          </button>

          <div onClick={e => e.stopPropagation()} style={{ width: '90vw', maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AutoPauseVideo
              key={lightboxIndex}
              src={videos[lightboxIndex].src}
              controls
              autoPlay
              controlsList="nodownload noremoteplayback noplaybackrate"
              disablePictureInPicture
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 0 60px rgba(212,175,55,0.2)' }}
            />
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: '1.1rem', textTransform: 'capitalize' }}>
                {videos[lightboxIndex].title}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {lightboxIndex + 1} / {videos.length}
              </p>
            </div>
          </div>

          <button onClick={e => { e.stopPropagation(); next(); }} style={iconBtnStyle('50%', '1.5rem')}>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <style>{`
        /* Hide 3-dot overflow, download, picture-in-picture buttons */
        video::-webkit-media-controls-overflow-button { display: none !important; }
        video::-webkit-media-controls-download-button { display: none !important; }
        video::-webkit-media-controls-picture-in-picture-button { display: none !important; }

        .video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.4);
          border-color: var(--accent-color) !important;
        }
        .video-card:hover .video-play-overlay {
          background: rgba(0,0,0,0.25) !important;
        }
        .video-card:hover .play-btn-circle {
          transform: scale(1.15);
          box-shadow: 0 0 20px rgba(212,175,55,0.6);
        }
      `}</style>
    </section>
  );
};

const iconBtnStyle = (top?: string, right?: string, left?: string): React.CSSProperties => ({
  position: 'fixed',
  top: top,
  right: right,
  left: left,
  transform: top === '50%' ? 'translateY(-50%)' : undefined,
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50%',
  width: '48px', height: '48px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#fff', zIndex: 10000,
  transition: 'background 0.2s',
});

export default VideoSection;
