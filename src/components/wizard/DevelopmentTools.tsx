import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { WizardData, Tool } from '../../types';

interface DevelopmentToolsProps {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DevelopmentTools: React.FC<DevelopmentToolsProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [showCustomTool, setShowCustomTool] = useState(false);
  const [customTool, setCustomTool] = useState({ name: '', description: '', category: 'Development Tools' });

  const toolCategories = {
    languages: {
      title: 'Programming Languages',
      icon: '💻',
      tools: [
        { id: 'python', name: 'Python 3.11', icon: '🐍', description: 'High-level programming language' },
        { id: 'nodejs', name: 'Node.js 18', icon: '🟢', description: 'JavaScript runtime environment' },
        { id: 'java', name: 'Java 17', icon: '☕', description: 'Object-oriented programming language' },
        { id: 'go', name: 'Go 1.21', icon: '🔵', description: 'Systems programming language' }
      ]
    },
    development: {
      title: 'Development Tools',
      icon: '🛠️',
      tools: [
        { id: 'git', name: 'Git', icon: '📝', description: 'Version control system' },
        { id: 'vscode', name: 'VS Code', icon: '💙', description: 'Code editor' },
        { id: 'docker', name: 'Docker', icon: '🐳', description: 'Containerization platform' }
      ]
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      icon: '📚',
      tools: [
        { id: 'react', name: 'React', icon: '⚛️', description: 'JavaScript library for UIs' },
        { id: 'flask', name: 'Flask', icon: '🌶️', description: 'Python web framework' },
        { id: 'django', name: 'Django', icon: '🎸', description: 'Python web framework' }
      ]
    }
  };

  const handleToolToggle = (category: keyof typeof data.tools, toolId: string) => {
    const currentTools = data.tools[category];
    const updatedTools = currentTools.includes(toolId)
      ? currentTools.filter(id => id !== toolId)
      : [...currentTools, toolId];

    onUpdate({
      tools: {
        ...data.tools,
        [category]: updatedTools
      }
    });
  };

  const handleAddCustomTool = () => {
    if (customTool.name.trim()) {
      onUpdate({
        tools: {
          ...data.tools,
          custom: [...data.tools.custom, customTool.name]
        }
      });
      setCustomTool({ name: '', description: '', category: 'Development Tools' });
      setShowCustomTool(false);
    }
  };

  const removeCustomTool = (toolName: string) => {
    onUpdate({
      tools: {
        ...data.tools,
        custom: data.tools.custom.filter(name => name !== toolName)
      }
    });
  };

  const getSelectedToolsCount = () => {
    return Object.values(data.tools).reduce((total, tools) => total + tools.length, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Development Tools</h3>
          <p className="text-gray-600 mt-1">Select the tools and frameworks you need for your development environment</p>
        </div>
        <button
          onClick={() => setShowCustomTool(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Tool</span>
        </button>
      </div>

      {/* Custom Tool Modal */}
      {showCustomTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Add Custom Tool</h4>
              <button
                onClick={() => setShowCustomTool(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tool Name *</label>
                <input
                  type="text"
                  value={customTool.name}
                  onChange={(e) => setCustomTool({ ...customTool, name: e.target.value })}
                  placeholder="e.g., Rust, MongoDB, Tailwind CSS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={customTool.description}
                  onChange={(e) => setCustomTool({ ...customTool, description: e.target.value })}
                  placeholder="Brief description of what this tool does"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={customTool.category}
                  onChange={(e) => setCustomTool({ ...customTool, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Development Tools">Development Tools</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleAddCustomTool}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Tool
                </button>
                <button
                  onClick={() => setShowCustomTool(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool Categories */}
      <div className="space-y-8">
        {Object.entries(toolCategories).map(([categoryKey, category]) => (
          <div key={categoryKey}>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h4 className="text-lg font-semibold text-gray-900">{category.title}</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.tools.map((tool) => (
                <div
                  key={tool.id}
                  className={`tool-option ${
                    data.tools[categoryKey as keyof typeof data.tools].includes(tool.id) ? 'selected' : ''
                  }`}
                  onClick={() => handleToolToggle(categoryKey as keyof typeof data.tools, tool.id)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-xl">{tool.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="text-sm text-gray-600">{tool.description}</div>
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    data.tools[categoryKey as keyof typeof data.tools].includes(tool.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {data.tools[categoryKey as keyof typeof data.tools].includes(tool.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Tools */}
        {data.tools.custom.length > 0 && (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">🔧</span>
              <h4 className="text-lg font-semibold text-gray-900">Custom Tools</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.tools.custom.map((toolName, index) => (
                <div key={index} className="tool-option selected">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <div className="font-medium text-gray-900">{toolName}</div>
                      <div className="text-sm text-gray-600">Custom tool</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeCustomTool(toolName)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Tools Summary */}
      {getSelectedToolsCount() > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Selected Tools Summary</h5>
          <p className="text-blue-700 text-sm">
            {getSelectedToolsCount()} tools selected for your development environment
          </p>
          <div className="text-xs text-blue-600 mt-1">
            No tools selected
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
        
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span>Next: AI Configuration</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DevelopmentTools;