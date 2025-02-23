interface KPI {
  id: string;
  name: string;
  metricID: string;
  description: string;
  calculation: string;
  visualsAvailable: string[];
  affiliateApplicability: string;
  businessQuestions: string[];
}

const kpiData: Record<string, KPI[]> = {
  "Test Asset": [
    {
      id: "kpi-1",
      name: "Revenue Growth",
      metricID: "rev_growth",
      description: "Tracks revenue increase over time",
      calculation: "((Current Revenue - Previous Revenue) / Previous Revenue) * 100",
      visualsAvailable: ["Bar Chart", "Line Chart"],
      affiliateApplicability: "Finance",
      businessQuestions: ["What is our revenue trend?"],
    },
    {
      id: "kpi-2",
      name: "Customer Retention",
      metricID: "cust_retention",
      description: "Measures how many customers return",
      calculation: "(Returning Customers / Total Customers) * 100",
      visualsAvailable: ["Pie Chart", "Table"],
      affiliateApplicability: "Marketing",
      businessQuestions: ["How many customers do we retain each month?"],
    }
  ],
  "KPI Asset": [
    {
      id: "kpi-3",
      name: "Net Profit Margin",
      metricID: "net_profit_margin",
      description: "Shows profitability of the business",
      calculation: "(Net Profit / Revenue) * 100",
      visualsAvailable: ["Bar Chart", "Line Chart"],
      affiliateApplicability: "Finance",
      businessQuestions: ["What is our net profit margin?"],
    }
  ],
  "Layout Asset": [
    {
      id: "kpi-4",
      name: "Net Profit Margin",
      metricID: "net_profit_margin",
      description: "Shows profitability of the business",
      calculation: "(Net Profit / Revenue) * 100",
      visualsAvailable: ["Bar Chart", "Line Chart"],
      affiliateApplicability: "Finance",
      businessQuestions: ["What is our net profit margin?"],
    }
  ],
  "Storyboard Asset": [
    {
      id: "kpi-5",
      name: "Net Profit Margin",
      metricID: "net_profit_margin",
      description: "Shows profitability of the business",
      calculation: "(Net Profit / Revenue) * 100",
      visualsAvailable: ["Bar Chart", "Line Chart"],
      affiliateApplicability: "Finance",
      businessQuestions: ["What is our net profit margin?"],
    }
  ],
};

export default kpiData;
