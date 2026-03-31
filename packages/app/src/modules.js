// @ts-nocheck
import { formatDate, slugify } from "@tuomo/app/src/utils.js";

/**
 * Generates blog post object with auto-generated metadata and SEO-friendly structure
 *
 * KEY CONCEPTS DEMONSTRATED:
 * - Utility composition (delegates formatting to shared helpers)
 * - Timestamp-based unique ID generation (Date.now)
 * - Framework-agnostic data structure design
 * - Separation of concerns (content vs presentation metadata)
 *
 * @param {string} title - Post title (source for slug generation)
 * @param {string} content - Post body content
 * @returns {Object} Post object with structure:
 *   { id: number, slug: string, title: string, content: string, publishedAt: string }
 *
 * REAL-WORLD ANALOGY:
 * Like a publishing assistant who automatically:
 * 1. Assigns unique tracking number (ID = timestamp)
 * 2. Creates clean URL from title ("Hello World" → "hello-world")
 * 3. Stamps publication date in standard format
 * 4. Packages everything into manuscript-ready structure
 * – freeing authors to focus on content creation.
 */
export const createPost = (title, content) => ({
  id: Date.now(),
  slug: slugify(title),
  title,
  content,
  publishedAt: formatDate(new Date()),
});
