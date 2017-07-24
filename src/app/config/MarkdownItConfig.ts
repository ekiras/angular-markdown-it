/**
 * This class will be used by the EkirasMarkdownItModule to configure the markdown.
 */
export interface MarkdownItConfig {
    /**
     * Enable HTML tags in source
     */
    html?: true;
    /**
     * Use '/' to close single tags (<br />). This is only for full CommonMark compatibility.
     */
    xhtmlOut?: false;
    /**
     * Convert '\n' in paragraphs into
     */
    breaks?: boolean;
    /**
     * Enable some language-neutral replacement + quotes beautification.
     */
    typographer?: false;
    /**
     * CSS language prefix for fenced blocks. Can be useful for external highlighters
     */
    langPrefix?: 'language-';
    /**
     * Autoconvert URL-like text to links
     */
    linkify?: false;
    /**
     * Highlighter function. Should return escaped HTML, or '' if the source string is not changed and should be escaped externaly.
     * If result starts with <pre... internal wrapper is skipped.
     */
    highlight?: MarkdownItHighlightConfig;
    /**
     * Markdown containers plugins.
     */
    containers?: MarkdownItContainerConfig[];
};

/**
 * This interface will determine how to highlight a given code.
 */
export interface MarkdownItHighlightConfig {
    /**
     * User can provide a tag that will wrap the highlihgted code inside the container provided.
     * For example if you want you code to be wrapped inside `div` then you can provide `pre` as the parameter.
     * It will result in the following output
     * <div class='hljs'>code</div>
     *
     * Default container is `pre`
     */
    container?: string;
    /**
     * If a user wants to apply a class to the container element then, he can provide the class in using this field.
     * For example if you want to apply 'custom' class to the container, then set its value as 'custom'
     * It will result in the following output
     * <pre class='hljs custom'>code</pre>
     */
    containerClass?: string;
    /**
     * User can specify if he wants to apply theh default 'hljs' class to the container or not.
     *
     * Default value is true
     */
    includeDefaultClass?: boolean;
};

/**
 * Configure a Markdown container.
 */
export interface MarkdownItContainerConfig {
    /**
     * Name of the container
     */
    name: string;
    /**
     * Class that will be applied to the markdown container
     * Default class is the name of the container
     */
    class?: string;
    /**
     * Boolean flag that determines if you want to show the heading of the container or not.
     * Default value is true
     */
    showHeading?: boolean;
    options?: MarkdownItContainerRenderConfig;
}

export interface MarkdownItContainerRenderConfig {

    /**
     * Define validation rules for using the container
     */
    validate?(params: any): string;
    /**
     * Define rules for rendering the container.
     */
    render?(tokens: any[], idx: number): string;
}
