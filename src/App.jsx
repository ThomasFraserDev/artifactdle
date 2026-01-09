import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/NavBar'
import GameContainer from './components/GameContainer'
import Footer from './components/Footer';

export default function App() {
  const [background, setBackground] = useState("/assets/backgrounds/nodkrai.png");
  const [gameMode, setGameMode] = useState('daily');

  const changeBackground = (chosenBG) => {
    setBackground(chosenBG);
  };

  const handleModeToggle = () => {
    setGameMode(gameMode === 'daily' ? 'infinite' : 'daily');
  };

  return (
    <div className="flex flex-col h-screen w-screen gap-y-5 overflow-y-auto" style={{backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center"}}> {/* Main container */}
      <Navbar onBackgroundChange={changeBackground} gameMode={gameMode} onModeToggle={handleModeToggle} />
      <GameContainer gameMode={gameMode} />
      <Footer />
      <Analytics />
     </div>
  )
}