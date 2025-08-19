import React, { useState } from 'react';
import { Download, Copy, Play, FileText } from 'lucide-react';
import { WizardData } from '../../types';

interface GeneratedPlaybookProps {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const GeneratedPlaybook: React.FC<GeneratedPlaybookProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  onGenerate,
  isGenerating
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.playbook.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
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

  const getSelectedToolsCount = () => {
    return Object.values(data.tools).reduce((total, tools) => total + tools.length, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Template-Based Playbook Generation</h3>
        <p className="text-gray-600 mt-1">Generate custom Ansible playbooks using proven templates based on your requirements</p>
      </div>

      {/* Configuration Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">📋 Describe Your Development Environment</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Project Type</h5>
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <span className="text-gray-900">Web Application</span>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Team Size</h5>
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <span className="text-gray-900">Solo Developer</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-medium text-gray-700 mb-2">Environment Description</h5>
          <div className="bg-white border border-gray-200 rounded p-3">
            <p className="text-gray-900 text-sm">
              Describe your ideal development setup. For example: 'I need a Python web development environment with Flask, PostgreSQL, and Redis for building a REST API. Include debugging tools and testing frameworks.'
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🖥️</div>
            <div className="text-sm font-medium text-gray-700">Platform</div>
            <div className="text-sm text-gray-600">{data.platform || 'Not selected'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🛠️</div>
            <div className="text-sm font-medium text-gray-700">Tools</div>
            <div className="text-sm text-gray-600">{getSelectedToolsCount()} selected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm font-medium text-gray-700">AI</div>
            <div className="text-sm text-gray-600">{data.aiConfig.enabled ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>
      </div>

      {/* Additional Requirements */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Additional Requirements</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">Include security hardening</span>
          </label>
          
          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">Configure CI/CD pipelines</span>
          </label>
          
          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">Setup monitoring and logging</span>
          </label>
          
          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">Configure backup solutions</span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      {!data.playbook.generated && (
        <div className="text-center">
          <button
            onClick={onGenerate}
            disabled={isGenerating || !data.platform}
            className="inline-flex items-center space-x-3 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg font-medium"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Template Playbook...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Generate Template Playbook</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Generated Playbook */}
      {data.playbook.generated && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Generated Playbook</span>
            </h4>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm whitespace-pre-wrap">{data.playbook.content}</pre>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h5 className="font-medium text-green-900 mb-1">Playbook Generated Successfully!</h5>
                <p className="text-sm text-green-700">
                  Your custom Ansible playbook has been generated based on your configuration. 
                  You can now download it and run it on your target systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
        
        {data.playbook.generated && (
          <button
            onClick={onNext}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span>Next: Deploy & Download</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratedPlaybook;