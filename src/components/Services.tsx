
import { Home, Layers, Video, Box, Briefcase, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: '3D Renderings',
      description: 'Photorealistic high-resolution images that showcase exterior facades, interior atmospheres, and precise material selections.',
      icon: <Layers size={32} color="var(--accent-color)" />
    },
    {
      title: 'Architectural Walkthroughs',
      description: 'Immersive cinematic video tours guiding viewers through the unbuilt space, highlighting layout, flow, and design intent.',
      icon: <Video size={32} color="var(--accent-color)" />
    },
    {
      title: 'Virtual Reality (VR)',
      description: 'Interactive VR experiences allowing clients to walk around and experience scale and volume before construction begins.',
      icon: <Box size={32} color="var(--accent-color)" />
    },
    {
      title: 'Floor Plan Rendering',
      description: '2D and 3D colored floor plans to clearly present spatial arrangements and furniture layouts.',
      icon: <Home size={32} color="var(--accent-color)" />
    },
    {
      title: 'Commercial Projects',
      description: 'Large-scale visualization for offices, retail spaces, and public buildings designed to secure investor buy-in.',
      icon: <Briefcase size={32} color="var(--accent-color)" />
    },
    {
      title: 'Lightning & Atmosphere',
      description: 'Specialized studies showcasing day, night, and golden hour lighting scenarios to evoke the right mood.',
      icon: <Zap size={32} color="var(--accent-color)" />
    }
  ];

  return (
    <section id="services" style={{ padding: '8rem 5%', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-subtitle">Our Expertise</span>
          <h2 className="section-title">Services</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Transforming concepts into compelling visual narratives across various mediums.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card"
              style={{
                background: 'var(--bg-secondary)',
                padding: '3rem 2rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                transition: 'var(--transition)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
              }}
              onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-10px)';
                 e.currentTarget.style.borderColor = 'var(--accent-color)';
                 e.currentTarget.style.boxShadow = 'var(--gold-glow)';
              }}
              onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.borderColor = 'var(--border-color)';
                 e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Hover background effect */}
              <div 
                 style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '100%',
                     background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.05), transparent 70%)',
                     zIndex: -1
                 }}
              />
              
              <div style={{ marginBottom: '1.5rem' }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {service.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
