/*
    TripleMonkey Studio
    Light / dark theme. Loaded in each page's <head> so the saved theme
    is applied before the page draws (no flash of the wrong colors).
    Light (black on white) is the default; the navbar button switches.
*/
(function () {
    var KEY = 'tms-theme';
    var root = document.documentElement;

    function apply(theme) {
        root.setAttribute('data-theme', theme);
        // Bootstrap 5.3 uses this to theme form fields and menus
        root.setAttribute('data-bs-theme', theme);
    }

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { }
    apply(saved === 'dark' ? 'dark' : 'light');

    // The navbar is loaded later by includeHTML(), so listen on the document
    document.addEventListener('click', function (event) {
        if (!event.target.closest('[data-theme-toggle]')) return;
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem(KEY, next); } catch (e) { }
    });
})();
