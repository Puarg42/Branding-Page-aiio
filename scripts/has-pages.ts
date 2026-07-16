import { getPayload } from "payload";
import config from "../payload.config";

const payload = await getPayload({ config });
const result = await payload.count({ collection: "pages" });
process.exit(result.totalDocs > 0 ? 0 : 1);
