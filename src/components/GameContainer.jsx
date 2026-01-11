import {useState, useEffect} from "react";
import Guess from "./Guess";
import GuessHeader from "./GuessHeader";
import Search from "./Search";
import GameInfo from "./GameInfo";
import artifacts from "../data/artifacts.json";
import { getDailyArtifactIndex, getTodayDateString, getTimeUntilNextDaily, getDailyArtifactIndexForDate } from "../utils/dailyMode";

export default function GameContainer({ gameMode, game}) {
    // Normal mode states
    const [guesses, setGuesses] = useState([]);
    const [answer, setAnswer] = useState(artifacts[Math.floor(Math.random() * artifacts.length)]);
    const [limit, setLimit] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [shareGuesses, setShareGuesses] = useState([]);

    // Silhouette mode states
    const [silhouetteGuesses, setSilhouetteGuesses] = useState([]);
    const [silhouetteAnswer, setSilhouetteAnswer] = useState(artifacts[Math.floor(Math.random() * artifacts.length)]);
    const [silhouetteLimit, setSilhouetteLimit] = useState(0);
    const [silhouetteHasLoaded, setSilhouetteHasLoaded] = useState(false);
    const [silhouetteShowShareMenu, setSilhouetteShowShareMenu] = useState(false);
    const [silhouetteShareGuesses, setSilhouetteShareGuesses] = useState([]);
    const [silhouetteDailyCharIndex, setSilhouetteDailyCharIndex] = useState(0);

    // Initialising separate stat states for daily and infinite modes in the normal mode
    const [dailyStreak, setDailyStreak] = useState(0);
    const [dailyHighScore, setDailyHighScore] = useState(0);
    const [dailyPrevAnswer, setDailyPrevAnswer] = useState("N/A");
    
    const [infiniteStreak, setInfiniteStreak] = useState(0);
    const [infiniteHighScore, setInfiniteHighScore] = useState(0);
    const [infinitePrevAnswer, setInfinitePrevAnswer] = useState("N/A");
    
    // Initialising separate stat states for daily and infinite modes in the silhouette mode
    const [silhouetteDailyStreak, setSilhouetteDailyStreak] = useState(0);
    const [silhouetteDailyHighScore, setSilhouetteDailyHighScore] = useState(0);
    const [silhouetteDailyPrevAnswer, setSilhouetteDailyPrevAnswer] = useState("N/A");
    
    const [silhouetteInfiniteStreak, setSilhouetteInfiniteStreak] = useState(0);
    const [silhouetteInfiniteHighScore, setSilhouetteInfiniteHighScore] = useState(0);
    const [silhouetteInfinitePrevAnswer, setSilhouetteInfinitePrevAnswer] = useState("N/A");

    // Setting functions and states to their correct version depending on whether in daily/infinite mode in normal mode
    const streak = gameMode === 'daily' ? dailyStreak : infiniteStreak;
    const highScore = gameMode === 'daily' ? dailyHighScore : infiniteHighScore;
    const prevAnswer = gameMode === 'daily' ? dailyPrevAnswer : infinitePrevAnswer;
    const setStreak = gameMode === 'daily' ? setDailyStreak : setInfiniteStreak;
    const setHighScore = gameMode === 'daily' ? setDailyHighScore : setInfiniteHighScore;
    const setPrevAnswer = gameMode === 'daily' ? setDailyPrevAnswer : setInfinitePrevAnswer;

      // Setting functions and states to their correct version depending on whether in daily/infinite mode in silhouette mode
    const silhouetteStreak = gameMode === 'daily' ? silhouetteDailyStreak : silhouetteInfiniteStreak;
    const silhouetteHighScore = gameMode === 'daily' ? silhouetteDailyHighScore : silhouetteInfiniteHighScore;
    const silhouettePrevAnswer = gameMode === 'daily' ? silhouetteDailyPrevAnswer : silhouetteInfinitePrevAnswer;
    const setSilhouetteStreak = gameMode === 'daily' ? setSilhouetteDailyStreak : setSilhouetteInfiniteStreak;
    const setSilhouetteHighScore = gameMode === 'daily' ? setSilhouetteDailyHighScore : setSilhouetteInfiniteHighScore;
    const setSilhouettePrevAnswer = gameMode === 'daily' ? setSilhouetteDailyPrevAnswer : setSilhouetteInfinitePrevAnswer;
    
    const isGuessed = guesses.some((g) => g.name === answer.name);
    const isSilhouetteGuessed = silhouetteGuesses.some((g) => g.name === silhouetteAnswer.name);

    // Load daily/infinite stats on reload/mode change
    useEffect(() => {
    if (game === "main") {

        if (gameMode === 'daily') {
            const dailyStats = JSON.parse(localStorage.getItem('dailyStats') || '{}');
            setDailyStreak(dailyStats.streak || 0);
            setDailyHighScore(dailyStats.highScore || 0);
            setDailyPrevAnswer(dailyStats.prevAnswer || "N/A");

            const today = getTodayDateString();
            const dailyProgress = JSON.parse(localStorage.getItem('dailyProgress') || '{}');

            if (dailyProgress.date === today) {
                setGuesses(dailyProgress.guesses || []); 
                setLimit(dailyProgress.limit || 0);
            }

            else {
                setGuesses([]);
                setLimit(0);
                setShareGuesses([]);
            }

            const dailyIndex = getDailyArtifactIndex(artifacts.length, 0);
            setAnswer(artifacts[dailyIndex]);
            const t = new Date();
            t.setHours(0, 0, 0, 0);
            const y = new Date(t);
            y.setDate(y.getDate() - 1);
            const yIndex = getDailyArtifactIndexForDate(artifacts.length, 0, y);
            setDailyPrevAnswer(artifacts[yIndex].name);
        }

        else {
            const infiniteStats = JSON.parse(localStorage.getItem('infiniteStats') || '{}');
            setInfiniteStreak(infiniteStats.streak || 0);
            setInfiniteHighScore(infiniteStats.highScore || 0);
            setInfinitePrevAnswer(infiniteStats.prevAnswer || "N/A");

            setAnswer(artifacts[Math.floor(Math.random() * artifacts.length)]);
            setGuesses([]);
            setLimit(0);
            setShareGuesses([]);
            const newIndex = Math.floor(Math.random() * silhouetteAnswer['chars'].split(', ').length);
            setSilhouetteDailyCharIndex(newIndex);
        }
        setHasLoaded(true);
    }

    else if (game === "silhouette") {

        if (gameMode === 'daily') {
            const silhouetteDailyStats = JSON.parse(localStorage.getItem('silhouetteDailyStats') || '{}');
            setSilhouetteDailyStreak(silhouetteDailyStats.streak || 0);
            setSilhouetteDailyHighScore(silhouetteDailyStats.highScore || 0);
            setSilhouetteDailyPrevAnswer(silhouetteDailyStats.prevAnswer || "N/A");

            const today = getTodayDateString();
            const silhouetteDailyProgress = JSON.parse(localStorage.getItem('silhouetteDailyProgress') || '{}');

            if (silhouetteDailyProgress.date === today) {
                setSilhouetteGuesses(silhouetteDailyProgress.guesses || []); 
                setSilhouetteLimit(silhouetteDailyProgress.limit || 0);
            }

            else {
                setSilhouetteGuesses([]);
                setSilhouetteLimit(0);
                setSilhouetteShareGuesses([]);
            }

            const OFFSET = Math.floor(artifacts.length / 2);
            const dailyIndex = getDailyArtifactIndex(artifacts.length, OFFSET);
            setSilhouetteAnswer(artifacts[dailyIndex]);
            const t = new Date();
            t.setHours(0, 0, 0, 0);
            const y = new Date(t);
            y.setDate(y.getDate() - 1);
            const yIndex = getDailyArtifactIndexForDate(artifacts.length, OFFSET, y);
            setSilhouetteDailyPrevAnswer(artifacts[yIndex].name);
        }

        else {
            const silhouetteInfiniteStats = JSON.parse(localStorage.getItem('silhouetteInfiniteStats') || '{}');
            setSilhouetteInfiniteStreak(silhouetteInfiniteStats.streak || 0);
            setSilhouetteInfiniteHighScore(silhouetteInfiniteStats.highScore || 0);
            setSilhouetteInfinitePrevAnswer(silhouetteInfiniteStats.prevAnswer || "N/A");

            setSilhouetteAnswer(artifacts[Math.floor(Math.random() * artifacts.length)]);
            setSilhouetteGuesses([]);
            setSilhouetteLimit(0);
            setSilhouetteShareGuesses([]);
        }
        setSilhouetteHasLoaded(true);
  }
}, [game, gameMode]);

// Save progress/stats
useEffect(() => {
    if (game === "main") {

        if (!hasLoaded) {
            return;
        }

        if (gameMode === 'daily') {
            const dailyProgress = { date: getTodayDateString(), guesses, shareGuesses, limit, completed: isGuessed || limit >= 5};
            localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));
            const dailyStats = { streak: dailyStreak, highScore: dailyHighScore, prevAnswer: dailyPrevAnswer };
            localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
        } 

        else {
            const infiniteStats = { streak: infiniteStreak, highScore: infiniteHighScore, prevAnswer: infinitePrevAnswer };
            localStorage.setItem('infiniteStats', JSON.stringify(infiniteStats));
        }
    } 

    else if (game === "silhouette") {
        if (!silhouetteHasLoaded) {
            return;
        }

        if (gameMode === 'daily') {
            const silhouetteDailyProgress = { date: getTodayDateString(), guesses: silhouetteGuesses, shareGuesses: silhouetteShareGuesses, limit: silhouetteLimit, completed: isSilhouetteGuessed || silhouetteLimit >= 5};
            localStorage.setItem('silhouetteDailyProgress', JSON.stringify(silhouetteDailyProgress));
            const silhouetteDailyStats = { streak: silhouetteDailyStreak, highScore: silhouetteDailyHighScore, prevAnswer: silhouetteDailyPrevAnswer};
            localStorage.setItem('silhouetteDailyStats', JSON.stringify(silhouetteDailyStats));
        } 
        else {
        const silhouetteInfiniteStats = {streak: silhouetteInfiniteStreak, highScore: silhouetteInfiniteHighScore, prevAnswer: silhouetteInfinitePrevAnswer};
        localStorage.setItem('silhouetteInfiniteStats', JSON.stringify(silhouetteInfiniteStats));
        }
  }
}, [game, gameMode,
  // main
  hasLoaded, guesses, shareGuesses, limit, isGuessed, dailyStreak, dailyHighScore, dailyPrevAnswer, infiniteStreak, infiniteHighScore, infinitePrevAnswer,
  // silhouette
  silhouetteHasLoaded, silhouetteGuesses, silhouetteShareGuesses, silhouetteLimit, isSilhouetteGuessed, silhouetteDailyStreak, silhouetteDailyHighScore, silhouetteDailyPrevAnswer, silhouetteInfiniteStreak, silhouetteInfiniteHighScore, silhouetteInfinitePrevAnswer
]);

// When a day is finished, record it's answer to be displayed as the previous answer the next day
useEffect(() => {
    if (gameMode === 'daily') {
        const t = new Date(); // Get today's date
        t.setHours(0, 0, 0, 0);
        const y = new Date(t); // Get yyesterday's date
        y.setDate(y.getDate() - 1);
        const yIndex = getDailyArtifactIndexForDate(artifacts.length, 0, y); // Get yesterday's artifact set
        const yName = artifacts[yIndex].name;
        if (dailyPrevAnswer !== yName) {
            setDailyPrevAnswer(yName);
        }
    }
}, [gameMode, isGuessed, limit, answer, dailyPrevAnswer]);

// Update high score
useEffect(() => {
    if (game === "main") {
        if (streak > highScore) {
            setHighScore(streak);
        }
    }
    else if (game === "silhouette") {
        if (silhouetteStreak > silhouetteHighScore) {
            setSilhouetteHighScore(silhouetteStreak);
        }
    }
}, [game, streak, highScore, setHighScore, silhouetteStreak, silhouetteHighScore, setSilhouetteHighScore]);

// Update relevant stats on each guess
const handleGuess = (artifact) => {
    if (game === "main") {
        if (isGuessed || limit >= 5) {
            return;
        }
        if (guesses.find((g) => g.name === artifact.name)) {
            return;
        }
        if (artifact.name === answer.name) {
            setStreak((prev) => prev + 1);
        } 
        else if (limit + 1 >= 5) {
            setStreak(0);
        }
        setGuesses((prev) => [artifact, ...prev]);
        setLimit((prev) => prev + 1);
    } 
    else if (game === "silhouette") {
        if (isSilhouetteGuessed || silhouetteLimit >= 5) {
            return;
        }
        if (silhouetteGuesses.find((g) => g.name === artifact.name)) {
            return;
        }
        if (artifact.name === silhouetteAnswer.name) {
            setSilhouetteStreak((prev) => prev + 1);
        }
        else if (silhouetteLimit + 1 >= 5) {
            setSilhouetteStreak(0); 
        }
        setSilhouetteGuesses((prev) => [...prev, artifact]);
        setSilhouetteLimit((prev) => prev + 1);
  }
};

// Update relevant stats on replay
const handleReplay = () => {
    if (game === "main") {
        setGuesses([]);
        setPrevAnswer(answer.name);
        setAnswer(artifacts[Math.floor(Math.random() * artifacts.length)]);
        setLimit(0);
    }
    else if (game === "silhouette") {
        setSilhouetteGuesses([]);
        setSilhouettePrevAnswer(silhouetteAnswer.name);
        setSilhouetteAnswer(artifacts[Math.floor(Math.random() * artifacts.length)]);
        setSilhouetteLimit(0);
    }
};

// Generate share result text based on score (separate per game)
const generateScoreText = () => {
    const isSil = game === 'silhouette';
    const guessed = isSil ? isSilhouetteGuessed : isGuessed;
    const attempts = isSil ? silhouetteLimit : limit;
    const guessesLines = (isSil ? silhouetteShareGuesses : shareGuesses).join('\n');
    const emoji = guessed ? "✅" : "❌";
    const result = guessed ? `${attempts}/5` : "5/5";
    const date = getTodayDateString();
    const title = isSil ? "Artifactdle Silhouette" : "Artifactdle";
    return `${title}\n${date} - ${result} ${emoji}\n${guessesLines}\n\nhttps://artifactdle.vercel.app`;
};

// Show alert when share text copied to clipboard
const handleCopyScore = async () => {
    try {
        await navigator.clipboard.writeText(generateScoreText());
        alert("Score copied to clipboard!");
    } catch (err) {
        alert("Failed to copy score");
    }
};

// Open twitter with the share result text as a tweet when sharing via twitter
const handleTweetScore = () => {
    const text = encodeURIComponent(generateScoreText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
};

    return (
        <div className="flex flex-col items-center gap-y-6 pb-20 px-4">
            {game === 'main' ? (
                <>

            <div className="w-full max-w-4xl">
                <div className="bg-purple-600/95 rounded-lg p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Guess the Artifact Set</h2>
                    <Search onGuess={handleGuess} artifacts={artifacts} disabled={isGuessed || limit >= 5}/>
                    {gameMode === 'daily' && (isGuessed || limit >= 5) && (
                        <p className="text-center text-sm text-gray-300 mt-4">
                            Next daily artifact in: {getTimeUntilNextDaily().hours}h {getTimeUntilNextDaily().minutes}m
                        </p>
                    )}
                </div>
            </div>

{isGuessed && (
    <div className="bg-green-400/95 w-full max-w-4xl py-8 px-6 flex flex-col gap-6 items-center text-center text-black text-lg sm:text-2xl rounded-lg">
        <p className="font-bold">You guessed correctly!</p>
        {gameMode === 'infinite' && (
            <div className="text-center">
                <button onClick={handleReplay} className="border-2 border-black px-6 py-3 cursor-pointer hover:bg-green-500 transition rounded"> 
                    Play again 
                </button>
                </div>
                )}
        
        {gameMode === 'daily' && (
            <div className="text-center">
                <p className="text-sm text-gray-700">Come back tomorrow for the next game!</p>
                <p className="text-sm text-gray-900 underline cursor-pointer" onClick={() => setShowShareMenu(!showShareMenu)}> 
                    Share score 
                </p>
                {showShareMenu && (
                    <div className="mt-4 p-4 bg-neutral-800 rounded-lg shadow-lg border-2 border-gray-300">
                        <div className="flex flex-col gap-3">
                            <button  onClick={handleCopyScore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer font-">
                                Copy to Clipboard
                            </button>
                            <button onClick={handleTweetScore} className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition cursor-pointer">
                                Share on Twitter
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
)}
            {!isGuessed && limit >= 5 && (
                <div className="bg-red-400/95 w-full max-w-4xl py-8 px-6 flex flex-col gap-6 items-center text-black text-lg sm:text-2xl rounded-lg">
                    <p>You didn't manage to guess the set. The answer was <span className="font-bold text-green-800">{answer.name}</span>.</p>
                    {gameMode === 'infinite' && (
                        <button onClick={handleReplay} className="border-2 border-black px-6 py-3 cursor-pointer hover:bg-red-500 transition rounded"> 
                            Play again 
                        </button>
                    )}
                    {gameMode === 'daily' && (
                        <div className="text-center">
                            <p className="text-sm text-gray-700">Come back tomorrow for the next game!</p>
                            <p className="text-sm text-gray-900 underline cursor-pointer" onClick={() => setShowShareMenu(!showShareMenu)}> 
                                Share score
                            </p>
                            {showShareMenu && (
                                <div className="mt-4 p-4 bg-neutral-800 rounded-lg shadow-lg border-2 border-gray-300">
                                    <div className="flex flex-col gap-3">
                                        <button onClick={handleCopyScore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">
                                            Copy to Clipboard
                                        </button>
                                        <button onClick={handleTweetScore} className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition cursor-pointer">
                                            Share on Twitter
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-1 p-2 rounded bg-neutral-800 w-full max-w-min overflow-x-auto">
                <div className="min-w-min">
                    <GuessHeader game={game}/>
                    {guesses.map((guess, index) => (
                        <Guess key={limit-index} guess={guess} answer={answer} setShareGuesses={setShareGuesses} gameMode={gameMode} game={game}/>
                    ))}
                </div>
            </div>

            <GameInfo limit={limit} streak={streak} highScore={highScore} prevAnswer={prevAnswer} game={game}/>
                </>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center w-full max-w-4xl bg-purple-600/95 rounded-lg p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Can you name this artifact?</h1>
                        <img src={silhouetteAnswer.icon} alt={silhouetteAnswer.name} className={`w-64 h-64 object-contain filter mb-8 ${silhouetteLimit >= 4 ? 'brightness-100' : 'brightness-0'} ${silhouetteLimit >= 5 ? 'blur-none' : 'blur-xl'}`}/>
                        <div className="grid grid-cols-2 gap-3 mb-6 w-full">
                            {[
                                { label: "Role", value: silhouetteAnswer['role'] },
                                { label: "4pc Buff", value: silhouetteAnswer['4pc'] },
                                { label: "Character", value: silhouetteAnswer['chars'].split(', ')[gameMode === 'daily' ? silhouetteDailyCharIndex : Math.floor(Math.random() * silhouetteAnswer['chars'].split(', ').length)] },
                                { label: "Reveal Colours", value: "✅" }
                            ].map((hint, i) => (
                                <div key={i} className={`p-4 rounded-lg text-center text-sm font-semibold transition-all ${silhouetteLimit > i ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                                    {silhouetteLimit > i 
                                        ? `${hint.label}: ${hint.value}`
                                        : `🔒 Hint ${i + 1} - ${hint.label}`
                                    }
                                </div>
                            ))}
                        </div>
                        <Search onGuess={handleGuess} artifacts={artifacts} disabled={isSilhouetteGuessed || silhouetteLimit >= 5}/>
                    </div>
                    {isSilhouetteGuessed && (
                        <div className="bg-green-400/95 w-full max-w-4xl py-8 px-6 flex flex-col gap-6 items-center text-center text-black text-lg sm:text-2xl rounded-lg">
                            <p className="font-bold">You guessed correctly!</p>
                            {gameMode === 'infinite' && (
                                <div className="text-center">
                                    <button onClick={handleReplay} className="border-2 border-black px-6 py-3 cursor-pointer hover:bg-green-500 transition rounded"> 
                                        Play again 
                                    </button>
                                </div>
                            )}
                            {gameMode === 'daily' && (
                                <div className="text-center">
                                    <p className="text-sm text-gray-700">Come back tomorrow for the next game!</p>
                                    <p className="text-sm text-gray-900 underline cursor-pointer" onClick={() => setSilhouetteShowShareMenu(!silhouetteShowShareMenu)}> 
                                        Share score 
                                    </p>
                                    {silhouetteShowShareMenu && (
                                        <div className="mt-4 p-4 bg-neutral-800 rounded-lg shadow-lg border-2 border-gray-300">
                                            <div className="flex flex-col gap-3">
                                                <button  onClick={handleCopyScore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer font-">
                                                    Copy to Clipboard
                                                </button>
                                                <button onClick={handleTweetScore} className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition cursor-pointer">
                                                    Share on Twitter
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {!isSilhouetteGuessed && silhouetteLimit >= 5 && (
                        <div className="bg-red-400/95 w-full max-w-4xl py-8 px-6 flex flex-col gap-6 items-center text-black text-lg sm:text-2xl rounded-lg">
                            <p>You didn't manage to guess the set. The answer was <span className="font-bold text-green-800">{silhouetteAnswer.name}</span>.</p>
                            {gameMode === 'infinite' && (
                                <button onClick={handleReplay} className="border-2 border-black px-6 py-3 cursor-pointer hover:bg-red-500 transition rounded"> 
                                    Play again 
                                </button>
                            )}
                            {gameMode === 'daily' && (
                                <div className="text-center">
                                    <p className="text-sm text-gray-700">Come back tomorrow for the next game!</p>
                                    <p className="text-sm text-gray-900 underline cursor-pointer" onClick={() => setSilhouetteShowShareMenu(!silhouetteShowShareMenu)}> 
                                        Share score
                                    </p>
                                    {silhouetteShowShareMenu && (
                                        <div className="mt-4 p-4 bg-neutral-800 rounded-lg shadow-lg border-2 border-gray-300">
                                            <div className="flex flex-col gap-3">
                                                <button onClick={handleCopyScore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">
                                                    Copy to Clipboard
                                                </button>
                                                <button onClick={handleTweetScore} className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition cursor-pointer">
                                                    Share on Twitter
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex flex-col gap-1 p-2 rounded bg-neutral-800 w-full max-w-min overflow-x-auto">
                        <GuessHeader game={game}/>
                        <div className="flex flex-row gap-1">
                            {silhouetteGuesses.map((guess, index) => (
                                <Guess key={`${guess.name}-${index}`} guess={guess} answer={silhouetteAnswer} setShareGuesses={setSilhouetteShareGuesses} gameMode={gameMode} game={game}/>
                            ))}
                        </div>
                    </div>

                    <GameInfo limit={silhouetteLimit} streak={silhouetteStreak} highScore={silhouetteHighScore} prevAnswer={silhouettePrevAnswer} game={game}/>
                </>
            )}
        </div>
    );
}