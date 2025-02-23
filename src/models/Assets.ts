// Asset model 02/21/2025 Raihan Hafiz
import mongoose, { Schema, model, models } from "mongoose";

const AssetSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        type: {
            type: String,
            default: 'General',
        },
        usageCount: {
            type: Number,
            default: 0,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
          },
          tags: {
            type: [String],
            default: [],
          },
    },
    {
        timestamps: true,
      }
);

const Asset = models.Asset || model('Asset', AssetSchema);
export default Asset;