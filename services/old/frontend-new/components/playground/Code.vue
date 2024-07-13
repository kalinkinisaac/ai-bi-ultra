<script>
// `shiki/core` entry does not include any themes or languages or the wasm binary.
// import { getHighlighterCore } from 'shiki/core'

// // `shiki/wasm` contains the wasm binary inlined as base64 string.
// import getWasm from 'shiki/wasm'

// // directly import the theme and language modules, only the ones you imported will be bundled.
// import nord from 'shiki/themes/nord.mjs'

// const highlighter = await getHighlighterCore({
//   themes: [
//     // instead of strings, you need to pass the imported module
//     nord,
//     // or a dynamic import if you want to do chunk splitting
//     import('shiki/themes/material-theme-ocean.mjs')
//   ],
//   langs: [
//     import('shiki/langs/javascript.mjs'),
//     // shiki will try to interop the module with the default export
//     () => import('shiki/langs/css.mjs'),
//     // or a getter that returns custom grammar
//     async () => JSON.parse(await fs.readFile('my-grammar.json', 'utf-8'))
//   ],
//   loadWasm: getWasm
// })
// import {
//   codeToHtml,
//   getHighlighter
// } from 'shiki/bundle/web'

// const highlighter = await getHighlighter({
//   langs: ['sql'],
//   themes: ['github-dark', 'github-light'],
// })

// // optionally, load themes and languages after creation
// // await highlighter.loadTheme(import('shiki/themes/vitesse-light.mjs'))

// const code = await highlighter.codeToHtml('const a = 1', {
//   lang: 'sql',
//   theme: 'github-dark'
// })
</script>
<template>
  <div>
    <div>
      test playground code
    </div>
    {{ code }}
    <pre>code</pre>
    <div class="p-2 border border-opacity-30 rounded-md">
      <Shiki lang="sql" code="SELECT COUNT(id) AS total_warehouses -- Counts the total number of unique warehouse IDs\nFROM warehouse_dict;" />
    </div>
  </div>
</template>
