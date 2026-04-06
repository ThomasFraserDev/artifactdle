import { useEffect, useState } from "react";

export default function Navbar({ onBackgroundChange, onGameChange, gameMode, onModeToggle, currentBackground }) {
  const backgrounds = [
    { path: "/assets/backgrounds/nodkrai.png", label: "Nod Krai" },
    { path: "/assets/backgrounds/fatui.jpg", label: "Fatui" },
    { path: "/assets/backgrounds/archons.jpg", label: "Archons" },
    { path: "/assets/backgrounds/columbina.jpg", label: "Columbina" }
  ];

  const [selectedBackground, setSelectedBackground] = useState(currentBackground || backgrounds[0].path);
  const [isBackgroundMenuOpen, setIsBackgroundMenuOpen] = useState(false);

  useEffect(() => {
    if (currentBackground) {
      setSelectedBackground(currentBackground);
    }
  }, [currentBackground]);

  const handleBackgroundChange = (backgroundPath) => {
    setSelectedBackground(backgroundPath);
    onBackgroundChange(backgroundPath);
    setIsBackgroundMenuOpen(false);
  };

  const selectedBackgroundLabel = backgrounds.find((bg) => bg.path === selectedBackground)?.label || "Choose";

  const handleGameChange = (e) => {
    onGameChange(e.target.value);
  }

  return (
    <>
        <nav className="relative z-40 w-full bg-neutral-900/80 backdrop-blur-md p-3 text-gray-200 lg:hidden flex flex-col gap-3">
            <button onClick={onModeToggle} className="w-full px-3 py-2 rounded-lg bg-purple-600 text-base font-semibold transition hover:cursor-pointer hover:bg-purple-700 hover:scale-105 text-center">
            {gameMode === 'daily' ? '📅 Daily' : '♾️ Infinite'}
          </button>

          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold px-2 text-center">Artifactdle</h2>
            <div className="flex flex-row gap-2">
              <button value={"normal"} onClick={handleGameChange} className="px-3 py-2 rounded-lg bg-purple-600 text-base font-semibold transition hover:cursor-pointer hover:bg-purple-700 hover:scale-105">
                Normal
              </button>
              <button value={"silhouette"} onClick={handleGameChange} className="px-3 py-2 rounded-lg bg-purple-600 text-base font-semibold transition hover:cursor-pointer hover:bg-purple-700 hover:scale-105">
                Silhouette
              </button>
              <button value={"substats"} onClick={handleGameChange} className="px-3 py-2 rounded-lg bg-purple-600 text-base font-semibold transition hover:cursor-pointer hover:bg-purple-700 hover:scale-105">
                Build
              </button>
            </div>
          </div>

          <div className="relative flex w-full flex-col items-center gap-2 font-semibold">
            <button onClick={() => setIsBackgroundMenuOpen((prev) => !prev)} className="flex w-full items-center justify-between gap-3 rounded-lg border border-neutral-500 bg-neutral-800 px-3 py-2 text-sm hover:cursor-pointer">
              <span>Background: {selectedBackgroundLabel}</span>
              <span>{isBackgroundMenuOpen ? "▲" : "▼"}</span>
            </button>

            <div className={`${isBackgroundMenuOpen ? "block" : "hidden"} absolute top-full z-20 mt-2 w-full rounded-xl border border-neutral-600 bg-neutral-900/95 p-2 shadow-xl backdrop-blur`}>
              <div className="grid w-full grid-cols-2 gap-2">
                {backgrounds.map((bg) => {
                  const isSelected = selectedBackground === bg.path;
                  return (
                    <button key={bg.path} onClick={() => handleBackgroundChange(bg.path)} className={`group relative h-16 overflow-hidden rounded-lg border transition hover:cursor-pointer ${isSelected ? "border-cyan-300 ring-2 ring-cyan-300/80" : "border-neutral-500 hover:border-cyan-200"}`}>
                      <div className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-110" style={{ backgroundImage: `url(${bg.path})` }} />
                      <div className={`absolute inset-0 ${isSelected ? "bg-black/25" : "bg-black/45"}`} />
                      <span className="relative z-10 text-xs font-bold tracking-wide text-white">{bg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
      </nav>

      <nav className="relative z-40 hidden w-full border-b border-white/10 bg-neutral-950/90 text-gray-100 backdrop-blur-md lg:block">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-4">
          <div className="flex min-w-0 items-center gap-4 justify-self-start">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">Artifactdle</h2>
            </div>
          </div>

          <div className="flex flex-none items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 justify-self-center">
            <button
              onClick={onModeToggle}
              className="w-28 rounded-full px-3 py-1.5 text-base font-semibold transition hover:cursor-pointer hover:bg-white/10 hover:scale-105"
            >
              {gameMode === 'daily' ? '📅 Daily' : '♾️ Infinite'}
            </button>
            <div className="h-6 w-px bg-white/10" />
            <button value={"normal"} onClick={handleGameChange} className="rounded-full px-4 py-1.5 text-base font-semibold transition hover:cursor-pointer hover:bg-purple-500/80 hover:scale-105 bg-purple-600">
              Normal
            </button>
            <button value={"silhouette"} onClick={handleGameChange} className="rounded-full px-4 py-1.5 text-base font-semibold transition hover:cursor-pointer hover:bg-purple-500/80 hover:scale-105 bg-purple-600">
              Silhouette
            </button>
            <button value={"substats"} onClick={handleGameChange} className="rounded-full px-4 py-1.5 text-base font-semibold transition hover:cursor-pointer hover:bg-purple-500/80 hover:scale-105 bg-purple-600">
              Build
            </button>
          </div>

          <div className="relative flex flex-none items-center justify-self-end">
            <button onClick={() => setIsBackgroundMenuOpen((prev) => !prev)} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:cursor-pointer hover:bg-white/10">
              <span>Background</span>
              <span className="text-white/60">{selectedBackgroundLabel}</span>
              <span>{isBackgroundMenuOpen ? "▲" : "▼"}</span>
            </button>

            <div className={`${isBackgroundMenuOpen ? "block" : "hidden"} absolute right-6 top-full z-50 mt-3 w-[20rem] rounded-2xl border border-white/10 bg-neutral-950 p-3 shadow-2xl`}>
              <div className="grid grid-cols-2 gap-3">
                {backgrounds.map((bg) => {
                  const isSelected = selectedBackground === bg.path;
                  return (
                    <button  key={bg.path} onClick={() => handleBackgroundChange(bg.path)} className={`group relative h-20 overflow-hidden rounded-xl border transition hover:cursor-pointer ${isSelected ? "border-cyan-300 ring-2 ring-cyan-300/80" : "border-white/10 hover:border-cyan-200"}`}>
                      <div className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-110" style={{ backgroundImage: `url(${bg.path})` }} />
                      <div className={`absolute inset-0 ${isSelected ? "bg-black/20" : "bg-black/45"}`} />
                      <div className="absolute inset-x-0 bottom-0 p-2 text-left">
                        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/90">{bg.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}