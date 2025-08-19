import React from 'react';
import { Zap, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { WizardData, TemplateProgress } from '../types';

interface TemplateEngineProps {
  data: WizardData;
  isGenerating: boolean;
}

const TemplateEngine: React.FC<TemplateEngineProps> = ({ data, isGenerating }) => {
  const getTemplateProgress = (): TemplateProgress => {
    return {
      environmentParsed: !!data.platform && Object.values(data.tools).some(tools => tools.length > 0),
      toolCompatibilityVerified: !!data.platform,
      templateSelectionPending: !data.playbook.generated
    };
  };

  const progress = getTemplateProgress();

  const getStatusIcon = (status: boolean, isPending: boolean = false) => {
    if (isPending && isGenerating) {
      return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>;
    }
    if (status) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const getStatusText = (status: boolean, isPending: boolean = false) => {
    if (isPending && isGenerating) return 'In Progress';
    if (status) return 'Complete';
    return 'Pending';
  };

  const getStatusColor = (status: boolean, isPending: boolean = false) => {
    if (isPending && isGenerating) return 'text-blue-600';
    if (status) return 'text-green-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Template Engine Header */}
      <div className="wizard-step">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Template Engine</h3>
            <p className="text-sm text-gray-600">Template-Based Generation</p>
          </div>
        </div>

        {/* Template Progress */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Template Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(progress.environmentParsed)}
                  <span className="text-sm text-gray-700">Environment requirements parsed</span>
                </div>
                <span className={`text-xs font-medium ${getStatusColor(progress.environmentParsed)}`}>
                  {getStatusText(progress.environmentParsed)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(progress.toolCompatibilityVerified)}
                  <span className="text-sm text-gray-700">Tool compatibility verified</span>
                </div>
                <span className={`text-xs font-medium ${getStatusColor(progress.toolCompatibilityVerified)}`}>
                  {getStatusText(progress.toolCompatibilityVerified)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(!progress.templateSelectionPending, progress.templateSelectionPending)}
                  <span className="text-sm text-gray-700">Template selection pending</span>
                </div>
                <span className={`text-xs font-medium ${getStatusColor(!progress.templateSelectionPending, progress.templateSelectionPending)}`}>
                  {getStatusText(!progress.templateSelectionPending, progress.templateSelectionPending)}
                </span>
              </div>
            </div>
          </div>

          {/* Ready Status */}
          {progress.environmentParsed && progress.toolCompatibilityVerified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">Ready</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expected Playbook Components */}
      <div className="wizard-step">
        <h4 className="font-medium text-gray-900 mb-4">Expected Playbook Components</h4>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">Package installation (0 tools)</div>
              <div className="text-xs text-gray-600">Install selected development tools</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">Configuration and setup</div>
              <div className="text-xs text-gray-600">Configure environment variables and settings</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">Service management</div>
              <div className="text-xs text-gray-600">Start and enable required services</div>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Status */}
      {isGenerating && (
        <div className="wizard-step">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">Generating Playbook...</div>
              <div className="text-xs text-gray-600">Creating custom Ansible playbook</div>
            </div>
          </div>
        </div>
      )}

      {/* Success Status */}
      {data.playbook.generated && !isGenerating && (
        <div className="wizard-step">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <div className="text-sm font-medium text-green-700">Playbook Generated!</div>
              <div className="text-xs text-green-600">Ready for download and deployment</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateEngine;