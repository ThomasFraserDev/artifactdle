export default function Navbar({onBackgroundChange}) {
  const backgrounds = [
    "/assets/backgrounds/nodkrai.png",
    "/assets/backgrounds/fatui.jpg",
  ];

  const handleChange = (e) => {
    onBackgroundChange(e.target.value);
  };
  return (
    <nav className="flex flex-col sm:flex-row w-full bg-neutral-900 text-xl sm:text-3xl p-2 sm:p-4 sticky gap-3 top-0">
      <div className=" flex flex-row ml-10 mr-auto gap-3">
        <h2> Artifactdle</h2>
      </div>
      <div className="flex flex-row ml-auto mr-10 gap-5">
        <div className="flex flex-row gap-2">
          <h2>Background:</h2>
          <select onChange={handleChange} className="bg-neutral-800 text-sm text-gray-200 px-2 py-1 cursor-pointer">
            <option value={backgrounds[0]}>Nod Krai</option>
            <option value={backgrounds[1]}>Fatui</option>
          </select>
        </div>
        <a href="https://github.com/TheRealThomasFraser">
          <img className="h-8 w-8" src="/assets/misc/github-mark-white.png"></img>
          </a>
          <a href="https://x.com/ThomasFDev">
          <img className="h-8 w-8" src="/assets/misc/twitterLogo.png"></img>
          </a>
        </div>
    </nav>
  );
}