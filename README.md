# Sumit Neupane — Matrix Portfolio

A new one-page static personal website with animated code rain, a cursor-responsive grid, and editable content. Based on the broad page organization of the supplied inspiration site, but with its own visual treatment. No copied assets or text.

## Edit your information

All personal content is in **`dist/content.js`**. Edit:

- `name`, `tagline`, `introduction`, and `about` for your personal bio.
- `portrait` for a picture. Upload your image as `dist/assets/portrait.jpg` and use `'./assets/portrait.jpg'`.
- `skills` for any number of named skill groups.
- `projects` for project topic, title, description, cover image, PDF, and external link.
- `links` for email, GitHub, LinkedIn, and resume.

Leave optional values blank, or keep arrays empty, until you're ready. Nothing in the sample data claims any real achievements.

Example project:

```js
projects: [
  { topic: 'Computational chemistry', title: 'My project title', description: 'I will write this.', image: '', pdf: './assets/project.pdf', link: '' }
]
```

## GitHub Pages

1. Create a public repository called `<your-username>.github.io`.
2. Upload the **contents of `dist/`** (not the folder itself) to the repository root, so `index.html` is at the top level.
3. In Settings → Pages, deploy from branch `main`, folder `/(root)`.
4. Browse to `https://<your-username>.github.io`.

The site uses no build tools or dependencies and is compatible with static GitHub Pages hosting. A Google font is optional; system-font fallbacks are provided.

## Motion and accessibility

- The background code rain is a canvas effect, not a GIF or video.
- The image grid shifts subtly with pointer motion.
- Visitors can toggle the effect with the **MOTION ON/OFF** control.
- Devices preferring reduced motion start with the rain paused and entrance animations disabled.

The site is a design draft with placeholders; add your own biography, image, skills, and projects before making it public.
