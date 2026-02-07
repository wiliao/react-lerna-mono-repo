export const fetchUser = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay

  if (id < 1) throw new Error("Invalid ID");

  return { id, name: `User ${id}` };
};

export const fetchWithRetry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, 100 * (i + 1)));
    }
  }
};
