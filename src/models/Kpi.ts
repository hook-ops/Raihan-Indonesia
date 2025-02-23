// Kpi Modal 02/22/2025 Raihan Hafiz
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
      type: [String], 
      default: [],
    },
    affiliateApplicability: {
      type: String, 
      required: true,
    },
    businessQuestions: {
      type: [String], 
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
