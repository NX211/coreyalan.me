import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface LogoProps {
  className?: string;
}

function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Corey Stone"
        width={40}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}

interface NavContainerProps {
  children: React.ReactNode;
}

function NavContainer({ children }: NavContainerProps) {
  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        {children}
      </div>
    </nav>
  );
}

export default function Navigation() {
  const { theme, setTheme } = useTheme();

  return (
    <NavContainer>
      <Logo />
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="h-9 w-9"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </NavContainer>
  );
} 