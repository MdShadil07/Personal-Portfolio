import { useState } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Projects', href: '/dashboard/projects' },
        { name: 'Resume', href: '/dashboard/resume' },
        { name: 'Messages', href: '/dashboard/messages' },
        { name: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/90 text-gray-900 border-b border-slate-200 dark:bg-black/20 dark:text-gray-300 dark:border-white/5 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Portfolio
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <ModeToggle />
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white/95 dark:bg-black/90 backdrop-blur-xl"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 dark:text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-white/5"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="px-3 py-2">
                                <ModeToggle />
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                    <Github size={18} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
