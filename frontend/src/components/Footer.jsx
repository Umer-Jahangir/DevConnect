import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              DevConnect
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              A community platform for developers to connect, share knowledge, and grow together.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Umer-Jahangir" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Github size={20} />
              </a>
              <a href="https://x.com/OmerJahangeer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/umer-jahangir-76638a336/" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Stay Updated
            </h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 
                  focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg dark:hover:bg-gray-700 
                  transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} DevConnect. Made with <Heart size={14} className="inline text-red-500" /> by <a href="https://umerjahangir.vercel.app/" className="text-gray-600 hover:text-gray-500 dark:hover:text-gray-300">
                Umer Jahangir
              </a>
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;