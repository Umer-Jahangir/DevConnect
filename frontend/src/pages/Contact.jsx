import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'umerjahangir.cs@gmail.com',
      link: 'mailto:umerjahangir.cs@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+92 3055659793',
      link: 'tel:+923055659793'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Chiniot, Ch, PAK',
      link: 'https://satellites.pro/Google_plan/Chiniot_map#google_vignette'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Have questions or suggestions? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg 
                hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg 
                flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {info.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {info.content}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                    focus:border-transparent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                    focus:border-transparent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                  focus:border-transparent transition-colors"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                  focus:border-transparent transition-colors resize-y"
                placeholder="Your message..."
              ></textarea>
            </div>

            {success && (
              <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 
                bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 
                text-white font-medium rounded-lg transition-colors duration-200
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;