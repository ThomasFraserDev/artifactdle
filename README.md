# Artifactdle
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](./LICENSE)

A Wordle-style game for guessing artifact sets from Genshin Impact.  
Heavily inspired by the already exisitng [Genshindle](https://genshindle.com), but for artifact sets instead.

## 🖼️ Screenshots
<div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">

<img src="https://github.com/user-attachments/assets/1b28c511-2e3e-4792-9805-b86ab0e2f2eb" alt="Gameplay board" width="400" />
<img src="https://github.com/user-attachments/assets/8bfdf480-463e-48b9-8791-7ac3ae42c758" alt="Guess input and feedback" width="400" />

</div>

## 🕹️ Game Flow

1. A random, unknown artifact set is selected.
2. Type and select an artifact set from the given list.
3. The game compares your guess and tells you which attriutes (name, region, 2pc buff, 4pc buff & release version) are a match or close match to the answer.
4. Keep guessing until either you guess the correct artifact set or hit the guess limit.
5. Build up a streak of wins and aim for a high score.

## 🚧 Upcoming Features

- Mobile & responsive layout
- Support for Honkai Star Rail relics
- Daily challenges
- Deployment
- More!

## 🧰 Download and Run

### Prerequisites

- **Node.js** 18+ and npm
  
### Run Locally
```bash
git clone https://github.com/TheRealThomasFraser/artifactdle.git
cd artifactdle
npm install
npm run dev
```
## 🪙 License

This is a fan-made project based on Genshin Impact.  
All game assets and names are property of HoYoverse.  
This project is **not affiliated with or endorsed by HoYoverse**.

This software is licensed under the MIT license.
