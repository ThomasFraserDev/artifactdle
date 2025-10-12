export default function GuessHeader() {
  const headers = ["Name", "Region", "2pc Buff", "4pc Buff", "Version"]

  return (
    <div className="flex gap-1 font-bold text-white">
      {headers.map((header) => (
        <span key={header} className="h-16 w-45 border border-gray-400 flex items-center justify-center bg-gray-700 rounded">
          {header}
        </span>
      ))}
    </div>
  )
}
