# Vite basic template by Isaac_Shir

## Commands

All commands are run from the root of the project, from a terminal:

| **Commands**              | **Action**                              |
|:--------------------------|:----------------------------------------|
| `npm install`             | Installs dependencies                   |
| `npm run dev`             | Starts local dev server                 |
| `npm run build`           | Build your production site to `/build/` |
| `npm run preview`         | Starts local server for production      |
| `npx gulp generateWebp`   | Generate webp images                    |
| `npx gulp generateSprite` | Generate sprite                         |

## Project structure

Inside of this project, you'll see the following folders and files:

```markdown

├── build
│ ├── css
│ │ └──app.css
│ │
│ ├── favicon
│ ├── fonts
│ ├── img
│ │ ├── components
│ │ ├── svg
│ │ └── sprite.svg
│ │
│ ├── js
│ │ └──app.js
│ │
│ ├── style
│ └── index.html
├── src
│ ├── public
│ │ ├── favicon
│ │ ├── fonts
│ │ └── img
│ │ ├── components
│ │ ├── svg
│ │ └── sprite.svg
│ │
│ ├── html
│ │ ├── layout
│ │ │ ├── _header.html
│ │ │ └── _footer.html
│ │ └── views
│ │ └── _index.html
│ │
│ ├── javascript
│ │ ├── modules
│ │ ├── utils
│ │ └── app.js
│ │
│ ├── sass
│ │ ├── components
│ │ └── app.sass
│ │
│ └── index.html
│
├── .gitignore
├── .stylelintrc
├── gulpfile.mjs
├── package.json
└── vite.config.js
```
