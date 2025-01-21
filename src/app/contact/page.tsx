'use client';

import { useState } from 'react';

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Show success message
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    setIsSubmitting(false);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out through our other channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-500 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gray-900 text-white py-3 rounded-md transition-all duration-300
                  ${isSubmitting 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:bg-gray-800 hover:shadow-md transform hover:-translate-y-0.5'}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitSuccess && (
                <div className="text-green-600 text-center animate-fade-in">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Store Location */}
            <div className="group">
              <h3 className="text-xl font-semibold mb-4">Visit Our Store</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div 
                  className="w-full h-full bg-center bg-cover transform transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://placehold.co/800x400/222222/ffffff?text=Store+Location')" }}
                ></div>
              </div>
              <p className="text-gray-500">
                123 Fashion Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                  <span className="mr-2">📧</span>
                  Email: info@schmugbags.com
                </p>
                <p className="flex items-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                  <span className="mr-2">📞</span>
                  Phone: +1 (555) 123-4567
                </p>
                <p className="flex items-center text-gray-500">
                  <span className="mr-2">⏰</span>
                  Hours: Mon-Fri 9am-6pm EST
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900 hover:scale-110 transform transition-all duration-300">
                  Instagram
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 hover:scale-110 transform transition-all duration-300">
                  Facebook
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 hover:scale-110 transform transition-all duration-300">
                  Twitter
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 hover:scale-110 transform transition-all duration-300">
                  Pinterest
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2">Have a Question?</h3>
              <p className="text-gray-500 mb-4">
                Check our frequently asked questions for quick answers to common inquiries.
              </p>
              <a
                href="/faq"
                className="text-gray-900 font-semibold hover:underline hover:text-gray-700 transition-colors inline-flex items-center group"
              >
                View FAQ 
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 