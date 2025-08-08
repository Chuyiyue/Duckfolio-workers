export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/platform-config.json") {
      let base = {};
      try {
        const assetResp = await env.ASSETS.fetch(request);
        if (assetResp.ok) {
          base = await assetResp.json();
        }
      } catch (e) {}

      try {
        if (env.DUCKFOLIO_CONFIG) {
          const kvCfg = await env.DUCKFOLIO_CONFIG.get("platform-config", "json");
          if (kvCfg && typeof kvCfg === "object") {
            return new Response(JSON.stringify(kvCfg), {
              headers: {
                "content-type": "application/json; charset=utf-8",
                "cache-control": "no-store",
              },
            });
          }
        }
      } catch (e) {}

      const override = buildOverrideFromEnv(env);
      const merged = deepMerge(base, override);
      return new Response(JSON.stringify(merged), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

function buildOverrideFromEnv(env) {
  const cfg = {};
  if (env.SITE_NAME || env.SITE_TITLE || env.AVATAR_URL) {
    cfg.site = {};
    if (env.SITE_NAME) cfg.site.name = env.SITE_NAME;
    if (env.SITE_TITLE) cfg.site.title = env.SITE_TITLE;
    if (env.AVATAR_URL) cfg.site.avatar = env.AVATAR_URL;
  }
  const links = {};
  if (env.LINK_GITHUB) links.github = env.LINK_GITHUB;
  if (env.LINK_X) links.x = env.LINK_X;
  if (env.LINK_TWITTER) links.twitter = env.LINK_TWITTER;
  if (env.LINK_WEIBO) links.weibo = env.LINK_WEIBO;
  if (env.LINK_TELEGRAM) links.telegram = env.LINK_TELEGRAM;
  if (env.LINK_EMAIL) links.email = env.LINK_EMAIL;
  if (Object.keys(links).length) cfg.links = links;
  if (env.SOCIALS_JSON) {
    try {
      cfg.links = { ...(cfg.links || {}), ...JSON.parse(env.SOCIALS_JSON) };
    } catch (e) {}
  }
  return cfg;
}

function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) return source ?? target;
  const out = { ...target };
  for (const [k, v] of Object.entries(source)) {
    out[k] = isObject(v) ? deepMerge(target[k], v) : v;
  }
  return out;
}
function isObject(x) {
  return x && typeof x === "object" && !Array.isArray(x);
}
