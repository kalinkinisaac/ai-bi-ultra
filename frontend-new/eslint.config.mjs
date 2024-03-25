import withNuxt from './.nuxt/eslint.config.mjs'
import perfectionist from 'eslint-plugin-perfectionist'

export default withNuxt(
  {
    plugins: {
      perfectionist,
    },
    rules: {
      // Default
      // ...
    },
  })
