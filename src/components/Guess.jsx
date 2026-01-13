import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Guess({guess, answer, setShareGuesses, gameMode, game}) {
  const fields = ["icon", "name", "region", "2pc", "4pc", "version"];
  let shareGuess = "";
  
  const renderNormalGuess = () => (
    <div className="flex gap-1">
      {fields.map((key, i) => {
        const checkField = guess[key] === answer[key]; // Check to see if the guess field matches the answer field, to determine it's span's background colour below
        let displayVal = guess[key];

        if (key === "version" && parseInt(guess[key].charAt(0), 10) > parseInt(answer[key].charAt(0), 10)) { // If the guessed version is higher than the answer's version
          displayVal = `${guess[key]} ⬇️`;
        }
        else if (key === "version" && parseInt(guess[key].charAt(0), 10) < parseInt(answer[key].charAt(0), 10)) {// If the guessed version is lower than the answer's version
          displayVal = `${guess[key]} ⬆️`;
        }

        const hasMatchingKeyword = (guess, answer, keywords) => {
          const g = (guess).toLowerCase();
          const a = (answer).toLowerCase();

          return keywords.some(kw => {
            const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Handle special characters
            const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
            return pattern.test(g) && pattern.test(a);
          });
        };

        const buffKeywords = ["normal", "charged", "plunge", "em", "er", "atk%", "def%", "hp%", "crit rate", "elemental dmg", "reaction dmg", "skill dmg", "burst dmg", "character dmg", "healing", "res shred, shield"];
        const checkBuffs = 
          (key === "2pc" || key === "4pc") && 
          hasMatchingKeyword(guess[key], answer[key], buffKeywords);

        let size = "h-27 w-28"
        if (key === "name" || key === "2pc" || key === "4pc") {
          size = "h-27 w-50"
        }

        let bgColor;
        if (key === "icon") {
          bgColor = "transparent"
        }
        else if (checkField) {
          bgColor = "bg-green-600";
          shareGuess += "🟩";
        } else if (checkBuffs) {
          bgColor = "bg-yellow-500"; // Set background to yellow if guess was close
          shareGuess += "🟨";
        }  else {
          bgColor = "bg-red-800";
          shareGuess += "🟥";
        }

        return (
          <motion.span key={key} className={`${size} border border-gray-400 flex items-center justify-center text-center text-white rounded ${bgColor} flex-shrink-0`} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{delay: i * 0.2, duration: 0.2, ease: "easeOut"}} style={{ transformOrigin: "center" }}>
            {key === "icon" ? (
              <img src={guess.icon} alt={guess.name} className="w-27 h-26 object-contain"/>
            ) : (
              displayVal
            )}
          </motion.span>
        );
      })}
    </div>
  );

  const renderSilhouetteGuess = () => {
    let bgColor;
    if (guess.name === answer.name) {
      bgColor = "bg-green-600";
    } 
    else {
      bgColor = "bg-red-800";
    }
    return (
      <div className="flex flex-row gap-1">
        <motion.span className={`h-27 w-42 border border-gray-400  flex items-center justify-center text-center text-white rounded ${bgColor} flex-shrink-0`} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{delay: 0.2, duration: 0.2, ease: "easeOut"}} style={{ transformOrigin: "center" }}>
          <img src={guess.icon} alt={guess.name} className="w-27 h-26 object-contain"/>
        </motion.span>
      </div>
    );
  };

  useEffect(() => {
    if (gameMode === "daily" && game === "normal") {
      setShareGuesses(prev => [...prev, shareGuess]);
    }
  }, [guess, answer, setShareGuesses, game, gameMode]);

  return game === "normal" ? renderNormalGuess() : renderSilhouetteGuess();
}