import rehypeShiki from '@shikijs/rehype'
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'

const getFileName = (raw) => {
  if (!raw) return null;

  const items = raw.split(" ");
  for (const item of items) {
    const splitItem = item.split(".");

    if (splitItem.length === 1) continue;

    const extension = splitItem.at(-1);

    if (extension?.length === 0) continue;

    return splitItem.join(".");
  }
  return null;
};

const transformerMetadataLanguageClassName = () => {
  let language = "js";
  let fileName = null;

  return {
    preprocess(tree, fileInfo) {
      language = fileInfo.lang;
      fileName = getFileName(fileInfo.meta?.__raw);
    },
    code() {
      this.addClassToHast(this.pre, `language-${language}`);
      this.pre.properties.dataLanguage = language;

      if (fileName) {
        this.addClassToHast(this.pre, `filename-${fileName}`);
        this.pre.properties.dataFileName = fileName;
      }
    },
  };
};

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
      transformerMetadataLanguageClassName(), // get props["data-language"] and props["data-file-name"]
    ],
  },
]