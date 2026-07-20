# Pond Inlet Gospel

## Main pages

- `index.html` - lightweight start page
- `gospel/` - Gospel explanation
- `verses/` - verse index and source for automatic Previous/Next ordering
- `videos/` - video index
- `contact/` - contact information
- `v/<verse>/` - individual verse pages
- `video/<video>/` - individual privacy-enhanced YouTube pages
- `originals.html` - original image gallery
- `printables.html` - printable image gallery

The primary menu is CSS-only. 
Desktop navigation is shown horizontally and mobile navigation uses a compact disclosure menu.
No menu JavaScript is required.

## Future language structure

Keep the existing root URLs as English to preserve QR codes and links. Add future translations under separate folders such as:

- `/iu/` for Inuktitut syllabics
- `/iu-latn/` for Inuktitut Roman orthography

## Test locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.
