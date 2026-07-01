import type { Metadata } from "next";
import Link from "next/link";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Contact | aiio",
  description: "Contact aiio.",
};

export default function ContactPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Contact"
      intro="A simple entry point for demos, platform conversations and partnership discussions."
      title="Start the conversation."
    >
      <section className="website-contact-section">
        <div className="website-page-shell">
          <div className="website-contact-panel">
            <p>For demos, partnerships and strategic conversations.</p>
            <Link className="website-final-button" href="/live-demo/kontakt">
              Request Demo
            </Link>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
