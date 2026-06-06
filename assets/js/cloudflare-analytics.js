(function () {
  const script = document.currentScript;
  if (!script) return;

  const token = (script.dataset.cloudflareToken || "").trim();
  const placeholder = "PASTE_CLOUDFLARE_WEB_ANALYTICS_TOKEN_HERE";
  if (!token || token === placeholder) return;

  const beacon = document.createElement("script");
  beacon.defer = true;
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.setAttribute(
    "data-cf-beacon",
    JSON.stringify({
      token: token,
      spa: false
    })
  );

  document.head.appendChild(beacon);
})();
