
function Help() {
  return (
    <section id="help" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Need Help?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
            Find quick answers to common questions or reach out to our support team.
          </p>
        </div>

        {/* Help Cards */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Card 1 */}
          <div
            className="glass-card p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover-lift fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 glass-icon rounded-xl sm:rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 18H12.01M12 14C14 14 15 13 15 11C15 9 13.5 8 12 8C10.5 8 9.5 8.75 9 10"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="9" stroke="#60A5FA" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">FAQs</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Browse commonly asked questions and get instant answers without waiting.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="glass-card p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover-lift fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 glass-icon rounded-xl sm:rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12H21M12 3V21"
                  stroke="#34D399"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="9" stroke="#34D399" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">Guides & Docs</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Step-by-step documentation to help you understand and use our platform.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="glass-card p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover-lift fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 glass-icon rounded-xl sm:rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4H20V16H7L4 19V4Z"
                  stroke="#F472B6"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">Live Support</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Still stuck? Chat or email our support team and get personal assistance.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-10 sm:mt-14 md:mt-16 text-center fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#contact"
          className="glass-button px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover-lift text-white">
            Contact Support
          </a>
        </div>

      </div>
    </section>
  );
}

export default Help;