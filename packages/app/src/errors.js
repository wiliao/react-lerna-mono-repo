export class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

export const validateUser = (user) => {
  if (!user.email?.includes("@")) {
    throw new ValidationError("Invalid email", "email");
  }
  if (user.age < 18) {
    throw new ValidationError("Must be 18+", "age");
  }
  return true;
};

// Safe wrapper pattern
export const safeExecute = async (fn, defaultValue = null) => {
  try {
    return await fn();
  } catch (err) {
    console.error('Operation failed:', err.message);
    return defaultValue;
  }
};