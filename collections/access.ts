import type { Access } from "payload";

/** Role helpers for Payload access control. Users have a `role` of admin | editor. */
export const isAdmin: Access = ({ req }) => req.user?.role === "admin";

export const isAuthenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Public reads see only published documents; authenticated staff see everything
 * (including drafts). Works with collections that enable drafts (`_status`).
 */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true;
  return {
    _status: {
      equals: "published",
    },
  };
};
