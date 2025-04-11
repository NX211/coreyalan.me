'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faClock, faPhone, faGlobe, faInfoCircle, faTicket, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faMastodon, faBluesky } from '@fortawesome/free-brands-svg-icons';
import GitHubAvatar from '@/components/GitHubAvatar';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeq-4XfCCrlbweklA6W2YB2TIN-nE9lRTgxYvzTA0KI4OfLyw/formResponse';
    
    try {
      // Create form data object with Google Forms entry IDs
      const googleFormsData = new FormData();
      googleFormsData.append('entry.2005620554', formData.name); // Replace with your actual entry IDs
      googleFormsData.append('entry.1045781291', formData.email);
      googleFormsData.append('entry.1065046570', formData.subject);
      googleFormsData.append('entry.1166974658', formData.message);

      // Submit to Google Forms
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormsData
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('There was an error submitting your message. Please try again.');
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

      {/* Support Notice */}
      <div className="container mx-auto px-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 mt-12">
          <div className="flex items-start">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-6 w-6 mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Client Support Notice</h3>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                For existing clients with support needs, project inquiries, or technical issues, please use our dedicated support portal for faster response times and better tracking of your requests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://helpdesk.authoritah.com/help/3530376337"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faTicket} className="mr-2" />
                  Access Support Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Info */}
      <div className="container mx-auto px-4 py-8 dark:bg-[#0F172A]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faClock} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Response Time</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              I typically respond to all inquiries within 24 hours during business days.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faGlobe} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Availability</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Available for new projects and consultations. Let's discuss your needs.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faPhone} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Preferred Contact</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Email is the best way to reach me. I'll get back to you as soon as possible.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E293B] dark:to-[#0F172A] p-8 rounded-lg shadow-md border-l-4 border-primary">
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
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Corey Stone</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Full Stack Developer & Technology Consultant</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primary h-5 w-5 mr-3" />
                    <a href="mailto:corey@coreyalan.me" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                      corey@coreyalan.me
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <FontAwesomeIcon icon={faLocationDot} className="text-primary h-5 w-5 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">Nashville, TN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              <a 
                href="https://github.com/NX211" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/corey-stone-17b19a80" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
              </a>
              <a 
                href="https://authoritah.social/@nx211" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                aria-label="Mastodon"
              >
                <FontAwesomeIcon icon={faMastodon} className="h-6 w-6" />
              </a>
              <a 
                href="https://bsky.app/profile/nx211.bsky.social" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                aria-label="Bluesky"
              >
                <FontAwesomeIcon icon={faBluesky} className="h-6 w-6" />
              </a>
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

            {/* Calendar Booking Button */}
            <div className="text-center mt-8">
              <a
                href="https://calendar.app.google/4bZN3vV8H6aU5cNt9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Schedule a Meeting
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-lg">
                <p className="text-center">
                  Thank you for your message! I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    placeholder="Your name"
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Support">Support</option>
                    <option value="Other">Other</option>
                  </select>
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    placeholder="Your message here..."
                  />
                </div>

                {error && (
                  <div className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 flex items-center justify-center"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 