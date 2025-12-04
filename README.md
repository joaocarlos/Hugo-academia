# Academia - Hugo Theme for Academic Websites

A modern, minimalist Hugo theme designed for academic professionals, researchers, and professors. Features beautiful serif typography, responsive design, dark mode support, multilingual capabilities, and comprehensive content types for academic portfolios.

![Academia Theme Preview](images/preview.png)

## ✨ Features

- **Profile-Centered Home Page** — Centered layout with profile image, name, title, and bio
- **Beautiful Typography** — Cormorant Garamond serif headings with Source Sans body text
- **Responsive Design** — Mobile-first approach with adaptive layouts
- **Dark Mode** — Automatic system preference detection with manual toggle
- **Multilingual Support** — Built-in i18n for English and Portuguese (easily extendable)
- **Academic Content Types** — Publications, courses, projects, books, and student supervision
- **Table of Contents** — Sticky TOC with active section highlighting
- **Shortcodes** — Cards, quotes, timelines, badges, and icons
- **SEO Optimized** — Schema.org markup, Open Graph, and Twitter Cards
- **Fast & Lightweight** — No external dependencies, minimal JavaScript
- **Accessible** — WCAG compliant with proper ARIA labels and focus states

## 📦 Quick Start

### 1. Create a New Hugo Site

```bash
hugo new site my-academic-site
cd my-academic-site
```

### 2. Install the Theme

**Option A: Git Submodule (Recommended)**

```bash
git init
git submodule add https://github.com/jcnbittencourt/hugo-academia themes/academia
```

**Option B: Hugo Module**

Add to your `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/jcnbittencourt/hugo-academia
```

Then run:

```bash
hugo mod init github.com/yourusername/my-academic-site
hugo mod get -u
```

**Option C: Direct Download**

Download and extract to `themes/academia/`

### 3. Copy Example Configuration

```bash
cp themes/academia/exampleSite/hugo.yaml hugo.yaml
```

Or copy the entire example site to get started quickly:

```bash
cp -r themes/academia/exampleSite/* .
```

### 4. Run Development Server

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site.

---

## ⚙️ Configuration

### Basic Site Configuration

Create or edit `hugo.yaml` at your site root:

```yaml
baseURL: "https://your-domain.com/"
languageCode: "en"
title: "Your Name"
theme: "academia"

params:
  profile:
    name: "Prof. Your Name, Ph.D."
    title: "Assistant Professor"
    department: "Department of Computer Science"
    institution: "Your University"
    location: "City, Country"
    image: "/images/profile.jpg"
    bio: |
      I am a professor specializing in artificial intelligence
      and machine learning applications.

  # Theme settings
  theme:
    defaultMode: "auto"  # auto, light, dark
    showThemeToggle: true

menus:
  main:
    - name: "About"
      pageRef: "/about"
      weight: 10
    - name: "Publications"
      pageRef: "/papers"
      weight: 20
    - name: "Teaching"
      pageRef: "/courses"
      weight: 30
```

### Research Areas

Display your research interests with icons on the About page:

```yaml
params:
  research:
    - title: "Artificial Intelligence"
      icon: "brain"
      description: "Developing intelligent systems."
    - title: "Machine Learning"
      icon: "chart"
      description: "Creating adaptive algorithms."
    - title: "Internet of Things"
      icon: "network"
      description: "Building smart connected systems."
```

### Social & Academic Links

```yaml
params:
  social:
    - name: "Email"
      icon: "email"
      url: "mailto:your.email@university.edu"
    - name: "Google Scholar"
      icon: "scholar"
      url: "https://scholar.google.com/citations?user=YOURID"
    - name: "ORCID"
      icon: "orcid"
      url: "https://orcid.org/0000-0000-0000-0000"
    - name: "GitHub"
      icon: "github"
      url: "https://github.com/yourusername"
```

### Available Icons

| Icon | Name | Icon | Name |
|------|------|------|------|
| 📧 | `email` | 🐙 | `github` |
| 🔗 | `linkedin` | 🐦 | `twitter` |
| 📺 | `youtube` | 🎓 | `scholar` |
| 🆔 | `orcid` | 🔬 | `researchgate` |
| 📋 | `lattes` | 📍 | `location` |
| 🗓️ | `calendar` | 🧠 | `brain` |
| 📊 | `chart` | 🌐 | `network` |
| 💻 | `cpu` | 🌍 | `globe` |
| 📖 | `book` | 🎓 | `graduation` |
| 📄 | `file-text` | 🔗 | `external-link` |

---

## 📂 Content Types

### Directory Structure

```
content/
├── _index.md              # Home page (optional)
├── about.md               # About page
├── papers/                # Publications
│   ├── _index.md
│   └── my-paper.md
├── courses/               # Teaching
│   ├── _index.md
│   └── intro-to-ai.md
├── projects/              # Research projects
│   ├── _index.md
│   └── smart-cities.md
├── books/                 # Books & chapters
│   ├── _index.md
│   └── my-book.md
└── supervision/           # Student supervision
    ├── _index.md
    └── student-name.md
```

### Publications (`content/papers/`)

Create with: `hugo new --kind papers papers/my-paper.md`

```yaml
---
title: "Your Paper Title"
date: 2024-06-15
authors:
  - "Your Name"
  - "Co-author Name"
venue: "IEEE Conference on AI"
year: 2024
type: "conference"  # conference, journal, book, preprint
spotlight: true     # Feature on homepage
doi: "10.1234/example.2024"
pdf: "/papers/my-paper.pdf"
code: "https://github.com/you/repo"
slides: "/papers/slides/my-paper-slides.pdf"
video: "https://youtube.com/watch?v=..."
tags:
  - "machine learning"
  - "computer vision"
---

## Abstract

Your paper abstract here...
```

### Courses (`content/courses/`)

Create with: `hugo new --kind courses courses/intro-ai.md`

```yaml
---
title: "Introduction to Artificial Intelligence"
code: "CS401"
semester: "Fall 2024"
credits: 4
description: "Fundamentals of AI and machine learning"
schedule:
  - day: "Monday"
    time: "14:00-16:00"
    room: "Room 301"
  - day: "Wednesday"
    time: "14:00-16:00"
    room: "Room 301"
syllabus: "/courses/cs401-syllabus.pdf"
---

## Course Description

This course covers the fundamental concepts...

## Learning Objectives

- Understand core AI algorithms
- Implement machine learning models
- Apply AI to real-world problems
```

### Projects (`content/projects/`)

```yaml
---
title: "Smart Urban Monitoring"
description: "IoT-based environmental monitoring system"
status: "active"  # active, completed
start_date: 2023-01-01
end_date: 2025-12-31
funding: "National Science Foundation"
collaborators:
  - name: "Partner University"
    url: "https://partner.edu"
website: "https://project-site.com"
github: "https://github.com/you/project"
tags:
  - "IoT"
  - "Smart Cities"
---

Project description and details...
```

### Student Supervision (`content/supervision/`)

```yaml
---
title: "Maria Silva Santos"
status: "current"      # current, completed
level: "phd"           # phd, masters, undergraduate
thesis_title: "Deep Learning for Urban Analytics"
thesis_title_pt_br: "Aprendizado Profundo para Análise Urbana"  # Translation
start_year: 2022
year_completed:        # Leave empty if ongoing
cosupervisor: "Prof. John Doe"
current_position: "Research Scientist at Google"  # For alumni
website: "https://student-site.com"
orcid: "0000-0000-0000-0000"
linkedin: "mariasilva"
thesis_url: "/theses/maria-thesis.pdf"
---
```

### Books (`content/books/`)

```yaml
---
title: "Practical Machine Learning"
date: 2024-01-15
authors:
  - "Your Name"
publisher: "Academic Press"
year: 2024
isbn: "978-0-123456-78-9"
cover: "/images/book-cover.jpg"
purchase_url: "https://amazon.com/..."
tags:
  - "textbook"
  - "machine learning"
---

Book description and table of contents...
```

---

## 🎨 Shortcodes

### Cards

Display content in a responsive card grid:

```markdown
{{</* cards */>}}

{{</* card title="Smart Cities" icon="network" */>}}
Developing intelligent urban infrastructure.
{{</* /card */>}}

{{</* card title="Machine Learning" icon="brain" link="/research/ml" */>}}
Creating algorithms that learn from data.
{{</* /card */>}}

{{</* /cards */>}}
```

### Quotes

```markdown
{{</* quote author="Albert Einstein" */>}}
Imagination is more important than knowledge.
{{</* /quote */>}}

{{</* quote author="Your Name" featured="true" */>}}
Technology must serve humanity's greatest challenges.
{{</* /quote */>}}
```

### Timeline

Perfect for education or career history:

```markdown
{{</* timeline */>}}

{{</* timeline-item date="2020-Present" title="Assistant Professor" subtitle="Your University" */>}}
Teaching and conducting research in AI.
{{</* /timeline-item */>}}

{{</* timeline-item date="2015-2020" title="Ph.D. Computer Science" subtitle="Another University" */>}}
Dissertation on distributed systems.
{{</* /timeline-item */>}}

{{</* /timeline */>}}
```

### Badges

```markdown
{{</* badge */>}}Default{{</* /badge */>}}
{{</* badge type="success" */>}}Published{{</* /badge */>}}
{{</* badge type="warning" */>}}In Review{{</* /badge */>}}
{{</* badge type="info" */>}}Open Access{{</* /badge */>}}
```

### Inline Icons

```markdown
Contact me via {{</* icon name="email" */>}} email or {{</* icon name="github" */>}} GitHub.
```

---

## 🌍 Multilingual Support

The theme includes built-in translations for English (`en`) and Brazilian Portuguese (`pt-br`).

### Enable Multiple Languages

```yaml
defaultContentLanguage: "en"
defaultContentLanguageInSubdir: false

languages:
  en:
    languageName: "English"
    weight: 1
    params:
      profile:
        bio: "English bio text..."
    menus:
      main:
        - name: "About"
          pageRef: "/about"
          weight: 10
          
  pt-br:
    languageName: "Português"
    weight: 2
    params:
      profile:
        bio: "Texto da bio em português..."
    menus:
      main:
        - name: "Sobre"
          pageRef: "/about"
          weight: 10
```

### Content Translation

Create translated content files with language suffix:

```
content/
├── about.md           # English (default)
├── about.pt-br.md     # Portuguese
└── papers/
    ├── my-paper.md           # Shared across languages
    └── local-paper.pt-br.md  # Portuguese-only paper
```

### Shared Publications

Publications are automatically shared across languages. The theme pulls from the default language site so you don't need to duplicate paper files.

### Adding New Languages

1. Create `i18n/xx.yaml` (copy from `i18n/en.yaml`)
2. Translate all strings
3. Add language to `hugo.yaml`

---

## 🎨 Customization

### Custom CSS

Create `assets/css/custom.css` in your site root:

```css
/* Override accent color */
:root {
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
}

/* Custom heading style */
h1, h2, h3 {
  font-weight: 700;
}
```

### CSS Custom Properties

The theme uses CSS custom properties for easy theming:

```css
:root {
  /* Spacing */
  --sp-xs: 0.25rem;
  --sp-sm: 0.5rem;
  --sp-md: 1rem;
  --sp-lg: 1.5rem;
  --sp-xl: 2rem;
  
  /* Font sizes */
  --fs-sm: 0.875rem;
  --fs-base: 1rem;
  --fs-lg: 1.125rem;
  --fs-xl: 1.25rem;
  
  /* Colors (light mode) */
  --color-bg: #fafafa;
  --color-text: #2d2d2d;
  --color-accent: #4a5568;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
}

[data-theme="dark"] {
  --color-bg: #141414;
  --color-text: #e8e8e8;
  --color-accent: #a0aec0;
}
```

### Override Templates

Copy any template from `themes/academia/layouts/` to your site's `layouts/` directory:

```bash
# Example: customize the header
cp themes/academia/layouts/partials/header.html layouts/partials/
```

---

## 🚀 Deployment

### GitHub Pages

Create `.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: "0.128.0"
          extended: true
      - name: Build
        run: hugo --minify
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Netlify

Create `netlify.toml`:

```toml
[build]
  publish = "public"
  command = "hugo --minify"

[build.environment]
  HUGO_VERSION = "0.128.0"
```

### Vercel

Create `vercel.json`:

```json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.128.0"
    }
  }
}
```

---

## 📋 Requirements

- Hugo Extended v0.128.0 or later
- Git (for submodule installation)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Credits

- **Fonts**: [Google Fonts](https://fonts.google.com/) (Cormorant Garamond, Source Sans 3, JetBrains Mono)
- **Icons**: Custom SVG icons
- **Inspiration**: [PaperMod](https://github.com/adityatelange/hugo-PaperMod)

---

## 💬 Support

- 🐛 [Report Issues](https://github.com/jcnbittencourt/hugo-academia/issues)
- 💬 [Discussions](https://github.com/jcnbittencourt/hugo-academia/discussions)

---

<p align="center">Made with ❤️ for the academic community</p>
