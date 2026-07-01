import Link from "next/link";

type TheoryReferenceProps = {
  href?: string;
  label?: string;
  title?: string;
};

export function TheoryReference({
  href = "/thinking/theory",
  label = "Theory",
  title = "Read the underlying theory",
}: TheoryReferenceProps) {
  return (
    <Link className="theory-reference" href={href}>
      <span className="theory-reference-icon" aria-hidden="true">
        <svg fill="none" viewBox="0 0 18 18">
          <path
            d="M3.2 3.2h3.6c1.2 0 2.2.5 2.2 1.6v9.7c0-1.1-1-1.7-2.2-1.7H3.2V3.2Z"
            stroke="currentColor"
            strokeLinejoin="round"
          />
          <path
            d="M14.8 3.2h-3.6C10 3.2 9 3.7 9 4.8v9.7c0-1.1 1-1.7 2.2-1.7h3.6V3.2Z"
            stroke="currentColor"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="theory-reference-label">{label}</span>
      <strong>{title}</strong>
      <em aria-hidden="true">-&gt;</em>
    </Link>
  );
}
