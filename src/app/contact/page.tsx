'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faMastodon, faBluesky } from '@fortawesome/free-brands-svg-icons';
import GitHubAvatar from '@/components/GitHubAvatar';
import PageHeader from '@/components/PageHeader';

// Add a type declaration for the Formbricks global
declare global {
  interface Window {
    formbricks?: {
      track: (event: string, data: any) => void;
    };
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Load Formbricks script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.NEXT_PUBLIC_FORMBRICKS_URL}/js/formbricks.js`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Submit form data to Formbricks
      if (typeof window !== 'undefined' && window.formbricks) {
        window.formbricks.track('contact_form_submitted', formData);
      }

      // Alternative: Direct API call to Formbricks
      const response = await fetch(`${process.env.NEXT_PUBLIC_FORMBRICKS_URL}/api/v1/client/forms/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: process.env.NEXT_PUBLIC_FORMBRICKS_FORM_ID,
          data: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Contact Me"
        description="Have a question or want to work together? Get in touch!"
      />

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-md border-l-4 border-primary">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Get in Touch</h2>
              
              {/* Profile Photo and Contact Info Row */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <GitHubAvatar 
                    username="NX211" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary dark:border-primary-light shadow-lg"
                  />
                </div>
                
                {/* Contact Details */}
                <div className="flex-grow space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-primary dark:text-primary-light">
                      <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                      <a
                        href="mailto:corey@coreyalan.me"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors duration-300"
                      >
                        corey@coreyalan.me
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-primary dark:text-primary-light">
                      <FontAwesomeIcon icon={faLocationDot} className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Clarksville, TN, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/NX211"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-[#171515] dark:hover:text-white transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/corey-stone-17b19a80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-[#0077b5] dark:hover:text-[#0077b5] transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
                  </a>
                  <a
                    href="https://authoritah.social/@nx211"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-[#563acc] dark:hover:text-[#563acc] transition-colors duration-300"
                    aria-label="Mastodon"
                  >
                    <FontAwesomeIcon icon={faMastodon} className="h-6 w-6" />
                  </a>
                  <a
                    href="https://bsky.app/profile/nx211.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-[#0085ff] dark:hover:text-[#0085ff] transition-colors duration-300"
                    aria-label="Bluesky"
                  >
                    <FontAwesomeIcon icon={faBluesky} className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-t-4 border-primary">
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                data-formbricks-form={process.env.NEXT_PUBLIC_FORMBRICKS_FORM_ID}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-light dark:focus:border-primary-light focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-light dark:focus:border-primary-light focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-light dark:focus:border-primary-light focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-light dark:focus:border-primary-light focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">{error}</div>
                )}
                {submitted && (
                  <div className="text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">Thank you for your message! I'll get back to you soon.</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 