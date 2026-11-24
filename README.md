# Prince – academic website

## Put it online (GitHub Pages)
1. Create a free account at github.com, then click **New repository**.
2. Name it `YOUR-USERNAME.github.io` (exactly), set it to Public, click **Create repository**.
3. Click **uploading an existing file**, drag in everything from this folder (index.html, assets, blog), click **Commit changes**.
4. Open **Settings → Pages**, set Source to *Deploy from a branch*, branch `main`, folder `/ (root)`, and Save.
5. After 1–2 minutes your site is at `https://YOUR-USERNAME.github.io`.

## Edit your content
- Everything (papers, talks, blogs, PDFs, gallery, LinkedIn) is in `assets/js/data.js`. Empty lists show a gentle placeholder.
- Photo: save it as `assets/img/profile.jpg`.
- Gallery images go in `assets/gallery/`, PDFs in `assets/pdfs/`.
- New blog post: copy `blog/sample-post.html`, write LaTeX between `$ $`, then add it to `blogs` in data.js.
- Colours and fonts: top of `assets/css/main.css`.
