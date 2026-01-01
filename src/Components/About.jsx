function About() {    
    return (
        <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
                    {/* About Content */}
                    <div className="w-full lg:w-1/2 fade-in-up">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                About
                            </span>
                        </h2>
                        
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed text-center lg:text-left">
                           This AI-powered content summarizer helps simplify long text into a clear title, a concise summary, and key notes. Just paste your content to quickly understand important information while saving time and effort.
                        </p>
                        
                        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed text-center lg:text-left">
                        The website includes Contact, How It Works, and Help sections to guide users, explain the process, and provide support when needed.
                        </p>
                        
                        {/* Features List */}
                        <div className="space-y-4 sm:space-y-5">
                            <div className="flex items-start gap-3 sm:gap-4 fade-in-up" style={{animationDelay: '0.2s'}}>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 glass-icon rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 10V3L4 14H11L11 21L20 10L13 10Z" stroke="url(#aboutGradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <defs>
                                            <linearGradient id="aboutGradient1">
                                                <stop offset="0%" style={{stopColor: '#F59E0B'}}/>
                                                <stop offset="100%" style={{stopColor: '#EF4444'}}/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold mb-1 text-white">Lightning Fast</h4>
                                    <p className="text-sm sm:text-base text-gray-400">Optimized performance for seamless user experiences</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 sm:gap-4 fade-in-up" style={{animationDelay: '0.4s'}}>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 glass-icon rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="url(#aboutGradient2)" strokeWidth="2"/>
                                        <path d="M12 9V3M12 21V15M15 12H21M3 12H9" stroke="url(#aboutGradient2)" strokeWidth="2" strokeLinecap="round"/>
                                        <defs>
                                            <linearGradient id="aboutGradient2">
                                                <stop offset="0%" style={{stopColor: '#8B5CF6'}}/>
                                                <stop offset="100%" style={{stopColor: '#EC4899'}}/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold mb-1 text-white">Fully Responsive</h4>
                                    <p className="text-sm sm:text-base text-gray-400">Beautiful designs that work on any device</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 sm:gap-4 fade-in-up" style={{animationDelay: '0.6s'}}>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 glass-icon rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#aboutGradient3)" strokeWidth="2"/>
                                        <path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" stroke="url(#aboutGradient3)" strokeWidth="2"/>
                                        <defs>
                                            <linearGradient id="aboutGradient3">
                                                <stop offset="0%" style={{stopColor: '#3B82F6'}}/>
                                                <stop offset="100%" style={{stopColor: '#06B6D4'}}/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-semibold mb-1 text-white">Global Reach</h4>
                                    <p className="text-sm sm:text-base text-gray-400">Trusted by clients in over 50 countries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Visual */}
                    <div className="w-full lg:w-1/2 relative fade-in-up" style={{animationDelay: '0.3s'}}>
                        <div className="glass-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl max-w-md mx-auto lg:max-w-none">
                            <div className="aspect-square w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto">
                                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Central Circle */}
                                    <circle cx="200" cy="200" r="80" fill="url(#aboutVisualGradient1)" opacity="0.8" className="pulse"/>
                                    <circle cx="200" cy="200" r="60" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                                    
                                    {/* Orbiting Elements */}
                                    <g className="orbit">
                                        <circle cx="200" cy="80" r="30" fill="url(#aboutVisualGradient2)" opacity="0.8"/>
                                        <circle cx="320" cy="200" r="30" fill="url(#aboutVisualGradient3)" opacity="0.8"/>
                                        <circle cx="200" cy="320" r="30" fill="url(#aboutVisualGradient4)" opacity="0.8"/>
                                        <circle cx="80" cy="200" r="30" fill="url(#aboutVisualGradient5)" opacity="0.8"/>
                                    </g>
                                    
                                    {/* Connection Lines */}
                                    <line x1="200" y1="200" x2="200" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5"/>
                                    <line x1="200" y1="200" x2="320" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5"/>
                                    <line x1="200" y1="200" x2="200" y2="320" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5"/>
                                    <line x1="200" y1="200" x2="80" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5"/>
                                    
                                    {/* Icons */}
                                    <g transform="translate(185, 185)">
                                        <path d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z" fill="white" opacity="0.8"/>
                                    </g>
                                    
                                    <defs>
                                        <linearGradient id="aboutVisualGradient1">
                                            <stop offset="0%" style={{stopColor: '#8B5CF6'}}/>
                                            <stop offset="100%" style={{stopColor: '#3B82F6'}}/>
                                        </linearGradient>
                                        <linearGradient id="aboutVisualGradient2">
                                            <stop offset="0%" style={{stopColor: '#EC4899'}}/>
                                            <stop offset="100%" style={{stopColor: '#8B5CF6'}}/>
                                        </linearGradient>
                                        <linearGradient id="aboutVisualGradient3">
                                            <stop offset="0%" style={{stopColor: '#F59E0B'}}/>
                                            <stop offset="100%" style={{stopColor: '#EF4444'}}/>
                                        </linearGradient>
                                        <linearGradient id="aboutVisualGradient4">
                                            <stop offset="0%" style={{stopColor: '#10B981'}}/>
                                            <stop offset="100%" style={{stopColor: '#06B6D4'}}/>
                                        </linearGradient>
                                        <linearGradient id="aboutVisualGradient5">
                                            <stop offset="0%" style={{stopColor: '#3B82F6'}}/>
                                            <stop offset="100%" style={{stopColor: '#06B6D4'}}/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;