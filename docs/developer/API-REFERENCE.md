# API Reference

## Core Functions

### Markdown Conversion

#### `convertMarkdown(text: string, options?: ConversionOptions): string`
Converts Markdown text to HTML with enhanced features.

**Parameters:**
- `text` - Markdown source text
- `options` - Optional conversion settings

**Returns:** HTML string

#### `generateCompleteHTML(markdown: string, theme: string, effect: string): string`
Generates complete, self-contained HTML file with all dependencies.

**Parameters:**
- `markdown` - Source Markdown content
- `theme` - Theme name ('github-light', 'minimal-dark', etc.)
- `effect` - Effect name ('particles', 'deep-space', 'mathematical', 'timeline', 'none')

**Returns:** Complete HTML string with embedded CSS/JS

### Theme Management

#### `applyTheme(themeName: string): void`
Applies a theme to the current document.

#### `getAvailableThemes(): string[]`
Returns list of available theme names.

### Effect System

#### `applyEffect(effectName: string): void`
Applies a visual effect to the preview area.

#### `generateCompleteEffectCSS(effectName: string): string`
Generates complete CSS for the specified effect including animations.

### UI Controls

#### `initializeDragResizer(): void`
Initializes the drag resizer between editor and preview panes.

#### `enableMiddleButtonScroll(element: HTMLElement): void`
Enables middle-button drag scrolling on the specified element.

## Configuration Objects

### ConversionOptions
```typescript
interface ConversionOptions {
  breaks?: boolean;
  typographer?: boolean;
  linkify?: boolean;
  highlight?: boolean;
  math?: boolean;
  mermaid?: boolean;
}
```

### ThemeConfig
```typescript
interface ThemeConfig {
  name: string;
  cssFile: string;
  description: string;
  preview?: string;
}
```

### EffectConfig
```typescript
interface EffectConfig {
  name: string;
  displayName: string;
  description: string;
  cssClass: string;
  animation: boolean;
}
```

## Events

### Custom Events

#### `themeChanged`
Fired when theme is changed.
```javascript
document.addEventListener('themeChanged', (event) => {
  console.log('New theme:', event.detail.theme);
});
```

#### `effectChanged`
Fired when visual effect is changed.
```javascript
document.addEventListener('effectChanged', (event) => {
  console.log('New effect:', event.detail.effect);
});
```

#### `contentChanged`
Fired when editor content changes.
```javascript
document.addEventListener('contentChanged', (event) => {
  console.log('New content length:', event.detail.content.length);
});
```

## Utility Functions

#### `debounce(func: Function, wait: number): Function`
Creates a debounced version of the provided function.

#### `throttle(func: Function, limit: number): Function`
Creates a throttled version of the provided function.

#### `sanitizeHTML(html: string): string`
Sanitizes HTML content for safe display.

## Extension Points

The converter supports plugins through:
- Custom themes (CSS files in `/themes/`)
- Custom effects (CSS animations with JavaScript)
- Markdown-it plugins for syntax extensions

## Error Handling

All functions throw typed errors:
- `ConversionError` - Markdown conversion issues
- `ThemeError` - Theme loading/application issues
- `ExportError` - HTML export problems
