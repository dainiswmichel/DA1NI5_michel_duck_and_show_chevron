/**
 * DA1NI5 Michel Duck and Show Chevron  v1.1.0
 * Pure CSS + vanilla JS panel toggle with a 3-line beveled chevron.
 *
 * © 2026 Dainis W. Michel — MIT License
 * https://github.com/dainismichel/DA1NI5_michel_duck_and_show_chevron
 *
 * Usage:
 *   // Auto-init all [data-da1-panel] elements on DOMContentLoaded:
 *   <script src="duck-and-show.js"></script>
 *
 *   // Manual init (for dynamically created panels):
 *   const das = new DuckAndShow(element, {
 *       onDuck:  (instance) => console.log('ducked'),
 *       onShow:  (instance) => console.log('shown'),
 *       onClose: (instance) => console.log('closed'),
 *   });
 *
 * Events (dispatched on the .da1-panel element, bubble up):
 *   'da1:duck'  — panel collapsed
 *   'da1:show'  — panel expanded
 *   'da1:close' — panel closed (hidden entirely)
 */

class DuckAndShow {

    /**
     * @param {HTMLElement} panel  The .da1-panel element
     * @param {Object}      opts
     * @param {Function}   [opts.onDuck]   Called after panel ducks
     * @param {Function}   [opts.onShow]   Called after panel shows
     * @param {Function}   [opts.onClose]  Called after panel closes
     */
    constructor(panel, opts = {}) {
        if (!panel) throw new Error('[DuckAndShow] Panel element required.');

        this.panel    = panel;
        this.chevron  = panel.querySelector('.da1-chevron');
        this.closeBtn = panel.querySelector('.da1-close');
        this.content  = panel.querySelector('.da1-content');
        this.state    = panel.getAttribute('data-da1-state') || 'shown';
        this.opts     = Object.assign({ onDuck: null, onShow: null, onClose: null }, opts);

        // Bind click handlers (stored references for destroy())
        this._handleClick = () => this.toggle();
        this._handleClose = () => this.close();
        if (this.chevron) {
            this.chevron.addEventListener('click', this._handleClick);
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this._handleClose);
        }

        // Sync DOM to initial state
        this._sync();
    }

    /* ── Internal ───────────────────────────────────────────────────────── */

    /** Push current state to DOM attributes */
    _sync() {
        this.panel.setAttribute('data-da1-state', this.state);
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
            new CustomEvent('da1:duck', { bubbles: true, detail: { instance: this } })
        );
        if (this.opts.onDuck) this.opts.onDuck(this);
    }

    /** Expand panel — chevron points down, content visible */
    show() {
        this.state = 'shown';
        this._sync();
        this.panel.dispatchEvent(
            new CustomEvent('da1:show', { bubbles: true, detail: { instance: this } })
        );
        if (this.opts.onShow) this.opts.onShow(this);
    }

    /** Close panel entirely — hidden until programmatically shown again */
    close() {
        this.state = 'closed';
        this._sync();
        this.panel.dispatchEvent(
            new CustomEvent('da1:close', { bubbles: true, detail: { instance: this } })
        );
        if (this.opts.onClose) this.opts.onClose(this);
    }

    /** Remove event listeners (clean up before removing element) */
    destroy() {
        if (this.chevron) {
            this.chevron.removeEventListener('click', this._handleClick);
        }
        if (this.closeBtn) {
            this.closeBtn.removeEventListener('click', this._handleClose);
        }
    }

    /* ── Static helpers ─────────────────────────────────────────────────── */

    /**
     * Auto-initialize all panels matching selector.
     * @param  {string}          [selector='[data-da1-panel]']
     * @return {DuckAndShow[]}   Array of created instances
     */
    static init(selector = '[data-da1-panel]') {
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
