import { z } from "zod";

export interface Device {
  id: string;
  name: string;
  category: "diagnostic" | "therapeutic" | "monitoring" | "surgical" | "imaging";
  tagline: string;
  problem: string;
  engineering: string;
  ethics: string;
  interactionType?: "slider" | "toggle" | "comparison";
  beforeStat?: string;
  afterStat?: string;
}

export interface Era {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  order: number;
  color: string;
  intro: string;
  context: string;
  devices: Device[];
  mission: {
    type: "choice" | "sequence" | "slider";
    title: string;
    description: string;
    data: any;
  };
  ethicalQuestion: {
    question: string;
    choices: Array<{
      id: string;
      text: string;
      outcome: string;
    }>;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "completion" | "speed" | "ethics" | "special";
  condition: (progress: Progress) => boolean;
}

export interface Progress {
  completedEras: string[];
  currentEra: string | null;
  eraChoices: Record<string, string>;
  lastVisited: string;
  unlockedAchievements: string[];
  missionAttempts: Record<string, number>;
  eraStartTimes: Record<string, number>;
  eraCompletionDurations?: Record<string, number>;
}

export const eras: Era[] = [
  {
    id: "foundations",
    name: "Foundations Era",
    slug: "foundations",
    iconName: "Microscope",
    order: 1,
    color: "cyan",
    intro: "The dawn of modern medicine... Where curious minds wielded simple tools to peer into the human body for the first time.",
    context: "In the 19th and early 20th centuries, physicians relied on basic instruments to diagnose and understand disease. From stethoscopes to modern pharmaceutical analytical testing, these foundational tools transformed medicine from guesswork to precision science. This era laid the groundwork for rigorous testing, validation, and regulatory compliance—principles that guide medical device development today.",
    devices: [
      {
        id: "stethoscope",
        name: "Stethoscope",
        category: "diagnostic",
        tagline: "The physician's ears, amplified",
        problem: "Before 1816, doctors placed their ears directly on patients' chests to hear heart and lung sounds—awkward, unreliable, and often impossible with larger patients.",
        engineering: "René Laënnec created a simple wooden tube that amplified internal sounds through acoustic resonance. Modern versions use diaphragms and tubing to capture specific frequency ranges while filtering ambient noise.",
        ethics: "While seemingly benign, the stethoscope created distance between doctor and patient. Does technology enhance care or reduce human connection?",
        interactionType: "comparison",
        beforeStat: "Direct auscultation: unreliable, embarrassing",
        afterStat: "Clear heart & lung sounds: diagnostic precision"
      },
      {
        id: "xray",
        name: "X-Ray Machine",
        category: "imaging",
        tagline: "Seeing through skin and bone",
        problem: "Diagnosing broken bones or internal issues required exploratory surgery—risky and invasive.",
        engineering: "Wilhelm Röntgen discovered X-rays in 1895: high-energy photons pass through soft tissue but are absorbed by dense materials like bone. Film captures the shadow pattern, revealing internal structures non-invasively.",
        ethics: "Early X-rays exposed patients and operators to dangerous radiation levels. How do we balance diagnostic benefit against long-term harm?",
        interactionType: "toggle",
        beforeStat: "Exploratory surgery required",
        afterStat: "Non-invasive imaging in minutes"
      },
      {
        id: "thermometer",
        name: "Clinical Thermometer",
        category: "diagnostic",
        tagline: "Fever's silent witness",
        problem: "Fever detection relied on touch—subjective and imprecise. Timing treatment was guesswork.",
        engineering: "Mercury or alcohol expands predictably with temperature. A narrow bore amplifies small volume changes into visible movement along a calibrated scale. Modern digital versions use thermistors (temperature-sensitive resistors).",
        ethics: "Mercury thermometers posed poisoning risks when broken. Innovation requires considering end-of-life safety.",
        interactionType: "slider",
        beforeStat: "Subjective assessment",
        afterStat: "Precise temperature tracking"
      },
      {
        id: "sphygmomanometer",
        name: "Blood Pressure Cuff",
        category: "diagnostic",
        tagline: "Measuring life's pressure",
        problem: "Hypertension was invisible and often deadly. No way to measure blood pressure quantitatively.",
        engineering: "Inflatable cuff occludes artery, stethoscope detects Korotkoff sounds as pressure releases. Systolic (first sound) and diastolic (last sound) readings indicate arterial pressure. Modern digital versions use oscillometric sensors.",
        ethics: "Early devices required skill to use accurately. Should critical diagnostics depend on operator expertise?",
        interactionType: "comparison",
        beforeStat: "Hypertension invisible, often fatal",
        afterStat: "Quantitative pressure monitoring"
      },
      {
        id: "pharmaceutical-analyzer",
        name: "Pharmaceutical Analytical Testing (UPLC/HPLC)",
        category: "diagnostic",
        tagline: "Molecular precision for drug development",
        problem: "Drug formulations require precise characterization to ensure safety, efficacy, and stability. Without analytical validation, pharmaceutical products cannot meet regulatory standards or reach patients.",
        engineering: "Ultra-Performance Liquid Chromatography (UPLC) and High-Performance Liquid Chromatography (HPLC) separate drug compounds and measure their properties with molecular precision. Spray-dried formulations are analyzed for powder stability, biocompatibility, and compatibility. GMP/GDP laboratory protocols ensure reproducible results. ACI-8 analysis characterizes formulation properties to guide development decisions. Real-world experience: Acorda Therapeutics (2022) demonstrated that analytical development is critical for pharmaceutical launches—from market validation studies to MannKind collaboration biocompatibility testing.",
        ethics: "Rigorous testing delays drug availability but ensures patient safety. How do we balance speed-to-market with thoroughness in life-saving therapeutics?",
        interactionType: "slider",
        beforeStat: "Unknown drug properties, regulatory uncertainty",
        afterStat: "Molecularly characterized, validated formulations"
      }
    ],
    mission: {
      type: "sequence",
      title: "Device Development Pipeline",
      description: "Arrange the stages of medical device development in the correct order:",
      data: {
        items: [
          { id: "concept", label: "Initial Concept", order: 1 },
          { id: "prototype", label: "Prototyping", order: 2 },
          { id: "bench", label: "Bench Testing", order: 3 },
          { id: "clinical", label: "Clinical Trials", order: 4 },
          { id: "approval", label: "Regulatory Approval", order: 5 },
          { id: "market", label: "Post-Market Surveillance", order: 6 }
        ]
      }
    },
    ethicalQuestion: {
      question: "Early X-ray machines exposed operators to harmful radiation. Would you:",
      choices: [
        {
          id: "safety",
          text: "Pause deployment until operator safety is ensured",
          outcome: "You prioritized safety. Adoption slowed, but trust in the technology grew as protections were implemented."
        },
        {
          id: "proceed",
          text: "Proceed cautiously with warnings, learning from real-world use",
          outcome: "You chose pragmatism. Lives were saved through diagnosis, but many operators suffered radiation injuries."
        },
        {
          id: "restrict",
          text: "Restrict use to life-threatening cases only",
          outcome: "You balanced risk and benefit. The technology evolved more slowly but with fewer casualties."
        }
      ]
    }
  },
  {
    id: "implantables",
    name: "Implantables Era",
    slug: "implantables",
    iconName: "Zap",
    order: 2,
    color: "purple",
    intro: "When devices crossed the threshold... From external tools to internal life-support systems embedded within the body itself.",
    context: "The 1960s-1980s saw medical devices move inside the body. Pacemakers, artificial joints, and cochlear implants didn't just measure or assist—they became part of the patient, raising profound questions about biocompatibility, longevity, and the human-machine interface.",
    devices: [
      {
        id: "pacemaker",
        name: "Cardiac Pacemaker",
        category: "therapeutic",
        tagline: "The heart's electric guardian",
        problem: "Patients with heart block (disrupted electrical signals) faced sudden cardiac arrest. External pacemakers tethered patients to wall outlets.",
        engineering: "Battery-powered pulse generator delivers precisely timed electrical impulses via leads to the heart muscle. Sensing circuits detect natural heartbeats and intervene only when needed (demand pacing). Hermetically sealed titanium cases protect electronics from body fluids.",
        ethics: "Pacemakers extend life but create dependence on technology. What happens when batteries fail? Who controls firmware updates?",
        interactionType: "slider",
        beforeStat: "External pacemaker: immobile, tethered",
        afterStat: "Implantable: mobile, life-restoring"
      },
      {
        id: "hip-implant",
        name: "Hip Replacement",
        category: "surgical",
        tagline: "Restoring mobility through engineering",
        problem: "Severe arthritis caused debilitating pain and immobility. Joints degenerated beyond repair.",
        engineering: "Biocompatible materials (cobalt-chrome alloys, ceramics, high-density polyethylene) replace damaged bone and cartilage. Ball-and-socket joint geometry mimics natural anatomy. Porous coatings encourage bone ingrowth for long-term fixation.",
        ethics: "Implants wear out and may need revision surgery. Planned obsolescence in life-saving devices raises justice concerns.",
        interactionType: "comparison",
        beforeStat: "Immobilized by pain",
        afterStat: "Walking, active lifestyle restored"
      },
      {
        id: "cochlear",
        name: "Cochlear Implant",
        category: "therapeutic",
        tagline: "Sound through electric signals",
        problem: "Profound deafness left patients unable to communicate through spoken language.",
        engineering: "External microphone captures sound, processor converts it to electrical signals, implanted electrode array stimulates auditory nerve directly, bypassing damaged hair cells. Brain learns to interpret these patterns as sound.",
        ethics: "Deaf community debates: Is deafness a disability to fix or a culture to preserve? Who decides for children?",
        interactionType: "toggle",
        beforeStat: "Profound deafness",
        afterStat: "Auditory perception restored"
      },
      {
        id: "icd",
        name: "Implantable Defibrillator (ICD)",
        category: "therapeutic",
        tagline: "Lifesaving shock on demand",
        problem: "Patients with ventricular arrhythmias faced sudden cardiac death with no warning or protection.",
        engineering: "Continuously monitors heart rhythm via leads. Detects life-threatening arrhythmias and delivers electric shock to restore normal rhythm. Rechargeable capacitors store energy for defibrillation pulses.",
        ethics: "ICDs can deliver inappropriate shocks causing pain and anxiety. How do we balance life-saving intervention with quality of life?",
        interactionType: "comparison",
        beforeStat: "Sudden cardiac death risk",
        afterStat: "Automatic arrhythmia correction"
      }
    ],
    mission: {
      type: "slider",
      title: "Pacemaker Rate Optimization",
      description: "Adjust the pacing rate to keep the patient's heart in a safe zone (60-100 bpm):",
      data: {
        min: 40,
        max: 120,
        optimal: [60, 100],
        initial: 50,
        unit: "bpm"
      }
    },
    ethicalQuestion: {
      question: "A pacemaker's battery lasts 7-10 years, requiring replacement surgery. Would you:",
      choices: [
        {
          id: "longer-battery",
          text: "Prioritize longer battery life (bulkier device)",
          outcome: "Patients undergo fewer surgeries, but larger devices may be uncomfortable and harder to implant."
        },
        {
          id: "smaller-device",
          text: "Prioritize smaller size (shorter battery life)",
          outcome: "Devices are less invasive and more comfortable, but patients face more frequent replacement surgeries."
        },
        {
          id: "wireless-charging",
          text: "Develop wireless charging technology",
          outcome: "You invested in innovation. Long-term, patients benefit from rechargeable devices, but early versions have higher failure rates."
        }
      ]
    }
  },
  {
    id: "imaging-robotics",
    name: "Imaging & Robotics Era",
    slug: "imaging-robotics",
    iconName: "Bot",
    order: 3,
    color: "teal",
    intro: "Precision beyond human limits... Where robots assisted surgeons and imaging revealed the body in stunning detail.",
    context: "The 1980s-2000s brought computational power to medicine. MRI and CT scanners created 3D maps of internal anatomy. Surgical robots enabled minimally invasive procedures with superhuman precision.",
    devices: [
      {
        id: "mri",
        name: "MRI Scanner",
        category: "imaging",
        tagline: "Magnetic resonance illuminates soft tissue",
        problem: "X-rays show bones well but soft tissues (brain, organs, ligaments) remain invisible. Diagnosing strokes, tumors, or torn ligaments required guesswork or exploratory surgery.",
        engineering: "Powerful magnets align hydrogen atoms in the body. Radiofrequency pulses knock them out of alignment; as they relax, they emit signals. Different tissues relax at different rates, creating contrast. No radiation needed.",
        ethics: "MRI machines cost millions and require specialized facilities. Should life-saving imaging be accessible only to wealthy patients and institutions?",
        interactionType: "comparison",
        beforeStat: "Soft tissue invisible on X-ray",
        afterStat: "Detailed 3D soft tissue imaging"
      },
      {
        id: "surgical-robot",
        name: "Surgical Robot",
        category: "surgical",
        tagline: "The surgeon's precision, amplified",
        problem: "Open surgery required large incisions, long recovery times, and exposed organs to infection risk. Surgeon hand tremor limited precision.",
        engineering: "Robotic arms translate surgeon's hand movements to tiny instruments inside the patient. Motion scaling (10:1) eliminates tremor. 3D visualization and multiple degrees of freedom enable complex maneuvers through small incisions.",
        ethics: "Robots cost millions, require extensive training, and can malfunction. Who is liable when a robot fails—surgeon, manufacturer, or hospital?",
        interactionType: "slider",
        beforeStat: "Open surgery: large incisions, long recovery",
        afterStat: "Minimally invasive: small incisions, faster healing"
      },
      {
        id: "endoscope",
        name: "Flexible Endoscope",
        category: "diagnostic",
        tagline: "Eyes inside the body",
        problem: "Examining internal organs (stomach, colon, lungs) required surgery or blind guessing.",
        engineering: "Fiber optics transmit light and images through flexible tube. Miniature camera and LED light source at tip. Surgeon navigates through natural openings, biopsy tools can be passed through working channel.",
        ethics: "Endoscopy is uncomfortable and requires sedation. How do we balance diagnostic necessity against patient discomfort?",
        interactionType: "toggle",
        beforeStat: "Exploratory surgery required",
        afterStat: "Visual diagnosis through natural openings"
      },
      {
        id: "ct-scanner",
        name: "CT Scanner",
        category: "imaging",
        tagline: "3D slices of internal anatomy",
        problem: "X-rays provided 2D shadows. Complex fractures, tumors, and internal bleeding were hard to locate precisely.",
        engineering: "Rotating X-ray source and detector array capture multiple projections. Computer reconstructs 3D volume from cross-sectional slices using tomographic algorithms. Contrast agents highlight blood vessels and organs.",
        ethics: "CT scans expose patients to significant radiation. Should convenience override long-term cancer risk?",
        interactionType: "slider",
        beforeStat: "2D X-ray shadows only",
        afterStat: "3D reconstructed anatomy"
      }
    ],
    mission: {
      type: "choice",
      title: "Surgical Precision vs. Cost",
      description: "A new surgical robot can reduce complications by 15% but costs $2M. Your hospital budget is tight. Choose:",
      data: {
        choices: [
          {
            id: "invest",
            label: "Invest in the robot",
            outcome: "Patients benefit from safer surgeries, but other hospital services face budget cuts. You gamble on long-term savings from reduced complications."
          },
          {
            id: "wait",
            label: "Wait for prices to drop",
            outcome: "You prioritize financial stability. Patients continue receiving standard care while you monitor technology maturation and cost trends."
          },
          {
            id: "train",
            label: "Invest in surgeon training instead",
            outcome: "You bet on human expertise. Surgeons improve through practice and education, but won't achieve robot-level precision."
          }
        ]
      }
    },
    ethicalQuestion: {
      question: "MRI scans are expensive and time-consuming. A patient with vague symptoms requests one. Would you:",
      choices: [
        {
          id: "scan",
          text: "Approve the scan to rule out serious conditions",
          outcome: "You found nothing abnormal. The patient is reassured, but healthcare costs rise. Was it necessary?"
        },
        {
          id: "wait",
          text: "Recommend watchful waiting and clinical exam first",
          outcome: "You conserve resources. Most cases resolve on their own, but a few serious conditions are caught later than they could have been."
        },
        {
          id: "protocol",
          text: "Follow evidence-based clinical guidelines strictly",
          outcome: "You balance cost and benefit. Most patients get appropriate care, but edge cases may fall through protocol gaps."
        }
      ]
    }
  },
  {
    id: "wearables",
    name: "Wearables & Home Monitoring Era",
    slug: "wearables",
    iconName: "Watch",
    order: 4,
    color: "cyan",
    intro: "Medicine leaves the clinic... Devices became smaller, smarter, and followed patients into daily life.",
    context: "The 2000s-2010s saw medical devices shrink to wearable form factors. Continuous glucose monitors, insulin pumps, and smart inhalers empowered patients to manage chronic conditions at home, shifting care from reactive hospital visits to proactive daily management.",
    devices: [
      {
        id: "cgm",
        name: "Continuous Glucose Monitor",
        category: "monitoring",
        tagline: "Real-time glucose awareness",
        problem: "Diabetics relied on painful fingerstick tests multiple times daily. Glucose fluctuations went unnoticed between tests, leading to dangerous highs and lows.",
        engineering: "Subcutaneous sensor uses glucose oxidase enzyme to generate electrical current proportional to glucose concentration. Wireless transmitter sends data to receiver/smartphone every 5 minutes. Algorithms predict trends and alert users to dangerous patterns.",
        ethics: "CGM data reveals intimate health information. Who owns this data? Should insurers access it to adjust premiums?",
        interactionType: "slider",
        beforeStat: "4-6 fingerstick tests/day, reactive management",
        afterStat: "288 readings/day, proactive trend awareness"
      },
      {
        id: "insulin-pump",
        name: "Insulet Omnipod® Insulin Pump",
        category: "therapeutic",
        tagline: "Tubeless automated insulin delivery",
        problem: "Multiple daily injections (MDI) provided imprecise insulin dosing and inflexible schedules. Traditional tubed pumps were cumbersome and conspicuous. Patients struggled to match insulin to meals and activity.",
        engineering: "Tubeless, wearable pod delivers precise micro-doses of insulin via integrated subcutaneous cannula. Programmable basal rates mimic natural insulin patterns. Wireless Personal Diabetes Manager (PDM) controls dosing and calculates boluses based on carbs, current glucose, and insulin on board. QA testing validates 50+ performance specifications including device-to-cloud data transfer protocols to ensure FDA compliance and patient safety.",
        ethics: "Pumps can malfunction, causing life-threatening over- or under-delivery. Rigorous systems integration testing and root cause analysis of anomalies are critical. Should devices have fail-safes, even if they reduce user control? Real-world experience: Insulet Corporation (2023) demonstrated that comprehensive QA testing—from bench validation to cloud connectivity—is essential for medical device reliability.",
        interactionType: "comparison",
        beforeStat: "4+ daily injections, rigid schedule",
        afterStat: "Tubeless micro-dosing, flexible lifestyle"
      },
      {
        id: "smart-inhaler",
        name: "Smart Inhaler",
        category: "therapeutic",
        tagline: "Breathing assistance, tracked and optimized",
        problem: "Asthma patients often used inhalers incorrectly (wrong technique, missed doses), leading to poor control and emergency room visits.",
        engineering: "Sensor attachment tracks when and how inhaler is used. Bluetooth transmits usage data to app. Machine learning identifies patterns (triggers, technique errors) and provides coaching.",
        ethics: "Tracking adherence improves outcomes but raises privacy concerns. Should doctors or insurers access medication compliance data?",
        interactionType: "toggle",
        beforeStat: "50% of patients use inhalers incorrectly",
        afterStat: "Real-time feedback improves technique and adherence"
      },
      {
        id: "fitness-tracker",
        name: "Fitness Tracker",
        category: "monitoring",
        tagline: "24/7 activity and health monitoring",
        problem: "Patients had no insight into daily activity levels, sleep quality, or heart rate patterns outside clinical settings.",
        engineering: "Accelerometer detects motion and classifies activities. Optical heart rate sensor (photoplethysmography) measures pulse via LED and photodiode. Algorithms estimate calorie burn, sleep stages, and stress levels.",
        ethics: "Fitness data reveals intimate lifestyle patterns. Who owns this data and who can profit from it?",
        interactionType: "comparison",
        beforeStat: "No daily health insights",
        afterStat: "Continuous activity and vitals tracking"
      }
    ],
    mission: {
      type: "slider",
      title: "Insulin Dosing Challenge",
      description: "Adjust insulin delivery to maintain glucose in target range (70-180 mg/dL) after a meal:",
      data: {
        min: 0,
        max: 20,
        optimal: [6, 10],
        initial: 0,
        unit: "units"
      }
    },
    ethicalQuestion: {
      question: "Your CGM data shows you're managing diabetes well. Your insurer requests access to reduce premiums. Would you:",
      choices: [
        {
          id: "share",
          text: "Share data for lower premiums",
          outcome: "You save money and get positive reinforcement. But what happens when data shows imperfect management?"
        },
        {
          id: "refuse",
          text: "Refuse to protect privacy",
          outcome: "You maintain control over your health data, but pay higher premiums. You set a boundary against surveillance."
        },
        {
          id: "aggregate",
          text: "Share anonymized, aggregate data only",
          outcome: "You find a middle ground. Insurers get population insights without individual surveillance, but discount is smaller."
        }
      ]
    }
  },
  {
    id: "ai-future",
    name: "AI & Future Era",
    slug: "ai-future",
    iconName: "Dna",
    order: 5,
    color: "purple",
    intro: "The frontier of possibility... Where artificial intelligence meets biology, and devices not only assist but predict, learn, and adapt.",
    context: "Today and tomorrow: AI-driven decision support systems analyze patient data to recommend treatments. EHR platforms like Epic's Hyperspace optimize clinical workflows across hospitals. Closed-loop devices automatically adjust therapy. Cellular therapies harness genetic modification for regenerative medicine. Speculative technologies promise neural interfaces, nano-robots, and personalized medicine at the molecular level.",
    devices: [
      {
        id: "ai-diagnosis",
        name: "AI Diagnostic Assistant & EHR Integration",
        category: "diagnostic",
        tagline: "Pattern recognition meets clinical workflow",
        problem: "Radiologists and pathologists face overwhelming workloads and rare conditions are easily missed. Human pattern recognition has limits. Meanwhile, fragmented healthcare IT systems create inefficiencies across surgery, anesthesia, and clinical workflows.",
        engineering: "Deep learning neural networks trained on millions of images detect patterns humans miss. Algorithms flag suspicious areas, quantify risk, and suggest differential diagnoses. Human physician makes final decision. Integration with Electronic Health Record (EHR) systems enables seamless data flow—Epic Systems' Hyperspace platform connects 300+ workflow optimization decisions across clinical specialties, reducing surgery times and improving patient outcomes through hybrid workflow design.",
        ethics: "AI can perpetuate biases in training data and make inscrutable 'black box' decisions. How do we ensure fairness and accountability? Real-world experience: Epic Systems (2024-2025) demonstrated that managing 18 IT analysts and 26 clinical leaders requires balancing technology capabilities with human expertise. Client-facing presentations and agile methodologies ensure stakeholder consensus on design decisions.",
        interactionType: "comparison",
        beforeStat: "10% of cancers missed, fragmented workflows",
        afterStat: "AI-enhanced detection + optimized EHR workflows"
      },
      {
        id: "closed-loop",
        name: "Closed-Loop Artificial Pancreas",
        category: "therapeutic",
        tagline: "The body's feedback loop, engineered",
        problem: "Even with CGM and pumps, diabetics must manually calculate insulin doses. Cognitive burden and errors persist.",
        engineering: "CGM feeds glucose data to algorithm, which calculates and commands insulin pump in real-time. PID control or machine learning optimizes for individual patterns. System adapts to meals, exercise, and stress without user input.",
        ethics: "Automation reduces burden but surrenders control. What if the algorithm fails? Who is responsible—patient, doctor, or manufacturer?",
        interactionType: "slider",
        beforeStat: "Manual calculations, constant vigilance",
        afterStat: "Automated adjustment, mental freedom"
      },
      {
        id: "neural-interface",
        name: "Neural Interface (Speculative)",
        category: "therapeutic",
        tagline: "Direct brain-computer communication",
        problem: "Paralyzed patients cannot communicate or control their environment. Brain signals are locked inside.",
        engineering: "Electrode arrays implanted in motor cortex detect neural firing patterns. Machine learning decodes intent (move cursor, type words, control prosthetic). Two-way interfaces may eventually provide sensory feedback.",
        ethics: "Brain-computer interfaces raise profound questions: Can thoughts be hacked? What defines the boundary between human and machine?",
        interactionType: "toggle",
        beforeStat: "Complete paralysis, locked-in",
        afterStat: "Thought-controlled communication and movement"
      },
      {
        id: "wound-healing-therapy",
        name: "PDGFR-Enhanced Cell Therapy for Wound Healing",
        category: "therapeutic",
        tagline: "Accelerating tissue regeneration at the cellular level",
        problem: "Chronic wounds affect millions of patients—diabetic ulcers, burns, and surgical incisions heal slowly or not at all. Traditional treatments are passive; cells need active enhancement to optimize migration and proliferation.",
        engineering: "NIH 3T3 fibroblasts are modified via PDGFR (Platelet-Derived Growth Factor Receptor) gene transfection to enhance cellular mobility. Chemotactic analysis measures migration rates and validates 25% improvement in wound healing efficiency. Statistical modeling confirms optimization of fibroblast migration—critical for tissue repair and regeneration. Experimental protocols combine molecular biology, bioimaging, and quantitative analysis. Real-world experience: Northeastern University Capstone (2023-2024) developed comprehensive experimental frameworks showing that targeted genetic modifications can accelerate healing at the cellular level.",
        ethics: "Genetic modification of cells raises questions about long-term safety and unintended consequences. How do we ensure enhanced cells stop when healing is complete?",
        interactionType: "comparison",
        beforeStat: "Slow wound healing, chronic ulcers",
        afterStat: "25% faster cellular migration, enhanced regeneration"
      },
      {
        id: "nano-robot",
        name: "Medical Nanorobot (Speculative)",
        category: "therapeutic",
        tagline: "Microscopic surgeons",
        problem: "Many diseases occur at cellular and molecular scales beyond the reach of current interventions.",
        engineering: "Nano-scale robots navigate bloodstream using chemical propulsion or magnetic guidance. Target specific cells (cancer, bacteria) for drug delivery or mechanical destruction. Biodegradable materials ensure safe elimination.",
        ethics: "Autonomous medical robots inside the body raise concerns about control, targeting accuracy, and immune response. Who ensures they stop when the job is done?",
        interactionType: "slider",
        beforeStat: "Systemic drugs affect whole body",
        afterStat: "Targeted cellular-level intervention"
      }
    ],
    mission: {
      type: "choice",
      title: "AI Transparency vs. Performance",
      description: "An AI diagnostic tool is 95% accurate but can't explain its reasoning. A simpler, explainable model is 88% accurate. Choose:",
      data: {
        choices: [
          {
            id: "accurate",
            label: "Deploy the more accurate AI",
            outcome: "More lives saved, but doctors struggle to trust and learn from opaque recommendations. You prioritize outcomes over understanding."
          },
          {
            id: "explainable",
            label: "Deploy the explainable model",
            outcome: "Doctors trust and learn from clear reasoning, improving care overall. Some cases are missed that the black box would catch."
          },
          {
            id: "hybrid",
            label: "Use both: AI flags, humans investigate",
            outcome: "You combine strengths. AI catches edge cases, humans provide oversight and learning. System is slower but more robust."
          }
        ]
      }
    },
    ethicalQuestion: {
      question: "A closed-loop insulin system learns from your patterns but requires sharing data with the manufacturer's cloud. Would you:",
      choices: [
        {
          id: "cloud",
          text: "Accept cloud processing for better algorithms",
          outcome: "Your device learns faster and more accurately, but your health data lives on corporate servers."
        },
        {
          id: "local",
          text: "Demand local-only processing",
          outcome: "Your privacy is protected, but algorithm performance is limited by device computing power."
        },
        {
          id: "federated",
          text: "Advocate for federated learning (local training, shared insights)",
          outcome: "You push for a middle path. Your raw data stays on device, but anonymized insights improve everyone's algorithms."
        }
      ]
    }
  }
];

export const progressSchema = z.object({
  completedEras: z.array(z.string()),
  currentEra: z.string().nullable(),
  eraChoices: z.record(z.string()),
  lastVisited: z.string(),
  unlockedAchievements: z.array(z.string()).default([]),
  missionAttempts: z.record(z.number()).default({}),
  eraStartTimes: z.record(z.number()).default({}),
  eraCompletionDurations: z.record(z.number()).optional()
});

export type ProgressData = z.infer<typeof progressSchema>;

export const achievements: Achievement[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first era",
    icon: "Award",
    category: "completion",
    condition: (progress) => progress.completedEras.length >= 1
  },
  {
    id: "halfway-there",
    name: "Halfway There",
    description: "Complete 3 eras",
    icon: "TrendingUp",
    category: "completion",
    condition: (progress) => progress.completedEras.length >= 3
  },
  {
    id: "master-chronicler",
    name: "Master Chronicler",
    description: "Complete all 5 eras",
    icon: "Trophy",
    category: "completion",
    condition: (progress) => progress.completedEras.length >= 5
  },
  {
    id: "perfect-sequence",
    name: "Perfect Sequencer",
    description: "Complete a sequencing puzzle on first attempt",
    icon: "Target",
    category: "speed",
    condition: (progress) => {
      return Object.entries(progress.missionAttempts).some(
        ([eraId, attempts]) => {
          const era = eras.find(e => e.id === eraId);
          return era?.mission.type === "sequence" && attempts === 1;
        }
      );
    }
  },
  {
    id: "quick-learner",
    name: "Quick Learner",
    description: "Complete an era within 5 minutes of starting it",
    icon: "Zap",
    category: "speed",
    condition: (progress) => {
      if (!progress.eraCompletionDurations) return false;
      return Object.values(progress.eraCompletionDurations).some(duration => duration <= 300000);
    }
  },
  {
    id: "safety-first",
    name: "Safety First",
    description: "Choose safety-focused ethical options in 3 eras",
    icon: "Shield",
    category: "ethics",
    condition: (progress) => {
      const safetyChoices = ["safety", "pause", "wait", "protocol", "refuse", "local"];
      const safetyCount = Object.values(progress.eraChoices).filter(
        choice => safetyChoices.includes(choice)
      ).length;
      return safetyCount >= 3;
    }
  },
  {
    id: "innovation-advocate",
    name: "Innovation Advocate",
    description: "Choose innovation-focused options in 3 eras",
    icon: "Lightbulb",
    category: "ethics",
    condition: (progress) => {
      const innovationChoices = ["proceed", "invest", "wireless-charging", "scan", "share", "cloud", "accurate"];
      const innovationCount = Object.values(progress.eraChoices).filter(
        choice => innovationChoices.includes(choice)
      ).length;
      return innovationCount >= 3;
    }
  },
  {
    id: "balanced-thinker",
    name: "Balanced Thinker",
    description: "Choose middle-ground options in 3 eras",
    icon: "Scale",
    category: "ethics",
    condition: (progress) => {
      const balancedChoices = ["restrict", "hybrid", "aggregate", "federated", "explainable"];
      const balancedCount = Object.values(progress.eraChoices).filter(
        choice => balancedChoices.includes(choice)
      ).length;
      return balancedCount >= 3;
    }
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Visit all available eras",
    icon: "Compass",
    category: "special",
    condition: (progress) => {
      const visitedEras = new Set([
        ...progress.completedEras,
        ...(progress.currentEra ? [progress.currentEra] : [])
      ]);
      const unlockedCount = eras.filter((_, index) => 
        index === 0 || progress.completedEras.length > index
      ).length;
      return visitedEras.size >= unlockedCount && unlockedCount >= 3;
    }
  }
];
