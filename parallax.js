/*
    TripleMonkey Studio
    Parallax banner: each .parallax-hero moves at half the scroll speed,
    so the page content (which scrolls normally) slides over the banner
    and the background around it.
    Skipped when the visitor has asked for reduced motion.
*/
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var heroes = document.querySelectorAll('.parallax-hero');
    if (!heroes.length) return;

    var SPEED = 0.5;
    var ticking = false;

    function update() {
        ticking = false;
        var y = window.scrollY;
        heroes.forEach(function (hero) {
            // Once the banner has been scrolled well out of view, stop moving it
            var limit = 2 * (hero.offsetTop + hero.offsetHeight);
            var offset = Math.min(y, limit) * SPEED;
            hero.style.transform = 'translate3d(0,' + offset + 'px,0)';
        });
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
})();
