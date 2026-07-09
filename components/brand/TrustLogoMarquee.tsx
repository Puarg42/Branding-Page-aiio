import { ReferenceMarquee } from "./BrandCanonFoundation";

const trustReferenceLogos = [
  {
    key: "media-central",
    alt: "Media Central",
    src: "/brand/references/media-central.png",
  },
  {
    key: "wko",
    alt: "WKO",
    src: "/brand/references/wko.svg",
  },
  {
    key: "flexoffice",
    alt: "Flexoffice",
    src: "/brand/references/flexoffice.svg",
  },
  {
    key: "hvle",
    alt: "HVLE",
    src: "/brand/references/hvle.png",
  },
  {
    key: "thyssenkrupp",
    alt: "thyssenkrupp",
    src: "/brand/references/thyssenkrupp.png",
  },
  {
    key: "busch-jaeger",
    alt: "Busch-Jaeger",
    src: "/brand/references/busch-jaeger.svg",
  },
  {
    key: "abb",
    alt: "ABB",
    src: "/brand/references/abb.png",
  },
  {
    key: "euromobil",
    alt: "Euromobil",
    src: "/brand/references/euromobil.svg",
  },
  {
    key: "windpunx",
    alt: "Windpunx",
    src: "/brand/references/windpunx.svg",
  },
  {
    key: "symacon",
    alt: "Symacon",
    src: "/brand/references/symacon.png",
  },
  {
    key: "vtg",
    alt: "VTG",
    src: "/brand/references/vtg.png",
  },
  {
    key: "volkswagen",
    alt: "Volkswagen",
    src: "/brand/references/volkswagen.png",
  },
  {
    key: "vde",
    alt: "VDE",
    src: "/brand/references/vde.png",
  },
  {
    key: "total",
    alt: "Total",
    src: "/brand/references/total.png",
  },
  {
    key: "de-giradi",
    alt: "De Giradi",
    src: "/brand/references/de-giradi.png",
  },
] as const;

export function TrustLogoMarquee() {
  return (
    <div aria-hidden="true" className="trust-logo-band-layer">
      <ReferenceMarquee className="trust-logo-band">
        <div className="trust-logo-band-row">
          <div className="trust-logo-band-track">
            {Array.from({ length: 3 }, (_, setIndex) => (
              <div className="trust-logo-band-set" key={setIndex}>
                {trustReferenceLogos.map((logo) => (
                  <figure
                    className="trust-logo-band-logo"
                    data-logo={logo.key}
                    key={`${setIndex}-${logo.alt}`}
                  >
                    <img alt="" loading="lazy" src={logo.src} />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ReferenceMarquee>
    </div>
  );
}
