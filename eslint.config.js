// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = defineConfig([
  {
    ignores: ['dist/**', 'coverage/**', '.angular/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintConfigPrettier,
    ],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    processor: angular.processInlineTemplates,
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      // Eager se aplicó vía el codemod oficial de Angular v22 para preservar el comportamiento
      // previo a la migración; no se fuerza OnPush para no introducir cambios de comportamiento.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: { constructors: 'no-public' },
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
