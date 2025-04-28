'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/hooks/useSession';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function ProfilePage() {
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session?.isAuthenticated ?? false;
  const [isLoading, setIsLoading] = useState(false);
  const isDevMode = process.env.NODE_ENV === 'development' && process.env.DEV_AUTH_ENABLED === 'true';

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/login?returnUrl=/client-portal/profile');
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <PageHeader 
        title="Your Profile" 
        description="Manage your account information and preferences"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Development Mode Notice */}
        {isDevMode && (
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-1 mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Development Mode</h2>
                <p className="text-blue-600 dark:text-blue-400">
                  You are currently logged in using development authentication. Changes made here will be stored locally and won't affect your production account.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Profile Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal and business information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input id="address" placeholder="123 Business St, Suite 100" />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Account Settings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="invoiceNotifications" className="rounded" />
                      <Label htmlFor="invoiceNotifications" className="text-sm">
                        Invoice Notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="supportNotifications" className="rounded" />
                      <Label htmlFor="supportNotifications" className="text-sm">
                        Support Updates
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="marketingNotifications" className="rounded" />
                      <Label htmlFor="marketingNotifications" className="text-sm">
                        Marketing Communications
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 