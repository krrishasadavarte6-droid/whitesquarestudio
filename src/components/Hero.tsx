
import Main_image from "../assets/main_home.jpg";
const Hero = () => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-color)',
        overflow: 'hidden'
      }}
    >
      {/* Background with an overlay gradient and abstract shapes to simulate a 3D architectural vibe */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(rgba(5,5,5,0.7), rgba(5,5,5,0.9)), url(${Main_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />

      {/* Decorative architectural grid lines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        width: '1px',
        height: '100%',
        background: 'rgba(255,255,255,0.03)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: '20%',
        width: '1px',
        height: '100%',
        background: 'rgba(255,255,255,0.03)',
        zIndex: 1
      }} />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            border: '1px solid var(--border-color)',
            borderRadius: '50px',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-secondary)',
            backdropFilter: 'blur(5px)',
            background: 'var(--glass-bg)'
          }}
        >
          Premium Architectural Visualization
        </span>

        <h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            margin: 0,
            color: 'var(--text-primary)'
          }}
        >
          Designing The <br />
          <span style={{
            color: 'transparent',
            WebkitTextStroke: '1px var(--text-primary)',
            textShadow: 'var(--gold-glow)'
          }}>Unseen</span>
          <br /> Reality
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          margin: '0',
          fontWeight: 300
        }}>
          We translate architectural blueprints into breathtaking 3D renders and immersive walkthroughs that captivate and inspire.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          <a href="#portfolio" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Explore Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>


      </div>
    </section>
  );
};

export default Hero;
