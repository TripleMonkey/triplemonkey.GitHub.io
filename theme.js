/*
    TripleMonkey Studio
    Light / dark theme. Loaded in each page's <head> so the theme is
    applied before the page draws (no flash of the wrong colors).

    Every visit starts from the OS / browser setting. The navbar button
    overrides it for the rest of the visit only (sessionStorage), so the
    choice carries across pages but the next visit follows the OS again.
    Switching back to whatever the OS uses clears the override, and so does
    changing the OS / browser setting itself, which always wins.
*/
(function () {
    var KEY = 'tms-theme';
    var root = document.documentElement;
    var osDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function osTheme() {
        return osDark && osDark.matches ? 'dark' : 'light';
    }

    function savedTheme() {
        var saved = null;
        try { saved = sessionStorage.getItem(KEY); } catch (e) { }
        return saved === 'dark' || saved === 'light' ? saved : null;
    }

    function apply(theme) {
        root.setAttribute('data-theme', theme);
        // Bootstrap 5.3 uses this to theme form fields and menus
        root.setAttribute('data-bs-theme', theme);
    }

    // Earlier versions saved the choice permanently; drop that old value
    try { localStorage.removeItem(KEY); } catch (e) { }

    apply(savedTheme() || osTheme());

    // OS / browser setting changed while the page is open: follow it, even
    // over a choice made with the navbar button. Someone changing that
    // setting expects every window to switch. Clearing the saved choice
    // keeps the rest of the visit on the new OS theme too.
    if (osDark) {
        var onOsChange = function () {
            try { sessionStorage.removeItem(KEY); } catch (e) { }
            apply(osTheme());
        };
        if (osDark.addEventListener) osDark.addEventListener('change', onOsChange);
        else if (osDark.addListener) osDark.addListener(onOsChange); // older Safari
    }

    // The navbar is loaded later by includeHTML(), so listen on the document
    document.addEventListener('click', function (event) {
        if (!event.target.closest('[data-theme-toggle]')) return;
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        apply(next);
        try {
            if (next === osTheme()) sessionStorage.removeItem(KEY);
            else sessionStorage.setItem(KEY, next);
        } catch (e) { }

        // On small screens the switch sits in the collapsed navbar menu: close it
        var menu = event.target.closest('.navbar-collapse.show');
        if (menu && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
        }
    });
})();
