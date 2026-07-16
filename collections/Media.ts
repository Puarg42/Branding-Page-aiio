import { APIError, type CollectionBeforeOperationHook, type CollectionConfig } from "payload";
import { isAuthenticated } from "./access";

const validateGenericBinaryFont: CollectionBeforeOperationHook = ({ req }) => {
  const file = req.file as
    | { mimetype?: string; name?: string; filename?: string }
    | undefined;
  if (file?.mimetype === "application/octet-stream") {
    const filename = (file.name ?? file.filename ?? "").toLowerCase();
    if (!filename.endsWith(".woff2")) {
      throw new APIError(
        "Generic binary uploads are only allowed for .woff2 font files.",
        400,
      );
    }
  }
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: { beforeOperation: [validateGenericBinaryFont] },
  upload: {
    // Files are stored in Vercel Blob (see payload.config plugins); no local
    // filesystem writes in production.
    mimeTypes: [
      "image/*",
      "application/pdf",
      "font/*",
      "application/font-woff",
      "application/font-woff2",
      "application/x-font-woff",
      "application/x-font-woff2",
      "application/vnd.ms-fontobject",
      // Some browsers/macOS versions expose WOFF2 as generic binary data.
      // Upload access is authenticated; Font Families remain WOFF2-only by convention.
      "application/octet-stream",
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Describe the image for screen readers and SEO." },
    },
    { name: "caption", type: "text", localized: true },
    {
      name: "video",
      type: "group",
      localized: true,
      fields: [
        { name: "url", type: "text" },
        { name: "poster", type: "upload", relationTo: "media" },
        { name: "transcript", type: "textarea" },
      ],
    },
  ],
};
