module.exports = {
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module'
    },
    env: {
      es6: true,
      browser: true
    },
    plugins: [
      'svelte3',
      'sonarjs'
    ],
    overrides: [
      {
        files: ['*.svelte'],
        processor: 'svelte3/svelte3'
      }
    ],
    rules: {
        "sonarjs/elseif-without-else": 1
    },
    settings: {
      // ...
    },
    extends :["plugin:sonarjs/recommended"]
  
    }

  