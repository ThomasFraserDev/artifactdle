import { useState } from 'react'

export default function Search({ onGuess, artifacts }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // Stop browser from refreshing with each submit
    const match = artifacts.find(
      (a) => a.name.toLowerCase() === query.toLowerCase() // Check to see if the guessed artifact exists
    )
    if (match) { // If the guess exists:
      onGuess(match) // Send the guess to App.jsx
      setQuery('') // Reset the guess
    } else {
      alert("The guessed artifact set doesn't exist.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Type artifact name..." value={query} onChange={(e) => setQuery(e.target.value)}/> {/* Search bar */}
      <button type="submit">
        Guess
      </button>
    </form>
  )
}