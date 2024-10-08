import { useContext, useEffect, useState } from 'react';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { showToast } from '../../utility/useToast';
import { BiUserPlus } from 'react-icons/bi';

const Navbar = () => {
    const { user, userSignOut } = useContext(AuthContext);

    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleSignOut = () => {
        userSignOut()
            .then(() => {
                // navigate('/');
                showToast('success', 'Log-out successful');
            })
            .catch(() => {
                showToast('error', 'Log-out unsuccessful');
            });
    };

    const addClass = isActive => isActive ? 'font-semibold underline underline-offset-2' : 'font-semibold';
    const navLinks = <>
        <li><NavLink className={({ isActive }) => addClass(isActive)} to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive }) => addClass(isActive)} to="/tourists-spot">Tourists Spot</NavLink></li>
        {user && <li><NavLink className={({ isActive }) => addClass(isActive)} to="/my-list">My List</NavLink></li>}
        <li><NavLink className={({ isActive }) => addClass(isActive)} to="/contact">Contact</NavLink></li>
    </>;

    return (
        <nav className='container max-w-7xl mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm bg-base-100 dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="text-3xl font-bold text-customLightBrown">WanderSEA</Link>
                </div>
                <div className="navbar-end gap-2">
                    <div className="navbar-center hidden md:flex">
                        <ul className="menu menu-horizontal px-1 space-x-1">
                            {navLinks}
                        </ul>
                    </div>
                    <label className="swap swap-rotate">
                        <input onChange={toggleTheme} type="checkbox" className="theme-controller" checked={theme === 'dark'} />
                        {/* Sun icon */}
                        <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* Moon icon */}
                        <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                    {user ? (
                        <div className="dropdown dropdown-hover dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-20 rounded-full ring ring-offset-2 ring-customLightBrown">
                                    <img src={user?.photoURL} alt="Profile Img" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt--2 w-52 p-2 shadow">
                                <li className=' font-semibold text-gray-500 mb-1'>
                                    <p className=''>{user?.displayName}</p>
                                </li>
                                <li>
                                    <Link to='/profile'>My Profile</Link>
                                </li>
                                <li>
                                    <Link to='/add-tourists-spot'>Add Tourists Spot</Link>
                                </li>
                                <li>
                                    <a onClick={handleSignOut}> <CiLogout />Log Out</a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to='/register' className="btn font-bold bg-customPaleBeige hover:bg-customSandyBrown text-white">
                                <BiUserPlus className='text-2xl' />Register
                            </Link>
                            <Link to='/login' className="btn font-bold bg-customPaleBeige hover:bg-customSandyBrown text-white">
                                Log In<CiLogin className='text-2xl' />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
