import React from 'react';
import PlatformSelection from './wizard/PlatformSelection';
import DevelopmentTools from './wizard/DevelopmentTools';
import AIConfiguration from './wizard/AIConfiguration';
import GeneratedPlaybook from './wizard/GeneratedPlaybook';
import DeploymentConfig from './wizard/DeploymentConfig';
import ProgressBar from './wizard/ProgressBar';
import { WizardData } from '../types';

interface SetupWizardProps {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  currentStep: number;
  onStepChange: (step: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const SetupWizard: React.FC<SetupWizardProps> = ({
  data,
  onUpdate,
  currentStep,
  onStepChange,
  onGenerate,
  isGenerating
}) => {
  const steps = [
    { id: 'platform', title: 'Platform Selection', component: PlatformSelection },
    { id: 'tools', title: 'Development Tools', component: DevelopmentTools },
    { id: 'ai', title: 'AI Configuration', component: AIConfiguration },
    { id: 'playbook', title: 'Generated Playbook', component: GeneratedPlaybook },
    { id: 'deployment', title: 'Deploy & Download', component: DeploymentConfig }
  ];

  const CurrentStepComponent = steps[currentStep]?.component;

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const calculateProgress = () => {
    let progress = 0;
    if (data.platform) progress += 20;
    if (data.tools.languages.length > 0 || data.tools.development.length > 0) progress += 20;
    if (data.aiConfig.enabled !== undefined) progress += 20;
    if (data.playbook.generated) progress += 20;
    if (data.deployment.configured) progress += 20;
    return progress;
  };

  return (
    <div className="space-y-6">
      <div className="wizard-step">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Wizard</h2>
        
        {/* Progress */}
        <div className="mb-8">
          <ProgressBar progress={calculateProgress()} />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Setup Completion</span>
            <span>{calculateProgress()}%</span>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepChange(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                getStepStatus(index) === 'active'
                  ? 'bg-blue-500 text-white'
                  : getStepStatus(index) === 'completed'
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${
                  getStepStatus(index) === 'active' ? 'bg-white' :
                  getStepStatus(index) === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <span>{step.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Current Step Content */}
        {CurrentStepComponent && (
          <CurrentStepComponent
            data={data}
            onUpdate={onUpdate}
            onNext={() => onStepChange(Math.min(currentStep + 1, steps.length - 1))}
            onPrevious={() => onStepChange(Math.max(currentStep - 1, 0))}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
          />
        )}
      </div>
    </div>
  );
};

export default SetupWizard;