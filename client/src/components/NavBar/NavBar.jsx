import { Link, NavLink } from "react-router-dom";
import { MdSunny } from "react-icons/md";
import { PiMoon } from "react-icons/pi";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";


const NavBar = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const { user, userLogOut } = useAuth();

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleLogOut = () => {
        userLogOut()
            .then(() => {
                const loggedUser = { email: user?.email };
                axios.post('https://book-hut-server-side.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then((res) => {
                        if (res.data.success) {
                            toast.success('User logged out');
                        }
                    })
            })
            .catch(error => {
                toast.error(error);
            })
    }

    const navLinks = <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'border-b-[3px] pb-1 border-[#41b0a3]' : 'pb-1'}>Home</NavLink></li>
        <li><NavLink to="/all-books" className={({ isActive }) => isActive ? 'border-b-[3px] pb-1 border-[#41b0a3]' : 'pb-1'}>All Books</NavLink></li>
        <li><NavLink to="/add-book" className={({ isActive }) => isActive ? 'border-b-[3px] pb-1 border-[#41b0a3]' : 'pb-1'}>Add Book</NavLink></li>
        <li><NavLink to="borrowed-books" className={({ isActive }) => isActive ? 'border-b-[3px] pb-1 border-[#41b0a3]' : 'pb-1'}>Borrowed Books</NavLink></li>
    </>

    return (
        <div className="navbar bg-[#74776c] bg-opacity-90 rounded-full my-5 sticky top-0 z-40">
            <div className="navbar-start">
                <div className="dropdown flex lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="space-y-2 menu menu-sm dropdown-content mt-12 z-[1] p-2 shadow bg-[#FFF5E0] rounded-box w-44 font-medium">
                        {navLinks}
                    </ul>

                </div>
                <Link className="btn bg-transparent hover:bg-transparent shadow-none border-none text-xl lg:text-2xl hidden lg:flex gap-0">Book <span className="text-[#41B06E]">Sphere</span></Link>
            </div>
            <div className="navbar-center">
                <Link to='/' className="btn bg-transparent hover:bg-transparent shadow-none border-none text-xl lg:text-2xl flex gap-0 lg:hidden">Book <span className="text-[#41B06E]">Sphere</span></Link>
                <ul className="hidden lg:flex items-center justify-center gap-8 text-lg font-semibold">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end lg:gap-3">
                <div>
                    {
                        theme === 'light' ?
                            <button onClick={() => setTheme('dark')} className="btn bg-transparent border-none shadow-none text-2xl hover:bg-transparent"><MdSunny /></button> :
                            <button onClick={() => setTheme('light')} className="btn bg-transparent border-none shadow-none text-2xl hover:bg-transparent"><PiMoon /></button>
                    }
                </div>
                {
                    user ?
                        <div className="flex lg:gap-3 items-center">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 rounded-full overflow-hidden border-4 border-[#8DECB4]">
                                        <img className="rouned-full w-full" alt="image" src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-1 bg-[#8DECB4] space-y-3 z-[1] p-2 shadow menu menu-sm dropdown-content  rounded-box min-w-52">
                                    <li><small>Email: {user?.email}</small></li>
                                    <li className="flex lg:hidden"><button onClick={handleLogOut} className="btn-sm btn border-none bg-red-400 text-white rounded-full px-6">Log Out</button></li>
                                </ul>
                            </div>
                            <button onClick={handleLogOut} className="hidden lg:flex btn border-none bg-red-400 text-white rounded-full px-6">Log Out</button>
                        </div> :
                        <Link to="/login" className="btn bg-[#d32f2f] border-none rounded-full px-6">Login</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;