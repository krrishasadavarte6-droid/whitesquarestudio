
import { Instagram, Linkedin, Mail } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Footer = () => {
   return (
      <footer style={{
         backgroundColor: 'var(--bg-secondary)',
         borderTop: '1px solid var(--border-color)',
         paddingTop: '4rem',
         paddingBottom: '2rem'
      }}>
         <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

            {/* Brand */}
            <div
               className="container"
               style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}
            >
               <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img
                     src={logo}
                     alt="Logo"
                     style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '4px',
                        objectFit: 'contain'
                     }}
                  />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                     White Square Studio
                  </span>
               </a>



            </div>

            {/* Quick Links */}
            <div>
               <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Navigation</h4>
               <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><a href="#" className="footer-link"><span className="link-arrow">›</span>Home</a></li>
                  <li><a href="#about" className="footer-link"><span className="link-arrow">›</span>About Studio</a></li>
                  <li><a href="#services" className="footer-link"><span className="link-arrow">›</span>Our Services</a></li>
                  <li><a href="#portfolio" className="footer-link"><span className="link-arrow">›</span>Selected Works</a></li>
                  <li><a href="#contact" className="footer-link"><span className="link-arrow">›</span>Contact Us</a></li>
               </ul>
            </div>

            {/* Services */}
            <div>
               <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Services</h4>
               <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li className="footer-service-item">Exterior Rendering</li>
                  <li className="footer-service-item">Interior Visualization</li>
                  <li className="footer-service-item">3D Walkthroughs</li>
                  <li className="footer-service-item">Virtual Reality</li>
                  <li className="footer-service-item">Product Rendering</li>
               </ul>
            </div>

            {/* Social */}
            <div>
               <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Connect</h4>
               <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#" className="social-icon"><Instagram size={20} /></a>
                  <a href="#" className="social-icon"><Linkedin size={20} /></a>
                  <a href="#" className="social-icon"><Mail size={20} /></a>
               </div>
            </div>

         </div>

         <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
               &copy; {new Date().getFullYear()} White Square Studio. All rights reserved.
            </p>
         </div>

         <style>{`
         /* Brand logo hover */
         .footer-brand:hover > div:first-child {
             transform: rotate(10deg) scale(1.15);
             box-shadow: 0 0 18px rgba(212,175,55,0.5);
         }

         /* Nav links */
         .footer-link {
             color: var(--text-secondary);
             font-size: 0.9rem;
             display: inline-flex;
             align-items: center;
             gap: 0.4rem;
             transition: color 0.25s ease, transform 0.25s ease;
         }
         .footer-link .link-arrow {
             color: var(--accent-color);
             font-size: 1.1rem;
             line-height: 1;
             display: inline-block;
             transform: translateX(-4px);
             opacity: 0;
             transition: transform 0.25s ease, opacity 0.25s ease;
         }
         .footer-link:hover {
             color: var(--accent-color);
             transform: translateX(6px);
         }
         .footer-link:hover .link-arrow {
             transform: translateX(0);
             opacity: 1;
         }

         /* Service list items */
         .footer-service-item {
             color: var(--text-secondary);
             font-size: 0.9rem;
             padding-left: 0.75rem;
             border-left: 2px solid transparent;
             transition: color 0.25s ease, border-color 0.25s ease, padding-left 0.25s ease;
             cursor: default;
         }
         .footer-service-item:hover {
             color: var(--accent-color);
             border-left-color: var(--accent-color);
             padding-left: 1.25rem;
         }

         /* Social icons */
         .social-icon {
             display: flex;
             align-items: center;
             justify-content: center;
             width: 40px;
             height: 40px;
             border-radius: 50%;
             background: var(--bg-color);
             color: var(--text-secondary);
             border: 1px solid var(--border-color);
             transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
         }
         .social-icon:hover {
             background: var(--accent-color);
             color: var(--bg-color);
             border-color: var(--accent-color);
             transform: translateY(-5px) scale(1.1);
             box-shadow: 0 8px 20px rgba(212,175,55,0.35);
         }
      `}</style>
      </footer>
   );
};

export default Footer;

