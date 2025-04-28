'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileSignature, 
  faMoneyBill, 
  faTicket, 
  faInfoCircle, 
  faChartLine, 
  faCalendarAlt, 
  faClipboardList,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/layout/PageHeader';
import { useSession } from '@/lib/hooks/useSession';
import { useInvoices } from '@/lib/services/invoiceService';
import { InvoiceList } from '@/components/invoices/InvoiceList';
import DocumentsCard from '@/components/features/DocumentsCard';

export default function ClientDashboard() {
  const session = useSession();
  const isAuthenticated = session?.isAuthenticated ?? false;
  const { data: invoices, isLoading: isLoadingInvoices, error: invoiceError } = useInvoices();

  if (!isAuthenticated) {
    return null; // Layout will handle the redirect
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'SENT':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="pt-24 pb-16">
      <PageHeader 
        title="Client Dashboard" 
        description="Welcome to your personal dashboard"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faInfoCircle} className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <Link href="/client-portal/profile" className="hover:text-primary transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Profile</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account settings</p>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">3 active projects</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="h-6 w-6 text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 scheduled meetings</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faTicket} className="h-6 w-6 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support Tickets</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">1 open ticket</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Documents */}
          <DocumentsCard />
          
          {/* Billing */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <FontAwesomeIcon icon={faMoneyBill} className="h-8 w-8 text-white mb-4" />
              <h2 className="text-xl font-bold text-white">Billing</h2>
              <p className="text-green-100 mt-1">Manage invoices and payments</p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <InvoiceList 
                  invoices={invoices || []} 
                  isLoading={isLoadingInvoices} 
                  error={invoiceError as Error | null} 
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Link 
                  href="/client-portal/billing"
                  className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View All Invoices
                </Link>
              </div>
            </div>
          </div>
          
          {/* Support */}
          <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <FontAwesomeIcon icon={faQuestionCircle} className="h-8 w-8 text-white mb-4" />
              <h2 className="text-xl font-bold text-white">Support</h2>
              <p className="text-purple-100 mt-1">Get help with any issues</p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Ticket #567</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900/30 dark:text-blue-300">In Progress</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Ticket #566</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-300">Resolved</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Ticket #565</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-300">Resolved</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex justify-center">
                <a 
                  href="https://help.coreyalan.me/help/3530376337" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Tasks */}
        <div className="mt-12 bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <FontAwesomeIcon icon={faClipboardList} className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Tasks</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-lg text-left transition-colors">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Update Profile</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete your business information</p>
            </button>
            
            <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-lg text-left transition-colors">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Schedule Meeting</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Book a consultation with our team</p>
            </button>
            
            <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-lg text-left transition-colors">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Download Resources</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Access guides and templates</p>
            </button>
            
            <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-lg text-left transition-colors">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Submit Feedback</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Help us improve our services</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 