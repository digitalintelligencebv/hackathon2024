import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import typescriptEslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  eslint.configs.recommended,
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // Required for Vue.
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },

  ...typescriptEslint.configs.strict,
  {
    rules: {
      // todo: select custom rules.
    },
  },

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false,
  }),
  {
    rules: {
      '@stylistic/arrow-parens': ['warn', 'as-needed'],
      '@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
      '@stylistic/member-delimiter-style': ['warn', { multiline: { delimiter: 'semi', requireLast: true } }],
      '@stylistic/padded-blocks': 'off', // Currently no good configuration is possible.
    },
  },

  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser,
        projectService: true,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: true,
        ignores: [],
      }],
      'vue/define-emits-declaration': 'error',
      'vue/define-macros-order': 'warn',
      'vue/define-props-declaration': 'error',
      'vue/html-button-has-type': 'error',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
            normal: 'any',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/no-boolean-default': 'error',
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/no-required-prop-with-default': 'error',
      'vue/prefer-import-from-vue': 'error',
      'vue/prefer-true-attribute-shorthand': 'warn',
    },
  },

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'],
        },
      },
    },
  },

  {
    ignores: [
      '*.json',
      'node_modules/*',
      '.DS_Store',
      'dist/*',
      'dist-ssr/*',
      '*.local',
      'junit.xml',
    ],
  },
];
