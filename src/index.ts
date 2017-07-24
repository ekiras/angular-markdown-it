export { EkirasMarkdownItModule } from './EkirasMarkdownItModule';
export { MarkdownItComponent } from 'components/MarkdownItComponent';
export { MarkdownItConfig } from './config/MarkdownItConfig';
export { MarkdownItService } from './services/MarkDownItService';

import md from 'markdown-it';
import mdContainer from 'markdown-it-container';
import hljs from 'markdown-it-highlightjs';
import mdBlockImage from 'markdown-it-block-image';
import mdBlockEmbed from 'markdown-it-block-embed';

export const markdown = new md();
export const markdownContainer = new mdContainer();
export const languageHighlighter = new hljs();
export const markdownBlockImage = new mdBlockImage();
export const markdownBlockEmbed = new mdBlockEmbed();
