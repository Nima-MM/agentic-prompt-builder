export interface PromptBlock {
  id: string;
  type: string;
  content: string;
  isActive: boolean;
  orderIndex: number;
}

export type CompileMode = 'markdown' | 'xml' | 'hybrid';

/**
 * Escapes characters for pure XML mode.
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

/**
 * Compiles a list of PromptBlocks into a single string based on the chosen mode.
 * Implements NFR-2.1 Zero-Latency pure client-side utility logic.
 */
export function compilePrompt(blocks: PromptBlock[], mode: CompileMode): string {
  // Sort and filter active blocks
  const activeBlocks = blocks
    .filter((b) => b.isActive)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  switch (mode) {
    case 'markdown':
      return activeBlocks
        .map((b) => {
          const typeUpper = b.type.toUpperCase();
          return `## ${typeUpper}\n\n${b.content}`;
        })
        .join('\n\n---\n\n');

    case 'xml':
      return activeBlocks
        .map((b) => {
          const typeLower = b.type.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
          const escapedContent = escapeXml(b.content);
          return `<${typeLower}>\n${escapedContent}\n</${typeLower}>`;
        })
        .join('\n\n');

    case 'hybrid':
      return activeBlocks
        .map((b) => {
          const typeLower = b.type.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
          // In hybrid mode, XML tags specify structure, but content remains raw (e.g. Markdown)
          return `<${typeLower}>\n${b.content}\n</${typeLower}>`;
        })
        .join('\n\n');

    default:
      return '';
  }
}
