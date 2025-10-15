import Navbar from './components/NavBar'
import GameContainer from './components/GameContainer'

export default function App() {

  return (
    <div className="flex flex-col h-screen gap-y-5"> {/* Main container */}
    <Navbar></Navbar>
    <GameContainer />
     </div>
  )
}