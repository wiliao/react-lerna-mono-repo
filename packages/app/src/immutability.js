// @ts-nocheck

/**
 * ❌ ANTI-PATTERN: Impure function.
 * Mutates the input array, breaking referential integrity.
 * This can cause silent bugs in frameworks that rely on shallow equality checks (e.g., React.memo).
 */
export const addUserBad = (users, user) => {
  users.push(user);
  return users;
};

/**
 * ✅ PATTERN: Pure function with Immutability.
 * Returns a new array, ensuring 'users !== result'.
 * Uses crypto.randomUUID() for collision-resistant identifiers.
 */
export const addUser = (users, user) => [
  ...users,
  { ...user, id: crypto.randomUUID() },
];

/**
 * ✅ PATTERN: Deep Update (Nested Immutability).
 * Ensures that the 'user' and the 'user.address' references are both updated,
 * while sibling properties (like user.name or address.zip) remain preserved.
 */
export const updateUserAddress = (user, newCity) => ({
  ...user,
  address: {
    ...user.address,
    city: newCity,
  },
});
