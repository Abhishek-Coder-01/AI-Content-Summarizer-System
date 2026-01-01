import Home from "./Home";
import How_to_works from "./How_to_works";
import About from "./About";
import Contact from "./Contact";
import Help from "./Help";
import Footer from "./Footer";
import UserSidebarItem from "./UserSidebarItem";
import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, UserButton, SignOutButton, useClerk } from "@clerk/clerk-react";

function Nav() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const stored = localStorage.getItem('theme');
            return stored ? stored === 'dark' : false;
        } catch (e) {
            return false;
        }
    });
    const [activeMenuItem, setActiveMenuItem] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false); // ✅ Added demo state

    const clerk = useClerk();

    const handleLogout = async (e) => {
        e.preventDefault();
        if (isMobileView) setIsMobileMenuOpen(false);
        try {
            await clerk.signOut();
        } catch (err) {
            console.error('Sign out error', err);
        }
    };

    // Check for mobile view on mount and resize
    useEffect(() => {
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth <= 500);
            if (window.innerWidth > 500) {
                setIsMobileMenuOpen(false);
            }
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);

        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    // Handle dark mode class on document element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Handle sidebar toggle for desktop
    const toggleSidebar = () => {
        if (isMobileView) {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        } else {
            setIsSidebarExpanded(!isSidebarExpanded);
        }
    };

    // ✅ Handle mobile menu close when clicking on menu item
    const handleMenuItemClick = (index, item) => {
        setActiveMenuItem(index);
        
        // Check if it's the Watch Demo button
        if (item.id === 'history') {
            setIsDemoOpen(true);
            if (isMobileView) {
                setIsMobileMenuOpen(false);
            }
            return; // Don't scroll, just open modal
        }
        
        // For other menu items, close mobile menu
        if (isMobileView) {
            setIsMobileMenuOpen(false);
        }
    };

    // Handle dark mode toggle
    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const next = !prev;
            try {
                localStorage.setItem('theme', next ? 'dark' : 'light');
            } catch (e) { }
            return next;
        });
    };

    // Close mobile menu when clicking on overlay
    const handleOverlayClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Menu items data
    const menuItems = [
        { id: 'home', icon: 'fas fa-home', text: 'Home', hash: "#home" },
        { id: 'works', icon: 'fa-solid fa-gears', text: 'How it Works', hash: "#how-it-works" },
        { id: 'about', icon: 'fa-solid fa-circle-info', text: 'About', hash: "#about" },
        { id: 'contact', icon: 'fa-solid fa-user', text: 'Contact', hash: "#contact" },
        { id: 'help', icon: 'fa-solid fa-circle-question', text: 'Help', hash: "#help" },
        { id: 'history', icon: 'fa-solid fa-video', text: 'Watch Demo', hash: "#"}
    ];

    return (
        <div className="flex h-screen">
            {/* Mobile Hamburger Button */}
            {isMobileView && (
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="mobile-menu-btn md:hidden"
                >
                    <svg data-v-2a9729d1="" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M17 7L3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        <path d="M13 13L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                    </svg>
                </button>
            )}

            {/* Overlay for mobile */}
            {isMobileView && (
                <div
                    className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={handleOverlayClick}
                />
            )}

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'} 
                    ${isMobileMenuOpen ? 'mobile-open' : ''}
                    bg-white shadow-xl flex flex-col relative z-1000`}
            >
                {/* Toggle Button */}
                <button
                    id="toggleBtn"
                    onClick={toggleSidebar}
                    className="toggle-btn absolute -right-3 top-6 bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-purple-700 z-10"
                >
                    {isMobileView ? (
                        <i className="fas fa-times text-xs"></i>
                    ) : (
                        <i className={`fas fa-chevron-${isSidebarExpanded ? 'left' : 'right'} text-xs`}></i>
                    )}
                </button>

                {/* Logo */}
                <div id="helo" className="p-4 flex items-center gap-3 border-b">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="12"
                                    y="10"
                                    width="40"
                                    height="44"
                                    rx="6"
                                    fill="#FFF7ED"
                                    stroke="#F97316"
                                    strokeWidth="2"
                                />
                                <circle cx="22" cy="24" r="2" fill="#F97316" />
                                <circle cx="22" cy="32" r="2" fill="#F97316" />
                                <circle cx="22" cy="40" r="2" fill="#F97316" />
                                <line
                                    x1="28"
                                    y1="24"
                                    x2="44"
                                    y2="24"
                                    stroke="#F97316"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="28"
                                    y1="32"
                                    x2="40"
                                    y2="32"
                                    stroke="#F97316"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="28"
                                    y1="40"
                                    x2="36"
                                    y2="40"
                                    stroke="#F97316"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </div>
                    {(isSidebarExpanded || isMobileView) && (
                        <div className="menu-text">
                            <h3 className="font-semibold text-gray-800 text-sm">AI Content</h3>
                            <p className="text-xs text-gray-500">Summarizer System</p>
                        </div>
                    )}
                </div>

                {/* Menu */}
                <nav id="helo" className="flex-1 py-4 overflow-y-auto">
                    {/* Menu Links */}
                    {menuItems.map((item, index) => (
                        <a
                            key={item.id}
                            href={item.hash}
                            onClick={(e) => {
                                e.preventDefault();
                                handleMenuItemClick(index, item); // ✅ Pass item object
                                
                                // ✅ Only scroll if it's not the demo button
                                if (item.id !== 'history') {
                                    const element = document.querySelector(item.hash);
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }
                                }
                            }}
                            className={`menu-item flex items-center gap-3 px-6 py-3
                                ${activeMenuItem === index
                                    ? "bg-purple-50 text-purple-600"
                                    : "text-gray-700"
                                }
                            `}
                        >
                            <i className={`${item.icon} w-5`}></i>
                            {(isSidebarExpanded || isMobileView) && (
                                <span className="menu-text text-sm font-medium">
                                    {item.text}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div id="helo" className="border-t py-4">
                    <SignedIn>
                        <div className="menu-item flex items-center gap-3 px-6 py-3 text-gray-700">
                            {/* Avatar → Manage Account modal */}
                            <UserButton
                                userProfileMode="modal"
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8",
                                    },
                                }}
                            />

                            {/* Name / Email (Profile text) */}
                            {(isSidebarExpanded || isMobileView) && (
                                <UserSidebarItem />
                            )}

                            {/* Logout icon */}
                            {(isSidebarExpanded || isMobileView) && (
                                <SignOutButton>
                                    <button
                                        type="button"
                                        className="ml-auto text-red-600 hover:text-red-700"
                                        title="Logout"
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </SignOutButton>
                            )}
                        </div>
                    </SignedIn>

                    {/* Dark Mode Toggle */}
                    <div id="helo" className="menu-item flex items-center justify-between px-4 py-3">
                        {(isSidebarExpanded || isMobileView) && (
                            <div className="flex items-center gap-2 menu-text">
                                <span
                                    id="sunIcon"
                                    className={`w-6 h-6 text-gray-600 transition-all duration-300 ${isDarkMode ? 'hidden' : 'block'}`}
                                >
                                    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                                        <circle cx="14" cy="14" r="3.5" stroke="currentColor"></circle>
                                        <path d="M14 8.5V6.5" stroke="currentColor" strokeLinecap="round"></path>
                                        <path d="M17.889 10.1115L19.3032 8.69727" stroke="currentColor" strokeLinecap="round"></path>
                                        <path d="M19.5 14L21.5 14" stroke="currentColor" strokeLinecap="round"></path>
                                        <path d="M17.889 17.8885L19.3032 19.3027" stroke="currentColor" strokeLinecap="round"></path>
                                        <path d="M14 21.5V19.5" stroke="currentColor" strokeLinecap="round"></path>
                                        <path d="M8.69663 19.3029L10.1108 17.8887" stroke="currentColor" strokeLinecap="round"></path>
                                        <path d="M6.5 14L8.5 14" stroke="currentColor" strokeLinecap="round"></path>
                                        <path d="M8.69663 8.69711L10.1108 10.1113" stroke="currentColor" strokeLinecap="round"></path>
                                    </svg>
                                </span>

                                <span
                                    id="moonIcon"
                                    className={`w-6 h-6 text-gray-600 transition-all duration-300 ${isDarkMode ? 'block' : 'hidden'}`}
                                >
                                    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                                        <path
                                            d="M10.5 9.99914C10.5 14.1413 13.8579 17.4991 18 17.4991C19.0332 17.4991 20.0176 17.2902 20.9132 16.9123C19.7761 19.6075 17.109 21.4991 14 21.4991C9.85786 21.4991 6.5 18.1413 6.5 13.9991C6.5 10.8902 8.39167 8.22304 11.0868 7.08594C10.7089 7.98159 10.5 8.96597 10.5 9.99914Z"
                                            stroke="currentColor" strokeLinejoin="round"></path>
                                        <path
                                            d="M16.3561 6.50754L16.5 5.5L16.6439 6.50754C16.7068 6.94752 17.0525 7.29321 17.4925 7.35607L18.5 7.5L17.4925 7.64393C17.0525 7.70679 16.7068 8.05248 16.6439 8.49246L16.5 9.5L16.3561 8.49246C16.2932 8.05248 15.9475 7.70679 15.5075 7.64393L14.5 7.5L15.5075 7.35607C15.9475 7.29321 16.2932 6.94752 16.3561 6.50754Z"
                                            fill="currentColor" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path
                                            d="M20.3561 11.5075L20.5 10.5L20.6439 11.5075C20.7068 11.9475 21.0525 12.2932 21.4925 12.3561L22.5 12.5L21.4925 12.6439C21.0525 12.7068 20.7068 13.0525 20.6439 13.4925L20.5 14.5L20.3561 13.4925C20.2932 13.0525 19.9475 12.7068 19.5075 12.6439L18.5 12.5L19.5075 12.3561C19.9475 12.2932 20.2932 11.9475 20.3561 11.5075Z"
                                            fill="currentColor" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg>
                                </span>

                                <span id="themeText" className="text-sm font-medium">
                                    {isDarkMode ? 'Dark' : 'Light'}
                                </span>
                            </div>
                        )}

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="darkToggle"
                                className="sr-only peer"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer
                                peer-checked:bg-purple-600
                                after:content-['']
                                after:absolute after:top-[2px] after:left-[2px]
                                after:bg-white after:rounded-full after:h-5 after:w-5
                                after:transition-all
                                peer-checked:after:translate-x-full">
                            </div>
                        </label>
                    </div>
                </div>
            </aside>

            {/* RIGHT CONTENT */}
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900">
                {/* ✅ Pass props to Home component */}
                <Home
                    isDemoOpen={isDemoOpen}
                    setIsDemoOpen={setIsDemoOpen}
                />
                <How_to_works />
                <About />
                <Help />
                <Contact />
                <Footer />
            </main>
        </div>
    );
}

export default Nav;
