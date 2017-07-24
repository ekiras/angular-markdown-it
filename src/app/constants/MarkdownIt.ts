export let md: any;

export let mdContainer: any;
export let hljs: any;

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
