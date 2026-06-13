import {
  Scale,
  HandshakeIcon,
  ShieldCheck,
  Users,
  LineChart,
  Activity,
  TrendingUp,
  Monitor,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "strategic-policy-governance",
    title: "Strategic Policy & Governance",
    short: "Policy design, governance frameworks, and public-sector reform.",
    icon: Scale,
    items: ["Policy Development", "Governance Frameworks", "Public Sector Reform", "Capacity Building"],
  },
  {
    slug: "peace-building",
    title: "Peace-Building Programs",
    short: "Conflict analysis, social cohesion and reconciliation.",
    icon: HandshakeIcon,
    items: ["Conflict Analysis", "Social Cohesion", "Reconciliation", "Peace Governance"],
  },
  {
    slug: "audit-risk",
    title: "Audit Assurance & Risk Management",
    short: "Independent assurance, compliance and fraud investigation.",
    icon: ShieldCheck,
    items: ["Internal Audit", "Compliance", "Risk Assessment", "Fraud Investigation"],
  },
  {
    slug: "human-capital",
    title: "Institution & Human Capital",
    short: "HR systems, leadership and organizational development.",
    icon: Users,
    items: ["HR Management", "Leadership Development", "Performance Systems", "Organizational Development"],
  },
  {
    slug: "research-analytics",
    title: "Research & Analytics",
    short: "Rigorous research, baselines and statistical analysis.",
    icon: LineChart,
    items: ["Market Research", "Socio-economic Studies", "Baseline Surveys", "Statistical Analysis"],
  },
  {
    slug: "monitoring-evaluation",
    title: "Monitoring & Evaluation",
    short: "M&E systems, results frameworks and digital dashboards.",
    icon: Activity,
    items: ["M&E Systems", "Results Frameworks", "Project Evaluations", "Digital Dashboards"],
  },
  {
    slug: "business-development",
    title: "Business & Development Services",
    short: "Investment readiness, entrepreneurship and growth.",
    icon: TrendingUp,
    items: ["Investment Readiness", "Entrepreneurship", "Capital Access", "Business Growth"],
  },
  {
    slug: "ict-solutions",
    title: "ICT Solutions",
    short: "Websites, digital transformation and cybersecurity.",
    icon: Monitor,
    items: ["Website Development", "Digital Transformation", "Technical Support", "Cybersecurity"],
  },
];

export const stats = [
  { value: "80+", label: "HR Systems Delivered" },
  { value: "5,000+", label: "Professionals Trained" },
  { value: "40+", label: "Institutions Supported" },
  { value: "2019", label: "Established" },
];

export const trainings = [
  {
    title: "Strategy & Economics",
    desc: "Macro & micro strategy, public economics, market systems.",
    modules: ["Strategic Planning", "Public Economics", "Market Systems", "Scenario Modeling"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    title: "Finance & Compliance",
    desc: "Public financial management, audit and donor compliance.",
    modules: ["PFM", "IFRS & IPSAS", "Donor Compliance", "Internal Controls"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
  {
    title: "Leadership Development",
    desc: "Executive coaching, women in leadership, change leadership.",
    modules: ["Executive Coaching", "Change Leadership", "Team Effectiveness", "Negotiation"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    title: "Marketing & Communications",
    desc: "Strategic communications, advocacy and digital marketing.",
    modules: ["Strategic Comms", "Advocacy", "Digital Marketing", "Brand Building"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

export const projects = [
  { title: "National HR System Reform", category: "HR Development", year: 2024, summary: "Designed and rolled out unified HR systems across 12 ministries.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
  { title: "Peace & Reconciliation Program", category: "Peace Building", year: 2023, summary: "Community dialogue platforms across 6 regions, reaching 80,000+ citizens.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" },
  { title: "M&E Digital Dashboard", category: "M&E", year: 2024, summary: "Real-time results dashboard for a multi-donor development program.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80" },
  { title: "Governance Reform Advisory", category: "Governance", year: 2022, summary: "Policy advisory and capacity building for a national reform agenda.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80" },
  { title: "Socio-economic Baseline Study", category: "Research", year: 2023, summary: "Mixed-methods baseline across 4,500 households in fragile settings.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80" },
  { title: "Public Service Leadership Academy", category: "HR Development", year: 2024, summary: "Leadership academy training 1,200+ public sector executives.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" },
];

export const projectCategories = ["All", "Governance", "Peace Building", "Research", "M&E", "HR Development"] as const;

export const testimonials = [
  { name: "Dr. Amina Yusuf", role: "Director, Ministry of Planning", quote: "PointBridge delivered with discipline and integrity in one of our most complex reform programs." },
  { name: "Mark Johansson", role: "Country Director, INGO", quote: "Their M&E framework changed how we report results to donors — clear, defensible, on time." },
  { name: "Hodan Ahmed", role: "Programme Manager, UN Agency", quote: "Rigorous, ethical and locally grounded. Exactly what fragile contexts need." },
];

export const partners = [
  "UN Agencies", "World Bank", "EU Delegation", "USAID", "GIZ", "DFID/FCDO", "African Union", "AfDB",
];

export const publications = [
  { slug: "governance-fragile-states", title: "Governance Reform in Fragile States: A Practitioner's Guide", category: "Report", year: 2024, pages: 86, date: "2026-04-04", excerpt: "A practical framework for designing and implementing governance reforms in complex and fragile settings.", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80" },
  { slug: "livelihoods-baseline", title: "Baseline Survey: Livelihoods in Post-Conflict Communities", category: "Research", year: 2023, pages: 124, date: "2026-04-02", excerpt: "Mixed-methods baseline across 4,500 households examining livelihood recovery in post-conflict areas.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80" },
  { slug: "peace-program-evaluation", title: "Evaluation of a Multi-Donor Peace-Building Program", category: "Evaluation", year: 2024, pages: 62, date: "2026-03-18", excerpt: "Independent evaluation assessing outcomes, sustainability and lessons from a regional peace initiative.", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" },
  { slug: "hr-maturity-model", title: "HR Systems Maturity Model for Public Institutions", category: "Report", year: 2023, pages: 48, date: "2026-02-10", excerpt: "A diagnostic tool for ministries and public agencies to assess and strengthen HR system performance.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { slug: "digital-me", title: "Digital M&E: From Indicators to Insight", category: "Publication", year: 2024, pages: 54, date: "2026-01-22", excerpt: "How digital dashboards transform monitoring from compliance exercise to decision support.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { slug: "sme-investment", title: "Investment Readiness for SMEs in Frontier Markets", category: "Publication", year: 2022, pages: 72, date: "2025-11-05", excerpt: "Guidance for entrepreneurs and development partners on building investable businesses.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" },
];

export const publicationCategories = ["All", "Report", "Research", "Evaluation", "Publication"] as const;

export const blogPosts = [
  { slug: "rigor-in-fragile-contexts", title: "Why Rigor Matters in Fragile Contexts", category: "Insights", date: "2026-05-12", excerpt: "Methodological discipline is what separates credible evidence from advocacy.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { slug: "designing-m-e-that-leaders-use", title: "Designing M&E That Leaders Actually Use", category: "M&E", date: "2026-04-02", excerpt: "Dashboards fail when they answer the wrong questions. Start with decisions.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" },
  { slug: "leadership-public-sector-reform", title: "Leadership Lessons from Public Sector Reform", category: "Leadership", date: "2026-02-21", excerpt: "Reform is a coalition exercise. The technical work is the easy part.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" },
  { slug: "peace-building-evidence", title: "Building Peace, Building Evidence", category: "Peace", date: "2026-01-15", excerpt: "How to evaluate something as contested and political as peace itself.", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80" },
];

export const teamMembers = [
  { name: "Keynan A. Mohamed", role: "Managing Partner", bio: "20+ years across governance, M&E and institutional reform.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name: "Dr. Fatuma Hassan", role: "Director, Research & Analytics", bio: "Mixed-methods researcher specializing in fragile contexts.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Ahmed Warsame", role: "Head of Audit & Risk", bio: "CPA, CIA. Former Big Four assurance leader.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Layla Ibrahim", role: "Director, Human Capital", bio: "HR systems architect for ministries and INGOs.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
];

export const timeline = [
  { year: "2019", title: "Founded", text: "PointBridge Consulting established with a mandate for rigor in fragile settings." },
  { year: "2020", title: "First Government Reform", text: "Engaged on national HR systems reform across multiple ministries." },
  { year: "2022", title: "Regional Expansion", text: "Extended operations across the Horn of Africa with new donor partnerships." },
  { year: "2024", title: "Digital M&E Platform", text: "Launched in-house digital dashboards for real-time program management." },
  { year: "2026", title: "5,000+ Trained", text: "Crossed 5,000 professionals trained across leadership, finance and M&E." },
];