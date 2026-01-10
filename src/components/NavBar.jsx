export default function Navbar({ onBackgroundChange, onGameChange, gameMode, onModeToggle }) {
  const backgrounds = [
    "/assets/backgrounds/nodkrai.png",
    "/assets/backgrounds/fatui.jpg",
    "/assets/backgrounds/archons.jpg",
    "/assets/backgrounds/columbina.jpg"
  ];

  const handleBackgroundChange = (e) => {
    onBackgroundChange(e.target.value); // Update background to selected option
  };

  const handleGameChange = (e) => {
    onGameChange(e.target.value);
  }

  return (
    <nav className="w-full grid grid-cols-3 place-items-center justify-between bg-neutral-900 p-3 sm:p-4 text-gray-200">
        <button  onClick={onModeToggle} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-lg transition text-lg font-semibold">
          {gameMode === 'daily' ? '📅 Daily' : '♾️ Infinite'}
        </button>

        <div>
          <h2 className="text-xl sm:text-4xl font-semibold px-4">Artifactdle</h2>
          <div className="flex flex-row justify-between">
            <button value={"main"} onClick={handleGameChange} className="px-3 py-1 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-lg transition text-lg font-semibold">
              Normal
            </button>
            <button value={"silhouette"} onClick={handleGameChange} className="px-3 py-1 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-lg transition text-lg font-semibold">
              Silhouette
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 font-semibold">
          <h2 className="text-sm sm:text-lg">Background:</h2>
          <select onChange={handleBackgroundChange} className="bg-neutral-800 text-sm sm:text-base px-2 py-1 rounded cursor-pointer">
            <option value={backgrounds[0]}>Nod Krai</option>
            <option value={backgrounds[1]}>Fatui</option>
            <option value={backgrounds[2]}>Archons</option>
            <option value={backgrounds[3]}>Columbina</option>
          </select>
        </div>
    </nav>
  );
}