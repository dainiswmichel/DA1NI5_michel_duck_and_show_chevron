/**
 * DA1NI5 Michel Duck and Show Chevron  v1.0.0
 * Pure CSS + vanilla JS panel toggle with a 3-line beveled chevron.
 *
 * © 2026 Dainis W. Michel — MIT License
 * https://github.com/dainismichel/DA1NI5_michel_duck_and_show_chevron
 *
 * Usage:
 *   // Auto-init all [data-das-panel] elements on DOMContentLoaded:
 *   <script src="duck-and-show.js"></script>
 *
 *   // Manual init (for dynamically created panels):
 *   const das = new DuckAndShow(element, {
 *       onDuck: (instance) => console.log('ducked'),
 *       onShow: (instance) => console.log('shown'),
 *   });
 *
 * Events (dispatched on the .das-panel element, bubble up):
 *   'das:duck'  — panel collapsed
 *   'das:show'  — panel expanded
 */

class DuckAndShow {

    /**
     * @param {HTMLElement} panel  The .das-panel element
     * @param {Object}      opts
     * @param {Function}   [opts.onDuck]  Called after panel ducks
     * @param {Function}   [opts.onShow]  Called after panel shows
     */
    constructor(panel, opts = {}) {
        if (!panel) throw new Error('[DuckAndShow] Panel element required.');

        this.panel   = panel;
        this.chevron = panel.querySelector('.das-chevron');
        this.content = panel.querySelector('.das-content');
        this.state   = panel.getAttribute('data-das-state') || 'shown';
        this.opts    = Object.assign({ onDuck: null, onShow: null }, opts);

        // Bind click handler (stored reference for destroy())
        this._handleClick = () => this.toggle();
        if (this.chevron) {
            this.chevron.addEventListener('click', this._handleClick);
        }

        // Sync DOM to initial state
        this._sync();
    }

    /* ── Internal ───────────────────────────────────────────────────────── */

    /** Push current state to DOM attributes */
    _sync() {
        this.panel.setAttribute('data-das-state', this.state);
        if (this.chevron) {
            this.chevron.setAttribute('aria-expanded', String(this.state === 'shown'));
            this.chevron.setAttribute('aria-label',
                this.state === 'shown' ? 'Hide panel' : 'Show panel'
            );
        }
    }

    /* ── Public API ─────────────────────────────────────────────────────── */

    /** Toggle between ducked and shown */
    toggle() {
        this.state === 'shown' ? this.duck() : this.show();
    }

    /** Collapse panel — only the up-pointing chevron remains visible */
    duck() {
        this.state = 'ducked';
        this._sync();
        this.panel.dispatchEvent(
            new CustomEvent('das:duck', { bubbles: true, detail: { instance: this } })
        );
        if (this.opts.onDuck) this.opts.onDuck(this);
    }

    /** Expand panel — chevron points down, content visible */
    show() {
        this.state = 'shown';
        this._sync();
        this.panel.dispatchEvent(
            new CustomEvent('das:show', { bubbles: true, detail: { instance: this } })
        );
        if (this.opts.onShow) this.opts.onShow(this);
    }

    /** Remove event listeners (clean up before removing element) */
    destroy() {
        if (this.chevron) {
            this.chevron.removeEventListener('click', this._handleClick);
        }
    }

    /* ── Static helpers ─────────────────────────────────────────────────── */

    /**
     * Auto-initialize all panels matching selector.
     * @param  {string}          [selector='[data-das-panel]']
     * @return {DuckAndShow[]}   Array of created instances
     */
    static init(selector = '[data-das-panel]') {
        return Array.from(document.querySelectorAll(selector))
            .map(el => new DuckAndShow(el));
    }
}

/* ── UMD export ─────────────────────────────────────────────────────────── */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuckAndShow;
} else {
    (typeof self !== 'undefined' ? self : this).DuckAndShow = DuckAndShow;
}

/* ── Auto-init on DOMContentLoaded ──────────────────────────────────────── */
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => DuckAndShow.init());
    } else {
        DuckAndShow.init();
    }
}
