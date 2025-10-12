import Navbar from "./NavBar";

export default function Header() {
return (
    <header className="flex flex-col items-center justify-center w-screen">
        <h1 className="text-6xl font-extrabold"> Artifactdle </h1>
        <Navbar> </Navbar>
    </header>
)
}