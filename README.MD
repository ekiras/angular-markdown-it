# ekiras-markdown-it

## Installation

To install this library, run:

```bash
$ npm install ekiras-markdown-it --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ekiras-markdown-it
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import Ekiras Markdown Module
import { EkirasMarkdownItModule } from 'ekiras-markdown-it';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Import Markdown Module and enable everything
    EkirasMarkdownItModule.forRoot({
      html: true,
      linkify: true,,
      breaks: true,
      typographer: true
      containers: [
        // define your containers here.
        {
          name: 'note',
          showHeading: true,
          class: 'note'
        },
        {
          name: 'warning',
        }
      ]
    });
    
    // Import Markdown Module with default configurations
    EkirasMarkdownItModule.forRoot({})

  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```

Once the Module is imported, you can use the **MarkdownItService** to convert the markdown to html.

```ts
import { Component, OnInit } from '@angular/core';

import { MarkdownItService } from 'ekiras-markdown-it';

@Component({
  selector: 'app-sample-selector',
  templateUrl: 'sample.component.html'
})

export class SampleComponent implements OnInit {
  
  constructor(private markdownItService: MarkdownItService) { }

  ngOnInit() { }

  
  convertToHtml(markdown: string): string {
    return this.markdownItService.render(markdown);
  }
}

```

## License

MIT © [Ekansh Rastogi](mailto:ekirastogi@gmail.com)
