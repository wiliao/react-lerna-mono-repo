// @ts-nocheck

/**
 * Creates a "Validated Model" using the Proxy Pattern.
 * @param {Object} target - The base data object.
 * @param {Object} schema - A mapping of keys to predicate functions.
 * @param {boolean} options.strict - If true, prevents adding keys not in schema.
 */
export const createValidator = (target, schema, { strict = false } = {}) => {
  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      // 1. Check for unknown properties in strict mode
      if (strict && !(prop in schema)) {
        throw new TypeError(`Property "${prop}" is not allowed by schema.`);
      }

      // 2. Execute validation if a rule exists for this property
      if (prop in schema) {
        const isValid = schema[prop](value);
        if (!isValid) {
          throw new Error(
            `Validation failed for "${prop}": received ${JSON.stringify(value)}`,
          );
        }
      }

      // 3. Use Reflect.set for correct 'this' binding and return value
      return Reflect.set(obj, prop, value, receiver);
    },
  });
};

/*
  INTERVIEW NOTE: 
  This is an implementation of the 'Virtual Proxy' pattern.
  - Performance: Proxies add a small overhead to every assignment.
  - DX: Great for catching state bugs early in development.
  - Alternatives: For high-performance loops, a standard Joi/Zod check before 
    assignment is usually preferred over a Proxy.
*/
