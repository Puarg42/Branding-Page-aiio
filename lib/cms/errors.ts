export class CMSUnavailableError extends Error {
  constructor(cause?: unknown) {
    super("CMS is temporarily unavailable", { cause });
    this.name = "CMSUnavailableError";
  }
}

export function throwIfConfigured(cause: unknown) {
  if (process.env.DATABASE_URL || process.env.POSTGRES_URL) {
    throw new CMSUnavailableError(cause);
  }
}
