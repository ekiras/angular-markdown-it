import {Injectable} from '@angular/core';
import {MarkdownItConfig} from '../config/MarkdownItConfig';


import md from 'markdown-it';
import mdContainer from 'markdown-it-container';
import highlightjs from 'markdown-it-highlightjs';
import hljs from 'highlight.js';

/**
 * This is the default function for highlighting the markdown
 * @param {string} str
 * @param {string} lang
 * @returns {string}
 * @constructor
 */
export const DEFAULT_HIGHLIGHT_FUNCTION = function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
        } catch (__) {
        }
    }
    return '<pre class="hljs"><code>' + str + '</code></pre>';
};

/**
 * This is the default function for rendering the markdown container.
 * @param {string} name
 * @param {string} cssClass
 * @param {boolean} showHeading
 * @returns {{validate: ((params) => any); render: ((tokens, idx) => string)}}
 * @constructor
 */
export const DEFAULT_CONTAINER_FUNCTION = function (name: string, cssClass: string, showHeading: boolean) {

    const regex = new RegExp(`^${name}`);
    return {
        validate: function (params) {
            return params.trim().match(regex);
        },

        render: function (tokens, idx) {
            if (tokens[idx].nesting === 1) {
                return `<div class="${cssClass ? cssClass : name}"> ${showHeading ? '<b>' + name + '</b>' : ''}`;
            } else {
                return '</div>';
            }
        }
    };
}

@Injectable()
/**
 * Markdown service to configure markdown-it library and convert the raw markdown to html.
 */
export class MarkdownItService {

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
                        mdContainer,
                        container.name,
                        this.setProperty(container.options, DEFAULT_CONTAINER_FUNCTION(
                            container.name,
                            container.class,
                            this.setProperty(container.showHeading, true)
                        ))
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


    /**
     * Takes a string as an input and convert it to markdown.
     * @param {string} raw Markdown string that you want to render to html.
     * @returns {string}
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
