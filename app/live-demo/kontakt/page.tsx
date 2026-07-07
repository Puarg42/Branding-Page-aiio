import { MainHeader } from "../../main-navigation";
import {
  EditorialCTAGroup,
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
} from "../../../components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "../../../components/brand/EditorialEyebrow";

const expectationItems = [
  "A conversation about your organizational challenges.",
  "A live look into the system.",
  "A first assessment of where aiio can create value.",
  "No sales pressure.",
];

const requestDemoSectionNavigator = [
  { id: "request-demo-hero", label: "Hero" },
  { id: "request-demo-expectations", label: "Expectations" },
  { id: "request-demo-form", label: "Request" },
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
            <EditorialEyebrow>The Conversation</EditorialEyebrow>
            <h1 id="request-demo-title">Start with the right conversation.</h1>
            <p>
              For demos, platform questions and partnership conversations.
            </p>
            <EditorialCTAGroup ariaLabel="Request demo action">
              <a className="request-demo-button" href="#request-demo-form">
                Request a Demo
              </a>
            </EditorialCTAGroup>
          </div>

          <aside className="request-demo-person" aria-label="Your aiio contact">
            <div className="request-demo-portrait">
              <img
                alt="aiio contact person"
                src="/aiio-pages/demo-kontakt/image-02.jpg"
              />
            </div>
            <div>
              <p>Personal exchange</p>
              <span>
                A focused conversation with aiio about where Organizational
                Intelligence can create value.
              </span>
            </div>
          </aside>
      </EditorialSection>

      <EditorialSection
        className="request-demo-section"
        id="request-demo-expectations"
        shellClassName="request-demo-shell request-demo-expect-grid"
      >
          <EditorialSectionHeader
            eyebrow="What to expect"
            title="A calm first look at what matters."
          />
          <ul className="request-demo-list">
            {expectationItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
              A few lines are enough. We will use them to prepare the right
              conversation.
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
              Request a Demo
            </button>
          </form>
      </EditorialSection>
      <EditorialNavigation
        ariaLabel="Request demo sections"
        sections={requestDemoSectionNavigator}
      />
    </main>
  );
}
