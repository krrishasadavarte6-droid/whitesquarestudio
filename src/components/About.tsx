
import vision_image from '../assets/Vision.jpg';
const About = () => {
    return (
        <section id="about" style={{ padding: '8rem 5%', backgroundColor: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>

            {/* Decorative vertical text */}
            <div style={{
                position: 'absolute',
                left: '2%',
                top: '50%',
                transform: 'translateY(-50%) rotate(180deg)',
                writingMode: 'vertical-rl',
                textTransform: 'uppercase',
                letterSpacing: '10px',
                color: 'rgba(255, 255, 255, 0.05)',
                fontSize: '4rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                zIndex: 0
            }}>
                VISION
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>

                    {/* Image Frame */}
                    <div style={{
                        position: 'relative',
                        padding: '2rem 0 0 2rem'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '90%',
                            height: '90%',
                            border: '2px solid var(--accent-color)',
                            zIndex: -1
                        }} />
                        <img
                            src={vision_image}
                            alt="Architectural Workspace"
                            style={{
                                width: '100%',
                                height: '500px',
                                objectFit: 'cover',
                                filter: 'grayscale(50%) contrast(1.2)',
                                boxShadow: '20px 20px 0 var(--bg-color), 21px 21px 0 var(--border-color)',
                                transition: 'var(--transition)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.filter = 'grayscale(50%) contrast(1.2)';
                            }}
                        />

                        <div style={{
                            position: 'absolute',
                            bottom: '-2rem',
                            right: '-2rem',
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(10px)',
                            padding: '2rem',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--accent-color)', lineHeight: 1 }}>20+</span>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Years Experience</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <span className="section-subtitle">The Studio</span>
                        <h2 className="section-title">Redefining Space Through Visualization</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            We are a premier architectural visualization studio dedicated to transforming 2D blueprints into immersive 3D realities. Our passion lies in capturing the essence of architecture, light, and texture to evoke emotion long before the first brick is laid.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                            From high-end residential estates to expansive commercial developments, our walkthroughs and renders are crafted with meticulous attention to detail, providing our clients with a powerful tool for presentation, marketing, and design validation.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem', letterSpacing: '1px' }}>Precision</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Millimeter-accurate modeling based on architectural plans.</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem', letterSpacing: '1px' }}>Realism</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Physically-based rendering for true-to-life lighting and materials.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
