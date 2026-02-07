// Object destructuring
export const getUserInfo = ({ name, email, profile: { age } }) => {
  return `${name} (${age}) - ${email}`;
};

// Array destructuring + rest
export const getFirstAndRest = ([first, ...rest]) => ({ first, rest });

// Spread for immutability
export const updateUser = (user, updates) => ({
  ...user,
  ...updates,
  updatedAt: new Date().toISOString(),
});
