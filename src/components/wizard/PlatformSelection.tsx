import React from 'react';
import { Monitor, Smartphone, Server } from 'lucide-react';
import { WizardData, Platform } from '../../types';

interface PlatformSelectionProps {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onNext: () => void;
}

const PlatformSelection: React.FC<PlatformSelectionProps> = ({ data, onUpdate, onNext }) => {
  const platforms: Platform[] = [
    {
      id: 'macos',
      name: 'macOS',
      description: 'Uses Homebrew package manager for software installation',
      icon: '🍎',
      supported: true,
      features: ['Supports macOS 10.15+']
    },
    {
      id: 'linux',
      name: 'Linux',
      description: 'Supports apt, yum, and other native package managers',
      icon: '🐧',
      supported: true,
      features: ['Ubuntu, CentOS, Fedora supported']
    },
    {
      id: 'windows',
      name: 'Windows',
      description: 'Uses Chocolatey and Windows Package Manager',
      icon: '🪟',
      supported: true,
      features: ['Windows 10/11 supported']
    }
  ];

  const handlePlatformSelect = (platformId: string) => {
    onUpdate({ platform: platformId });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Platform Selection</h3>
          <p className="text-gray-600 mt-1">Choose your target operating system for environment setup</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-600 font-medium">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`platform-card ${data.platform === platform.id ? 'selected' : ''}`}
            onClick={() => handlePlatformSelect(platform.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{platform.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{platform.description}</p>
              
              <div className="space-y-2">
                {platform.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {data.platform === platform.id && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">Selected</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!data.platform}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next: Select Tools</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PlatformSelection;