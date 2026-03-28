import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
const logo = '/assets/logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: isScrolled ? '1rem 5%' : '1.5rem 5%',
        backgroundColor: isScrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        transition: 'var(--transition)',
        zIndex: 1000,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0, // Reset container padding here since header handles it
        }}
      >
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              objectFit: 'contain'
            }}
          />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            White Square Studio
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          style={{ display: 'none', color: 'var(--text-primary)' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className="mobile-menu"
        style={{
          display: isMobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-secondary)',
          padding: '2rem 5%',
          borderBottom: '1px solid var(--border-color)',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontSize: '1.2rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            {link.name}
          </a>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
