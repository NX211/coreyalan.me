'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faClock, faPhone, faGlobe, faInfoCircle, faTicket, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faMastodon, faBluesky } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Contact Us" 
        description="Have A Question Or Want To Work Together? Get In Touch!"
      />

      {/* Support Notice */}
      <div className="container mx-auto px-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 mt-12">
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 h-6 w-6 mb-4" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Client Support Notice</h3>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                For existing clients with support needs, project inquiries, or technical issues, please use our dedicated support portal for faster response times and better tracking of your requests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://help.coreyalan.me/help/3530376337"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
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
            {/* Profile Photo and Contact Info Row */}
            <div className="flex flex-col items-center gap-6 mb-8">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32">
                  <Image
                    src="/images/logo.png"
                    alt="Corey Alan Consulting Logo"
                    fill
                    className="object-contain"
                    sizes="128px"
                    priority
                  />
                </div>
              </div>
              
              {/* Contact Details */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#37abc8] mb-2">Corey Alan Consulting</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Turning Vision Into Reality With Code And Design</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primary h-5 w-5 mr-3" />
                    <a href="mailto:contact@coreyalan.com" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                      contact@coreyalan.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faLocationDot} className="text-primary h-5 w-5 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">Clarksville, TN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              <a 
                href="https://linkedin.com/company/corey-alan-consulting" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
              </a>
              <a 
                href="https://github.com/Corey-Alan-Consulting" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
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
                href="https://calendly.com/coreyalan/discovery-meeting"
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
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <ContactForm 
              title="Send a Message"
              description="Fill out the form below to get in touch with me"
              titleClassName="text-[#37abc8]"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 