import type { Metadata } from "next";
import Link from "next/link";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Contact | aiio",
  description: "Contact aiio.",
};

const contactSectionNavigator = [
  { id: "contact-hero", label: "Hero" },
  { id: "contact-conversation", label: "Conversation" },
] as const;

export default function ContactPage() {
  return (
    <WebsiteArchitecturePage
      heroId="contact-hero"
      intro="For demos, platform questions and partnership conversations."
      sectionNavigator={contactSectionNavigator}
      sectionNavigatorLabel="Contact sections"
      title="Start with the right conversation."
    >
      <section className="website-contact-section" id="contact-conversation">
        <div className="website-page-shell">
          <div className="website-contact-panel">
            <p>Tell us what you want to understand, build or evaluate.</p>
            <Link className="website-final-button" href="/live-demo/kontakt">
              Request a Conversation
            </Link>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
