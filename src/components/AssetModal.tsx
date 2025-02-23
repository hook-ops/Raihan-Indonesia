// AssetModal Component - Displays detailed information about a selected asset
// Date: 02/21/2025
// Author: Raihan Hafiz

import { MouseEvent, useState } from "react";
import axios from "axios";

// Define the props that AssetModal will receive
interface AssetModalProps {
  asset: any; 
  onClose: () => void; 
}

export default function AssetModal({ asset, onClose }: AssetModalProps) {

  // Prevents the modal from closing when clicking inside it
  const stopPropagation = (e: MouseEvent) => e.stopPropagation();
  const [isFavorite, setIsFavorite] = useState(asset?.favorite || false);

  /**
   * Handles the favorite toggle action
   * Optimistically updates the UI before sending the request
   * Reverts the UI change if the request fails
   */
  const handleFavorite = async () => {
    if (!asset || !asset._id) {
      console.error("Asset is undefined or missing _id.");
      return;
    }
  
    // Optimistically update the UI before the API call
    setIsFavorite((prev) => !prev); 
  
    try {
      const res = await axios.post(`/api/assets/${asset._id}`, { favorite: !isFavorite });
  
      // Ensure the backend response matches the new state
      if (res.data.asset) {
        setIsFavorite(res.data.asset.favorite);
      }
    } catch (error) {
      console.error("Failed to update favorite status", error);
  
      // Revert UI update if API request fails
      setIsFavorite((prev) => !prev); 
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} 
    >
      {/* Modal container */}
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg p-6 relative shadow-lg"
        onClick={stopPropagation} 
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header with Icon */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="bg-gray-100 p-3 rounded-full mb-2">
            📊 
          </div>
          <h2 className="text-2xl font-bold">{asset.name}</h2>
          <p className="text-sm text-gray-500">{asset.description}</p>
        </div>

        {/* Tags Section */}
        <div className="flex justify-center flex-wrap gap-2 mb-4">
          {asset.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 px-3 py-1 text-xs font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* KPI Type Assets */}
        {asset.type === "kpi" && (
          <div>
            {/* KPI Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
              <div>
                <p className="text-lg font-semibold">{asset.usageCount}</p>
                <p className="text-sm text-gray-500">Metric IDs</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Description</p>
                <p className="text-sm text-gray-500">Calculation</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{asset.pages || "N/A"}</p>
                <p className="text-sm text-gray-500">Visuals Available</p>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {new Date(asset.lastUpdated).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Affiliate Applicability</p>
              </div>
            </div>

            {/* Chart Preview Placeholder */}
            <div className="w-full h-32 bg-gray-100 rounded-md mb-6 flex items-center justify-center text-gray-400">
              Chart/Preview Area
            </div>
          </div>
        )}

        {/* Layout Type Assets */}
        {asset.type === "layout" && (
          <div>
            {/* Layout Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
              <div>
                <p className="text-lg font-semibold">{asset.usageCount}</p>
                <p className="text-sm text-gray-500">Used</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Universal</p>
                <p className="text-sm text-gray-500">Type</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{asset.pages || "N/A"}</p>
                <p className="text-sm text-gray-500">Pages No.</p>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {new Date(asset.lastUpdated).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Last Updated</p>
              </div>
            </div>

            {/* Chart Preview Placeholder */}
            <div className="w-full h-32 bg-gray-100 rounded-md mb-6 flex items-center justify-center text-gray-400">
              Chart/Preview Area
            </div>

            {/* Business Questions Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Business Questions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Question 1", "Question 2", "Question 3", "Question 4"].map(
                  (question, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-md ${
                        index === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <p className="text-sm font-medium">{question}</p>
                      <p className="text-xs text-gray-500">
                        Short description of the item goes nicely here.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Storyboard Type Assets */}
        {asset.type === "storyboard" && (
          <div>
            {/* Storyboard Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
              <div>
                <p className="text-lg font-semibold">{asset.usageCount}</p>
                <p className="text-sm text-gray-500">Storyboard Details</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Storyboard</p>
                <p className="text-sm text-gray-500">Type</p>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {new Date(asset.lastUpdated).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Last Updated</p>
              </div>
            </div>

            {/* Chart Preview Placeholder */}
            <div className="w-full h-32 bg-gray-100 rounded-md mb-6 flex items-center justify-center text-gray-400">
              Chart/Preview Area
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <button
          className={`w-full ${isFavorite ? "bg-red-600" : "bg-black"} text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition`}
          onClick={handleFavorite}
        >
          {isFavorite ? "❤️ Favorited" : "⭐ Favorite item"}
        </button>
      </div>
    </div>
  );
}
