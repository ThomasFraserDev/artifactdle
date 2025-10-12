export default function Guess({guess, answer}) {
    const fields = ["name", "region", "2pc", "4pc", "version"]
return (
    <div className="grid grid-cols-5 gap-1">
        {fields.map((key) => { 
            const checkField = guess[key] === answer[key]; // Check to see if the guess field matches the answer field, to determine it's span's background colour below
            return (
        <span key={key} className={`h-16 w-45 border border-gray-400 flex items-center justify-center text-white rounded ${checkField ? 'bg-green-600' : 'bg-red-800'}`}>
          {guess[key]}
        </span>
            )})}
    </div>
)
}