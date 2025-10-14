import Search from "./Search"

export default function GameInfo({limit, streak, prevAnswer, isDisabled, onGuess, artifacts}) {
    return (
        <div className="flex flex-col items-center text-center py-10 px-20 bg-blue-900/95">
            <div className="flex flex-row items-center gap-3 p-4 text-center">
                <div>
                    <img  src="../src/assets/kokomi.png" alt="Kokomi thinking" className="max-w-64 h-auto"/>
                </div>
                <div className="space-y-1 px-15">
                    <h2 className="text-5xl font-bold mb-10">Artifactdle</h2>
                    <h3 className="text-2xl">Guesses: {limit} / 5</h3>
                    <h3 className="text-2xl">Win Streak: {streak} 🔥</h3>
                    <h3 className="text-2xl">Previous Answer: {prevAnswer}</h3>
                </div>
            </div>
            <Search onGuess={onGuess} artifacts={artifacts} disabled={isDisabled}/> {/* Search component that calls handleGuess with every entered guess, is disabled when the answer is guessed or the guess limit is exceeded */}
        </div>
    )
}