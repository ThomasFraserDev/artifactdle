import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/NavBar'
import GameContainer from './components/GameContainer'
import Footer from './components/Footer';

export default function App() {
  const [background, setBackground] = useState("/assets/backgrounds/nodkrai.png");
  const [game, setGame] = useState("normal");
  const [gameMode, setGameMode] = useState('daily');

  const changeBackground = (chosenBG) => {
    setBackground(chosenBG);
  };

  const changeGame = (chosenGame) => {
    setGame(chosenGame);
  }

  const handleModeToggle = () => {
    setGameMode(gameMode === 'daily' ? 'infinite' : 'daily');
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <img src={background} className="h-full w-full object-cover object-center"/>
      </div>
      <div className="flex min-h-screen w-full flex-col gap-y-5">
        <Navbar onBackgroundChange={changeBackground} gameMode={gameMode} onModeToggle={handleModeToggle} game={game} onGameChange={changeGame} currentBackground={background} />
        <GameContainer gameMode={gameMode} game={game} />
        <Footer />
        <Analytics />
      </div>
    </div>
  )
}