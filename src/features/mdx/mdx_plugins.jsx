import rehypeShiki from '@shikijs/rehype'
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'

// plugin used to highlight code blocks in MDX files using Shiki
export const ShikiPlugin = [
  rehypeShiki,
  {
    themes: {
      dark: "slack-dark",
      light: "light-plus",
    },
    transformers: [
      transformerNotationDiff(), // e.g. "// [!code --]" or "// [!code ++]" in MDX code block
      transformerNotationHighlight({
        matchAlgorithm: "v3",
      }), // e.g. "// [!code highlight:2]"
    ],
  },
]