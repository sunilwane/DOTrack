module.exports = {
  extends: [
    "../../.eslintrc.cjs",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],

  env: {
    browser: true,
  },

  rules: {
    // treat console as ERROR
    "no-console": "error",

    // unused variables as ERROR
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_" },
    ],

    // React specific
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
