# ekiras-markdown-it

## Installation

To install this library, run:

```bash
$ npm install ekiras-markdown-it --save
```

## Consuming Markdown library

You can configure the library by including the module in the main module as shown in the example below.

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
          name: 'warning'
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
  template: '<textarea cols="75" rows="15" [(ngModel)]="md" (keyup)="convertToHtml();"></textarea>'
})

export class SampleComponent implements OnInit {
  
  md: string = null;

  constructor(private markdownItService: MarkdownItService) { }

  ngOnInit() { }

  
  convertToHtml(): string {
    return this.markdownItService.render(this.md);
  }
}

```

## License

MIT © [Ekansh Rastogi](mailto:ekirastogi@gmail.com)
