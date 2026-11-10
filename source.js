// Where did this visit come from? GoatCounter records it for page views, but sends click events (e.g. the
// Download buttons) with no source, so every download showed "(unknown)". This remembers the source of the
// visit for the browser tab - the utm/campaign tag of the link, or the site that linked here - and puts it on
// every click event, so the dashboard shows e.g. "youtube.com · yt_test_tutorial3" next to a download.
// No cookies, nothing personal: only the linking site's name and the link's tag, kept for this tab only.
(function () {
  var KEY = "eagledesk-source", src = "";
  try {
    var q = new URLSearchParams(location.search);
    var from = q.get("utm_source") || q.get("ref") || q.get("src") || q.get("source") || "";
    var tag = q.get("utm_campaign") || q.get("campaign") || "";
    if (!from && document.referrer) {
      var host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== location.hostname.replace(/^www\./, "")) from = host;
    }
    src = [from, tag].filter(Boolean).join(" · ").slice(0, 200);
    if (src) { try { sessionStorage.setItem(KEY, src); } catch (e) {} }
    else { try { src = sessionStorage.getItem(KEY) || ""; } catch (e) {} }
  } catch (e) {}
  if (!src) return;
  function mark() {
    document.querySelectorAll("[data-goatcounter-click]").forEach(function (el) {
      if (!el.dataset.goatcounterReferrer) el.dataset.goatcounterReferrer = src;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mark); else mark();
})();
