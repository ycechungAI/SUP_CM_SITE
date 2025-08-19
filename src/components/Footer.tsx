import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Supported Tools', href: '#' },
      { name: 'Platform Compatibility', href: '#' },
      { name: 'Troubleshooting', href: '#' }
    ],
    community: [
      { name: 'GitHub Repository', href: 'https://github.com/ycechungAI/SUP_CM' },
      { name: 'Report Issues', href: 'https://github.com/ycechungAI/SUP_CM/issues' },
      { name: 'Feature Requests', href: 'https://github.com/ycechungAI/SUP_CM/issues' },
      { name: 'Contributing', href: 'https://github.com/ycechungAI/SUP_CM/blob/main/CONTRIBUTING.md' }
    ]
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">SUP_CM</h3>
                <p className="text-sm text-gray-600">Development Environment Automation</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Automated development environment setup tool powered by AI and Ansible.
            </p>
            <a
              href="https://github.com/ycechungAI/SUP_CM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Open Source</span>
            </a>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} SUP_CM. Open source development environment automation tool.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;