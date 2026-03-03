# DA1NI5 Michel Duck and Show Chevron

A pure CSS + vanilla JavaScript panel toggle component.  
Click the **3-line beveled chevron** to **duck** (collapse) or **show** (expand) any panel content.

**Zero dependencies. ~2 KB total (unminified).**

Created 2026-03m-03d by [Dainis W. Michel](https://dainis.net).

---

## What It Does

| State    | Chevron   | Content |
|----------|-----------|---------|
| **Shown**  | ∨ points down | Visible |
| **Ducked** | ∧ points up   | Hidden  |
| **Closed** | — (hidden)    | Hidden  |

The chevron is a pure CSS shape — no images, no icon fonts, no SVGs.  
Three colored lines (white → light grey → dark grey) create a beveled / 3D effect using `clip-path: polygon()` and `linear-gradient`.

Content collapses with a smooth CSS `grid-template-rows` animation (pixel-perfect timing, no max-height hacks).

---

## Quick Start

```html
<link rel="stylesheet" href="duck-and-show.css">

<div class="da1-panel" data-da1-panel data-da1-state="shown">
    <button class="da1-close" aria-label="Close panel">&times;</button>
    <button class="da1-chevron" aria-expanded="true" aria-label="Hide panel"></button>
    <div class="da1-content">
        <div class="da1-content-inner">
            <!-- Your content here -->
        </div>
    </div>
</div>

<script src="duck-and-show.js"></script>
```

All `[data-da1-panel]` elements auto-initialize on `DOMContentLoaded`.

---

## Manual Initialization

For dynamically created panels:

```js
const panel = document.querySelector('#my-panel');
const das = new DuckAndShow(panel, {
    onDuck: (instance) => console.log('Panel ducked'),
    onShow: (instance) => console.log('Panel shown'),
});
```

---

## API

### `new DuckAndShow(element, options?)`

| Option    | Type       | Description                        |
|-----------|------------|------------------------------------|
| `onDuck`  | `Function` | Called after panel collapses       |
| `onShow`  | `Function` | Called after panel expands         |
| `onClose` | `Function` | Called after panel closes          |

### Instance Methods

| Method      | Description                           |
|-------------|---------------------------------------|
| `.toggle()` | Switch between ducked and shown       |
| `.duck()`   | Collapse panel                        |
| `.show()`   | Expand panel                          |
| `.close()`  | Hide panel entirely                   |
| `.destroy()`| Remove event listeners (cleanup)      |

### Instance Properties

| Property  | Type          | Description                          |
|-----------|---------------|--------------------------------------|
| `.state`  | `string`      | `'shown'`, `'ducked'`, or `'closed'` |
| `.panel`  | `HTMLElement`  | The `.da1-panel` element              |
| `.chevron`| `HTMLElement`  | The `.da1-chevron` button             |
| `.closeBtn`| `HTMLElement` | The `.da1-close` button (or null)     |
| `.content`| `HTMLElement`  | The `.da1-content` wrapper            |

### Static Methods

| Method               | Description                              |
|----------------------|------------------------------------------|
| `DuckAndShow.init()` | Auto-init all `[data-da1-panel]` panels  |

### Custom Events

Dispatched on the `.da1-panel` element (bubble up):

| Event       | `detail`                    |
|-------------|-----------------------------|
| `da1:duck`  | `{ instance: DuckAndShow }` |
| `da1:show`  | `{ instance: DuckAndShow }` |
| `da1:close` | `{ instance: DuckAndShow }` |

---

## CSS Custom Properties

Override on `.da1-panel`, a parent element, or `:root`:

| Property              | Default    | Description                  |
|-----------------------|------------|------------------------------|
| `--da1-chevron-width` | `40px`     | Chevron width                |
| `--da1-chevron-height`| `10px`     | Chevron height               |
| `--da1-line-1`        | `#ffffff`  | Top line (highlight)         |
| `--da1-line-2`        | `#aaaaaa`  | Middle line (body)           |
| `--da1-line-3`        | `#555555`  | Bottom line (shadow)         |
| `--da1-focus-color`   | `#4f46e5`  | Focus-visible outline color  |
| `--da1-transition-ms` | `0.3s`     | Content animation duration   |

### Example: Dark Theme

```css
.my-dark-panel {
    --da1-line-1: #e0e0e0;
    --da1-line-2: #888888;
    --da1-line-3: #444444;
}
```

### Example: Brand Colors

```css
.my-brand-panel {
    --da1-chevron-width: 60px;
    --da1-chevron-height: 14px;
    --da1-line-1: #d4a0ff;
    --da1-line-2: #8b5cf6;
    --da1-line-3: #4c1d95;
}
```

---

## HTML Structure

```
.da1-panel [data-da1-panel] [data-da1-state="shown|ducked|closed"]
├── button.da1-close [aria-label]          ← optional X close button
├── button.da1-chevron [aria-expanded] [aria-label]
└── .da1-content
    └── .da1-content-inner   ← required for grid-row animation
        └── (your content)
```

The `.da1-content-inner` wrapper is required — the `grid-template-rows: 1fr → 0fr` animation needs a single grid child with `overflow: hidden`.

---

## Browser Support

- Chrome 107+
- Firefox 106+
- Safari 16.4+
- Edge 107+

Requires: `clip-path: polygon()`, `grid-template-rows` animation, CSS custom properties.

---

## Attribution

If you use Duck and Show in a project, a link back is appreciated:

- [da1ni5.com](https://da1ni5.com)
- [dainis.net](https://dainis.net)

---

## License

MIT — see [LICENSE](LICENSE).

© 2026 Dainis W. Michel
