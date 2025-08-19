export interface WizardData {
  platform: string;
  tools: {
    languages: string[];
    development: string[];
    frameworks: string[];
    custom: string[];
  };
  aiConfig: {
    enabled: boolean;
    model: string;
  };
  playbook: {
    generated: boolean;
    content: string;
  };
  deployment: {
    configured: boolean;
    type: string;
  };
}

export interface Platform {
  id: string;
  name: string;
  description: string;
  icon: string;
  supported: boolean;
  features: string[];
}

export interface Tool {
  id: string;
  name: string;
  category: 'languages' | 'development' | 'frameworks' | 'custom';
  icon: string;
  description: string;
}

export interface TemplateProgress {
  environmentParsed: boolean;
  toolCompatibilityVerified: boolean;
  templateSelectionPending: boolean;
}