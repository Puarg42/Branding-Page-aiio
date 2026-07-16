import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../collections/access";
import { linkField } from "../fields/link";
import { revalidateNav } from "../lib/cms/revalidate";

/** Primary site navigation, editable in the admin. */
export const Header: GlobalConfig = {
  slug: "header",
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
      labels: { singular: "Nav item", plural: "Nav items" },
      admin: { description: "Header links, in order." },
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "href",
          type: "text",
          admin: { description: "Legacy/fallback URL. Prefer the link field." },
        },
        linkField("link", { localized: false }),
      ],
    },
  ],
};
