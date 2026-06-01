/** Запрет глобального стора и сети в презентационных (Atoms/Molecules) компонентах. */
const presentationLayerRestrictedImports = {
  paths: [
    {
      name: 'axios',
      message:
        'Вынесите сетевую логику в @services или кастомные хуки экранов/организмов.',
    },
    {
      name: 'react-redux',
      message:
        'UI-компоненты должны быть чистыми и получать данные только через props.',
    },
    {
      name: '@reduxjs/toolkit',
      message:
        'UI-компоненты должны быть чистыми и получать данные только через props.',
    },
    {
      name: 'zustand',
      message:
        'UI-компоненты должны быть чистыми и получать данные только через props.',
    },
  ],
  patterns: [
    {
      group: ['@services', '@services/*'],
      message:
        'Сервисный слой недоступен в Atoms/Molecules — только props с данными сверху.',
    },
    {
      group: ['@fsm', '@fsm/*'],
      message:
        'Стейт-машины и глобальный стейт — только в контейнерах (Organisms/Screens).',
    },
  ],
};

module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react-native', 'react', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],

    /* --- Atomic Design: контроль слоёв импорта --- */
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/components/atoms',
            from: './src/components/molecules',
            message:
              'Архитектурная ошибка: атомы не могут зависеть от молекул.',
          },
          {
            target: './src/components/atoms',
            from: './src/components/organism',
            message:
              'Архитектурная ошибка: атомы не могут зависеть от организмов.',
          },
          {
            target: './src/components/atoms',
            from: './src/screens',
            message:
              'Архитектурная ошибка: атомы не могут зависеть от экранов.',
          },
          {
            target: './src/components/atoms',
            from: './src/components',
            except: ['./src/components/atoms'],
            message:
              'Архитектурная ошибка: атомы не могут импортировать из общего @components (только локальные модули слоя).',
          },
          {
            target: './src/components/molecules',
            from: './src/components/organism',
            message:
              'Архитектурная ошибка: молекулы не могут зависеть от организмов.',
          },
          {
            target: './src/components/molecules',
            from: './src/screens',
            message:
              'Архитектурная ошибка: молекулы не могут зависеть от экранов.',
          },
          {
            target: './src/components/organism',
            from: './src/screens',
            message:
              'Архитектурная ошибка: организмы не могут зависеть от экранов.',
          },
          {
            target: './src',
            from: './ios',
            message:
              'Не импортируйте нативный iOS-код в TypeScript-слой — используйте Turbo Modules / Native Modules.',
          },
          {
            target: './src',
            from: './android',
            message:
              'Не импортируйте нативный Android-код в TypeScript-слой — используйте Turbo Modules / Native Modules.',
          },
        ],
      },
    ],

    /* --- Complexity control (Clean Code / SOLID) --- */
    complexity: ['error', 10],
    'max-params': ['error', 3],
    'no-nested-ternary': 'error',

    /* --- Import hygiene --- */
    'import/no-cycle': [
      'error',
      { maxDepth: Infinity, ignoreExternal: true },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.{test,spec}.{js,jsx,ts,tsx}',
          '**/__tests__/**',
          '**/*.{config,conf}.{js,ts}',
          'scripts/**',
          'ReactotronConfig.ts',
          '.eslintrc.js',
          'aliases.js',
        ],
        packageDir: ['.'],
      },
    ],
    'import/no-absolute-path': 'error',

    /* --- React: side effects и стабильность дерева --- */
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/no-unstable-nested-components': [
      'error',
      { allowAsProps: false },
    ],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
      },
    ],

    /* --- React: иммутабельность и reconciliation --- */
    'react/no-direct-mutation-state': 'error',
    'react/no-array-index-key': 'error',
    'react/require-default-props': [
      'error',
      {
        forbidDefaultForRequired: true,
        functions: 'defaultArguments',
      },
    ],

    /* --- React Native: качество и производительность стилей --- */
    'react-native/no-inline-styles': 'error',
    'react-native/no-unused-styles': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'react-native/sort-styles': [
      'error',
      'asc',
      {
        ignoreClassNames: false,
        ignoreStyleProperties: false,
      },
    ],

    /* --- i18n: запрет сырого текста в JSX --- */
    'react-native/no-raw-text': [
      'error',
      { skip: ['StatusBar'] },
    ],
    'react/jsx-no-literals': [
      'error',
      {
        noStrings: true,
        allowedStrings: [],
        ignoreProps: false,
        elementOverrides: {
          View: { ignoreProps: true },
          StatusBar: {
            ignoreProps: true,
            allowElement: true,
          },
          NewAppScreen: {
            ignoreProps: true,
            allowElement: true,
          },
          SafeAreaProvider: { ignoreProps: true },
          Image: { ignoreProps: true },
        },
      },
    ],
  },
  overrides: [
    {
      // react/jsx-no-literals падает на .ts без JSX (баг eslint-plugin-react)
      files: ['**/*.ts'],
      rules: {
        'react/jsx-no-literals': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'simple-import-sort',
      ],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        /* --- Строгая типобезопасность (без автофикса) --- */
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-module-boundary-types':
          'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-member-access':
          'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-floating-promises': [
          'error',
          { ignoreVoid: false },
        ],
        '@typescript-eslint/require-await': 'error',
        'no-async-promise-executor': 'error',
        '@typescript-eslint/strict-boolean-expressions':
          'error',

        /* --- Null-safety (autofix через lint:fix) --- */
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          { ignoreConditionalTests: true },
        ],

        /* --- Автофикс: типы и импорты --- */
        '@typescript-eslint/no-restricted-types': [
          'error',
          {
            types: {
              String: {
                message: 'Use string instead',
                fixWith: 'string',
              },
              Number: {
                message: 'Use number instead',
                fixWith: 'number',
              },
              Boolean: {
                message: 'Use boolean instead',
                fixWith: 'boolean',
              },
              Symbol: {
                message: 'Use symbol instead',
                fixWith: 'symbol',
              },
              Object: {
                message: 'Use object instead',
                fixWith: 'object',
              },
            },
          },
        ],
        '@typescript-eslint/no-empty-object-type': 'error',
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'never',
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'separate-type-imports',
          },
        ],
        '@typescript-eslint/no-extra-non-null-assertion':
          'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/max-params': [
          'error',
          { max: 3 },
        ],

        /* --- Автофикс: мёртвый код --- */
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],

        /* --- Автофикс: порядок импортов (Atomic Design сверху вниз) --- */
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react$', '^react-native$'],
              [
                '^@react-native',
                '^@react-native-community',
              ],
              [
                '^@atoms',
                '^@molecules',
                '^@organism',
                '^@components',
              ],
              [
                '^@screens',
                '^@customhooks',
                '^@services',
                '^@utils',
                '^@constants',
                '^@fsm',
              ],
              ['^@'],
              ['^\\.'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',

        /* --- StyleSheet: архитектура и дизайн-система --- */
        'no-magic-numbers': [
          'error',
          {
            ignore: [0, 1],
            ignoreArrayIndexes: true,
            detectObjects: true,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
        ],

        /* --- i18n: запрет магических строк в логике --- */
        'no-restricted-syntax': [
          'error',
          {
            selector:
              "BinaryExpression[operator='==='][right.type='Literal'][right.value=/^[a-zA-Z][\\w-]*$/]",
            message:
              'Не хардкодьте системные строки. Используйте enum, as const объект или ключ i18n.',
          },
          {
            selector:
              "BinaryExpression[operator='==='][left.type='Literal'][left.value=/^[a-zA-Z][\\w-]*$/]",
            message:
              'Не хардкодьте системные строки. Используйте enum, as const объект или ключ i18n.',
          },
        ],

        /* --- JSX --- */
        'react/jsx-max-props-per-line': [
          'error',
          { maximum: 1, when: 'multiline' },
        ],
        'react/jsx-first-prop-new-line': [
          'error',
          'multiline',
        ],
        'react/jsx-closing-bracket-location': [
          'error',
          'tag-aligned',
        ],
      },
    },
    {
      /* --- Clean Code: UI-компоненты --- */
      files: ['**/*.{tsx,jsx}', 'App.tsx'],
      excludedFiles: [
        '**/*.{test,spec}.{tsx,jsx}',
        '**/__tests__/**',
      ],
      rules: {
        'max-lines': [
          'error',
          {
            max: 200,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'max-lines-per-function': [
          'error',
          {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
          },
        ],
        'max-depth': ['error', 3],
        'react/jsx-no-bind': [
          'error',
          {
            ignoreRefs: true,
            allowArrowFunctions: false,
            allowFunctions: false,
            allowBind: false,
          },
        ],
        'react/jsx-no-constructed-context-values': 'error',
      },
    },
    {
      files: ['src/components/atoms/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            ...presentationLayerRestrictedImports,
            patterns: [
              ...presentationLayerRestrictedImports.patterns,
              {
                group: ['@molecules', '@molecules/*'],
                message:
                  'Архитектурная ошибка: атомы не могут зависеть от молекул.',
              },
              {
                group: ['@organism', '@organism/*'],
                message:
                  'Архитектурная ошибка: атомы не могут зависеть от организмов.',
              },
              {
                group: ['@screens', '@screens/*'],
                message:
                  'Архитектурная ошибка: атомы не могут зависеть от экранов.',
              },
              {
                group: ['@components', '@components/*'],
                message:
                  'Архитектурная ошибка: атомы не могут импортировать из @components.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['src/screens/**/*.{ts,tsx}'],
      excludedFiles: [
        'src/screens/**/* copy/**/*',
        'src/screens/createProfilw/**/*',
      ],
      rules: {
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'no-magic-numbers': 'off',
        'no-restricted-syntax': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-no-literals': 'off',
        'react-native/no-inline-styles': 'off',
        'react-native/no-raw-text': 'off',
        'react-native/no-unused-styles': 'off',
        'react/no-array-index-key': 'off',
      },
    },
    {
      files: ['src/components/molecules/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            ...presentationLayerRestrictedImports,
            patterns: [
              ...presentationLayerRestrictedImports.patterns,
              {
                group: ['@organism', '@organism/*'],
                message:
                  'Архитектурная ошибка: молекулы не могут зависеть от организмов.',
              },
              {
                group: ['@screens', '@screens/*'],
                message:
                  'Архитектурная ошибка: молекулы не могут зависеть от экранов.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['src/components/organism/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@screens', '@screens/*'],
                message:
                  'Архитектурная ошибка: организмы не могут зависеть от экранов.',
              },
            ],
          },
        ],
      },
    },
    {
      files: [
        'config/**/*.ts',
        'ReactotronConfig.ts',
        '**/*.config.ts',
      ],
      rules: {
        'no-magic-numbers': 'off',
        'no-restricted-syntax': 'off',
        'react/jsx-no-literals': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        complexity: 'off',
        'max-params': 'off',
        '@typescript-eslint/max-params': 'off',
      },
    },
    {
      files: [
        '**/__tests__/**/*',
        '**/*.{test,spec}.{ts,tsx}',
      ],
      rules: {
        'react/jsx-no-literals': 'off',
        'react-native/no-raw-text': 'off',
        'no-restricted-syntax': 'off',
        'import/no-restricted-paths': 'off',
        'no-restricted-imports': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-depth': 'off',
        'react/jsx-no-bind': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/prefer-nullish-coalescing':
          'off',
        complexity: 'off',
        'max-params': 'off',
        '@typescript-eslint/max-params': 'off',
        'import/no-cycle': 'off',
      },
    },
    {
      files: ['src/utils/logger/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
    {
      files: ['src/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types':
          'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/strict-boolean-expressions':
          'off',
        '@typescript-eslint/prefer-nullish-coalescing':
          'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        complexity: 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-restricted-paths': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'no-magic-numbers': 'off',
        'no-restricted-imports': 'off',
        'no-restricted-syntax': 'off',
        'no-unused-vars': 'off',
        'no-void': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-no-literals': 'off',
        'react/no-array-index-key': 'off',
        'react/require-default-props': 'off',
        'react-native/no-inline-styles': 'off',
        'react-native/no-raw-text': 'off',
        'react-native/no-unused-styles': 'off',
        'react-native/sort-styles': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
  ],
};
