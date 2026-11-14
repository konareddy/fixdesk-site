// Google Ads conversion measurement, only with the visitor's consent.
// Nothing from Google loads until the visitor presses "Accept" on the banner. The choice is kept in this
// browser (localStorage) so the banner shows once. With consent, the Google tag loads and a click on a
// Download button is reported to Google Ads as one "EagleDesk download (trial start)" conversion.
// "Decline" keeps the site cookie-free (GoatCounter still counts visits without cookies).
(function () {
  var KEY = "eagledesk-consent", AW = "AW-18543891971", SEND_TO = AW + "/Pp4kCPith7gdEIOstYpF";
  var choice = "";
  try { choice = localStorage.getItem(KEY) || ""; } catch (e) {}

  function loadGoogle() {
    if (window.__edGtag) return;
    window.__edGtag = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("consent", "default", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "denied", analytics_storage: "denied" });
    gtag("js", new Date());
    gtag("config", AW);
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + AW;
    document.head.appendChild(s);
  }

  function onDownloadClick(e) {
    if (choice !== "accepted" || !window.gtag) return;
    var a = e.target.closest && e.target.closest('a[data-goatcounter-click^="download-"]');
    if (a) gtag("event", "conversion", { send_to: SEND_TO });
  }

  function save(v) {
    choice = v;
    try { localStorage.setItem(KEY, v); } catch (e) {}
    var b = document.getElementById("ed-consent");
    if (b) b.remove();
    if (v === "accepted") loadGoogle();
  }

  function banner() {
    var d = document.createElement("div");
    d.id = "ed-consent";
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-label", "Cookie choice");
    d.innerHTML =
      '<p>We use a Google Ads cookie to see which ads lead to downloads. No tracking unless you accept. ' +
      '<a href="privacy.html#website">Privacy</a></p>' +
      '<div><button type="button" class="btn ghost small" data-v="declined">Decline</button>' +
      '<button type="button" class="btn primary small" data-v="accepted">Accept</button></div>';
    d.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-v");
      if (v) save(v);
    });
    document.body.appendChild(d);
  }

  document.addEventListener("click", onDownloadClick, true);
  if (choice === "accepted") loadGoogle();
  function ready() { if (!choice) banner(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();
