import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownItConfig } from './config/MarkdownItConfig';
import { MarkdownItComponent } from './components/MarkdownItComponent';

import { MarkdownItService } from './services/MarkDownItService';


export function configureMarkdownService(config: MarkdownItConfig) {
  const service = new MarkdownItService(config);
  return service;
}


@NgModule({
  imports: [BrowserModule],
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
