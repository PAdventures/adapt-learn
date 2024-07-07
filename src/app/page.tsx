import NavigationBar from "../components/navigation/NavBar.tsx";

export default function Home() {
    return (
        <>
            <NavigationBar />
            <div className="h-[90vh] flex items-center justify-center">
                <div className="">
                    <h1 className="text-white text-5xl text-center p-6">Welcome to AdaptLearn</h1>
                    <p className="text-slate-300 text-lg m-auto text-center w-[50%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </>
    );
}
