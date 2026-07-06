/**
 * The four service arms of High Rise Refurbishments Ltd.
 * Edit copy here — the /services pages are generated from this file.
 */
export const services = [
  {
    slug: 'high-end-refurbishment',
    number: '01',
    name: 'High End Refurbishment',
    strap: 'Premium works that add value to your assets',
    summary:
      'Bespoke revitalisation strategies for high-rise buildings — expert engineering management, meticulous lifecycle structuring and customised project deployment.',
    intro: [
      'In a constantly evolving urban panorama, our blend of venerable techniques, contemporary experience and advanced innovation is designed to ensure your asset remains a step ahead — securing its long-term value and operational integrity.',
      'We recognise that refurbishment embodies more than mere structural updates. It is the foresight to build, protect and shape the optimal future for your high-rise building. Through a profound grasp of your property’s operational requirements and the aspirations of its stakeholders, we formulate bespoke revitalisation strategies for every commission.'
    ],
    capabilities: [
      'Bespoke building revitalisation and refurbishment strategies',
      'Expert engineering management and lifecycle structuring',
      'Customised project deployment with dedicated site-based coordination',
      'Asset valuation support — works structured to add measurable value',
      'Exceptional client liaison throughout every project phase',
      'Professional navigation of the BSR framework on all notifiable works'
    ],
    audience: [
      {
        who: 'Architects',
        detail: 'A contractor fluent in design intent, delivering to drawing and to specification.'
      },
      {
        who: 'Direct residential clients',
        detail: 'Full-service delivery from feasibility through to rewarding completion.'
      },
      {
        who: 'Owners & developers',
        detail: 'Refurbishment structured to maximise the long-term value of the holding.'
      }
    ],
    quote: 'Unlock your home’s full potential — from complex regulations to rewarding completion.'
  },
  {
    slug: 'bsr-applications',
    number: '02',
    name: 'BSR Application Specialist',
    strap: 'First-time-right building control for higher-risk buildings',
    summary:
      'Consulting and securing successful Building Safety Regulator building control applications for direct clients — a stress-free process, managed end to end.',
    intro: [
      'The regulatory landscape of building ownership has been fundamentally reshaped by the Building Safety Regulator and the profound duties under the Building Safety Act. For Accountable Persons and asset stewards of high-rise buildings, compliance is not a box to be ticked — it is a moral and legal imperative demanding precision, verified documentation and unwavering technical expertise.',
      'Industry data shows around half of BSR building control applications fail at first submission. Our specialists prepare, assemble and manage the application on your behalf — the correct evidence, in the correct structure, submitted right first time.'
    ],
    capabilities: [
      'Gateway 2 building control applications prepared and managed end to end',
      'Pre-application strategy, competence declarations and evidence assembly',
      'Design and build programme alignment with BSR determination periods',
      'Change control management and Gateway 3 completion certification support',
      'Direct liaison with the Regulator throughout determination',
      'Safety Case Report and Mandatory Occurrence Reporting counsel'
    ],
    audience: [
      {
        who: 'Accountable Persons',
        detail: 'Certainty that statutory duties are met with verified, auditable evidence.'
      },
      {
        who: 'Architects & design teams',
        detail: 'A specialist partner who de-risks the gateway process for your project.'
      },
      {
        who: 'Direct clients',
        detail: 'A stress-free application, handled by people who do this every day.'
      }
    ],
    quote: 'Beyond compliance: we build peace of mind. Your specialist BSR contractor.'
  },
  {
    slug: 'golden-thread',
    number: '03',
    name: 'Golden Thread Gatherers',
    strap: 'Custodians of your building’s digital legacy',
    summary:
      'We transform decades of disparate data into a unified, auditable and immutable record — the single source of truth the BSR demands.',
    intro: [
      'For the modern steward of a high-rise building, the duty of safety extends far beyond the physical structure. It resides in the integrity of the record — the verifiable, digital and perpetually accurate Golden Thread of information. A fractured, paper-based or inaccessible history is not merely a compliance failure; it is a direct threat to life safety and a vulnerability to the asset’s long-term legacy.',
      'Our expert teams execute a bespoke gathering methodology designed to lift the burden of the BSR from Accountable Persons — ensuring the right people have the right, contextual information precisely when they need it.'
    ],
    capabilities: [
      'Rigorous on-site surveys verifying structural and fire-safety asset integrity',
      'Digitisation of legacy records into structured, auditable formats',
      'Photographic and technical dossiers accompanying every intervention',
      'Data structured for seamless integration with your PAP’s management system',
      'Ongoing custody: every repair and refurbishment captured and tagged digitally',
      'Golden Thread services for managing agents across commercial portfolios'
    ],
    audience: [
      {
        who: 'Managing agents',
        detail: 'A dedicated gathering service across residential and commercial portfolios.'
      },
      {
        who: 'Principal Accountable Persons',
        detail: 'Verifiable proof for BSR audits — a record that stands up to scrutiny.'
      },
      {
        who: 'Freeholders & institutions',
        detail: 'The building’s history secured as a permanent, transferable asset.'
      }
    ],
    quote: 'From ambiguity to absolute certainty — a single source of truth for your building.'
  },
  {
    slug: 'health-safety',
    number: '04',
    name: 'Health & Safety Consulting',
    strap: 'Competence, compliance and confidence',
    summary:
      'Expert guidance on CDM regulations, risk assessment, fire safety planning and ongoing compliance management for construction and building operation.',
    intro: [
      'The BSR mandates a demonstrable culture of safety risk management throughout an asset’s lifecycle. Our consultants embed that culture — practically, proportionately and without theatre.',
      'From principal designer and principal contractor duties under CDM to the day-to-day management of occupied high-rise buildings, we provide the verified evidence and certified systems responsible stewardship requires.'
    ],
    capabilities: [
      'CDM 2015 advisory — principal designer and principal contractor support',
      'Risk assessments, method statements and safe systems of work',
      'Fire safety planning and coordination with the Fire Safety Act framework',
      'Competence assurance — demonstrably qualified people on every task',
      'Mandatory Occurrence Reporting procedure design for building defects',
      'Ongoing compliance management, audits and stakeholder liaison'
    ],
    audience: [
      {
        who: 'Contractors & developers',
        detail: 'CDM duties discharged with documentation that stands behind you.'
      },
      {
        who: 'Building owners',
        detail: 'A demonstrable culture of safety, evidenced across the asset lifecycle.'
      },
      {
        who: 'Managing agents',
        detail: 'Practical compliance counsel across every building you manage.'
      }
    ],
    quote: 'Safety is not a document. It is a demonstrable culture — and we build it with you.'
  }
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
