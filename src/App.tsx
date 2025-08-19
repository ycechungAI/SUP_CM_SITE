import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SetupWizard from './components/SetupWizard';
import TemplateEngine from './components/TemplateEngine';
import Footer from './components/Footer';
import { WizardData } from './types';

function App() {
  const [wizardData, setWizardData] = useState<WizardData>({
    platform: '',
    tools: {
      languages: [],
      development: [],
      frameworks: [],
      custom: []
    },
    aiConfig: {
      enabled: false,
      model: ''
    },
    playbook: {
      generated: false,
      content: ''
    },
    deployment: {
      configured: false,
      type: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sup-cm-data', JSON.stringify(wizardData));
  }, [wizardData]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sup-cm-data');
    if (saved) {
      try {
        setWizardData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  const updateWizardData = (updates: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...updates }));
  };

  const generatePlaybook = async () => {
    setIsGenerating(true);
    
    // Simulate API call to generate playbook
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const playbookContent = `
# Development Environment Setup Playbook

## Platform: ${wizardData.platform}

## Selected Tools:
${wizardData.tools.languages.length > 0 ? `
### Programming Languages:
${wizardData.tools.languages.map(lang => `- ${lang}`).join('\n')}
` : ''}

${wizardData.tools.development.length > 0 ? `
### Development Tools:
${wizardData.tools.development.map(tool => `- ${tool}`).join('\n')}
` : ''}

${wizardData.tools.frameworks.length > 0 ? `
### Frameworks & Libraries:
${wizardData.tools.frameworks.map(fw => `- ${fw}`).join('\n')}
` : ''}

## Installation Steps:
1. Update system packages
2. Install selected programming languages
3. Configure development tools
4. Set up frameworks and libraries
5. Configure AI tools (if enabled)
6. Run verification tests

## Generated on: ${new Date().toLocaleString()}
    `.trim();

    updateWizardData({
      playbook: {
        generated: true,
        content: playbookContent
      }
    });

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SetupWizard
              data={wizardData}
              onUpdate={updateWizardData}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              onGenerate={generatePlaybook}
              isGenerating={isGenerating}
            />
          </div>
          
          <div className="lg:col-span-1">
            <TemplateEngine
              data={wizardData}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;