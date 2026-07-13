export const dashboardStats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    trend: "+15% this month",
    isPositive: true,
  },
  {
    title: "Active Projects",
    value: "4",
    trend: "2 due this week",
    isPositive: null,
  },
  {
    title: "Pending Invoices",
    value: "$3,200",
    trend: "2 awaiting payment",
    isPositive: false,
  },
];

export const initialProjects = [
  { id: 1, title: "BandMitra Web Platform", client: "Event Services", status: "In Progress", dueDate: "2026-08-15" },
  { id: 2, title: "Vellora E-commerce UI", client: "Vellora Retail", status: "Review", dueDate: "2026-07-20" },
  { id: 3, title: "Smart Hardware Dashboard", client: "IoT Analytics", status: "Done", dueDate: "2026-06-10" },
  { id: 4, title: "PCB Quality Control App", client: "Inginious", status: "To Do", dueDate: "2026-09-01" },
];

export const clientsData = [
  { id: 1, name: "Event Services", email: "contact@bandmitra.com", activeProjects: 1, totalBilled: "$1,200" },
  { id: 2, name: "Vellora Retail", email: "hello@vellora.io", activeProjects: 1, totalBilled: "$3,450" },
  { id: 3, name: "Inginious", email: "tech@inginious.com", activeProjects: 1, totalBilled: "$800" },
  { id: 4, name: "Sonodyne", email: "audio@sonodyne.com", activeProjects: 0, totalBilled: "$5,000" },
];

export const invoicesData = [
  { id: "INV-001", client: "IoT Analytics", amount: "$2,100", status: "Paid", date: "2026-06-12" },
  { id: "INV-002", client: "Vellora Retail", amount: "$1,500", status: "Pending", date: "2026-07-10" },
  { id: "INV-003", client: "Event Services", amount: "$600", status: "Draft", date: "2026-07-15" },
];