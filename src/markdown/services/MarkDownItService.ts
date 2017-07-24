import { Injectable, OnInit } from '@angular/core';
import { MarkdownItConfig } from '../config/MarkdownItConfig';
// import { markdown, markdownContainer } from '../EkirasMarkdownItModule';
// declare const require;
// let md = require('markdown-it')();
import md from 'markdown-it';
declare const mdContainer;
let hljs;

// import {
//   DEFAULT_HIGHLIGHT_FUNCTION,
//   DEFAULT_CONTAINER_FUNCTION
// } from '../constants/MarkdownIt';

/**
 * This is the defaulr function for highlighting the markdown
 * @param str
 * @param lang
 */
export const DEFAULT_HIGHLIGHT_FUNCTION = function (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
    } catch (__) { }
  }
  return '<pre class="hljs"><code>' + str + '</code></pre>';
};

/**
 * This is the default function for rendering the markdown container.
 * @param name
 * @param cssClass
 * @param showHeading
 */
export const DEFAULT_CONTAINER_FUNCTION = function (name: string, cssClass: string, showHeading: boolean) {

  const regex = new RegExp(`^${name}`);
  return {
    validate: function (params) {
      return params.trim().match(regex);
    },

    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="${cssClass ? cssClass : name}"> ${showHeading ? '<b>' + name + '</b>' : ''}`;
      } else {
        // closing tag
        return '</div>';
      }
    }
  }
}


@Injectable()
export class MarkdownItService implements OnInit {

  private markdown;

  constructor(private config: MarkdownItConfig) {
    if (config) {
      this.markdown = md({
        html: this.setProperty(this.config.html, false),
        xhtmlOut: this.setProperty(this.config.xhtmlOut, false),
        breaks: this.setProperty(this.config.breaks, false),
        langPrefix: this.setProperty(this.config.langPrefix, 'langPrefix-'),
        linkify: this.setProperty(this.config.linkify, false),
        typographer: this.setProperty(this.config.typographer, false),
        highlight: this.setProperty(this.config.highlight, DEFAULT_HIGHLIGHT_FUNCTION),
      });
      if (this.config.containers) {
        this.config.containers.forEach(container => {
          this.markdown.use(
            md,
            container.name,
            this.setProperty(container.options, DEFAULT_CONTAINER_FUNCTION(container.name, container.class, container.showHeading))
          );
        });
      }
    } else {
      this.markdown = md({
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: 'language-',
        linkify: false,
        typographer: false,
        highlight: DEFAULT_HIGHLIGHT_FUNCTION
      });
    }
  }

  ngOnInit(): void {

  }

  /**
   * The method will take a string as an input and convert it to markdown.
   * @param raw String that you want to render using markdown
   */
  public render(raw: string): string {
    return `${this.markdown.render(raw)}`;
  }

  private setProperty(value: any, defaultValue: any): any {
    if (value) {
      return value;
    } else {
      return defaultValue;
    }

  }
}
