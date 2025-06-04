# Developer Guide

This guide provides technical information for developers who want to contribute to or understand the MD2HTML converter codebase.

## Project Structure

### Core Application (`/public/`)
- `index.html` - Main application interface
- `simple.html` - Simplified interface
- `js/app.js` - Core application logic, drag resizer, export functionality
- `js/editor.js` - CodeMirror editor integration
- `js/theme-effects.js` - Visual effects and theme management
- `css/style.css` - Main application styles
- `css/codemirror.css` - Editor styling

### Source Code (`/src/`)
- `md2html.ts` - Core Markdown to HTML conversion
- `md2html-enhanced.ts` - Enhanced conversion with additional features
- `batch-convert.ts` - Batch processing functionality
- `types.ts` - TypeScript type definitions

### Configuration (`/src/config/`)
- `theme.ts` - Theme configuration
- `theme-effects.ts` - Visual effects configuration
- `style.ts` - Style management
- `api.ts` - API configuration
- `store.ts` - State management

### Themes (`/themes/`)
- Collection of CSS theme files
- Editor themes in `/themes/editor/`

### Scripts (`/scripts/`)
- `build.sh` - Build script
- `cli.js` - Command-line interface
- `release.sh` - Release automation

## Key Features Implementation

### Drag Resizer
Implemented in `app.js` with:
- Visual drag handle between editor and preview panes
- Smooth resizing with constraints (20%-80% split)
- Responsive design support

### Middle-Button Scrolling
- Implemented for both editor and preview areas
- Smooth scrolling animation
- Auto-scroll termination on user interaction

### HTML Export
- Complete self-contained HTML generation
- Embedded CSS, JavaScript, and external dependencies
- Support for all themes and visual effects

### Visual Effects
Four built-in effects:
- Particles - Animated particle background
- Deep Space - Space-themed animations
- Mathematical - Mathematical symbols animation
- Timeline - Timeline-style progression effects

## Development Workflow

1. **Setup**: `npm install`
2. **Development**: `npm start` or `node server.js`
3. **Build**: `./scripts/build.sh`
4. **Testing**: Use examples in `/examples/` subdirectories

## Code Style

- TypeScript for type safety
- Modular architecture with clear separation of concerns
- Responsive design principles
- Performance optimization for large documents

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test with various markdown files
4. Submit a pull request with clear description

## Architecture Notes

The application uses a client-side architecture with:
- Real-time markdown preview
- Modular theme system
- Plugin-style effects system
- Export functionality with full dependency embedding
