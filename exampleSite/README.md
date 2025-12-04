# Example Site

This folder contains a complete example site demonstrating all features of the Academia theme.

## Quick Start

From the theme root:

```bash
cd exampleSite
hugo server --themesDir ../..
```

Or copy everything to a new site:

```bash
hugo new site my-site
cd my-site
git submodule add https://github.com/jcnbittencourt/hugo-academia themes/academia
cp -r themes/academia/exampleSite/* .
hugo server
```

## Contents

- `hugo.yaml` - Complete multilingual configuration
- `content/` - Example content for all content types
  - `about.md` / `about.pt-br.md` - About pages
  - `papers/` - Example publications
  - `courses/` - Example courses
  - `projects/` - Example research projects
  - `supervision/` - Example student entries
  - `books/` - Example books

## Profile Image

Add your profile image at `static/images/profile.jpg`.

For the example site, you can use any square image (recommended: 400x400 pixels).
