import { redirect } from 'next/navigation';
import DevLoginForm from '@/components/development/DevLoginForm';
import PageHeader from '@/components/layout/PageHeader';

// This page should only be accessible in development
export default function DevLoginPage() {
  // Prevent access in production
  if (process.env.NODE_ENV === 'production') {
    redirect('/auth/login');
  }

  return (
    <div className="pt-24 pb-16">
      <PageHeader 
        title="Development Login" 
        description="Secure login for development environments"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Development Environment Only</h2>
            <p className="text-blue-600 dark:text-blue-400">
              This login mechanism is only available in development mode and does not 
              connect to the production Invoice Ninja service. It creates a local session 
              that mimics the production authentication flow.
            </p>
          </div>
          
          <DevLoginForm />
        </div>
      </div>
    </div>
  );
} 