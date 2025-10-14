export default function Navbar() {
  return (
    <nav className="flex flex-row w-screen bg-neutral-900 text-3xl p-2">
      <div className=" flex flex-row ml-48 mr-auto gap-3">
        <h2> Genshin </h2>
        <h2> Honkai Star Rail</h2>
      </div>
      <div className=" flex flex-row ml-auto mr-48 gap-3">
        <h2> Github</h2>
        <h2> Twtitter</h2>
      </div>
    </nav>
  );
}
