export default function Guess({guess}) {
    const fields = ["name", "region", "2pc", "4pc", "version"]
return (
    <div className="grid grid-cols-5 gap-2">
        {fields.map((key) => (
        <span key={key} className="h-16 w-16 border border-gray-400 bg-black flex items-center justify-center text-white mb-2">
          {guess[key]}
        </span>
      ))}
    </div>
)
}