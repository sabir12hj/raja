import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const TelegramBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-secondary-600 text-white p-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          <span className="text-sm sm:text-base">
            Join our Telegram community for latest updates:
          </span>
          <a
            href="https://t.me/ludotournaments"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 font-semibold underline hover:text-accent-300 transition-colors"
          >
            t.me/ludotournaments
          </a>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-secondary-700 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TelegramBanner;