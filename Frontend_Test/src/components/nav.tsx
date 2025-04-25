import { NavLink } from "react-router";

function Nav() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl">Todo App</h1>
                <ul className="flex space-x-4">
                    <li><NavLink to="/" end> Home</NavLink></li>
                    <li><NavLink to="/login" className="text-white">login</NavLink></li>
                
                </ul>
            </div>
        </nav>
    );
}

export default Nav;