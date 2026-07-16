import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../collections/access";
import { linkField } from "../fields/link";
import { revalidateNav } from "../lib/cms/revalidate";

/** Footer navigation and legal links, editable in the admin. */
export const Footer: GlobalConfig = {
  slug: "footer",
  admin: { group: "Navigation" },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidateNav],
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      localized: true,
      labels: { singular: "Footer link", plural: "Footer links" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text" },
        linkField("link", { localized: false }),
      ],
    },
    {
      name: "legalItems",
      type: "array",
      localized: true,
      labels: { singular: "Legal link", plural: "Legal links" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text" },
        linkField("link", { localized: false }),
      ],
    },
  ],
};
