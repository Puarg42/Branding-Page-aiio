import { MainHeader } from "../../main-navigation";
import {
  EditorialCTAGroup,
  EditorialNavigation,
  ReferenceMarquee,
  EditorialSection,
  EditorialSectionHeader,
} from "../../../components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "../../../components/brand/EditorialEyebrow";

const conversationOutcomes = [
  {
    copy: "Clarify which business question should lead the discussion before technology enters the room.",
    cta: "Clarify the starting point",
    icon: "conversation",
    title: "Executive clarity",
  },
  {
    copy: "Identify where Organizational Intelligence can reduce friction, accelerate decisions or strengthen capability.",
    cta: "Find the value path",
    icon: "assessment",
    title: "Value assessment",
  },
  {
    copy: "Leave with a credible next step: conversation, assessment, partner route or platform deep dive.",
    cta: "Define the next step",
    icon: "steps",
    title: "Practical path",
  },
] as const;

const customerLogos = [
  { alt: "ABB", image: "/brand/references/abb.png" },
  { alt: "thyssenkrupp", image: "/brand/references/thyssenkrupp.png" },
  { alt: "VTG", image: "/brand/references/vtg.png" },
  { alt: "Busch-Jaeger", image: "/brand/references/busch-jaeger.svg" },
  { alt: "Euromobil", image: "/brand/references/euromobil.svg" },
] as const;

const requestDemoSectionNavigator = [
  { id: "request-demo-hero", label: "Hero" },
  { id: "request-demo-expectations", label: "Outcomes" },
  { id: "request-demo-trust", label: "Trust" },
  { id: "request-demo-form", label: "Start" },
  { id: "request-demo-closing", label: "Close" },
] as const;

function OutcomeIcon({ icon }: { icon: (typeof conversationOutcomes)[number]["icon"] }) {
  if (icon === "conversation") {
    return (
      <svg viewBox="0 0 48 48">
        <circle className="icon-orbit" cx="24" cy="24" r="18" />
        <path className="icon-line" d="M17 21.5c0-3.2 2.9-5.7 6.6-5.7h2.8c3.7 0 6.6 2.5 6.6 5.7s-2.9 5.7-6.6 5.7H24l-5.2 3.5v-4.2C17.7 25.4 17 23.6 17 21.5Z" />
        <path className="icon-line" d="M15 33.5h18" />
        <circle className="icon-dot" cx="24" cy="21.5" r="1.5" />
      </svg>
    );
  }

  if (icon === "assessment") {
    return (
      <svg viewBox="0 0 48 48">
        <circle className="icon-orbit" cx="24" cy="24" r="18" />
        <circle className="icon-muted" cx="24" cy="24" r="9" />
        <path className="icon-line" d="M24 10v6M24 32v6M10 24h6M32 24h6" />
        <path className="icon-line" d="M19.5 24.5 23 28l6.5-8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48">
      <circle className="icon-orbit" cx="24" cy="24" r="18" />
      <path className="icon-muted" d="M14 33h20" />
      <path className="icon-line" d="M15 31c5.2-10.2 10.4-13.4 18-15" />
      <path className="icon-line" d="M29 13h7v7" />
      <circle className="icon-dot" cx="18" cy="27" r="1.7" />
      <circle className="icon-dot" cx="25" cy="20.5" r="1.7" />
      <circle className="icon-dot" cx="33" cy="16" r="1.7" />
    </svg>
  );
}

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
            <EditorialCTAGroup ariaLabel="Request conversation action">
              <a className="request-demo-button" href="#request-demo-form">
                Request a conversation
              </a>
            </EditorialCTAGroup>
          </div>

          <aside className="request-demo-person" aria-label="Executive conversation with aiio">
            <div
              aria-label="Lars Bendler portrait"
              className="company-expert-portrait request-demo-portrait"
              role="img"
              style={{ backgroundImage: "url(/people/lars-bendler.jpg)" }}
            />
            <div className="request-demo-person-copy">
              <span className="request-demo-person-name">Lars Bendler</span>
              <span className="request-demo-person-role">
                Managing Director & Chief Partner Officer
              </span>
              <blockquote>
                "The right conversation turns ambition into a credible path."
              </blockquote>
              <p>
                Lars helps leaders and partners translate ambition into a
                practical first route. He connects partner strategy, customer
                capability building and ecosystem development into a credible
                next conversation.
              </p>
              <a className="request-demo-person-link" href="#request-demo-form">
                Request a conversation
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
                  <OutcomeIcon icon={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a className="request-demo-outcome-link" href="#request-demo-form">
                  {item.cta}
                </a>
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
            <ReferenceMarquee
              ariaLabel="Customer references"
              className="request-demo-reference-marquee"
            >
              <div className="request-demo-reference-track">
                {Array.from({ length: 4 }, (_, setIndex) => (
                  <div className="request-demo-reference-set" key={setIndex}>
                    {customerLogos.map((logo) => (
                      <figure className="request-demo-reference-logo" key={`${setIndex}-${logo.alt}`}>
                        <img alt={setIndex === 0 ? logo.alt : ""} loading="lazy" src={logo.image} />
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            </ReferenceMarquee>
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
              Request a conversation
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
        ariaLabel="Request conversation sections"
        sections={requestDemoSectionNavigator}
      />
    </main>
  );
}
