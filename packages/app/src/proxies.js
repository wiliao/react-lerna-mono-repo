export const createValidator = (target, schema) =>
  new Proxy(target, {
    set(obj, prop, value) {
      if (prop in schema && !schema[prop](value)) {
        throw new Error(`Invalid value for ${prop}`);
      }
      obj[prop] = value;
      return true;
    },
  });

// Usage:
// const user = createValidator({}, {
//   age: v => typeof v === 'number' && v > 0
// });
// user.age = -5; // Throws error
