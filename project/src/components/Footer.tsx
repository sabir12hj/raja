import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-heading font-bold text-white">
                Ludo Tournaments
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Play Ludo tournaments and win real cash prizes. Join our community
              of players and experience the excitement of competitive Ludo.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://t.me/ludotournaments"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="mailto:contact@ludotournaments.com"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="tel:+911234567890"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/winners" className="text-gray-400 hover:text-white transition-colors">
                  Winners
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Join Our Community</h3>
            <p className="text-gray-400 mb-4">
              Join our Telegram group to stay updated with the latest tournaments and
              connect with other players.
            </p>
            <a
              href="https://t.me/ludotournaments"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 rounded-md font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Join Telegram Group
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} Ludo Tournaments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;