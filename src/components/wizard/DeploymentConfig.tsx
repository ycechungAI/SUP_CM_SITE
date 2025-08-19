import React from 'react';
import { Download, ExternalLink, Github, Cloud } from 'lucide-react';
import { WizardData } from '../../types';

interface DeploymentConfigProps {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onPrevious: () => void;
}

const DeploymentConfig: React.FC<DeploymentConfigProps> = ({ data, onUpdate, onPrevious }) => {
  const handleDownloadPlaybook = () => {
    const blob = new Blob([data.playbook.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sup-cm-playbook-${data.platform}.yml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadScript = () => {
    const script = `#!/bin/bash
# SUP_CM Installation Script
# Generated for ${data.platform} platform

echo "Starting SUP_CM environment setup..."

# Update system packages
${data.platform === 'macos' ? 'brew update' : 
  data.platform === 'linux' ? 'sudo apt update && sudo apt upgrade -y' : 
  'choco upgrade all -y'}

# Install selected tools
${data.tools.languages.map(lang => {
  switch(lang) {
    case 'python': return data.platform === 'macos' ? 'brew install python@3.11' : 
                          data.platform === 'linux' ? 'sudo apt install python3.11 python3-pip -y' :
                          'choco install python311 -y';
    case 'nodejs': return data.platform === 'macos' ? 'brew install node@18' :
                          data.platform === 'linux' ? 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt install nodejs -y' :
                          'choco install nodejs --version=18.0.0 -y';
    default: return `# Install ${lang}`;
  }
}).join('\n')}

${data.tools.development.map(tool => {
  switch(tool) {
    case 'git': return data.platform === 'macos' ? 'brew install git' :
                      data.platform === 'linux' ? 'sudo apt install git -y' :
                      'choco install git -y';
    case 'docker': return data.platform === 'macos' ? 'brew install --cask docker' :
                          data.platform === 'linux' ? 'sudo apt install docker.io -y && sudo systemctl start docker' :
                          'choco install docker-desktop -y';
    default: return `# Install ${tool}`;
  }
}).join('\n')}

echo "SUP_CM environment setup completed!"
echo "Please restart your terminal to ensure all changes take effect."
`;

    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sup-cm-install-${data.platform}.sh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const expectedComponents = [
    { name: 'Package installation', status: 'ready', description: '0 tools' },
    { name: 'Configuration and setup', status: 'ready', description: 'Environment variables and configs' },
    { name: 'Service management', status: 'ready', description: 'Start and enable services' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Deploy & Download</h3>
        <p className="text-gray-600 mt-1">Download your generated playbook and deployment scripts</p>
      </div>

      {/* Expected Playbook Components */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Expected Playbook Components</h4>
        
        <div className="space-y-3">
          {expectedComponents.map((component, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-900">{component.name}</div>
                  <div className="text-sm text-gray-600">{component.description}</div>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">Ready</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Ansible Playbook</h4>
            <p className="text-gray-600 mb-4 text-sm">
              Complete Ansible playbook with all configurations and tasks
            </p>
            <button
              onClick={handleDownloadPlaybook}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Download Playbook
            </button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Installation Script</h4>
            <p className="text-gray-600 mb-4 text-sm">
              Bash script for quick setup without Ansible
            </p>
            <button
              onClick={handleDownloadScript}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Download Script
            </button>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Usage Instructions</h4>
        
        <div className="space-y-4">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Using the Ansible Playbook:</h5>
            <div className="bg-gray-900 text-gray-100 rounded p-3 text-sm font-mono">
              <div>ansible-playbook -i inventory sup-cm-playbook-{data.platform}.yml</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Using the Installation Script:</h5>
            <div className="bg-gray-900 text-gray-100 rounded p-3 text-sm font-mono">
              <div>chmod +x sup-cm-install-{data.platform}.sh</div>
              <div>./sup-cm-install-{data.platform}.sh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://docs.ansible.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Documentation</div>
              <div className="text-sm text-gray-600">Ansible documentation</div>
            </div>
          </a>
          
          <a
            href="https://github.com/ycechungAI/SUP_CM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Github className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">GitHub Repository</div>
              <div className="text-sm text-gray-600">Source code and issues</div>
            </div>
          </a>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </button>
        
        <div className="text-sm text-gray-600">
          Setup completed! Your development environment is ready to deploy.
        </div>
      </div>
    </div>
  );
};

export default DeploymentConfig;