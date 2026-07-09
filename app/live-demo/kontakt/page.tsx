import { MainHeader } from "../../main-navigation";
import {
  EditorialCTAGroup,
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
} from "../../../components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "../../../components/brand/EditorialEyebrow";

const conversationOutcomes = [
  {
    copy: "Understand where Organizational Intelligence creates measurable value in your organization.",
    icon: "M5 17.5 10.5 12 14 15.5 19 10.5",
    title: "Executive Conversation",
  },
  {
    copy: "Identify your organization's highest-impact starting points for continuous self-understanding.",
    icon: "M12 4.5v15M4.5 12h15M7 7l10 10M17 7 7 17",
    title: "Organizational Assessment",
  },
  {
    copy: "Leave with practical recommendations instead of a software demonstration or sales pitch.",
    icon: "M5 12.5 9.5 17 19 7.5M5 7h6M5 17h4",
    title: "Concrete Next Steps",
  },
] as const;

const customerLogos = [
  { alt: "ABB", image: "/brand/references/abb.png" },
  { alt: "thyssenkrupp", image: "/brand/references/thyssenkrupp.png" },
  { alt: "VTG", image: "/brand/references/vtg.png" },
  { alt: "Busch-Jaeger", image: "/brand/references/busch-jaeger.svg" },
  { alt: "Euromobil", image: "/brand/references/euromobil.svg" },
] as const;

const recognitionLogos = [
  {
    alt: "CHIP Leading Software 2024",
    image: "/awards/chip-leading-software-2024-aiio.svg",
  },
  {
    alt: "CHIP Leading Software 2025",
    image: "/awards/chip-leading-software-2025-aiio.svg",
  },
  { alt: "KI Bundesverband", image: "/brand/references/ki-bundesverband.png" },
] as const;

const requestDemoSectionNavigator = [
  { id: "request-demo-hero", label: "Hero" },
  { id: "request-demo-expectations", label: "Outcomes" },
  { id: "request-demo-trust", label: "Trust" },
  { id: "request-demo-form", label: "Start" },
  { id: "request-demo-closing", label: "Close" },
] as const;

export default function DemoKontaktPage() {
  return (
    <main className="request-demo-page">
      <MainHeader />

      <EditorialSection
        className="request-demo-hero"
        id="request-demo-hero"
        shellClassName="request-demo-shell request-demo-hero-grid"
      >
          <div className="request-demo-copy">
            <h1 id="request-demo-title">Start with the right conversation.</h1>
            <p>
              We do not sell software first. We help organizations understand
              themselves, identify where Organizational Intelligence creates
              value and decide what should happen next.
            </p>
            <EditorialCTAGroup ariaLabel="Request demo action">
              <a className="request-demo-button" href="#request-demo-form">
                Request a Conversation <span aria-hidden="true">-&gt;</span>
              </a>
            </EditorialCTAGroup>
          </div>

          <aside className="request-demo-person" aria-label="Executive conversation with aiio">
            <div
              aria-label="Dr. Christian Graup portrait"
              className="company-expert-portrait request-demo-portrait"
              role="img"
              style={{ backgroundImage: "url(/people/christian-graup.jpg)" }}
            />
            <div className="request-demo-person-copy">
              <span className="request-demo-person-name">Dr. Christian Graup</span>
              <span className="request-demo-person-role">Founder & CEO</span>
              <ul className="request-demo-person-focus" aria-label="Conversation focus">
                <li>Organizational Intelligence</li>
                <li>Product Strategy</li>
                <li>Management Systems</li>
              </ul>
              <blockquote>
                "Every transformation starts with understanding before changing."
              </blockquote>
              <ul className="request-demo-person-proof" aria-label="Executive experience">
                <li>25+ years organizational management</li>
                <li>Founder of Organizational Intelligence</li>
                <li>Trusted by enterprise organizations</li>
              </ul>
              <a href="#request-demo-form">
                Request a Conversation <span aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </aside>
      </EditorialSection>

      <EditorialSection
        className="request-demo-section"
        id="request-demo-expectations"
        shellClassName="request-demo-shell request-demo-expect-grid"
      >
          <EditorialSectionHeader
            eyebrow="What to Expect"
            title="A conversation designed to create executive clarity."
          />
          <div className="request-demo-outcome-grid">
            {conversationOutcomes.map((item) => (
              <article className="request-demo-outcome-card" key={item.title}>
                <span className="request-demo-outcome-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
      </EditorialSection>

      <EditorialSection
        className="request-demo-trust-section"
        id="request-demo-trust"
        shellClassName="request-demo-shell"
      >
          <div className="request-demo-trust-panel">
            <p>Trusted by organizations including</p>
            <div className="request-demo-trust-logos" aria-label="Customer references">
              {customerLogos.map((logo) => (
                <figure key={logo.alt}>
                  <img alt={logo.alt} loading="lazy" src={logo.image} />
                </figure>
              ))}
            </div>
            <div className="request-demo-recognition-logos" aria-label="Recognition">
              {recognitionLogos.map((logo) => (
                <figure key={logo.alt}>
                  <img alt={logo.alt} loading="lazy" src={logo.image} />
                  <figcaption>{logo.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
      </EditorialSection>

      <EditorialSection
        className="request-demo-form-section"
        id="request-demo-form"
        shellClassName="request-demo-shell request-demo-form-grid"
      >
          <div className="request-demo-form-intro">
            <EditorialEyebrow>Start here</EditorialEyebrow>
            <h2 id="request-demo-form-title">Tell us what you want to understand.</h2>
            <p>
              Every Organizational Intelligence journey begins with one
              conversation. Tell us a little about your organization. We will
              prepare the discussion around your specific context.
            </p>
          </div>

          <form
            action="mailto:info@aiio.de"
            className="request-demo-form"
            encType="text/plain"
            method="post"
          >
            <label>
              Name
              <input name="Name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input name="Email" placeholder="name@company.com" required type="email" />
            </label>
            <label>
              Company
              <input name="Company" placeholder="Company" />
            </label>
            <label>
              Topic
              <input name="Topic" placeholder="Demo, platform or partnership" />
            </label>
            <label className="request-demo-form-wide">
              Message
              <textarea
                name="Message"
                placeholder="What should we understand before we speak?"
                rows={5}
              />
            </label>
            <label className="request-demo-check">
              <input name="Privacy" required type="checkbox" value="accepted" />
              <span>
                I agree that aiio may use my information to respond to this
                request.
              </span>
            </label>
            <button className="request-demo-submit" type="submit">
              Request a Conversation
            </button>
          </form>
      </EditorialSection>

      <EditorialSection
        className="request-demo-closing"
        id="request-demo-closing"
        shellClassName="request-demo-shell"
      >
          <div className="request-demo-closing-copy">
            <EditorialEyebrow>Conversation</EditorialEyebrow>
            <h2>Understanding always starts with a conversation.</h2>
            <p>
              Organizational Intelligence is not a product demonstration.
            </p>
            <p>
              It is the beginning of understanding how an organization can
              continuously understand itself, build capabilities and create
              long-term resilience.
            </p>
          </div>
      </EditorialSection>
      <EditorialNavigation
        ariaLabel="Request demo sections"
        sections={requestDemoSectionNavigator}
      />
    </main>
  );
}
