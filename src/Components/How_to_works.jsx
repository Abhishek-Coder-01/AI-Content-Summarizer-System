function HowItWorks() {
  return (
    <>


      <section id="how-it-works" className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">

          {/* Heading */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Our streamlined process makes it easy to bring your ideas to life in just three simple steps.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">

            {/* Step 1 */}
            <div
              className="glass-card p-6 sm:p-8 rounded-2xl lg:rounded-3xl hover-lift"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 glass-icon rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                    stroke="url(#stepGradient1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="stepGradient1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="step-number text-2xl">01</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">Step 1: Paste Content</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed sm:leading-loose">
                Paste your content or email, and our system will analyze it to generate a clear title, concise summary, and key notes.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="glass-card p-6 sm:p-8 rounded-2xl lg:rounded-3xl hover-lift"
              style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 glass-icon rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 21C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21H7Z"
                    stroke="url(#stepGradient2)"
                    strokeWidth="2"
                  />
                  <path d="M14 3V8H19" stroke="url(#stepGradient2)" strokeWidth="2" />
                  <path
                    d="M9 13H15M9 17H15"
                    stroke="url(#stepGradient2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="stepGradient2">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="step-number text-2xl">02</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">Step 2: Text Processing</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed sm:leading-loose">
                The system processes your text, organizing and refining it with advanced technology to prepare clear, structured summaries.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="glass-card p-6 sm:p-8 rounded-2xl lg:rounded-3xl hover-lift md:col-span-2 lg:col-span-1"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 glass-icon rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="url(#stepGradient3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="url(#stepGradient3)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="stepGradient3">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="step-number text-2xl">03</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">Step 3: AI Analysis</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed sm:leading-loose">
                The AI analyzes your processed text to deliver a clear title, concise summary, and key notes for quick understanding.
              </p>
            </div>

          </div>

          {/* Process Visualization */}
          <div className="mt-8 sm:mt-12 lg:mt-16 max-w-4xl mx-auto fade-in-up">
            <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white text-center">
                Our Process Flow
              </h3>
              <div className="overflow-x-auto">
                <div className="min-w-[300px]">
                  <svg className="w-full h-auto min-h-[120px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[200px]" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    {/* Connection Lines with animations */}
                    <path
                      d="M 100 100 Q 200 50, 300 100"
                      stroke="url(#lineGradient1)"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="draw-line"
                    />
                    <path
                      d="M 300 100 Q 400 150, 500 100"
                      stroke="url(#lineGradient2)"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="draw-line-delay"
                    />
                    <path
                      d="M 500 100 Q 600 50, 700 100"
                      stroke="url(#lineGradient3)"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="draw-line-delay-2"
                    />

                    {/* Nodes with pulse animations */}
                    <circle
                      cx="100"
                      cy="100"
                      r="15"
                      fill="url(#nodeGradient1)"
                      className="pulse node-glow"
                    />
                    <circle
                      cx="300"
                      cy="100"
                      r="15"
                      fill="url(#nodeGradient2)"
                      className="pulse-delay node-glow"
                    />
                    <circle
                      cx="500"
                      cy="100"
                      r="15"
                      fill="url(#nodeGradient3)"
                      className="pulse-delay-2 node-glow"
                    />
                    <circle
                      cx="700"
                      cy="100"
                      r="15"
                      fill="url(#nodeGradient4)"
                      className="pulse node-glow-delay"
                    />

                    {/* Node Labels */}
                    <text x="100" y="135" textAnchor="middle" className="text-xs sm:text-sm" fill="#9CA3AF" fontFamily="Arial, sans-serif" fontWeight="500">
                      Input
                    </text>
                    <text x="300" y="135" textAnchor="middle" className="text-xs sm:text-sm" fill="#9CA3AF" fontFamily="Arial, sans-serif" fontWeight="500">
                      Process
                    </text>
                    <text x="500" y="135" textAnchor="middle" className="text-xs sm:text-sm" fill="#9CA3AF" fontFamily="Arial, sans-serif" fontWeight="500">
                      Analyze
                    </text>
                    <text x="700" y="135" textAnchor="middle" className="text-xs sm:text-sm" fill="#9CA3AF" fontFamily="Arial, sans-serif" fontWeight="500">
                      Output
                    </text>

                    <defs>
                      <linearGradient id="lineGradient1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <linearGradient id="lineGradient2">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                      <linearGradient id="lineGradient3">
                        <stop offset="0%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                      <linearGradient id="nodeGradient1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                      <linearGradient id="nodeGradient2">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                      <linearGradient id="nodeGradient3">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                      <linearGradient id="nodeGradient4">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>

                      {/* Glow effects */}
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default HowItWorks;