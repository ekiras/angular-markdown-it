export { EkirasMarkdownItModule } from './EkirasMarkdownItModule';
export { MarkdownItComponent } from 'components/MarkdownItComponent';
export { MarkdownItConfig } from './config/MarkdownItConfig';
export { MarkdownItService } from './services/MarkDownItService';

import * as md from 'markdown-it';
import * as mdContainer from 'markdown-it-container';
import * as hljs from 'markdown-it-highlightjs';
import * as mdBlockImage from 'markdown-it-block-image';
import * as mdBlockEmbed from 'markdown-it-block-embed';

export { md as markdown };
export { mdContainer as markdownContainer };
export { hljs as languageHighlighter };
export { mdBlockImage as markdownBlockImage };
export { mdBlockEmbed as markdownBlockEmbed };

