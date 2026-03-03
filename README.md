# DA1NI5 Michel Duck and Show Chevron

A pure CSS + vanilla JavaScript panel toggle component.  
Click the **3-line beveled chevron** to **duck** (collapse) or **show** (expand) any panel content.

**Zero dependencies. ~2 KB total (unminified).**

Created 2026-03m-03d by [Dainis W. Michel](https://dainis.net).

---

## What It Does

| State   | Chevron   | Content |
|---------|-----------|---------|
| **Shown**  | ∨ points down | Visible |
| **Ducked** | ∧ points up   | Hidden  |

The chevron is a pure CSS shape — no images, no icon fonts, no SVGs.  
Three colored lines (white → light grey → dark grey) create a beveled / 3D effect using `clip-path: polygon()` and `linear-gradient`.

Content collapses with a smooth CSS `grid-template-rows` animation (pixel-perfect timing, no max-height hacks).

---

## Quick Start

```html
<link rel="stylesheet" href="duck-and-show.css">

<div class="das-panel" data-das-panel data-das-state="shown">
    <button class="das-chevron" aria-expanded="true" aria-label="Hide panel"></button>
    <div class="das-content">
        <div class="das-content-inner">
            <!-- Your content here -->
        </div>
    </div>
</div>

<script src="duck-and-show.js"></script>
```

All `[data-das-panel]` elements auto-initialize on `DOMContentLoaded`.

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

### Instance Methods

| Method      | Description                           |
|-------------|---------------------------------------|
| `.toggle()` | Switch between ducked and shown       |
| `.duck()`   | Collapse panel                        |
| `.show()`   | Expand panel                          |
| `.destroy()`| Remove event listeners (cleanup)      |

### Instance Properties

| Property  | Type          | Description                   |
|-----------|---------------|-------------------------------|
| `.state`  | `string`      | `'shown'` or `'ducked'`      |
| `.panel`  | `HTMLElement`  | The `.das-panel` element      |
| `.chevron`| `HTMLElement`  | The `.das-chevron` button     |
| `.content`| `HTMLElement`  | The `.das-content` wrapper    |

### Static Methods

| Method               | Description                              |
|----------------------|------------------------------------------|
| `DuckAndShow.init()` | Auto-init all `[data-das-panel]` panels  |

### Custom Events

Dispatched on the `.das-panel` element (bubble up):

| Event       | `detail`                    |
|-------------|-----------------------------|
| `das:duck`  | `{ instance: DuckAndShow }` |
| `das:show`  | `{ instance: DuckAndShow }` |

---

## CSS Custom Properties

Override on `.das-panel`, a parent element, or `:root`:

| Property              | Default    | Description                  |
|-----------------------|------------|------------------------------|
| `--das-chevron-width` | `40px`     | Chevron width                |
| `--das-chevron-height`| `10px`     | Chevron height               |
| `--das-line-1`        | `#ffffff`  | Top line (highlight)         |
| `--das-line-2`        | `#aaaaaa`  | Middle line (body)           |
| `--das-line-3`        | `#555555`  | Bottom line (shadow)         |
| `--das-focus-color`   | `#4f46e5`  | Focus-visible outline color  |
| `--das-transition-ms` | `0.3s`     | Content animation duration   |

### Example: Dark Theme

```css
.my-dark-panel {
    --das-line-1: #e0e0e0;
    --das-line-2: #888888;
    --das-line-3: #444444;
}
```

### Example: Brand Colors

```css
.my-brand-panel {
    --das-chevron-width: 60px;
    --das-chevron-height: 14px;
    --das-line-1: #d4a0ff;
    --das-line-2: #8b5cf6;
    --das-line-3: #4c1d95;
}
```

---

## HTML Structure

```
.das-panel [data-das-panel] [data-das-state="shown|ducked"]
├── button.das-chevron [aria-expanded] [aria-label]
└── .das-content
    └── .das-content-inner   ← required for grid-row animation
        └── (your content)
```

The `.das-content-inner` wrapper is required — the `grid-template-rows: 1fr → 0fr` animation needs a single grid child with `overflow: hidden`.

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
