// DataVizModal Component - Displays detailed information about a selected asset
// Date: 02/22/2025
// Author: Raihan Hafiz

import React from "react";

// Define the props that DataVizModal will receive
interface DataVizModalProps {
  assetData: any; 
  onClose: () => void; 
}

export default function DataVizModal({ assetData, onClose }: DataVizModalProps) {
  if (!assetData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>

      {/* Modal container (prevents closing when clicking inside) */}
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Data Visualization Details</h2>

        {/* Description Section */}
        <div className="mb-3 border p-3 rounded-lg">
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{assetData.description}</p>
        </div>

        {/* Favorite Status Section */}
        <div className="mb-3 border p-3 rounded-lg">
          <h3 className="text-lg font-semibold">Favorite</h3>
          <p>{assetData.favorite ? "⭐ Favorited" : "Not Favorited"}</p>
        </div>

        {/* Applicable KPI Favorites Section */}
        <div className="mb-3 border p-3 rounded-lg">
          <h3 className="text-lg font-semibold">Applicable KPI Favorites</h3>
          <p>{assetData.kpiFavorites?.join(", ") || "No KPI favorites assigned"}</p>
        </div>

        {/* Asset Info Context Section */}
        <div className="mb-3 border p-3 rounded-lg">
          <h3 className="text-lg font-semibold">Asset Info Context</h3>
          <p>{assetData.assetContext || "No additional asset info available"}</p>
        </div>

        {/* Interact with Chart Section */}
        <div className="mb-3 border p-3 rounded-lg">
          <h3 className="text-lg font-semibold">Interact with Chart</h3>
          <p>Click below to explore interactive charts.</p>
          
          {/* Button to open interactive chart */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Open Chart
          </button>
        </div>
      </div>
    </div>
  );
}
