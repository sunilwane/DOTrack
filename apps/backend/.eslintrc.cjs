module.exports = {
  extends: ["../../.eslintrc.cjs"],

  env: {
    node: true,
    browser: false,
  },

  rules: {
    "no-console": "off",

    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "require-await": "error",
  },
};
