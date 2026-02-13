module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  env: {
    es2022: true,
  },

  rules: {
    "eqeqeq": "error",
    "curly": "error",
    "no-console": "warn",

    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_" },
    ],
  },
};
