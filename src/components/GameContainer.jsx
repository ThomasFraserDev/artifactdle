import { useState } from 'react'
import Search from './Search'
import Guess from './Guess';
import artifacts from '../data/artifacts.json'

export default function GameContainer() {
    const [guesses, setGuesses] = useState([])
    const [answer, setAnswer] = useState(artifacts[Math.floor(Math.random() * artifacts.length)])
    const [limit, setLimit] = useState(0)
    const [streak, setStreak] = useState(0)
    const isGuessed = guesses.some((g) => g.name === answer.name)

    const handleGuess = (artifact) => { 
        if ((isGuessed) || (limit >= 5)) // Check for if the artifact set has been guessed or the limit of guesses has been exceeded
            return
        if (guesses.find((g) => g.name === artifact.name)) // Don't add the new guess to the list of guesses if it's name is already within the list
            return
        if (artifact.name === answer.name)
            setStreak((prev) => prev+1) // Increment the win streak if the guess was correct
        if ((limit >=5) && (!isGuessed))
            setStreak(0) // If the artifact set isn't guessed, reset the streak
        setGuesses((prev) => [artifact, ...prev]) // Otherwise, add the new guess to the start of the list
        setLimit((prev) => prev+1) // Increment the limit counter
    }

    const handleReplay = () => { // Resets the guesses, answer and guess limit to replay the game
        setGuesses([])
        setAnswer(artifacts[Math.floor(Math.random() * artifacts.length)])
        setLimit(0)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <h3>Guesses: {limit} / 5</h3>
            <h3>Win Streak: {streak} 🔥</h3>
            <Search onGuess={handleGuess} artifacts={artifacts} disabled={isGuessed || limit >= 5} /> {/* Search component that calls handleGuess with every entered guess */}
            <div className="flex flex-col gap-2 mt-4">  {/* Div containing all the current guesses */}
                {guesses.map((guess, index) => (
                <Guess key={index} guess={guess} answer={answer}/>
            ))}
        </div>
        {isGuessed && (
            <div>
                <p>You guessed correctly!</p>
                <button onClick={handleReplay}> Play again </button>
            </div>
        )}

        {!isGuessed && limit>=5 && (
            <div>
                <p>You didn't manage to guess on time. The answer was {answer.name}</p>
                <button onClick={handleReplay}> Play again </button>
            </div>
        )}
      </div>
    )
}