/**
 * Shared site chrome for the Yukti marketing pages.
 *
 * This file is the only place to edit the nav and footer. Each page loads it
 * twice, during HTML parse, so the chrome is in the DOM before first paint:
 *
 *   <script src="js/site-chrome.js" data-chrome="nav"></script>
 *   <script src="js/site-chrome.js" data-chrome="footer"></script>
 *
 * The matching nav link gets an "active" class from the current filename.
 * contact.html marks Get Started active, matching the previous page markup.
 */
(function () {
  var script = document.currentScript;
  if (!script) return;

  var part = script.getAttribute('data-chrome');
  var logoIcon =
    '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
      '<path d="M3 4h12M3 9h12M3 14h12" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>' +
      '<circle cx="14" cy="4" r="2" fill="#86EFAC"/>' +
    '</svg>';

  if (part === 'nav') {
    script.insertAdjacentHTML('beforebegin',
      '<nav class="nav" role="navigation" aria-label="Main navigation">' +
        '<div class="nav-inner">' +
          '<a href="index.html" class="nav-logo" aria-label="Yukti home">' +
            '<div class="nav-logo-icon">' + logoIcon + '</div>' +
            '<span class="nav-logo-text">Yukti</span>' +
          '</a>' +
          '<ul class="nav-links" id="site-nav-links">' +
            '<li><a href="index.html">Home</a></li>' +
            '<li><a href="features.html">Features</a></li>' +
            '<li><a href="pricing.html">Pricing</a></li>' +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="https://app.goyukti.com/login">Log in</a></li>' +
            '<li><a href="https://app.goyukti.com/register" class="nav-cta">Get Started</a></li>' +
          '</ul>' +
          '<button class="nav-mobile-toggle" type="button" aria-label="Toggle menu" aria-controls="site-nav-links" aria-expanded="false">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
              '<line x1="3" y1="6" x2="21" y2="6"/>' +
              '<line x1="3" y1="12" x2="21" y2="12"/>' +
              '<line x1="3" y1="18" x2="21" y2="18"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
      '</nav>'
    );
    markActiveNav();
    bindMobileToggle();
    return;
  }

  if (part === 'footer') {
    script.insertAdjacentHTML('beforebegin',
      '<footer class="footer" role="contentinfo">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<a href="index.html" class="nav-logo">' +
                '<div class="nav-logo-icon">' + logoIcon + '</div>' +
                '<span class="nav-logo-text" style="color: var(--green-200);">Yukti</span>' +
              '</a>' +
              '<p>Smart restaurant reconciliation. Convert delivery platform and POS statements into balanced, tax-aware journal entries.</p>' +
            '</div>' +
            '<div>' +
              '<h4>Product</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="features.html">Features</a></li>' +
                '<li><a href="pricing.html">Pricing</a></li>' +
                '<li><a href="https://app.goyukti.com/register">Get Started</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4>Company</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="about.html">About</a></li>' +
                '<li><a href="contact.html">Contact</a></li>' +
                '<li><a href="privacy.html">Privacy Policy</a></li>' +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4>Platforms</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="features.html">DoorDash</a></li>' +
                '<li><a href="features.html">Uber Eats</a></li>' +
                '<li><a href="features.html">Grubhub</a></li>' +
                '<li><a href="features.html">Toast POS</a></li>' +
                '<li><a href="features.html">Clover POS</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p>&copy; 2026 Yukti. All rights reserved.</p>' +
            '<p>Made with care in California</p>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function currentPage() {
    var name = (location.pathname || '').split('/').pop();
    if (!name || name === 'index.html') return 'index.html';
    return name;
  }

  function markActiveNav() {
    var page = currentPage();
    var links = document.querySelectorAll('#site-nav-links a');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('href') === page) links[i].classList.add('active');
    }
    if (page === 'contact.html') {
      var cta = document.querySelector('#site-nav-links .nav-cta');
      if (cta) cta.classList.add('active');
    }
  }

  function bindMobileToggle() {
    var button = document.querySelector('.nav-mobile-toggle');
    var links = document.getElementById('site-nav-links');
    if (!button || !links) return;
    button.addEventListener('click', function () {
      var open = links.classList.toggle('show');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
