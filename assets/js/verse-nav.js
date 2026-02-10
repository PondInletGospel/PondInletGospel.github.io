(() => {
  const prevEl = document.getElementById("prevLink");
  const nextEl = document.getElementById("nextLink");
  if (!prevEl || !nextEl) return;

  // Change to "alpha" if you want alphabetical order instead of home-page order
  const ORDER_MODE = "index"; // "index" | "alpha"

  function getCurrentSlug() {
    // Works for /v/slug/ and /repo/v/slug/ (GitHub Pages project sites)
    const parts = window.location.pathname.split("/").filter(Boolean);
    const vIndex = parts.indexOf("v");
    if (vIndex === -1 || !parts[vIndex + 1]) return null;
    return parts[vIndex + 1];
  }

  function unique(arr) {
    return [...new Set(arr)];
  }

  async function getSlugsFromHome() {
    // From /v/<slug>/ the home page is ../../index.html
    const homeUrl = new URL("../../index.html", window.location.href);
    const res = await fetch(homeUrl, { cache: "no-store" });
    if (!res.ok) throw new Error("Could not fetch home page");
    const html = await res.text();

    // Extract href="v/<slug>/" links (keeps home-page order)
    const re = /href\s*=\s*["']v\/([^"'/]+)\/["']/gi;
    const slugs = [];
    let m;
    while ((m = re.exec(html)) !== null) slugs.push(m[1]);

    const cleaned = unique(slugs).filter(Boolean);
    if (!cleaned.length) throw new Error("No verse links found on home page");
    return cleaned;
  }

  async function initNav() {
    const current = getCurrentSlug();
    if (!current) return;

    let slugs;
    try {
      slugs = await getSlugsFromHome();
    } catch (e) {
      // Safe fallback: keep whatever is already in the HTML (don’t break the page)
      return;
    }

    if (ORDER_MODE === "alpha") {
      slugs = [...slugs].sort((a, b) => a.localeCompare(b));
    }

    const i = slugs.indexOf(current);
    if (i === -1) return;

    const prevSlug = slugs[(i - 1 + slugs.length) % slugs.length];
    const nextSlug = slugs[(i + 1) % slugs.length];

    // Relative from /v/<current>/ to /v/<other>/ is ../<other>/
    prevEl.href = `../${prevSlug}/`;
    nextEl.href = `../${nextSlug}/`;

    prevEl.setAttribute("rel", "prev");
    nextEl.setAttribute("rel", "next");
  }

  initNav();
})();
