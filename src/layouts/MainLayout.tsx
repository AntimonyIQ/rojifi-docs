import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Twitter, Github, Linkedin } from "lucide-react";

function MainLayout({ children }: { children?: React.ReactNode }) {
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
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col">
            {/* SECTION 1: HEADER */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
                    ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                                <img src="/logo.svg" alt="Rojifi Logo" className="w-full h-full p-2" />
                            </div>
                            <span className="font-bold text-xl">Rojifi</span>
                        </a>

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
                                    <Moon className="w-5 h-5" />
                                ) : (
                                    <Sun className="w-5 h-5" />
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
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
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

            {/* Main Content */}
            <main className="flex-grow">
                {children || <Outlet />}
            </main>

            {/* SECTION 6: FOOTER */}
            <footer className="py-12 px-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        {/* Column 1: Brand */}
                        <div className="md:col-span-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                                    <img src="/logo.svg" alt="Rojifi Logo" className="w-full h-full p-2" />
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
                                    <a href="https://www.rojifi.com" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                                        Main Website
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
                            </ul>
                        </div>

                        {/* Column 4: Company */}
                        <div>
                            <h3 className="font-bold mb-4">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="https://www.rojifi.com/about" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.rojifi.com/contactus" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                                        Contact
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
                                <a href="https://www.rojifi.com" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="https://www.rojifi.com" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.rojifi.com" className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-400 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MainLayout;
