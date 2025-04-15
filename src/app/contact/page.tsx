import { faEnvelope, faLocationDot, faClock, faPhone, faGlobe, faInfoCircle, faTicket } from '@fortawesome/free-solid-svg-icons';
import Icon from '@/components/ui-components/Icon';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import SocialLinks from '@/components/ui-components/SocialLinks';
import Image from 'next/image';

// Define metadata for the page
export const metadata = {
  title: 'Contact Me | Corey Stone',
  description: 'Get in touch with me for inquiries, project discussions, or support.'
};

export default function Contact() {
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
            <Icon icon={faInfoCircle} className="text-blue-500 h-6 w-6 mr-4 mt-1" />
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
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  <Icon icon={faTicket} className="mr-2" />
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
              <Icon icon={faClock} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Response Time</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              I typically respond to all inquiries within 24 hours during business days.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Icon icon={faGlobe} className="text-primary h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Availability</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Available for new projects and consultations. Let's discuss your needs.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Icon icon={faPhone} className="text-primary h-6 w-6 mr-3" />
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
              <div className="relative w-24 h-24">
                <Image
                  src="https://github.com/coreyalan.png"
                  alt="Corey Alan's GitHub avatar"
                  fill
                  className="rounded-full object-cover border-4 border-primary dark:border-primary-light shadow-lg"
                  sizes="(max-width: 768px) 96px, 96px"
                  priority
                />
              </div>
              
              {/* Contact Details */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Corey Stone</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Full Stack Developer & Technology Consultant</p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Icon icon={faEnvelope} className="text-primary h-5 w-5 mr-3" />
                    <a href="mailto:corey@coreyalan.me" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
                      corey@coreyalan.me
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Icon icon={faLocationDot} className="text-primary h-5 w-5 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">Based in California, USA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <SocialLinks />

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
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What types of projects do you take on?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                I specialize in custom web applications, system integrations, and infrastructure solutions for small to medium-sized businesses.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What's your typical response time?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                I aim to respond to all inquiries within 24 hours during business days. For urgent matters, please indicate in your message.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Do you offer free consultations?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, I offer a free 30-minute consultation to discuss your project needs and determine if we're a good fit.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What's your availability for new projects?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                I'm currently accepting new projects. Contact me to discuss timelines and availability for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 