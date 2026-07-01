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
      intro="For demos, platform questions and partnership conversations."
      title="Start with the right conversation."
    >
      <section className="website-contact-section">
        <div className="website-page-shell">
          <div className="website-contact-panel">
            <p>Tell us what you want to understand, build or evaluate.</p>
            <Link className="website-final-button" href="/live-demo/kontakt">
              Request Demo
            </Link>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
