import mongoose, { Schema, model, models } from "mongoose";

const KPISchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    metricID: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    calculation: {
      type: String,
      required: true,
    },
    visualsAvailable: {
      type: [String], // Example: ["Bar Chart", "Pie Chart", "Line Graph"]
      default: [],
    },
    affiliateApplicability: {
      type: String, // Example: "Marketing", "Sales", "Finance"
      required: true,
    },
    businessQuestions: {
      type: [String], // Example: ["How is revenue trending?", "What is customer retention?"]
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const KPI = models.KPI || model("KPI", KPISchema);
export default KPI;
