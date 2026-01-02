
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Portfolio. All rights reserved.
                        </p>
                    </div>

                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a target='_blank' href="https://github.com/MdShadil07" className="text-gray-400 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                        <a target='_blank' href="https://www.linkedin.com/in/md-shadil-3a9348173/" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a target='_blank' href="https://www.linkedin.com/in/md-shadil-3a9348173/" className="text-gray-400 hover:text-white transition-colors">
                            <Twitter size={20} />
                        </a>
                    </div>

                    <div className="flex items-center text-gray-400 text-sm">
                        <span>Made with</span>
                        <Heart size={16} className="mx-1 text-red-500 fill-current" />
                        <span>using React & Tailwind</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
