"use client";

import { useState } from "react";

/**
 * The floating "تواصل معنا" widget.
 *
 * On the home page it is a child of the hero dock: laid out in the flow and
 * faded in by the scroll animation, which needs a handle on the node — hence
 * `innerRef`. Everywhere else there is no scroll animation to attach to, so
 * `standalone` pins it to the corner and shows it right away.
 */
export default function ContactWidget({ innerRef = null, standalone = false }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div
      ref={innerRef}
      className={`contact-float-widget${standalone ? " contact-float-widget--standalone" : ""}`}
    >
      <div
        className={`contact-float-menu${
          contactOpen ? " contact-float-menu--open" : ""
        }`}
      >
        <div className="contact-menu-header">
          <span className="contact-menu-label">تواصل معنا المباشر</span>
          <a href="tel:01558282760" className="contact-menu-phone">
            01558282760
          </a>
        </div>

        <div className="contact-menu-actions">
          <a
            href="https://wa.me/201558282760"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-menu-btn btn-wa"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="contact-btn-icon">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.218 4.777 1.219h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.92-7.063a9.923 9.923 0 0 0-7.063-2.943zm5.834 14.162c-.247.694-1.436 1.326-1.986 1.391-.506.06-1.164.086-1.874-.14-1.157-.367-2.651-1.002-4.226-2.404-1.371-1.22-2.302-2.735-2.571-3.196-.27-.461-.029-.711.202-.94.208-.207.462-.538.693-.807.23-.27.307-.462.461-.77.154-.308.077-.577-.038-.808-.116-.231-1.038-2.502-1.423-3.426-.375-.901-.758-.778-1.038-.792-.269-.014-.577-.015-.885-.015s-.808.115-1.231.577c-.423.461-1.616 1.578-1.616 3.847 0 2.269 1.654 4.462 1.885 4.77 2.308 3.076 5.115 4.884 8.23 5.922.775.259 1.488.384 2.051.353.692-.038 2.154-.885 2.461-1.731.308-.846.308-1.577.215-1.731-.092-.154-.346-.246-.592-.37z"/>
            </svg>
            <span>محادثة واتساب</span>
          </a>

          <a href="tel:01558282760" className="contact-menu-btn btn-call">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-btn-icon">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>اتصال هاتفى</span>
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setContactOpen(!contactOpen)}
        className={`contact-float-trigger ${contactOpen ? "is-active" : ""}`}
        aria-label="تواصل معنا"
      >
        <span className="contact-trigger-icon">
          {contactOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.218 4.777 1.219h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.668-1.034-5.176-2.92-7.063a9.923 9.923 0 0 0-7.063-2.943zm5.834 14.162c-.247.694-1.436 1.326-1.986 1.391-.506.06-1.164.086-1.874-.14-1.157-.367-2.651-1.002-4.226-2.404-1.371-1.22-2.302-2.735-2.571-3.196-.27-.461-.029-.711.202-.94.208-.207.462-.538.693-.807.23-.27.307-.462.461-.77.154-.308.077-.577-.038-.808-.116-.231-1.038-2.502-1.423-3.426-.375-.901-.758-.778-1.038-.792-.269-.014-.577-.015-.885-.015s-.808.115-1.231.577c-.423.461-1.616 1.578-1.616 3.847 0 2.269 1.654 4.462 1.885 4.77 2.308 3.076 5.115 4.884 8.23 5.922.775.259 1.488.384 2.051.353.692-.038 2.154-.885 2.461-1.731.308-.846.308-1.577.215-1.731-.092-.154-.346-.246-.592-.37z"/>
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
