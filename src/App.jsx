import { useState } from 'react'
import Header from './components/Header'
import Search from './components/Search'
import Guess from './components/Guess';
import artifacts from './data/artifacts.json'

export default function App() {
  const [guesses, setGuesses] = useState([])
  const answer = artifacts[0]

  const handleGuess = (artifact) => { // Duplicate handling for guesses
    if (guesses.find((g) => g.name === artifact.name)) // Don't add the new guess to the list of guesses if it's name is already within the list
      return
    setGuesses((prev) => [artifact, ...prev]) // Otherwise, add the new guess to the start of the list
  }
 
  return (
    <div className="flex flex-col items-center justify-center gap-y-5"> {/* Main container */}

    <Header />

    <Search onGuess={handleGuess} artifacts={artifacts} /> {/* Search component that calls handleGuess with every entered guess */}
    <div className="flex flex-col gap-2 mt-4">  {/* Div containing all the current guesses */}
        {guesses.map((guess, index) => (
          <Guess key={index} guess={guess}/>
        ))}
      </div>

     </div>
  )
}