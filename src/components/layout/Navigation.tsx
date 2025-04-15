import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ui-components/ThemeToggle';

interface LogoProps {
  className?: string;
}

function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative w-8 h-8">
        <Image
          src="/logo.png"
          alt="Corey Alan Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 32px, 32px"
          priority
        />
      </div>
      <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
        Corey Alan
      </span>
    </Link>
  );
}

interface NavContainerProps {
  children: React.ReactNode;
}

function NavContainer({ children }: NavContainerProps) {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {children}
        </div>
      </div>
    </nav>
  );
}

export default function Navigation() {
  return (
    <NavContainer>
      <Logo />
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </NavContainer>
  );
} 