import { SlideInfo, MatrixCellData, MDRGACategory, ReadinessPillar, BlueprintRow } from '../types';

export const SLIDES_LIST: SlideInfo[] = [
  { id: 1, number: 1, title: 'Title & Research Team', shortTitle: '1. Title & Authors', category: 'Context' },
  { id: 2, number: 2, title: 'Systemic Urban Risk in Türkiye & Aegean', shortTitle: '2. Systemic Urban Risk', category: 'Context' },
  { id: 3, number: 3, title: 'İzmir Motivates a City-Scale Approach', shortTitle: '3. İzmir Regional Map', category: 'Context' },
  { id: 4, number: 4, title: 'Sendai Closed-Loop Learning Cycle', shortTitle: '4. Learning Cycle', category: 'Framework' },
  { id: 5, number: 5, title: 'Concentric Nested Nexus Architecture', shortTitle: '5. Nested Nexus', category: 'Framework' },
  { id: 6, number: 6, title: 'Operational Resilience Cycle (Figure 3)', shortTitle: '6. Operational Cycle (Fig. 3)', category: 'Framework' },
  { id: 7, number: 7, title: 'Resilience Investment Appraisal Funnel', shortTitle: '7. Investment Appraisal', category: 'Operations' },
  { id: 8, number: 8, title: 'Contribution Boundaries & Limitations', shortTitle: '8. Boundaries & Scope', category: 'Roadmap' },
  { id: 9, number: 9, title: 'Synthesis & Key Takeaways', shortTitle: '9. Key Takeaways', category: 'Conclusion' },
  { id: 10, number: 10, title: 'Thank You', shortTitle: '10. Thank You', category: 'Conclusion' },
];

export const RISK_MATRIX_CELLS: MatrixCellData[] = [
  // Row: Likely
  {
    likelihood: 'Likely',
    impact: 'Moderate',
    title: 'Likely × Moderate',
    priorityText: 'Plan retrofits & capital reserves',
    actionProtocol: 'Integrate into 5-year municipal capital improvement programs. Prioritize non-structural seismic retrofits for schools and clinics.',
    level: 'amber',
    exampleScenario: 'Moderate Mw 5.0–5.5 shallow event causing non-structural masonry cracking, utility service interruptions, and road blockages.',
    statutoryLead: 'Municipal Directorate of Building Inspection & District Municipalities',
  },
  {
    likelihood: 'Likely',
    impact: 'Major',
    title: 'Likely × Major',
    priorityText: 'Priority: Lifeline strengthening',
    actionProtocol: 'Mandatory structural strengthening of critical water pipelines, electricity transmission, and bridge piers across active fault lines.',
    level: 'red',
    exampleScenario: 'Mw 6.2–6.5 event along Tuzla or Bornova fault disrupting water supplies to 1.5 million residents and halting rail transit.',
    statutoryLead: 'İZSU (Water Authority), GDZ Elektrik, Metropolitan Transportation Dept.',
  },
  {
    likelihood: 'Likely',
    impact: 'Severe',
    title: 'Likely × Severe',
    priorityText: 'Act now: Codes, EWS, drills',
    actionProtocol: 'Highest operational priority. Enforce strict building code compliance, deploy rapid early warning triggers, and conduct bi-annual inter-agency field simulations.',
    level: 'red',
    exampleScenario: 'Direct rupture of İzmir Fault beneath dense metropolitan core with widespread soft-soil building collapses in Bayraklı and Konak.',
    statutoryLead: 'Metropolitan Mayor, AFAD Provincial Directorate, Ministry of Urbanization',
  },
  // Row: Occasional
  {
    likelihood: 'Occasional',
    impact: 'Moderate',
    title: 'Occasional × Moderate',
    priorityText: 'Monitor register annually',
    actionProtocol: 'Maintain updated risk register with annual sensor recalibrations, GIS asset inventories, and routine code compliance audits.',
    level: 'green',
    exampleScenario: 'Offshore earthquake swarm (Mw 4.8–5.2) in Karaburun causing minimal structural damage but public anxiety.',
    statutoryLead: 'Metropolitan Disaster Management Directorate (AKOM)',
  },
  {
    likelihood: 'Occasional',
    impact: 'Major',
    title: 'Occasional × Major',
    priorityText: 'Named mitigation owners',
    actionProtocol: 'Assign designated accountable department heads for each asset class with defined risk-reduction milestones tied to performance reviews.',
    level: 'amber',
    exampleScenario: 'Mw 6.6 event on Seferihisar Fault with localized tsunamis impacting marina assets and coastal highway segments.',
    statutoryLead: 'Port Authority, Coast Guard, Coastal District Municipalities',
  },
  {
    likelihood: 'Occasional',
    impact: 'Severe',
    title: 'Occasional × Severe',
    priorityText: 'Contingency & insurance pools',
    actionProtocol: 'Establish catastrophe bonds, municipal emergency fiscal reserves, and cross-municipal mutual aid compacts with neighboring provinces.',
    level: 'red',
    exampleScenario: 'Repetition of the historical 1688 catastrophic earthquake; severe damage to historic center, port quays, and healthcare lifelines.',
    statutoryLead: 'Treasury & Finance, TCIP (DASK), Union of Municipalities of Türkiye',
  },
  // Row: Rare
  {
    likelihood: 'Rare',
    impact: 'Moderate',
    title: 'Rare × Moderate',
    priorityText: 'Watchlist tracking',
    actionProtocol: 'Low direct resource allocation; track via academic geological partnerships and low-cost sensor data feeds.',
    level: 'green',
    exampleScenario: 'Distant deep subduction earthquake along the Hellenic Trench causing minor high-rise resonance without structural damage.',
    statutoryLead: 'Disaster Research Centers (İYTE, DEÜ, Ege University)',
  },
  {
    likelihood: 'Rare',
    impact: 'Major',
    title: 'Rare × Major',
    priorityText: 'Mutual aid pacts',
    actionProtocol: 'Establish bilateral logistical aid pacts with Istanbul, Ankara, and Bursa for rapid deployment of heavy search and rescue equipment.',
    level: 'green',
    exampleScenario: 'Simultaneous multi-segment fault rupture triggering cascading failures across regional highway tunnels and industrial chemical plants.',
    statutoryLead: 'AFAD National Command & Metropolitan Fire Brigade',
  },
  {
    likelihood: 'Rare',
    impact: 'Severe',
    title: 'Rare × Severe',
    priorityText: 'Continuity & resilient BBB planning',
    actionProtocol: 'Ex-ante disaster continuity planning, secondary remote municipal command servers, and pre-approved post-disaster Build Back Better spatial master plans.',
    level: 'amber',
    exampleScenario: 'Mw 7.2+ near-field mega-earthquake with massive liquefaction along the entire coastline and destruction of municipal administrative seats.',
    statutoryLead: 'Governorship of İzmir, Metropolitan Council, National Security Council',
  },
];

export const MDRGA_CATEGORIES: MDRGACategory[] = [
  {
    id: 1,
    name: 'Policy & Legal Framework',
    leadMinistry: 'Metropolitan Legal Affairs & City Council',
    indicators: [
      { id: 'ind-1', code: '1.1', text: 'Municipal DRR Policy Framework', guidance: 'Adoption of a legally binding municipal resilience ordinance aligned with national AFAD directives.' },
      { id: 'ind-2', code: '1.2', text: 'Enforcement of Building Seismic Codes', guidance: 'Systematic technical pre-construction and post-construction audits with zero tolerance for soft-story modifications.' },
      { id: 'ind-3', code: '1.3', text: 'Risk-Informed Spatial Master Planning', guidance: 'Statutory zoning plans updated based on microzonation geology and active fault clearance setbacks.' },
    ],
  },
  {
    id: 2,
    name: 'Organizational Structure',
    leadMinistry: 'Mayor’s Executive Office & AKOM',
    indicators: [
      { id: 'ind-4', code: '2.1', text: 'Clear Inter-Agency Chains of Command', guidance: 'Formally designated incident commander roles with automated succession protocols.' },
      { id: 'ind-5', code: '2.2', text: 'Full-Time Resilience Secretariat', guidance: 'Permanent municipal department staffed with seismologists, structural engineers, and GIS specialists.' },
      { id: 'ind-6', code: '2.3', text: 'Cross-Departmental Working Committees', guidance: 'Monthly coordination meetings between Water (İZSU), Transit (ESHOT/Metro), and Fire Services.' },
    ],
  },
  {
    id: 3,
    name: 'Planning & Budgeting',
    leadMinistry: 'Department of Strategy & Financial Services',
    indicators: [
      { id: 'ind-7', code: '3.1', text: 'Ex-Ante DRR Capital Budget Allocation', guidance: 'Statutory minimum 3%–5% of municipal capital investment allocated exclusively to seismic mitigation.' },
      { id: 'ind-8', code: '3.2', text: 'Contingency Emergency Reserves', guidance: 'Liquid reserves accessible within 2 hours of disaster declaration without bureaucratic delays.' },
      { id: 'ind-9', code: '3.3', text: 'CBA / MCA Appraisal Integration', guidance: 'Mandatory multi-criteria resilience appraisal before approving major urban infrastructure projects.' },
    ],
  },
  {
    id: 4,
    name: 'Multi-Sector Partnerships',
    leadMinistry: 'External Relations & Chamber of Commerce',
    indicators: [
      { id: 'ind-10', code: '4.1', text: 'Pre-Arranged Private Logistics MoUs', guidance: 'Standing contracts with private heavy machinery, fuel suppliers, and transport operators.' },
      { id: 'ind-11', code: '4.2', text: 'Academic & Scientific Partnerships', guidance: 'Standing protocols with İYTE, DEÜ, and Ege universities for seismic telemetry and soil testing.' },
      { id: 'ind-12', code: '4.3', text: 'Utility Concessionaire Coordination', guidance: 'Binding agreements with private gas, electricity, and telecommunications network operators.' },
    ],
  },
  {
    id: 5,
    name: 'Capacities & Resources',
    leadMinistry: 'Human Resources & IT Directorate',
    indicators: [
      { id: 'ind-13', code: '5.1', text: 'GIS Common Operational Picture (COP)', guidance: 'Real-time citywide digital twin integrating sensor networks, building permits, and critical lifelines.' },
      { id: 'ind-14', code: '5.2', text: 'Certified Search & Rescue Personnel', guidance: 'INSARAG-certified municipal heavy rescue teams with localized neighborhood depots.' },
      { id: 'ind-15', code: '5.3', text: 'Autonomous Emergency Lifelines', guidance: 'Emergency deep-water wells, satellite communications, and localized off-grid solar/battery generators.' },
    ],
  },
  {
    id: 6,
    name: 'Cross-Cutting Issues',
    leadMinistry: 'Social Services & Community Relations',
    indicators: [
      { id: 'ind-16', code: '6.1', text: 'Community-Based DRR & Muhtar Engagement', guidance: 'Active training and equipment depots for neighborhood heads (Muhtars) across all 30 districts.' },
      { id: 'ind-17', code: '6.2', text: 'Protection of Vulnerable Demographics', guidance: 'Priority evacuation and shelter registries for elderly, disabled, and low-income populations.' },
      { id: 'ind-18', code: '6.3', text: 'Post-Disaster Build Back Better Protocols', guidance: 'Pre-negotiated urban renewal frameworks preventing chaotic or gentrifying post-disaster rebuilding.' },
    ],
  },
];

export const READINESS_PILLARS: ReadinessPillar[] = [
  {
    id: 'erp',
    title: 'Emergency Response Plan (ERP)',
    iconName: 'FileSpreadsheet',
    description: 'Statutory operational directives detailing multi-agency command, mobilization triggers, and tactical playbooks.',
    items: [
      { id: 'erp-1', label: 'Formally assigned operational roles', subtext: 'Updated quarterly with verified primary and secondary contacts.' },
      { id: 'erp-2', label: 'Scenario-based playbook activation', subtext: 'Immediate action cards pre-computed for Mw 6.0, 6.5, and 7.0 events.' },
      { id: 'erp-3', label: 'Evacuation corridors & assembly areas', subtext: 'Designated safe open parks and sports facilities with emergency utility connections.' },
      { id: 'erp-4', label: 'Heavy search & rescue pre-staging', subtext: 'Strategic equipment depots positioned away from active fault rupture corridors.' },
    ],
  },
  {
    id: 'comms',
    title: 'Crisis Communication Architecture',
    iconName: 'Radio',
    description: 'Resilient multi-channel broadcast alerts, satellite failover systems, and anti-misinformation command.',
    items: [
      { id: 'comms-1', label: 'Designated official municipal spokespersons', subtext: 'Single-source credible authority to avoid panic and rumor proliferation.' },
      { id: 'comms-2', label: 'Cell-broadcast & SMS early warning', subtext: 'Integrated with AFAD and GSM telcos for instant push alerts in <5 seconds.' },
      { id: 'comms-3', label: 'Satellite failover for command centers', subtext: 'Starlink and Türksat hardened links when terrestrial cellular networks collapse.' },
      { id: 'comms-4', label: 'Multi-lingual public advisories', subtext: 'Automated translation into English, Arabic, and Sign Language for inclusive safety.' },
    ],
  },
  {
    id: 'ics',
    title: 'Incident Command System (ICS)',
    iconName: 'ShieldAlert',
    description: 'Standardized on-scene incident management structure adopted across municipal, police, military, and NGO units.',
    items: [
      { id: 'ics-1', label: 'Standardized unified command protocol', subtext: 'Harmonized nomenclature and operational hierarchies across all 30 district nodes.' },
      { id: 'ics-2', label: 'Defined escalation & handover thresholds', subtext: 'Clear statutory legal handovers between District, Metropolitan, and National AFAD.' },
      { id: 'ics-3', label: 'GIS Common Operational Picture (COP)', subtext: 'Live operational map showing damage assessments, road blocks, and shelter status.' },
      { id: 'ics-4', label: 'Resource tracking & logistics management', subtext: 'Real-time inventory of potable water, generators, blood banks, and tents.' },
    ],
  },
  {
    id: 'drills',
    title: 'Drills, Simulations & Learning',
    iconName: 'Activity',
    description: 'Rigorous recurring simulation exercises testing institutional stamina, field mobilization, and continuous feedback.',
    items: [
      { id: 'drills-1', label: 'Semi-annual unannounced multi-agency drills', subtext: 'Realistic night-time and winter scenario stress-testing across all municipal branches.' },
      { id: 'drills-2', label: 'School and hospital evacuation exercises', subtext: 'Mandated bi-annual evacuation simulations involving students and healthcare staff.' },
      { id: 'drills-3', label: 'After-Action Review (AAR) formalization', subtext: 'Mandatory technical post-drill audits with legal requirement to fix identified gaps.' },
      { id: 'drills-4', label: 'Dynamic updates to municipal risk register', subtext: 'Iterative feedback loop directly refining the 9-cell risk matrix and budget plans.' },
    ],
  },
];

export const BLUEPRINT_MATRIX: BlueprintRow[] = [
  {
    pillar: '1. Operational Execution',
    operationalObjectives: 'High-resolution PSHA hazard mapping, multi-agency MoUs, prioritized structural retrofits, automated EWS deceleration.',
    mandatedTools: 'GIS Digital Twin, Common Operational Picture (COP), CBA/MCA Funnel, Automated Earthquake Early Warning triggers, Build Back Better protocols.',
    keyStakeholders: 'AFAD, İzmir Metropolitan AKOM, İZSU, GDZ Elektrik, Planning Authorities, Lifeline Operators.',
    timeline: 'Years 1–3 (Immediate)',
    keyMetrics: '100% critical facilities audited; EWS operational; 30 district playbooks adopted.',
  },
  {
    pillar: '2. Statutory Mainstreaming',
    operationalObjectives: 'Binding spatial zoning based on microzonation, dedicated ex-ante capital DRR lines, cross-electoral durability.',
    mandatedTools: '1/25,000 Spatial Master Plans, Statutory 5% Annual DRR Capital Budget, Court of Accounts Audits, Municipal Resilience Scorecards.',
    keyStakeholders: 'Metropolitan City Council, Court of Accounts, Urban Planners, Ministry of Environment and Urbanization.',
    timeline: 'Years 2–4 (Structural)',
    keyMetrics: 'Zero code exceptions granted; annual resilience capital audit published; master plans ratified.',
  },
  {
    pillar: '3. Whole-of-Society Engagement',
    operationalObjectives: 'Neighborhood co-production, private sector capacity mobilization, pre-arranged logistics, financial risk transfer.',
    mandatedTools: 'CBDRM Committees, Muhtar Neighborhood Depots, Pre-Disaster PPPs, Municipal Catastrophe Insurance Pools.',
    keyStakeholders: 'Neighborhood Muhtars, NGOs (AKUT, Kızılay), İzmir Chamber of Commerce, Utility Concessionaires, Vulnerable Demographics.',
    timeline: 'Years 1–5+ (Continuous)',
    keyMetrics: '1,293 neighborhood muhtars certified; 45 private logistics MoUs active; 85% residential insurance penetration.',
  },
];
