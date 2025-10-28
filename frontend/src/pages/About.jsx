import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Code, Award, ExternalLink } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a thriving community of developers sharing knowledge and experiences.'
    },
    {
      icon: Code,
      title: 'Developer Focused',
      description: 'Platform built by developers, for developers, with modern tools and technologies.'
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'Curated technical content and discussions that help you grow as a developer.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About DevConnect
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            DevConnect is a platform where developers come together to share knowledge, 
            discuss ideas, and build a stronger community through meaningful interactions.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg 
                hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg 
                flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            We believe in the power of community-driven learning and knowledge sharing. 
            Our mission is to create a space where developers of all skill levels can 
            come together, share their experiences, learn from each other, and grow 
            together in their professional journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg
                bg-gray-600 hover:bg-gray-700 text-white font-medium
                transition-colors duration-200"
            >
              Get in Touch
            </Link>
            <a 
              href="https://github.com/Umer-Jahangir" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg
                border border-gray-300 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-700
                text-gray-700 dark:text-gray-300 font-medium
                transition-colors duration-200"
            >
              Visit GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;