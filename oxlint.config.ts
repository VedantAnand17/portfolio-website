import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react, next],
  ignorePatterns: core.ignorePatterns,
  rules: {
    "array-callback-return": "off",
    "class-methods-use-this": "off",
    "default-case": "off",
    "func-style": "off",
    "import/no-named-as-default": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/heading-has-content": "off",
    "jsx-a11y/prefer-tag-over-role": "off",
    "no-inline-comments": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",
    "promise/prefer-await-to-then": "off",
    "react/function-component-definition": "off",
    "react/jsx-pascal-case": "off",
    "react/no-clone-element": "off",
    "react/no-danger": "off",
    "react/no-object-type-as-default-prop": "off",
    "react/no-react-children": "off",
    "react/no-set-state": "off",
    "react/purity": "off",
    "react/set-state-in-effect": "off",
    "react/todo": "off",
    "require-await": "off",
    "require-unicode-regexp": "off",
    "sort-keys": "off",
    "typescript/no-explicit-any": "off",
    "unicorn/no-array-sort": "off",
    "unicorn/no-instanceof-builtins": "off",
    "unicorn/no-lonely-if": "off",
    "unicorn/prefer-dom-node-remove": "off",
  },
});
