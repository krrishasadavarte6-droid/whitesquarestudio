
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
   return (
      <section id="contact" style={{ padding: '8rem 5%', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
         <div className="container">

            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
               <span className="section-subtitle">Get In Touch</span>
               <h2 className="section-title">Let's Build Together</h2>
               <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                  Ready to bring your blueprints to life? Contact us to discuss your next architectural visualization project.
               </p>
            </div>

            <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
               gap: '4rem',
               background: 'var(--glass-bg)',
               padding: '3rem',
               borderRadius: '16px',
               border: '1px solid var(--border-color)',
               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>

               {/* Contact Information */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                     <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Contact Information</h3>
                     <p style={{ color: 'var(--text-secondary)' }}>Fill out the form and our team will get back to you within 24 hours.</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%', color: 'var(--accent-color)' }}>
                        <Phone size={24} />
                     </div>
                     <div>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Phone</span>
                        <a href="tel:+9821390054" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.1rem' }}>+91 9821390054 / +91 9825275690</a>
                     </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%', color: 'var(--accent-color)' }}>
                        <Mail size={24} />
                     </div>
                     <div>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</span>
                        <a href="mailto:hello@archviz.studio" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.1rem' }}>whitesquarestudio@gmail.com</a>
                     </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%', color: 'var(--accent-color)' }}>
                        <MapPin size={24} />
                     </div>
                     <div>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Studio</span>
                        <address style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.1rem', fontStyle: 'normal' }}>
                           111, 2nd floor White Square Studio,<br />
                           Exelucee, Bhimrad , Surat - 395007, Gujarat.
                        </address>
                     </div>
                  </div>
               </div>

               {/* Contact Form */}
               <form
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                  onSubmit={(e) => e.preventDefault()}
               >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>First Name</label>
                        <input type="text" className="form-input" placeholder="John" />
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Last Name</label>
                        <input type="text" className="form-input" placeholder="Doe" />
                     </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                     <input type="email" className="form-input" placeholder="john@company.com" />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Project Details</label>
                     <textarea
                        className="form-input"
                        placeholder="Tell us about the scope, timeline, and requirements..."
                        rows={4}
                        style={{ resize: 'vertical' }}
                     ></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                     Send Message
                  </button>
               </form>

            </div>
         </div>

         <style>{`
         .form-input {
             background: var(--bg-color);
             border: 1px solid var(--border-color);
             padding: 0.8rem 1rem;
             border-radius: 4px;
             color: var(--text-primary);
             font-family: inherit;
             transition: var(--transition);
         }
         
         .form-input:focus {
             outline: none;
             border-color: var(--accent-color);
             box-shadow: var(--gold-glow);
         }

         .form-input::placeholder {
             color: rgba(255, 255, 255, 0.2);
         }
      `}</style>
      </section>
   );
};

export default Contact;
