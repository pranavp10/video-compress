window.chatwootSettings = {
  position: "right",
  type: "expanded_bubble",
  launcherTitle: "Chat with me now",
};
(function (d, t) {
  const BASE_URL = "https://chatwoot.prolab.sh";
  var g = d.createElement(t),
    s = d.getElementsByTagName(t)[0];
  g.src = BASE_URL + "/packs/js/sdk.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g, s);
  g.onload = function () {
    window.chatwootSDK.run({
      websiteToken: "8XEjapj74BZk5GheQaeWaVCo",
      baseUrl: BASE_URL,
    });
  };
})(document, "script");
