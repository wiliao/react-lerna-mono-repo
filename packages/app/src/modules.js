import { formatDate, slugify } from "@tuomo/common/src/utils.js";

export const createPost = (title, content) => ({
  id: Date.now(),
  slug: slugify(title),
  title,
  content,
  publishedAt: formatDate(new Date()),
});
