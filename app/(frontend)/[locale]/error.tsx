"use client";

export default function LocalizedError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="website-page">
      <section className="section">
        <h1>Temporarily unavailable</h1>
        <p>
          The content service could not be reached. The incident has been logged;
          please retry shortly.
        </p>
        <button className="button" onClick={reset} type="button">
          Retry
        </button>
      </section>
    </main>
  );
}
