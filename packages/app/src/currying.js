// Classic currying
export const multiply = (a) => (b) => a * b;
export const double = multiply(2);
export const triple = multiply(3);

// Practical: Configurable fetch
export const createApiClient = (baseUrl) => (endpoint) =>
  fetch(`${baseUrl}${endpoint}`).then((res) => res.json());
