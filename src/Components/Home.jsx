import { useEffect, useState, useRef } from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import howItWorks from "../assets/how-it-works.mp4";

const stats = [
    { value: 500, suffix: "+", label: "Projects", color: "text-purple-400", delay: "0.2s" },
    { value: 50, suffix: "K+", label: "Users", color: "text-blue-400", delay: "0.4s" },
    { value: 98, suffix: "%", label: "Satisfaction", color: "text-pink-400", delay: "0.6s" },
];

function Home({ isDemoOpen, setIsDemoOpen }) {
    const navigate = useNavigate();

    function useCountUp(target, duration = 2000) {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }, [target, duration]);

        return count;
    }

    const closeButtonRef = useRef(null);

    // ✅ Handle Escape key to close modal
    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape' && isDemoOpen) setIsDemoOpen(false);
        }
        if (isDemoOpen) {
            document.addEventListener('keydown', onKey);
            // move focus to close button for accessibility
            setTimeout(() => closeButtonRef.current?.focus(), 0);
        }
        return () => document.removeEventListener('keydown', onKey);
    }, [isDemoOpen, setIsDemoOpen]);

    return (
        <div className="min-h-screen text-white overflow-x-hidden relative">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
                <div className="floating-shape shape-4"></div>
            </div>

            <section
                id="home"
                className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-4 sm:px-6 lg:px-8 relative z-10"
            >
                <div className="container mx-auto max-w-7xl">

                    {/* ✅ Video Modal */}
                    {isDemoOpen && (
                        <div 
                            id="howItWorksModal" 
                            role="dialog" 
                            aria-modal="true" 
                            aria-labelledby="howItWorksTitle" 
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            {/* Backdrop */}
                            <div 
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                                onClick={() => setIsDemoOpen(false)} 
                            />

                            {/* Modal Content */}
                            <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden transform transition-all">
                                {/* Header */}
                                <div className="flex items-center justify-between p-1 md:p-3 border-b border-gray-100">
                                    <h3 id="howItWorksTitle" className="text-md md:text-lg font-black text-gray-900 pl-2 md:pl-0">
                                        How It Works
                                    </h3>
                                    <button
                                        ref={closeButtonRef}
                                        onClick={() => setIsDemoOpen(false)}
                                        aria-label="Close video"
                                        className="ml-3 bg-gray-100 active:scale-90 hover:bg-gray-200 mr-2 md:mr-0 text-gray-800 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                                    >
                                        <i className="fa-solid fa-xmark text-red-500 text-sm md:text-lg"></i>
                                    </button>
                                </div>

                                {/* Video */}
                                <div className="bg-black">
                                    <video controls autoPlay className="w-full max-h-[80vh] bg-black">
                                        <source src={howItWorks} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
                        {/* LEFT CONTENT */}
                        <div className="w-full lg:w-1/2 fade-in-up order-2 lg:order-1" data-aos="fade-left" data-aos-delay="300" data-aos-duration="900">
                            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-center lg:text-left">
                                AI Content{" "}
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block sm:inline">
                                    Summarizer System
                                </span>
                            </h1>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                                AI Content Summarizer is a system that converts long text into a title, short summary, and key points automatically.
                            </p>

                            {/* BUTTONS - Always in one line */}
                            <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 glass-button relative z-[999] pointer-events-auto px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-full font-semibold hover-lift whitespace-nowrap"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="M13 6l6 6-6 6"></path>
                                            </svg>
                                            <span>Get Started</span>
                                        </button>
                                    </SignInButton>
                                </SignedOut>

                                {/* LOGGED IN → Go Dashboard */}
                                <SignedIn>
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="flex items-center justify-center gap-2 glass-button relative z-[999] pointer-events-auto px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-full font-semibold hover-lift whitespace-nowrap"
                                    >
                                        <span id="dashboard-link-icon" className="flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5 text-white">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                        </span>
                                        <span id="dashboard-link" className="text-[17px]">Visit Dashboard</span>
                                    </button>
                                </SignedIn>

                                {/* ✅ Watch Demo Button */}
                                <button
                                    onClick={() => setIsDemoOpen(true)}
                                    aria-haspopup="dialog"
                                    aria-controls="howItWorksModal"
                                    type="button"
                                    className="glass-outline-button pointer-events-auto cursor-pointer px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-full font-semibold whitespace-nowrap flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Watch Demo</span>
                                </button>
                            </div>

                            {/* STATS - Always in one line */}
                            <div className="flex flex-row justify-center lg:justify-start gap-4 sm:gap-6 mt-8 sm:mt-12">
                                {stats.map((item, index) => {
                                    const count = useCountUp(item.value);
                                    return (
                                        <div
                                            key={index}
                                            className="text-center fade-in-up flex-1 min-w-[80px] xs:min-w-[90px] sm:min-w-[100px]"
                                            style={{ animationDelay: item.delay }}
                                        >
                                            <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${item.color}`}>
                                                {count.toLocaleString()}{item.suffix}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-400 mt-1">
                                                {item.label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT HERO SVG */}
                        <div className="w-full lg:w-1/2 relative fade-in-up order-1 lg:order-2 mb-8 lg:mb-0">
                            <div className="glass-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover-lift max-w-lg mx-auto lg:mx-0">
                                <div className="aspect-square w-full max-w-[400px] mx-auto">
                                    <svg
                                        className="w-full h-full"
                                        viewBox="0 0 500 500"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect x="50" y="50" width="400" height="300" rx="20" fill="url(#heroGradient1)" opacity="0.8" />
                                        <rect x="60" y="60" width="380" height="280" rx="15" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                                        <g className="floating-card">
                                            <rect x="100" y="120" width="150" height="100" rx="15" fill="url(#heroGradient2)" opacity="0.9" />
                                            <rect x="110" y="130" width="130" height="30" rx="8" fill="rgba(255,255,255,0.2)" />
                                            <rect x="110" y="170" width="100" height="15" rx="5" fill="rgba(255,255,255,0.15)" />
                                            <rect x="110" y="195" width="80" height="15" rx="5" fill="rgba(255,255,255,0.15)" />
                                        </g>

                                        <g className="floating-card-2">
                                            <rect x="270" y="150" width="150" height="100" rx="15" fill="url(#heroGradient3)" opacity="0.9" />
                                            <circle cx="345" cy="180" r="15" fill="rgba(255,255,255,0.3)" />
                                            <rect x="290" y="210" width="120" height="12" rx="6" fill="rgba(255,255,255,0.2)" />
                                            <rect x="290" y="230" width="90" height="12" rx="6" fill="rgba(255,255,255,0.15)" />
                                        </g>

                                        <circle cx="400" cy="100" r="30" fill="url(#heroGradient4)" opacity="0.6" className="pulse" />
                                        <circle cx="120" cy="350" r="25" fill="url(#heroGradient5)" opacity="0.6" className="pulse-delay" />

                                        <defs>
                                            <linearGradient id="heroGradient1" x1="50" y1="50" x2="450" y2="350">
                                                <stop offset="0%" stopColor="#8B5CF6" />
                                                <stop offset="100%" stopColor="#3B82F6" />
                                            </linearGradient>

                                            <linearGradient id="heroGradient2" x1="100" y1="120" x2="250" y2="220">
                                                <stop offset="0%" stopColor="#EC4899" />
                                                <stop offset="100%" stopColor="#8B5CF6" />
                                            </linearGradient>

                                            <linearGradient id="heroGradient3" x1="270" y1="150" x2="420" y2="250">
                                                <stop offset="0%" stopColor="#3B82F6" />
                                                <stop offset="100%" stopColor="#06B6D4" />
                                            </linearGradient>

                                            <linearGradient id="heroGradient4">
                                                <stop offset="0%" stopColor="#F59E0B" />
                                                <stop offset="100%" stopColor="#EF4444" />
                                            </linearGradient>

                                            <linearGradient id="heroGradient5">
                                                <stop offset="0%" stopColor="#10B981" />
                                                <stop offset="100%" stopColor="#06B6D4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
