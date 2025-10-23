import { motion } from "framer-motion";

export default function Guess({guess, answer}) {
  const fields = ["name", "region", "2pc", "4pc", "version"];
  return (
    <div className="grid grid-cols-5 gap-1">
      {fields.map((key, i) => {
        const checkField = guess[key] === answer[key]; // Check to see if the guess field matches the answer field, to determine it's span's background colour below
        let displayVal = guess[key];
        if (key === "version" && parseInt(guess[key].charAt(0), 10) > parseInt(answer[key].charAt(0), 10)) // If the guessed version is higher than the answer's version
          displayVal = `${guess[key]} ⬇️`;
        else if (key === "version" && parseInt(guess[key].charAt(0), 10) < parseInt(answer[key].charAt(0), 10)) // If the guessed version is lower than the answer's version
          displayVal = `${guess[key]} ⬆️`;
          
        return (
          <motion.span
            key={key}
            className={`h-16 w-45 border border-gray-400 flex items-center justify-center text-white rounded
              ${checkField ? "bg-green-600" : "bg-red-800"}`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{
              delay: i * 0.2, 
              duration: 0.2,
              ease: "easeOut"
            }}
            style={{ transformOrigin: "center" }}
          >
            {displayVal}
          </motion.span>
        );
      })}
    </div>
  );
}
