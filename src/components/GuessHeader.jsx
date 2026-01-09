export default function GuessHeader() {
  const headers = ["Icon", "Name", "Region", "2pc Buff", "4pc Buff", "Version"];

  return (
    <div className="flex gap-1 font-bold text-white">
      {headers.map((header) => {
        let size = "h-12 w-28";
        if (header === "Name" || header === "2pc Buff" || header === "4pc Buff") {
          size = "h-12 w-50";
        }
        return (
          <span key={header} className={`border border-gray-400 flex items-center justify-center bg-purple-600 rounded ${size} flex-shrink-0`}>
            {header}
          </span>
        );
      })}
    </div>
  );
}
