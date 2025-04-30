import { Dice1 as Dice } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-6 w-6" }: LogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <Dice className="text-primary-600 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-accent-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Logo;