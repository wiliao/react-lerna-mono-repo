// @ts-nocheck
// TEMP: Disabled during migration; replace with proper TS types in production

/**
 * Converts a Date object to standardized YYYY-MM-DD string format
 *
 * KEY CONCEPTS DEMONSTRATED:
 * - Date API usage (toISOString)
 * - String manipulation (split on "T")
 * - ISO 8601 compliance for consistent date representation
 *
 * @param {Date} date - Date object to format
 * @returns {string} Date string in YYYY-MM-DD format (e.g., "2024-01-15")
 *
 * REAL-WORLD ANALOGY:
 * Like writing a date on an official form in standardized format (YYYY-MM-DD)
 * that ensures consistent interpretation across regions and systems –
 * no ambiguity between "01/02/2024" (Jan 2 vs Feb 1).
 */
export const formatDate = (date) => date.toISOString().split("T")[0];

/**
 * Transforms text into URL-friendly slug using lowercase and hyphens
 *
 * KEY CONCEPTS DEMONSTRATED:
 * - String normalization (toLowerCase)
 * - Regular expression pattern matching (replace whitespace)
 * - SEO best practices (hyphens over underscores for word separation)
 *
 * @param {string} text - Source text to convert (e.g., "My Awesome Post!")
 * @returns {string} Clean URL slug (e.g., "my-awesome-post!")
 *
 * REAL-WORLD ANALOGY:
 * Like a librarian creating a consistent catalog ID from a book title:
 * "The Great Gatsby" → "the-great-gatsby" –
 * removing capitals, replacing spaces, preserving readability for humans and systems.
 */
export const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");
