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
      <span>{label}</span>
      <strong>{title}</strong>
      <em aria-hidden="true">-&gt;</em>
    </Link>
  );
}
