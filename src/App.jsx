import Header from './components/Header'
import GameContainer from './components/GameContainer'

export default function App() {

  return (
    <div className="flex flex-col items-center justify-center gap-y-5"> {/* Main container */}
    <Header />
    <GameContainer />
     </div>
  )
}