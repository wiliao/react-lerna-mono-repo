// ❌ Mutable (BAD)
export const addUserBad = (users, user) => {
  users.push(user); // Mutates original array!
  return users;
};

// ✅ Immutable (GOOD)
export const addUser = (users, user) => [...users, { ...user, id: Date.now() }];

// Nested immutability with spread
export const updateUserAddress = (user, newCity) => ({
  ...user,
  address: {
    ...user.address,
    city: newCity,
  },
});
