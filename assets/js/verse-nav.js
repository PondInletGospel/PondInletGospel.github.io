(() => {
  const prevEl = document.getElementById("prevLink");
  const nextEl = document.getElementById("nextLink");
  if (!prevEl || !nextEl) return;

  function currentSlug() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const index = parts.indexOf("v");
    return index >= 0 ? parts[index + 1] : null;
  }

  async function verseSlugs() {
    const listUrl = new URL("../../verses/index.html", window.location.href);
    const response = await fetch(listUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load the verse list");

    const html = await response.text();
    const documentCopy = new DOMParser().parseFromString(html, "text/html");
    const slugs = [];

    documentCopy.querySelectorAll("a.versecard[href]").forEach(link => {
      const url = new URL(link.getAttribute("href"), listUrl);
      const parts = url.pathname.split("/").filter(Boolean);
      const index = parts.indexOf("v");
      if (index >= 0 && parts[index + 1] && !slugs.includes(parts[index + 1])) {
        slugs.push(parts[index + 1]);
      }
    });

    return slugs;
  }

  async function initialise() {
    const activeSlug = currentSlug();
    if (!activeSlug) return;

    try {
      const slugs = await verseSlugs();
      const index = slugs.indexOf(activeSlug);
      if (index < 0 || slugs.length < 2) return;

      const previous = slugs[(index - 1 + slugs.length) % slugs.length];
      const next = slugs[(index + 1) % slugs.length];

      prevEl.href = `../${previous}/`;
      nextEl.href = `../${next}/`;
      prevEl.rel = "prev";
      nextEl.rel = "next";
    } catch (error) {
      console.warn("Verse navigation could not be updated.", error);
    }
  }

  initialise();
})();
