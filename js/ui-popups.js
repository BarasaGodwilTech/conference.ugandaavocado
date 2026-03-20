(function () {
    if (window.UACPopup) return;

    function ensureRoot() {
        if (document.getElementById('uac-popup-root')) return;

        const style = document.createElement('style');
        style.id = 'uac-popup-style';
        style.textContent = `
            .uac-popup-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);display:none;align-items:center;justify-content:center;z-index:99999;padding:20px}
            .uac-popup-overlay.uac-open{display:flex}
            .uac-popup{width:min(560px,100%);background:#fff;border-radius:18px;box-shadow:0 30px 80px rgba(0,0,0,.25);overflow:hidden;transform:translateY(8px);opacity:0;transition:opacity .18s ease,transform .18s ease;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
            .uac-popup-overlay.uac-open .uac-popup{transform:translateY(0);opacity:1}
            .uac-popup-header{padding:18px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(15,23,42,.08)}
            .uac-popup-icon{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,#2E7D32,#4CAF50);flex:0 0 auto}
            .uac-popup-title{font-weight:800;font-size:1.05rem;color:#1e293b;margin:0;line-height:1.2}
            .uac-popup-body{padding:18px 20px;color:#334155;line-height:1.55;white-space:pre-line}
            .uac-popup-footer{padding:16px 20px;display:flex;justify-content:flex-end;gap:10px;border-top:1px solid rgba(15,23,42,.08);flex-wrap:wrap}
            .uac-popup-btn{border:0;border-radius:12px;padding:10px 14px;font-weight:800;cursor:pointer;transition:transform .12s ease,box-shadow .12s ease;display:inline-flex;align-items:center;gap:10px}
            .uac-popup-btn:active{transform:translateY(1px)}
            .uac-popup-btn-primary{background:linear-gradient(135deg,#2E7D32,#4CAF50);color:#fff;box-shadow:0 10px 25px rgba(76,175,80,.25)}
            .uac-popup-btn-ghost{background:rgba(2,6,23,.06);color:#0f172a}
            .uac-popup-btn-danger{background:linear-gradient(135deg,#b91c1c,#ef4444);color:#fff;box-shadow:0 10px 25px rgba(239,68,68,.22)}
            .uac-toast-wrap{position:fixed;right:18px;bottom:18px;display:flex;flex-direction:column;gap:10px;z-index:99999}
            .uac-toast{background:#0f172a;color:#fff;border-radius:14px;padding:12px 14px;box-shadow:0 20px 60px rgba(0,0,0,.25);display:flex;gap:10px;align-items:flex-start;max-width:min(420px,calc(100vw - 36px))}
            .uac-toast strong{display:block;font-weight:900;line-height:1.2;margin-bottom:2px}
            .uac-toast p{margin:0;opacity:.9;line-height:1.35}
            .uac-toast.uac-success{background:linear-gradient(135deg,#2E7D32,#4CAF50)}
            .uac-toast.uac-error{background:linear-gradient(135deg,#991b1b,#ef4444)}
            .uac-toast.uac-info{background:linear-gradient(135deg,#0f172a,#334155)}
        `;
        document.head.appendChild(style);

        const root = document.createElement('div');
        root.id = 'uac-popup-root';
        root.innerHTML = `
            <div class="uac-popup-overlay" role="dialog" aria-modal="true" aria-hidden="true">
                <div class="uac-popup" tabindex="-1">
                    <div class="uac-popup-header">
                        <div class="uac-popup-icon" aria-hidden="true">!</div>
                        <h3 class="uac-popup-title"></h3>
                    </div>
                    <div class="uac-popup-body"></div>
                    <div class="uac-popup-footer"></div>
                </div>
            </div>
            <div class="uac-toast-wrap" aria-live="polite" aria-atomic="true"></div>
        `;
        document.body.appendChild(root);
    }

    function iconFor(type) {
        if (type === 'success') return '✓';
        if (type === 'error') return '!';
        if (type === 'danger') return '!';
        return '!';
    }

    function openModal(opts) {
        ensureRoot();

        const overlay = document.querySelector('#uac-popup-root .uac-popup-overlay');
        const popup = document.querySelector('#uac-popup-root .uac-popup');
        const titleEl = document.querySelector('#uac-popup-root .uac-popup-title');
        const bodyEl = document.querySelector('#uac-popup-root .uac-popup-body');
        const footerEl = document.querySelector('#uac-popup-root .uac-popup-footer');
        const iconEl = document.querySelector('#uac-popup-root .uac-popup-icon');

        const type = opts.type || 'info';
        const title = opts.title || (type === 'error' ? 'Error' : 'Message');
        const message = opts.message || '';

        iconEl.textContent = iconFor(type);
        titleEl.textContent = title;
        bodyEl.textContent = message;
        footerEl.innerHTML = '';

        const previousActive = document.activeElement;

        let resolveFn;
        const done = new Promise((resolve) => { resolveFn = resolve; });

        function close(result) {
            overlay.classList.remove('uac-open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
            overlay.removeEventListener('click', onOverlayClick);
            try { if (previousActive && previousActive.focus) previousActive.focus(); } catch (e) {}
            resolveFn(result);
        }

        function onKeyDown(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                close(opts.cancelValue ?? false);
            }
        }

        function onOverlayClick(e) {
            if (e.target === overlay) close(opts.cancelValue ?? false);
        }

        (opts.buttons || []).forEach((b, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'uac-popup-btn ' + (b.variant === 'primary' ? 'uac-popup-btn-primary' : b.variant === 'danger' ? 'uac-popup-btn-danger' : 'uac-popup-btn-ghost');
            btn.textContent = b.label;
            btn.addEventListener('click', function () { close(b.value); });
            footerEl.appendChild(btn);
            if (idx === 0) setTimeout(() => { try { btn.focus(); } catch (e) {} }, 0);
        });

        document.body.style.overflow = 'hidden';
        overlay.classList.add('uac-open');
        overlay.setAttribute('aria-hidden', 'false');

        window.addEventListener('keydown', onKeyDown);
        overlay.addEventListener('click', onOverlayClick);

        return done;
    }

    function alertPopup(message, opts) {
        const options = opts || {};
        return openModal({
            type: options.type || 'info',
            title: options.title || 'Message',
            message: message,
            cancelValue: true,
            buttons: [
                { label: options.okText || 'OK', value: true, variant: 'primary' }
            ]
        });
    }

    function confirmPopup(message, opts) {
        const options = opts || {};
        return openModal({
            type: options.type || 'info',
            title: options.title || 'Please confirm',
            message: message,
            cancelValue: false,
            buttons: [
                { label: options.confirmText || 'Confirm', value: true, variant: options.danger ? 'danger' : 'primary' },
                { label: options.cancelText || 'Cancel', value: false, variant: 'ghost' }
            ]
        });
    }

    function toast(message, type, opts) {
        ensureRoot();
        const wrap = document.querySelector('#uac-popup-root .uac-toast-wrap');
        const t = document.createElement('div');
        const toastType = type || 'info';
        t.className = 'uac-toast uac-' + toastType;

        const title = (opts && opts.title) || (toastType === 'success' ? 'Success' : toastType === 'error' ? 'Error' : 'Notice');
        t.innerHTML = `<div><strong>${title}</strong><p>${String(message || '')}</p></div>`;

        wrap.appendChild(t);
        const ms = (opts && opts.durationMs) || 4500;
        setTimeout(() => {
            try {
                t.style.opacity = '0';
                t.style.transform = 'translateY(6px)';
                t.style.transition = 'opacity .18s ease, transform .18s ease';
            } catch (e) {}
            setTimeout(() => { try { t.remove(); } catch (e) {} }, 200);
        }, ms);
    }

    window.UACPopup = {
        alert: alertPopup,
        confirm: confirmPopup,
        toast: toast
    };
})();
