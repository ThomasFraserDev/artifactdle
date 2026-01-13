export default function GameInfo({ limit, streak, highScore, prevAnswer, game }) {
    return (
        <div className="w-full max-w-4xl">
            <div className="bg-purple-600/95 rounded-lg p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
                    <div className="flex flex-col items-center">
                        <img 
                            src={game === 'normal' ? "/assets/misc/sandrone.png" : "/assets/misc/columbina.webp"} alt={game === 'normal' ? "Sandrone" : "Columbina"} className="w-32 h-32 sm:w-64 sm:h-64 object-contain mb-2 border-4 border-blue-900 bg-cyan-700/50 rounded-2xl"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 text-lg sm:text-xl font-semibold">
                        <div className="bg-neutral-800 rounded-2xl p-4">
                            <p className="text-gray-400 text-sm">Guesses</p>
                            <p className="text-2xl sm:text-3xl font-bold">{limit} / 5</p>
                        </div>
                        <div className="bg-neutral-800 rounded-2xl p-4">
                            <p className="text-gray-400 text-sm">Win Streak</p>
                            <p className="text-2xl sm:text-3xl font-bold">{streak} 🔥</p>
                        </div>
                        <div className="bg-neutral-800 rounded-2xl p-4">
                            <p className="text-gray-400 text-sm">High Score</p>
                            <p className="text-2xl sm:text-3xl font-bold">{highScore} 🔥</p>
                        </div>
                        <div className="bg-neutral-800 rounded-2xl p-4">
                            <p className="text-gray-400 text-sm">Previous Answer</p>
                            <p className="text-lg sm:text-xl font-bold truncate">{prevAnswer}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}