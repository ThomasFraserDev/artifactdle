import { useState, useEffect, useRef } from 'react'

export default function Search({ onGuess, artifacts, disabled }) {
  const [input, setInput] = useState('') // Initialise input
  const [suggestions, setSuggestions] = useState([]) // Initialise the list of suggested artifact sets
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) { // If the user clicks outside of the search bar and suggestions list
        setShowSuggestions(false) // Hide the suggestions
        setInput("") // Reset the input
      }
    }
    document.addEventListener('mousedown', handleClickOutside) // Start listening for clicks and call handleClickOutside when one is detected
    return () => document.removeEventListener('mousedown', handleClickOutside) // Remove the listener when the component is unmounted
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setInput(value)

    if (value.trim() === '') { // Rest the suggestions if the input is empty
      setSuggestions(artifacts)
      return
    }
    const matches = artifacts.filter((a) =>
      a.name.toLowerCase().startsWith(value.toLowerCase()) // Find suggestions starting with the current input
    )
    setSuggestions(matches)
  }

  const handleClick = () => { // Show suggestions when the search bar is clicked on
    setShowSuggestions(true)
    setSuggestions(artifacts)
  }

  const handleSelect = (artifact) => { // Send a guess to GameContainer.jsx, reset the input and hide the suggestions after selecting an artifact set
    onGuess(artifact)
    setInput('')
    setShowSuggestions(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault() // Stop browser from refreshing with each submit
    const match = artifacts.find(
      (a) => a.name.toLowerCase() === input.toLowerCase() // Check to see if the guessed artifact exists
    )
    if (match) { // If the guess exists:
      onGuess(match) // Send the guess to GameContainer.jsx
      setInput('') // Reset the guess
      setShowSuggestions(false) // Reset the suggestions
    } else {
      alert("The guessed artifact set doesn't exist.")
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
    <form onSubmit={handleSubmit} >

      <input type="text" name="fake-name" style={{ display: 'none' }} /> {/* Dummy field to stop safari autofill */}
      <input type="password" name="fake-password" style={{ display: 'none' }} /> {/* Dummy field to stop safari autofill */}

      <input type="text" name="artifact-search" placeholder="Type artifact name..." autoComplete="off" value={input} onClick={handleClick}onChange={handleChange} disabled={disabled}/> {/* Search bar */}
      <button type="submit" disabled={disabled}>
        Guess
      </button>
    </form>

    {showSuggestions && suggestions.length > 0 && ( // Show the list of suggestions when at least 1 exists and showSuggestions is true
        <ul className="absolute top-full left-0 right-0 mt-2 max-h-48 overflow-y-auto border border-gray-400 bg-gray-500 rounded z-10">
          {suggestions.map((artifact) => ( // Create each suggestion as an li
            <li key={artifact.name} onClick={() => handleSelect(artifact)} className="p-2">
              {artifact.name}
            </li>
          ))}
        </ul>
      )}
      </div>
  )
}