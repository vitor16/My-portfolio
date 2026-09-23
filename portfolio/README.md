# 🌟 Apple Liquid Glass Developer Portfolio

A developer portfolio web application built with **Apple VisionOS / macOS Sequoia Liquid Glass** aesthetics, fluid physics, multi-slide project carousels, interactive terminal simulation, code sandbox, and dark/light modes.

---

## ✨ Features & Highlights

- 💧 **Authentic Apple Liquid Glass Engine**:
  - Deep backdrop blur (`blur(50px) saturate(200%)`).
  - Aqua gloss arc reflection and caustic rim refraction.
  - Cursor-following specular glare highlight (`--x`, `--y` coordinates).
  - Spring-physics sliding active navigation pill with Apple bezier curve (`cubic-bezier(0.34, 1.2, 0.64, 1)`).
- 🌈 **Ambient Fluid Light Mesh**: Floating organic animated blobs that illuminate through the glass in both Light and Dark modes.
- 📱 **Multi-Slide Project Carousels**:
  - Interactive image sliders with random/custom tech mockups for each project.
  - Previous / Next glass navigation controls, pagination dot indicators, and touch swipe gestures.
  - Lightbox / Case Study modal with architecture breakdown, challenges, solutions, and impact metrics.
- ⚡ **Interactive Terminal (CLI)**:
  - Functional terminal prompt (`vitor@dev ~ $`) with command history (Up/Down arrow keys).
  - Interactive commands (`help`, `skills`, `projects`, `contact`, `experience`, `theme dark`, `clear`).
  - Clickable command chips for fast interaction.
- 💻 **Interactive Code Sandbox**:
  - Multi-language snippet switcher (Go, TypeScript, Python) with syntax coloring and one-click clipboard copy.
- 📊 **Skills Matrix & Career Timeline**:
  - Animated proficiency progress bars with years of experience tags.
  - Quantifiable career achievements and leadership metrics.
- 🔊 **Tactile Web Audio Haptics**:
  - Synthesized Apple-style click and feedback tones via native Web Audio API (with mute toggle).
- 🌓 **Zero-Lag Theme Switcher**:
  - Smooth rotating Sun / Moon icon transition.
  - Remembers user preferences via `localStorage` and respects system `prefers-color-scheme`.

---

## 🚀 Quick Start & Local Preview

You can open `index.html` directly in any modern browser, or run a local lightweight web server:

```bash
# Option 1: Using Python 3 built-in server
cd /home/vic/Projects/liquid-glass-portfolio
python3 -m http.server 3000

# Option 2: Using Node.js npx serve
npx serve .
```

Then navigate to `http://localhost:3000` in your browser.

---

## 🛠️ How to Customize with Your Information

All content is cleanly separated in [`js/data.js`](file:///home/vic/Projects/liquid-glass-portfolio/js/data.js):

1. **Personal Information**:
   - Open [`js/data.js`](file:///home/vic/Projects/liquid-glass-portfolio/js/data.js) and edit the `portfolioData.personal` object (Name, Title, Bio, Social links, Avatar URL).
2. **Projects & Carousel Pictures**:
   - In `portfolioData.projects`, add your own projects.
   - For each project, customize the `slides` array with your screenshots or diagrams, captions, and tags.
3. **Skills & Progress Bars**:
   - Update `portfolioData.skills` with your favorite technologies, percentage levels, and years of experience.
4. **Code Snippets**:
   - Replace or add your own code samples in `portfolioData.codeSnippets`.
5. **Experience Timeline**:
   - Update `portfolioData.experience` with your job history, company names, and bullet-point achievements.

---

## 🌐 Free Deployment Guide

### Deploy to GitHub Pages:
1. Initialize git in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Apple Liquid Glass portfolio"
   ```
2. Create a repository on GitHub (e.g. `portfolio` or `<your-username>.github.io`).
3. Push your code and enable GitHub Pages in Settings -> Pages -> Deploy from Branch `main`.

### Deploy to Vercel or Netlify:
- Drag and drop the `liquid-glass-portfolio` folder directly onto [Vercel](https://vercel.com) or [Netlify Drop](https://app.netlify.com/drop) for instant global deployment.
