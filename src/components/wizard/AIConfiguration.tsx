import React from 'react';
import { Brain, Zap, Shield } from 'lucide-react';
import { WizardData } from '../../types';

interface AIConfigurationProps {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AIConfiguration: React.FC<AIConfigurationProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const handleAIToggle = (enabled: boolean) => {
    onUpdate({
      aiConfig: {
        ...data.aiConfig,
        enabled
      }
    });
  };

  const handleModelSelect = (model: string) => {
    onUpdate({
      aiConfig: {
        ...data.aiConfig,
        model
      }
    });
  };

  const aiModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Most capable model for complex reasoning',
      features: ['Advanced reasoning', 'Code generation', 'Problem solving']
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      description: 'Excellent for analysis and writing',
      features: ['Document analysis', 'Code review', 'Technical writing']
    },
    {
      id: 'local-llm',
      name: 'Local LLM',
      description: 'Run AI models locally for privacy',
      features: ['Privacy focused', 'Offline capable', 'Customizable']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">AI Configuration</h3>
        <p className="text-gray-600 mt-1">Configure AI assistance for your development environment</p>
      </div>

      {/* AI Enable/Disable */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Brain className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Enable AI Assistant</h4>
            <p className="text-gray-600 mb-4">
              Add AI-powered features to help with code generation, debugging, and environment optimization.
            </p>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleAIToggle(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  data.aiConfig.enabled
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Enable AI
              </button>
              <button
                onClick={() => handleAIToggle(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !data.aiConfig.enabled
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Disable AI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Model Selection */}
      {data.aiConfig.enabled && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Select AI Model</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiModels.map((model) => (
              <div
                key={model.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  data.aiConfig.model === model.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
                onClick={() => handleModelSelect(model.id)}
              >
                <div className="text-center">
                  <h5 className="font-semibold text-gray-900 mb-2">{model.name}</h5>
                  <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                  
                  <div className="space-y-2">
                    {model.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center space-x-2">
                        <Zap className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {data.aiConfig.model === model.id && (
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm text-purple-600 font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* AI Features */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900 mb-1">AI Features Included</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Intelligent code completion and suggestions</li>
                  <li>• Automated error detection and fixes</li>
                  <li>• Environment optimization recommendations</li>
                  <li>• Documentation generation</li>
                  <li>• Security vulnerability scanning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-yellow-900 mb-1">Privacy & Security</h5>
            <p className="text-sm text-yellow-700">
              {data.aiConfig.enabled
                ? data.aiConfig.model === 'local-llm'
                  ? 'Local AI models keep your data private and secure on your machine.'
                  : 'Your code and data may be processed by external AI services. Review their privacy policies.'
                : 'AI features are disabled. Your development environment will work without AI assistance.'
              }
            </p>
          </div>
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
        
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span>Next: Generate Playbook</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIConfiguration;