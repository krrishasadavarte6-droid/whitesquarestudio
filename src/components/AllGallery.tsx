import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const imageModules = import.meta.glob('../assets/**/*.{jpg,png,jpeg}', { eager: true, query: '?url', import: 'default' });

export const allProjects = Object.entries(imageModules).map(([path, url], index) => {
  const parts = path.split('/');
  const categoryFolder = parts[2];
  
  let category = 'All';
  if (categoryFolder === 'Bungalow') category = 'Residential';
  else if (categoryFolder === 'INTERIOR') category = 'Interior';
  else if (categoryFolder === 'Residential High rise') category = 'High Rise';
  else if (categoryFolder === 'commercial') category = 'Commercial';
  else if (categoryFolder === 'industrial') category = 'Industrial';
  else category = 'Other';

  return {
    id: index + 1,
    title: parts[parts.length - 1].replace(/\.[^/.]+$/, ""),
    category,
    image: url as string,
    span: index % 4 === 0 ? 'tall' : index % 7 === 0 ? 'wide' : 'square'
  };
}).filter(p => !['logo', 'vision', 'react', 'vite', 'hero', 'main_home'].some(x => p.title.toLowerCase().includes(x)) && p.category !== 'Other');

export const filters = ['All', 'Residential', 'Interior', 'Commercial', 'High Rise', 'Industrial'];

const PAGE_SIZE = 18;

const GalleryImage = ({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(110deg, var(--bg-color) 30%, rgba(212,175,55,0.05) 50%, var(--bg-color) 70%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
          borderRadius: 'inherit',
        }} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        onLoad={() => setLoaded(true)}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  );
};

const AllGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (location.state && location.state.filter) {
      setActiveFilter(location.state.filter);
    }
  }, [location]);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const filteredProjects = activeFilter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeFilter);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredProjects.length]);

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        <button 
          onClick={() => navigate('/')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', marginBottom: '2rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">Full Portfolio</span>
          <h2 className="section-title">All Works</h2>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '50px',
                  border: `1px solid ${activeFilter === filter ? 'var(--accent-color)' : 'var(--border-color)'}`,
                  background: activeFilter === filter ? 'var(--accent-bg)' : 'transparent',
                  color: activeFilter === filter ? 'var(--accent-color)' : 'var(--text-secondary)',
                  transition: 'var(--transition)',
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '1rem' }}>
            Showing {visibleProjects.length} of {filteredProjects.length} images
          </p>
        </div>

        <div className="gallery-grid">
          {visibleProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`gallery-item ${project.span}`}
              onClick={() => openLightbox(index)}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', cursor: 'pointer' }}
            >
              <GalleryImage
                src={project.image}
                alt={project.title}
                className="gallery-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              <div 
                className="gallery-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 60%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2rem', opacity: 0, transition: 'var(--transition)'
                }}
              >
                <span style={{ color: 'var(--accent-color)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                  {project.category}
                </span>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
              style={{
                padding: '1rem 2.5rem',
                background: 'transparent',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)',
                borderRadius: '4px',
                fontSize: '0.9rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent-bg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Loader2 size={16} />
              Load More ({filteredProjects.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.92)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <button
            onClick={closeLightbox}
            style={{
              position: 'fixed', top: '1.5rem', right: '1.5rem',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', zIndex: 10000, transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <X size={22} />
          </button>

          <button
            onClick={e => { e.stopPropagation(); prevImage(); }}
            style={{
              position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', zIndex: 10000, transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <ChevronLeft size={24} />
          </button>

          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <img
              src={filteredProjects[lightboxIndex].image}
              alt={filteredProjects[lightboxIndex].title}
              decoding="async"
              style={{
                maxWidth: '100%', maxHeight: '82vh', objectFit: 'contain',
                borderRadius: '8px', boxShadow: '0 0 60px rgba(212,175,55,0.15)',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: 'var(--accent-color)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {filteredProjects[lightboxIndex].category}
              </span>
              <p style={{ color: '#fff', margin: '0.25rem 0 0', fontSize: '1.1rem' }}>
                {filteredProjects[lightboxIndex].title}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {lightboxIndex + 1} / {filteredProjects.length}
              </p>
            </div>
          </div>

          <button
            onClick={e => { e.stopPropagation(); nextImage(); }}
            style={{
              position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', zIndex: 10000, transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-auto-rows: 300px;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .gallery-item.tall { grid-row: span 2; }
          .gallery-item.wide { grid-column: span 2; }
        }

        .gallery-item:hover .gallery-img {
          transform: scale(1.05);
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default AllGallery;
