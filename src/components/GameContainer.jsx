import {useState, useEffect} from "react";
import Guess from "./Guess";
import GuessHeader from "./GuessHeader";
import Search from "./Search";
import GameInfo from "./GameInfo";
import artifacts from "../data/artifacts.json";
import { getDailyArtifactIndex, getTodayDateString, getTimeUntilNextDaily, getDailyArtifactIndexForDate } from "../utils/dailyMode";

export default function GameContainer({ gameMode }) {
    const [guesses, setGuesses] = useState([]);
    const [answer, setAnswer] = useState(artifacts[Math.floor(Math.random() * artifacts.length)]);
    const [limit, setLimit] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    
    // Initialising separate stat states for daily and infinite modes
    const [dailyStreak, setDailyStreak] = useState(0);
    const [dailyHighScore, setDailyHighScore] = useState(0);
    const [dailyPrevAnswer, setDailyPrevAnswer] = useState("N/A");
    
    const [infiniteStreak, setInfiniteStreak] = useState(0);
    const [infiniteHighScore, setInfiniteHighScore] = useState(0);
    const [infinitePrevAnswer, setInfinitePrevAnswer] = useState("N/A");
    
    // Setting functions and states to their correct version depending on current mode
    const streak = gameMode === 'daily' ? dailyStreak : infiniteStreak;
    const highScore = gameMode === 'daily' ? dailyHighScore : infiniteHighScore;
    const prevAnswer = gameMode === 'daily' ? dailyPrevAnswer : infinitePrevAnswer;
    const setStreak = gameMode === 'daily' ? setDailyStreak : setInfiniteStreak;
    const setHighScore = gameMode === 'daily' ? setDailyHighScore : setInfiniteHighScore;
    const setPrevAnswer = gameMode === 'daily' ? setDailyPrevAnswer : setInfinitePrevAnswer;
    
    const isGuessed = guesses.some((g) => g.name === answer.name);

    // Load daily/infinite stats on reload/mode change
    useEffect(() => {
        if (gameMode === 'daily') {
            // Load daily streak/highScore/prevAnswer
            const dailyStats = JSON.parse(localStorage.getItem('dailyStats') || '{}');
            setDailyStreak(dailyStats.streak || 0);
            setDailyHighScore(dailyStats.highScore || 0);
            setDailyPrevAnswer(dailyStats.prevAnswer || "N/A");

            // Load guesses made for the daily puzzle, if any have previously been made
            const today = getTodayDateString();
            const dailyProgress = JSON.parse(localStorage.getItem('dailyProgress') || '{}');

            if (dailyProgress.date === today) {
                setGuesses(dailyProgress.guesses || []); 
                setLimit(dailyProgress.limit || 0);
            } else {
                setGuesses([]); // Reset guesses on a new day
                setLimit(0); // Reset guess limit on a new day
            }

            const dailyIndex = getDailyArtifactIndex(artifacts.length);
            setAnswer(artifacts[dailyIndex]); // Set daily artifact set
            const t = new Date();
            t.setHours(0, 0, 0, 0);
            const y = new Date(t);
            y.setDate(y.getDate() - 1);
            const yIndex = getDailyArtifactIndexForDate(artifacts.length, y);
            setDailyPrevAnswer(artifacts[yIndex].name);
        } else {
            // Load previous infinite tracked stats and reset the random artifact set, guesses and guess limit
            const infiniteStats = JSON.parse(localStorage.getItem('infiniteStats') || '{}');
            setInfiniteStreak(infiniteStats.streak || 0);
            setInfiniteHighScore(infiniteStats.highScore || 0);
            setInfinitePrevAnswer(infiniteStats.prevAnswer || "N/A");

            setAnswer(artifacts[Math.floor(Math.random() * artifacts.length)]);
            setGuesses([]);
            setLimit(0);
        }
        setHasLoaded(true);
    }, [gameMode]);

    // Save progress/stats
    useEffect(() => {
        if (!hasLoaded) return;
        if (gameMode === 'daily') {
			// Save daily mode stats
            const dailyProgress = {
                date: getTodayDateString(),
                guesses,
                limit,
                completed: isGuessed || limit >= 5
            };
            localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));

            const dailyStats = {
                streak: dailyStreak,
                highScore: dailyHighScore,
                prevAnswer: dailyPrevAnswer
            };
            localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
        } else {
            // Save infinite mode stats
            const infiniteStats = {
                streak: infiniteStreak,
                highScore: infiniteHighScore,
                prevAnswer: infinitePrevAnswer
            };
            localStorage.setItem('infiniteStats', JSON.stringify(infiniteStats));
        }
    }, [guesses, limit, gameMode, isGuessed, dailyStreak, dailyHighScore, dailyPrevAnswer, infiniteStreak, infiniteHighScore, infinitePrevAnswer, hasLoaded]);

    // When a day is finished, record it's answer to be displayed the next day
    useEffect(() => {
        if (gameMode === 'daily') {
            const t = new Date(); // Get today's date
            t.setHours(0, 0, 0, 0);
            const y = new Date(t); // Get yyesterday's date
            y.setDate(y.getDate() - 1);
            const yIndex = getDailyArtifactIndexForDate(artifacts.length, y); // Get yesterday's artifact set
            const yName = artifacts[yIndex].name;
            if (dailyPrevAnswer !== yName) {
                setDailyPrevAnswer(yName);
            }
        }
    }, [gameMode, isGuessed, limit, answer, dailyPrevAnswer]);

    useEffect(() => {
        if (streak > highScore) {
            setHighScore(streak);
        }
    }, [streak, highScore, setHighScore]);

    const handleGuess = (artifact) => {
        if (isGuessed || limit >= 5)
            return;
        if (guesses.find((g) => g.name === artifact.name))
            return;
        if (artifact.name === answer.name)
            setStreak((prev) => prev + 1);
        else if (limit + 1 >= 5)
            setStreak(0);
        setGuesses((prev) => [artifact, ...prev]);
        setLimit((prev) => prev + 1);
    };

    const handleReplay = () => {
        setGuesses([]);
        setPrevAnswer(answer.name);
        setAnswer(artifacts[Math.floor(Math.random() * artifacts.length)]);
        setLimit(0);
    };

    return (
        <div className="flex flex-col items-center gap-y-6 pb-20 px-4">

            <div className="w-full max-w-4xl">
                <div className="bg-purple-600/95 rounded-lg p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Guess the Artifact Set</h2>
                    <Search onGuess={handleGuess} artifacts={artifacts} disabled={isGuessed || limit >= 5}/>
                    {gameMode === 'daily' && (isGuessed || limit >= 5) && (
                        <p className="text-center text-sm text-gray-300 mt-4">
                            Next daily in: {getTimeUntilNextDaily().hours}h {getTimeUntilNextDaily().minutes}m
                        </p>
                    )}
                </div>
            </div>

            {isGuessed && (
                <div className="bg-green-400/95 w-full max-w-4xl py-8 px-6 flex flex-col gap-6 items-center text-black text-lg sm:text-2xl rounded-lg">
                    <p className="font-bold">You guessed correctly! 🎉</p>
                    {gameMode === 'infinite' && (
                        <button onClick={handleReplay} className="border-2 border-black px-6 py-3 cursor-pointer hover:bg-green-500 transition rounded"> 
                            Play again 
                        </button>
                    )}
                    {gameMode === 'daily' && (
                        <p className="text-sm text-gray-700">Come back tomorrow for the next game!</p>
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
                        <p className="text-sm text-gray-700">Come back tomorrow for the next game!</p>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-1 p-2 rounded bg-neutral-800 w-full max-w-min overflow-x-auto">
                <div className="min-w-min">
                    <GuessHeader />
                    {guesses.map((guess, index) => (
                        <Guess key={limit-index} guess={guess} answer={answer} />
                    ))}
                </div>
            </div>

            <GameInfo limit={limit} streak={streak} highScore={highScore} prevAnswer={prevAnswer} />
        </div>
    );
}