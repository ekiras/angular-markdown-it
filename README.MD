# ekiras-markdown-it

## Installation

To install this library, configure and  run:

1. Install Plugin
```bash
$ npm install @ekiras/markdown-it --save
```
2. Install Dependencies
Install Dependencies for this dependency
```bash
npm install highlightjs markdown-it markdown-it-block-embed markdown-it-block-image markdown-it-container markdown-it-highlightjs --save
```
3. Configure scripts and css
Open `.angular-cli.json` and add the following 

In `scripts : []` add the following 
```
        "../node_modules/highlightjs/highlight.pack.js",
        "assets/js/markdown-bundle.js",
        "assets/js/markdownit.js"
```
In `styles: []` add the following 
```
        "./assets/css/highlighter.css",
        "./assets/css/markdown.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
```

## Consuming Markdown library

You can configure the library by including the module in the main module as shown in the example below.

```ts
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
      linkify: true,
      breaks: true,
      typographer: true,
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
    }),    
    // Import Markdown Module with default configurations
    EkirasMarkdownItModule.forRoot({})

  ],
  providers: [],
  bootstrap: []
});
export class AppModule { }
```

 Adding Custom Containers
    [Markdown Containers](https://github.com/markdown-it/markdown-it-container)
    You can add any number of markdown containers as you want by just adding them to the 
    containers array[]
    
    
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
