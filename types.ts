
export enum WorkflowIcon {
    INPUT = 'input',
    PROCESS = 'process',
    DECISION = 'decision',
    OUTPUT = 'output',
    HUMAN = 'human',
    DATABASE = 'database',
    API = 'api'
}

export interface WorkflowStep {
  title: string;
  description: string;
  icon: WorkflowIcon;
}
