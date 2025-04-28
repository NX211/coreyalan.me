'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faGlobe, faMapMarkerAlt, faCity, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/layout/PageHeader';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  
  // State for contacts array (at least one required)
  const [contacts, setContacts] = useState([
    { firstName: '', lastName: '', email: '', phone: '', isPrimary: true }
  ]);

  const handleContactChange = (index: number, field: string, value: string | boolean) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };

  const addContact = () => {
    setContacts([...contacts, { firstName: '', lastName: '', email: '', phone: '', isPrimary: false }]);
  };

  const removeContact = (index: number) => {
    if (contacts.length > 1) {
      const newContacts = [...contacts];
      newContacts.splice(index, 1);
      setContacts(newContacts);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    const formData = new FormData(e.currentTarget);
    
    const registrationData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      website: formData.get('website') as string,
      address1: formData.get('address1') as string,
      address2: formData.get('address2') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      postalCode: formData.get('postalCode') as string,
      countryId: formData.get('countryId') as string,
      contacts: contacts
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.details) {
          setValidationErrors(data.details);
        } else {
          throw new Error(data.error || 'Registration failed');
        }
      } else {
        // Registration successful
        router.push('/auth/login?registered=true');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <PageHeader 
        title="Create an Account" 
        description="Sign up for a client portal account"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Company Information</h3>
            
            {/* Company Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                  placeholder="Your company name"
                />
              </div>
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                  placeholder="company@example.com"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.email[0]}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faGlobe} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="website"
                  name="website"
                  type="url"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>
              {validationErrors.website && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.website[0]}</p>
              )}
            </div>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pt-4">Address</h3>

            {/* Address Line 1 */}
            <div>
              <label htmlFor="address1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address Line 1*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="address1"
                  name="address1"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                  placeholder="123 Main St"
                />
              </div>
              {validationErrors.address1 && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.address1[0]}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div>
              <label htmlFor="address2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address Line 2
              </label>
              <div className="relative">
                <input
                  id="address2"
                  name="address2"
                  type="text"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                  placeholder="Suite 100"
                />
              </div>
            </div>

            {/* City, State, Postal Code - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faCity} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                    placeholder="City"
                  />
                </div>
                {validationErrors.city && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.city[0]}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State/Province*
                </label>
                <div className="relative">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                    placeholder="State/Province"
                  />
                </div>
                {validationErrors.state && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.state[0]}</p>
                )}
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Postal Code*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faMailBulk} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                    placeholder="ZIP/Postal Code"
                  />
                </div>
                {validationErrors.postalCode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.postalCode[0]}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="countryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country*
              </label>
              <div className="relative">
                <select
                  id="countryId"
                  name="countryId"
                  required
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              {validationErrors.countryId && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.countryId[0]}</p>
              )}
            </div>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pt-4">Contacts</h3>
            
            {contacts.map((contact, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium">Contact {index + 1}</h4>
                  {contacts.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeContact(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      value={contact.firstName}
                      onChange={(e) => handleContactChange(index, 'firstName', e.target.value)}
                      required
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="First Name"
                    />
                    {validationErrors[`contacts.${index}.firstName`] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors[`contacts.${index}.firstName`][0]}</p>
                    )}
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      value={contact.lastName}
                      onChange={(e) => handleContactChange(index, 'lastName', e.target.value)}
                      required
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="Last Name"
                    />
                    {validationErrors[`contacts.${index}.lastName`] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors[`contacts.${index}.lastName`][0]}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                      required
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="Email"
                    />
                    {validationErrors[`contacts.${index}.email`] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors[`contacts.${index}.email`][0]}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-white"
                      placeholder="Phone"
                    />
                  </div>
                </div>
                
                {/* Primary Contact */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`primary-${index}`}
                    checked={contact.isPrimary}
                    onChange={(e) => {
                      // If this contact is being set as primary, unset others
                      if (e.target.checked) {
                        const newContacts = contacts.map((c, i) => ({
                          ...c,
                          isPrimary: i === index
                        }));
                        setContacts(newContacts);
                      } else {
                        handleContactChange(index, 'isPrimary', e.target.checked);
                      }
                    }}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor={`primary-${index}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Primary Contact
                  </label>
                </div>
              </div>
            ))}
            
            <div>
              <button
                type="button"
                onClick={addContact}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add Another Contact
              </button>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 