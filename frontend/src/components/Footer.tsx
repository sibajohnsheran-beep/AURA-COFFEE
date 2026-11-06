
import {
  ArrowUpRight,
  Coffee,
  Phone,
  MessageCircle,
  ArrowUp,
  Heart,
  Code2,
} from 'lucide-react'

import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="aura-footer" id="contact">
      {/* TOP DECORATIVE LINE */}
      <div className="aura-footer-topline" />

      <div className="aura-footer-container">
        {/* =========================
            FOOTER INTRO
        ========================= */}
        <div className="aura-footer-intro">
          <div>
            <p className="aura-footer-eyebrow">
              MORE THAN JUST COFFEE
            </p>

            <h2>
              LET'S MAKE
              <br />
              <em>MEMORIES.</em>
            </h2>
          </div>

          <a
            href="/#collection"
            className="aura-footer-explore"
          >
            EXPLORE OUR COFFEE
            <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="aura-footer-divider" />

        {/* =========================
            MAIN FOOTER GRID
        ========================= */}
        <div className="aura-footer-grid">
          {/* BRAND SECTION */}
          <div className="aura-footer-brand">
            <a href="/#home" className="aura-footer-logo">
              <Coffee size={29} />

              <span>
                AURA<span>COFFEE</span>
              </span>
            </a>

            <p>
              Crafted with passion. Brewed with precision.
              Every cup is a moment worth remembering.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="aura-footer-socials">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <span className="aura-social-ig">
                  IG
                </span>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <span className="aura-social-fb">
                  f
                </span>
              </a>

              <a
                href="https://wa.me/94760041594"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle size={19} />
              </a>
            </div>
          </div>

          {/* =========================
              QUICK LINKS
          ========================= */}
          <div className="aura-footer-column">
            <h3>EXPLORE</h3>

            <a href="/#home">
              Home
            </a>

            <a href="/#menu">
              Our Coffee
            </a>

            <a href="/#collection">
              Coffee Collection
            </a>

            <a href="/#story">
              Our Story
            </a>
          </div>

          {/* =========================
              CONTACT & DEVELOPER
          ========================= */}
          <div className="aura-footer-column aura-footer-contact-column">
            <h3>GET IN TOUCH</h3>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/94760041594"
              target="_blank"
              rel="noopener noreferrer"
              className="aura-footer-contact"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>

            {/* DEVELOPER INFORMATION */}
            <div className="aura-footer-developer-info">
              <Code2 size={20} />

              <div className="aura-footer-developer-details">
                <span>
                  Developed by
                </span>

                <strong>
                  Neirah Tech
                </strong>

                {/* DEVELOPER PHONE NUMBER */}
                <a href="tel:+94760041594">
                  <Phone size={15} />
                  <span>+94 76 004 1594</span>
                </a>
              </div>
            </div>

            <p className="aura-footer-contact-note">
              Have a question or a coffee craving?
              We'd love to hear from you.
            </p>
          </div>

          {/* =========================
              OUR PHILOSOPHY
          ========================= */}
          <div className="aura-footer-column aura-footer-message">
            <h3>OUR PHILOSOPHY</h3>

            <p>
              Life happens.
              <br />
              Coffee helps.
            </p>

            <span>
              MADE FOR THE MOMENTS THAT MATTER.
            </span>
          </div>
        </div>

        <div className="aura-footer-divider" />

        {/* =========================
            BOTTOM COPYRIGHT
        ========================= */}
        <div className="aura-footer-bottom">
          <p>
            © {currentYear} AURA COFFEE.
            All Rights Reserved.
          </p>

          <p className="aura-footer-crafted">
            MADE WITH
            <Heart
              size={13}
              fill="currentColor"
            />
            FOR COFFEE LOVERS
          </p>
        </div>
      </div>

      {/* =========================
          BACK TO TOP
      ========================= */}
      <button
        type="button"
        className="aura-footer-backtop"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* =========================
          LARGE BRAND TEXT
      ========================= */}
      <div
        className="aura-footer-bigtext"
        aria-hidden="true"
      >
        AURA COFFEE
      </div>
    </footer>
  )
}
