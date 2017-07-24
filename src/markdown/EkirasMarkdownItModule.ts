import { ModuleWithProviders, NgModule } from '@angular/core';
import { MarkdownItConfig } from './config/MarkdownItConfig';
import { MarkdownItComponent } from './components/MarkdownItComponent';
import { MarkdownItService } from './services/MarkDownItService';
// import md from 'markdown-it';
// import mdContainer from 'markdown-it-container';
// import hljs from 'markdown-it-highlightjs';
// import mdBlockImage from 'markdown-it-block-image';
// import mdBlockEmbed from 'markdown-it-block-embed';

// export const markdown = new md();
// export const markdownContainer = new mdContainer();
// export const languageHighlighter = new hljs();
// export const markdownBlockImage = new mdBlockImage();
// export const markdownBlockEmbed = new mdBlockEmbed();

export function configureMarkdownService(config: MarkdownItConfig) {
  const service = new MarkdownItService(config);
  return service;
}


@NgModule({
  imports: [],
  exports: [],
  declarations: [MarkdownItComponent],
  providers: []
})
export class EkirasMarkdownItModule {
  static forRoot(config?: MarkdownItConfig): ModuleWithProviders {
    return {
      ngModule: EkirasMarkdownItModule,
      providers: [
        {
          provide: 'MarkdownItConfig',
          useValue: config,
        },
        {
          provide: MarkdownItService,
          useFactory: configureMarkdownService,
          deps: ['MarkdownItConfig']
        }
      ]
    };
  }
}
