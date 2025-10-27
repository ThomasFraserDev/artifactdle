import { motion } from "framer-motion";

export default function Guess({guess, answer}) {
  const fields = ["icon", "name", "region", "2pc", "4pc", "version"];
  return (
    <div className="flex gap-1">
      {fields.map((key, i) => {
        const checkField = guess[key] === answer[key]; // Check to see if the guess field matches the answer field, to determine it's span's background colour below
        let displayVal = guess[key];
        if (key === "version" && parseInt(guess[key].charAt(0), 10) > parseInt(answer[key].charAt(0), 10)) // If the guessed version is higher than the answer's version
          displayVal = `${guess[key]} ⬇️`;
        else if (key === "version" && parseInt(guess[key].charAt(0), 10) < parseInt(answer[key].charAt(0), 10)) // If the guessed version is lower than the answer's version
          displayVal = `${guess[key]} ⬆️`;
        const hasMatchingKeyword = (guess, answer, keywords) => {
          const g = (guess).toLowerCase();
          const a = (answer).toLowerCase();
          return keywords.some(kw => g.includes(kw) && a.includes(kw));
        };

        const buffKeywords = ["normal", "charged", "plunge", "em", "er", "atk%", "def%", "hp%", "crit rate", "elemental dmg", "reaction dmg", "skill dmg", "burst dmg", "character dmg", "healing", "res shred, shield"];
        const checkBuffs = 
          (key === "2pc" || key === "4pc") && 
          hasMatchingKeyword(guess[key], answer[key], buffKeywords);

        let size = "h-27 w-28"
        if (key === "name" || key === "2pc" || key === "4pc") {
          size = "h-27 w-60"
        }

        let bgColor;
        if (key === "icon") {
          bgColor = "transparent"
        }
        else if (checkField) {
          bgColor = "bg-green-600";
        } else if (checkBuffs) {
          bgColor = "bg-yellow-500";
        }  else {
          bgColor = "bg-red-800";
        }

          
        return (
          <motion.span
            key={key}
            className={`${size} border border-gray-400 flex items-center justify-center text-white rounded
              ${bgColor}`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{
              delay: i * 0.2, 
              duration: 0.2,
              ease: "easeOut"
            }}
            style={{ transformOrigin: "center" }}
          >
            {key === "icon" ? (
              <img src={guess.icon} alt={guess.name} className="w-27 h-26 object-contain" />
            ) : (
              displayVal
            )}
          </motion.span>
        );
      })}
    </div>
  );
}