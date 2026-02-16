import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";

function Homepage() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* SECTION 1: HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="font-bold text-xl">Rojifi</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-300 transition-colors">
                Features
              </a>
              <a href="#stats" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-300 transition-colors">
                Stats
              </a>
              <Link to="/docs" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-300 transition-colors">
                Documentation
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              <Link
                to="/docs"
                className="hidden md:inline-flex px-6 py-2.5 bg-brand hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
              <a
                href="#features"
                className="block py-2 text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#stats"
                className="block py-2 text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stats
              </a>
              <Link
                to="/docs"
                className="block py-2 text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link
                to="/docs"
                className="block px-6 py-2.5 bg-brand text-white rounded-lg font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* SECTION 2: HERO */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              v2.0 is now live
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Build faster with the{" "}
              <span className="text-brand dark:text-brand-400 inline-block animate-gradient">
                Rojifi REST API
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Seamlessly integrate financial services into your application. Our API provides the building blocks for payments, wallets, and identity verification.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/docs"
                className="inline-flex items-center px-8 py-4 bg-brand hover:bg-brand-600 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Read the Docs
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-slate-300 dark:border-slate-700 hover:border-brand dark:hover:border-brand-400 rounded-lg font-bold text-lg transition-all"
              >
                View Features
              </a>
            </div>

            {/* Code Example */}
            <div className="max-w-3xl mx-auto pt-12">
              <div className="rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-700 overflow-hidden animate-slide-up">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 dark:bg-slate-700/50 border-b border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto text-xs text-slate-400 font-mono">POST /v1/transactions</div>
                </div>

                {/* Code */}
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-sm leading-relaxed text-left">
                    <code className="text-slate-300">
                      <span className="text-violet-400">curl</span> https://api.rojifi.com/v1/pay \<br />
                      &nbsp;&nbsp;-H <span className="text-green-400">"Authorization: Bearer sk_test..."</span> \<br />
                      &nbsp;&nbsp;-d <span className="text-yellow-300">{"{"}</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">"amount"</span>: <span className="text-orange-300">5000</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">"currency"</span>: <span className="text-green-400">"NGN"</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">"reference"</span>: <span className="text-green-400">"ref_123456"</span><br />
                      &nbsp;&nbsp;<span className="text-yellow-300">{"}"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section id="features" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to build
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Designed for developers, optimized for business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand dark:hover:border-brand-400 transition-all duration-300 animate-slide-up">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Engineered for low latency. Our API responds in milliseconds, ensuring your users never wait.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand dark:hover:border-brand-400 transition-all duration-300 animate-slide-up animation-delay-100">
              <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-brand dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Developer First</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Typed SDKs, comprehensive guides, and a Postman collection to get you started in minutes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand dark:hover:border-brand-400 transition-all duration-300 animate-slide-up animation-delay-200">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Bank-Grade Security</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We are ISO 27001 certified. All data is encrypted at rest and in transit with TLS 1.3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: STATS */}
      <section id="stats" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by developers worldwide
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Join thousands of teams building with Rojifi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 animate-slide-up">
              <div className="text-5xl md:text-6xl font-bold text-brand dark:text-brand-400 mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-400 font-semibold">Uptime SLA</div>
            </div>
            <div className="text-center p-6 animate-slide-up animation-delay-100">
              <div className="text-5xl md:text-6xl font-bold text-brand dark:text-brand-400 mb-2">&lt;100ms</div>
              <div className="text-slate-600 dark:text-slate-400 font-semibold">Response Time</div>
            </div>
            <div className="text-center p-6 animate-slide-up animation-delay-200">
              <div className="text-5xl md:text-6xl font-bold text-brand dark:text-brand-400 mb-2">10K+</div>
              <div className="text-slate-600 dark:text-slate-400 font-semibold">API Calls/min</div>
            </div>
            <div className="text-center p-6 animate-slide-up animation-delay-300">
              <div className="text-5xl md:text-6xl font-bold text-brand dark:text-brand-400 mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400 font-semibold">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center bg-brand dark:bg-brand-600 rounded-3xl p-12 md:p-16 border-2 border-brand-600 dark:border-brand-500 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers building amazing applications with our powerful API.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/docs"
                className="inline-flex items-center px-8 py-4 bg-white text-brand hover:bg-brand-50 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Get Started Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="mailto:support@rojifi.com"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand rounded-lg font-bold text-lg transition-all"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FOOTER */}
      <footer className="py-12 px-4 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="font-bold text-xl">Rojifi</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Financial infrastructure for the modern internet.
              </p>
            </div>

            {/* Column 2: Product */}
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/docs" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/docs" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2026 Rojifi. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
