export interface SlideInfo {
  id: number;
  number: number;
  title: string;
  shortTitle: string;
  category: 'Context' | 'Framework' | 'Operations' | 'Roadmap' | 'Conclusion';
}

export type SlipType = 'Normal' | 'Strike-slip' | 'Thrust' | 'Subduction';

export interface FaultFeature {
  id: string;
  name: string;
  type: SlipType;
  coords: [number, number][];
  lengthKm: number;
  potentialMw: string;
  description: string;
}

export interface SeismicEvent {
  id: string;
  year: number;
  title: string;
  magnitude: number;
  depthKm: number;
  fatalities: number;
  description: string;
  coords: [number, number];
}

export interface CriticalAsset {
  id: string;
  name: string;
  category: 'Lifeline' | 'Port & Logistics' | 'Healthcare' | 'Basin Hazard' | 'Governance';
  vulnerability: 'Very High' | 'High' | 'Moderate';
  coords: [number, number];
  description: string;
  priorityMitigation: string;
}

export interface MatrixCellData {
  likelihood: 'Likely' | 'Occasional' | 'Rare';
  impact: 'Moderate' | 'Major' | 'Severe';
  title: string;
  priorityText: string;
  actionProtocol: string;
  level: 'green' | 'amber' | 'red';
  exampleScenario: string;
  statutoryLead: string;
}

export interface MDRGAIndicator {
  id: string;
  code: string;
  text: string;
  guidance: string;
}

export interface MDRGACategory {
  id: number;
  name: string;
  leadMinistry: string;
  indicators: MDRGAIndicator[];
}

export interface ReadinessPillar {
  id: string;
  title: string;
  iconName: string;
  description: string;
  items: {
    id: string;
    label: string;
    subtext: string;
  }[];
}

export interface BlueprintRow {
  pillar: string;
  operationalObjectives: string;
  mandatedTools: string;
  keyStakeholders: string;
  timeline: string;
  keyMetrics: string;
}
