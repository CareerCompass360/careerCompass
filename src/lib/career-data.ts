export interface Career {
  name?: string
}

export interface CareerCategory {
  id: number
  category: string
  careers: Career[]
}

const careerData: CareerCategory[] = [
  {
    id: 1,
    category: "Technology & Innovation",
    careers: [
      { name: "Software Engineer" }, { name: "Data Scientist" }, { name: "AI/ML Engineer" }, { name: "Cybersecurity Analyst" },
      { name: "Cloud Engineer" }, { name: "DevOps Engineer" }, { name: "UX/UI Designer" }, { name: "Full Stack Developer" },
      { name: "Blockchain Developer" }, { name: "IoT Specialist" }, { name: "Systems Architect" }, { name: "Robotics Engineer" },
      { name: "Network Engineer" }, { name: "Hardware Engineer" }, { name: "Technology Consultant" }, { name: "Product Manager" },
      { name: "Database Administrator" }, { name: "Game Developer" }, { name: "Digital Transformation Specialist" }, { name: "Embedded Systems Engineer" },
      { name: "Mobile App Developer" }, { name: "Computer Vision Engineer" }, { name: "Virtual Reality Developer" }, { name: "Machine Learning Researcher" },
      { name: "Big Data Engineer" }, { name: "Quantum Computing Researcher" }, { name: "Cyber Forensics Expert" }, { name: "Ethical Hacker" },
      { name: "Bioinformatics Specialist" }, { name: "GIS Analyst" }, { name: "Telecommunications Engineer" }, { name: "IT Support Specialist" },
      { name: "Technical Writer" }, { name: "Innovation Strategist" }, { name: "Data Engineer" }, { name: "Computer Programmer" },
      { name: "Digital Marketing Specialist" }, { name: "RPA Developer" }, { name: "AI Ethicist" }, { name: "Solutions Architect" },
      { name: "Agile Coach" }, { name: "Information Security Officer" }
    ]
  },
  {
    id: 2,
    category: "Health & Wellness",
    careers: [
      { name: "Nurse" }, { name: "Nutritionist" }, { name: "Fitness Trainer" }, { name: "Physical Therapist" },
      { name: "Occupational Therapist" }, { name: "Medical Assistant" }, { name: "Chiropractor" }, { name: "Health Coach" },
      { name: "Speech-Language Pathologist" }, { name: "Yoga Instructor" }, { name: "Mental Health Counselor" }, { name: "Personal Trainer" },
      { name: "Public Health Administrator" }, { name: "Dental Hygienist" }, { name: "Massage Therapist" }, { name: "Pharmacist" },
      { name: "Ayurveda Practitioner" }, { name: "Homeopathic Doctor" }, { name: "Dietitian" }, { name: "Acupuncturist" },
      { name: "Psychologist" }, { name: "Health Educator" }, { name: "Community Health Worker" }, { name: "Optometrist" },
      { name: "Laboratory Technician" }, { name: "General Physician" }, { name: "Cardiologist" }, { name: "Dermatologist" },
      { name: "Orthopedic Surgeon" }, { name: "Pediatrician" }, { name: "Radiologist" }, { name: "Ophthalmologist" },
      { name: "Dentist" }, { name: "Oncologist" }, { name: "Gynecologist" }, { name: "Endocrinologist" },
      { name: "ENT Specialist" }, { name: "Psychiatrist" }, { name: "Neurologist" }, { name: "Pulmonologist" },
      { name: "Nephrologist" }, { name: "Gastroenterologist" }, { name: "Anesthesiologist" }
    ]
  },
  {
    id: 3,
    category: "Environmental & Sustainability",
    careers: [
      { name: "Environmental Scientist" }, { name: "Sustainability Consultant" }, { name: "Conservation Scientist" }, { name: "Ecologist" },
      { name: "Environmental Engineer" }, { name: "Wildlife Biologist" }, { name: "Hydrologist" }, { name: "Climate Change Analyst" },
      { name: "Renewable Energy Specialist" }, { name: "Marine Biologist" }, { name: "Environmental Policy Analyst" }, { name: "Sustainable Agriculture Specialist" },
      { name: "Urban Planner" }, { name: "Forestry Manager" }, { name: "Environmental Educator" }, { name: "Waste Management Specialist" },
      { name: "Sustainable Supply Chain Manager" }, { name: "Environmental Health Officer" }, { name: "Energy Auditor" }, { name: "Water Resource Specialist" },
      { name: "Recycling Coordinator" }, { name: "Natural Resource Manager" }, { name: "Biodiversity Conservation Officer" }, { name: "Carbon Analyst" },
      { name: "Environmental Compliance Inspector" }, { name: "Green Building Architect" }, { name: "Environmental Chemist" }, { name: "Soil Scientist" },
      { name: "Air Quality Specialist" }, { name: "Sustainable Product Designer" }, { name: "Environmental Lawyer" }, { name: "Geoenvironmental Engineer" },
      { name: "Ecosystem Restoration Specialist" }, { name: "Sustainability Program Manager" }, { name: "Agroecologist" }, { name: "Environmental Toxicologist" },
      { name: "Renewable Energy Project Developer" }, { name: "Habitat Restoration Specialist" }, { name: "Sustainable Development Officer" }, { name: "Conservation Geneticist" }
    ]
  },
  {
    id: 4,
    category: "Creative Arts & Design",
    careers: [
      { name: "Graphic Designer" }, { name: "Fashion Designer" }, { name: "Interior Designer" }, { name: "Product Designer" },
      { name: "Web Designer" }, { name: "UI/UX Designer" }, { name: "Art Director" }, { name: "Animator" },
      { name: "Illustrator" }, { name: "Photographer" }, { name: "Film Director" }, { name: "Video Editor" },
      { name: "Sound Designer" }, { name: "Copywriter" }, { name: "Visual Effects Artist" }, { name: "Textile Designer" },
      { name: "3D Modeler" }, { name: "Creative Director" }, { name: "Brand Strategist" }, { name: "User Researcher" },
      { name: "Social Media Manager" }, { name: "Game Designer" }, { name: "Exhibition Designer" }, { name: "Landscape Designer" },
      { name: "Advertising Executive" }, { name: "Dancer" }, { name: "Musician" }, { name: "Theater Actor" },
      { name: "Fashion Stylist" }, { name: "Art Curator" }, { name: "Makeup Artist" }, { name: "Culinary Artist" },
      { name: "Interior Stylist" }, { name: "Printmaker" }, { name: "Sculptor" }, { name: "Calligrapher" },
      { name: "Tattoo Artist" }, { name: "Set Designer" }, { name: "Art Therapist" }
    ]
  },
  {
    id: 5,
    category: "Business & Entrepreneurship",
    careers: [
      { name: "Entrepreneur" }, { name: "Business Analyst" }, { name: "Management Consultant" }, { name: "Marketing Manager" },
      { name: "Sales Manager" }, { name: "Financial Analyst" }, { name: "Product Manager" }, { name: "Operations Manager" },
      { name: "Human Resources Manager" }, { name: "Supply Chain Manager" }, { name: "Project Manager" }, { name: "Brand Manager" },
      { name: "Market Research Analyst" }, { name: "Business Development Executive" }, { name: "Investment Banker" }, { name: "Accountant" },
      { name: "Risk Manager" }, { name: "Insurance Underwriter" }, { name: "Corporate Trainer" }, { name: "Strategic Planner" },
      { name: "Retail Manager" }, { name: "E-commerce Manager" }, { name: "Digital Marketing Manager" }, { name: "Franchise Manager" },
      { name: "Real Estate Manager" }, { name: "Startup Advisor" }, { name: "Event Manager" }, { name: "Public Relations Specialist" },
      { name: "Social Media Strategist" }, { name: "Data Analyst" }, { name: "Compliance Officer" }, { name: "Customer Service Manager" },
      { name: "Change Management Consultant" }, { name: "Business Intelligence Analyst" }, { name: "Procurement Manager" }, { name: "Export Manager" },
      { name: "Product Marketing Manager" }, { name: "Business Operations Manager" }, { name: "Corporate Lawyer" }
    ]
  },
  {
    id: 6,
    category: "Analytical & Research-Oriented",
    careers: [
      { name: "Research Scientist" }, { name: "Market Research Analyst" }, { name: "Statistical Analyst" }, { name: "Data Analyst" },
      { name: "Business Analyst" }, { name: "Quantitative Analyst" }, { name: "Economist" }, { name: "Behavioral Scientist" },
      { name: "Clinical Research Coordinator" }, { name: "Public Health Researcher" }, { name: "Sociologist" }, { name: "Environmental Scientist" },
      { name: "Operations Research Analyst" }, { name: "Policy Analyst" }, { name: "Demographer" }, { name: "Social Researcher" },
      { name: "Bioinformatics Analyst" }, { name: "Psychometrician" }, { name: "Forensic Scientist" }, { name: "Health Services Researcher" },
      { name: "Artificial Intelligence Researcher" }, { name: "Laboratory Technician" }, { name: "Survey Researcher" }, { name: "Epidemiologist" },
      { name: "Pharmaceutical Researcher" }, { name: "Financial Analyst" }, { name: "Market Data Analyst" }, { name: "Risk Analyst" },
      { name: "Academic Researcher" }, { name: "Technical Researcher" }, { name: "Quality Assurance Analyst" }, { name: "Information Scientist" },
      { name: "Geospatial Analyst" }, { name: "Clinical Data Manager" }
    ]
  },
  {
    id: 7,
    category: "Interpersonal & Communication",
    careers: [
      { name: "Human Resources Manager" }, { name: "Corporate Trainer" }, { name: "Customer Service Manager" }, { name: "Sales Executive" },
      { name: "Event Planner" }, { name: "Counselor" }, { name: "Mediator" }, { name: "Marketing Communications Specialist" },
      { name: "Content Strategist" }, { name: "Recruiter" }, { name: "Community Manager" }, { name: "Relationship Manager" },
      { name: "Diplomat" }, { name: "Negotiation Specialist" }, { name: "Communication Consultant" }, { name: "Customer Experience Manager" },
      { name: "Training and Development Manager" }, { name: "Crisis Manager" }, { name: "Brand Ambassador" }, { name: "Corporate Communications Manager" },
      { name: "Public Speaker" }, { name: "Political Consultant" }, { name: "Customer Success Manager" }, { name: "Media Planner" },
      { name: "Digital Content Creator" }, { name: "Engagement Specialist" }, { name: "Telecommunications Specialist" }, { name: "Cultural Liaison" },
      { name: "Family Therapist" }, { name: "Advocacy Director" }
    ]
  },
  {
    id: 8,
    category: "Technical & Mechanical",
    careers: [
      { name: "Mechanical Engineer" }, { name: "Automobile Engineer" }, { name: "Civil Engineer" }, { name: "Electrical Engineer" },
      { name: "Electronics Engineer" }, { name: "Manufacturing Engineer" }, { name: "Quality Control Engineer" }, { name: "Project Engineer" },
      { name: "Maintenance Engineer" }, { name: "Industrial Engineer" }, { name: "Robotics Engineer" }, { name: "Aerospace Engineer" },
      { name: "Mechatronics Engineer" }, { name: "Instrumentation Engineer" }, { name: "Production Manager" }, { name: "Design Engineer" },
      { name: "Technical Writer" }, { name: "CAD Technician" }, { name: "HVAC Technician" }, { name: "Welding Engineer" },
      { name: "Marine Engineer" }, { name: "Sound Engineer" }, { name: "Renewable Energy Engineer" }, { name: "Pipeline Engineer" },
      { name: "Construction Manager" }, { name: "Safety Engineer" }, { name: "Geotechnical Engineer" }, { name: "Control Systems Engineer" },
      { name: "Chemical Engineer" }, { name: "Mining Engineer" }, { name: "Production Technician" }, { name: "Field Service Engineer" },
      { name: "Telecommunications Engineer" }, { name: "Tool and Die Maker" }, { name: "Fitter" }
    ]
  },
  {
    id: 9,
    category: "Outdoor & Interest-based",
    careers: [
      { name: "Outdoor Educator" }, { name: "Adventure Guide" }, { name: "Sports Coach" }, { name: "Fitness Trainer" },
      { name: "Athlete" }, { name: "Vlogger" }, { name: "Travel Blogger" }, { name: "Wildlife Photographer" },
      { name: "Environmental Educator" }, { name: "Event Organizer" }, { name: "Culinary Instructor" }, { name: "Dance Instructor" },
      { name: "Sports Commentator" }, { name: "Park Ranger" }, { name: "Tour Guide" }, { name: "Recreational Therapist" },
      { name: "Fitness Consultant" }, { name: "Campsite Manager" }, { name: "Surf Instructor" }, { name: "Zoologist" },
      { name: "Marine Biologist" }, { name: "Landscaper" }, { name: "Gardener" }, { name: "Sports Official" },
      { name: "Outdoor Adventure Planner" }, { name: "Nature Conservationist" }, { name: "Equestrian Trainer" }, { name: "Adventure Sports Instructor" },
      { name: "Cultural Performer" }, { name: "Fitness Influencer" }, { name: "Ski Instructor" }, { name: "Dance Choreographer" }
    ]
  },
  {
    id: 10,
    category: "Office & Desk-Based",
    careers: [
      { name: "Office Manager" }, { name: "Administrative Assistant" }, { name: "Accountant" }, { name: "Data Entry Operator" },
      { name: "Human Resources Officer" }, { name: "Project Coordinator" }, { name: "Financial Analyst" }, { name: "Marketing Coordinator" },
      { name: "Content Writer" }, { name: "Graphic Designer" }, { name: "IT Support Specialist" }, { name: "Executive Assistant" },
      { name: "Receptionist" }, { name: "Legal Assistant" }, { name: "Database Administrator" }, { name: "Customer Support Executive" },
      { name: "Research Analyst" }, { name: "Business Development Executive" }, { name: "Social Media Manager" }, { name: "Technical Writer" },
      { name: "E-commerce Specialist" }, { name: "Corporate Trainer" }, { name: "Payroll Specialist" }, { name: "Quality Assurance Analyst" },
      { name: "Procurement Specialist" }, { name: "Operations Manager" }, { name: "Sales Coordinator" }, { name: "Insurance Underwriter" },
      { name: "Investment Analyst" }, { name: "Public Relations Officer" }, { name: "Compliance Officer" }, { name: "Tax Consultant" },
      { name: "Management Consultant" }, { name: "Virtual Assistant" }
    ]
  },
  {
    id: 11,
    category: "Remote & Flexible",
    careers: [
      { name: "Freelance Writer" }, { name: "Remote Software Developer" }, { name: "Digital Marketing Specialist" }, { name: "Online Tutor" },
      { name: "Social Media Manager" }, { name: "Data Analyst" }, { name: "Content Creator" }, { name: "SEO Specialist" },
      { name: "Remote Project Manager" }, { name: "Consultant" }, { name: "Transcriptionist" }, { name: "Customer Support Specialist" },
      { name: "E-commerce Manager" }, { name: "Affiliate Marketer" }, { name: "Online Sales Representative" }, { name: "Remote Recruiter" },
      { name: "App Developer" }, { name: "Video Editor" }, { name: "Remote Researcher" }, { name: "Virtual Event Coordinator" },
      { name: "Copywriter" }, { name: "Remote Account Manager" }, { name: "Remote Financial Advisor" }, { name: "Online Community Manager" },
      { name: "Language Translator" }, { name: "Remote IT Support Specialist" }, { name: "Telehealth Provider" }, { name: "Remote Sales Executive" }
    ]
  },
  {
    id: 12,
    category: "High Social Impact",
    careers: [
      { name: "Social Worker" }, { name: "Nonprofit Manager" }, { name: "Public Health Official" }, { name: "Community Organizer" },
      { name: "Human Rights Advocate" }, { name: "Education Consultant" }, { name: "Policy Analyst" }, { name: "Public Relations Specialist" },
      { name: "NGO Program Coordinator" }, { name: "Microfinance Officer" }, { name: "Sustainability Consultant" }, { name: "Disaster Relief Coordinator" },
      { name: "Counselor" }, { name: "Researcher in Social Sciences" }, { name: "Youth Development Specialist" }, { name: "Advocacy Director" },
      { name: "Gender Equality Consultant" }, { name: "Urban Planner" }, { name: "Corporate Social Responsibility Manager" }, { name: "Volunteer Coordinator" },
      { name: "Public Policy Advisor" }, { name: "Healthcare Administrator" }, { name: "Child Welfare Specialist" }, { name: "Crisis Intervention Specialist" },
      { name: "Cultural Heritage Specialist" }, { name: "Economic Development Officer" }, { name: "Environmental Activist" }, { name: "Community Development Officer" },
      { name: "Social Impact Analyst" }, { name: "Social Entrepreneur" }
    ]
  },
  {
    id: 13,
    category: "Innovation & Future-Oriented",
    careers: [
      { name: "Innovation Manager" }, { name: "Futurist" }, { name: "Research and Development Engineer" }, { name: "Artificial Intelligence Specialist" },
      { name: "Digital Transformation Consultant" }, { name: "Smart City Planner" }, { name: "Cybersecurity Analyst" }, { name: "Growth Hacker" },
      { name: "Robotics Engineer" }, { name: "Machine Learning Engineer" }, { name: "Design Thinking Consultant" }, { name: "Tech Start-up Founder" },
      { name: "Creative Technologist" }, { name: "E-commerce Innovator" }, { name: "Bioinformatics Specialist" }, { name: "3D Printing Specialist" },
      { name: "Fintech Specialist" }, { name: "Cloud Solutions Architect" }, { name: "Human-Computer Interaction Specialist" }, { name: "IoT Solutions Architect" },
      { name: "Nanotechnology Researcher" }, { name: "Space Technology Researcher" }, { name: "Advanced Manufacturing Engineer" }, { name: "Diversity and Inclusion Consultant" }
    ]
  },
  {
    id: 14,
    category: "Global Careers",
    careers: [
      { name: "International Business Consultant" }, { name: "Global Marketing Manager" }, { name: "Diplomat" }, { name: "International Relations Specialist" },
      { name: "Foreign Service Officer" }, { name: "Global Supply Chain Manager" }, { name: "Cultural Attaché" }, { name: "International Trade Specialist" },
      { name: "Humanitarian Aid Worker" }, { name: "Global Compliance Officer" }, { name: "Multinational Corporation Executive" }, { name: "Expatriate Consultant" },
      { name: "Global HR Manager" }, { name: "International Development Officer" }, { name: "Foreign Language Teacher" }, { name: "Migration Consultant" },
      { name: "Global Project Manager" }, { name: "Cross-Cultural Trainer" }, { name: "International Policy Analyst" }, { name: "Global Financial Analyst" },
      { name: "Trade Policy Advisor" }, { name: "International Law Attorney" }, { name: "Environmental Policy Advocate" }, { name: "Global Sales Executive" }
    ]
  },
  {
    id: 15,
    category: "Government Services",
    careers: [
      { name: "Indian Administrative Service (IAS)" }, { name: "Indian Police Service (IPS)" }, { name: "Indian Foreign Service (IFS)" }, { name: "Civil Services Officer" },
      { name: "Public Health Officer" }, { name: "Budget Analyst" }, { name: "Urban Planner" }, { name: "Tax Officer" },
      { name: "Legal Advisor" }, { name: "Education Officer" }, { name: "Social Welfare Officer" }, { name: "Economic Development Officer" },
      { name: "Environmental Officer" }, { name: "Labor Relations Specialist" }, { name: "Government Relations Manager" }, { name: "Community Development Officer" },
      { name: "Revenue Officer" }, { name: "Public Relations Officer" }, { name: "Transport Officer" }, { name: "Disaster Management Officer" },
      { name: "Statistics Officer" }, { name: "National Security Officer" }, { name: "Census Officer" }, { name: "Infrastructure Development Manager" },
      { name: "Agriculture Development Officer" }, { name: "Public Policy Advisor" }, { name: "Information Technology Officer" }, { name: "Rural Development Officer" },
      { name: "Foreign Affairs Specialist" }, { name: "Cultural Heritage Officer" }, { name: "Assistant Town Planner" }, { name: "Defense Services Officer" },
      { name: "Employment Officer" }
    ]
  }
]

export default careerData
export { careerData }
export const careersData = careerData
