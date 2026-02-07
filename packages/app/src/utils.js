export const formatDate = (date) => date.toISOString().split("T")[0];
export const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

// packages/app/src/modules.js
import { formatDate, slugify } from "@tuomo/common/src/utils.js";

export const createPost = (title, content) => ({
  id: Date.now(),
  slug: slugify(title),
  title,
  content,
  publishedAt: formatDate(new Date()),
});
