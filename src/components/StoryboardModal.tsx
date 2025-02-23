// AssetCard 02/22/2025 Raihan Hafiz
import React from "react";

interface StoryboardModalProps {
    asset: any; // Data related to the selected Asset
  onClose: () => void;
}

export default function StoryboardModal({ asset, onClose }: StoryboardModalProps) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Storyboard Modal</h2>

        <div className="mb-3 border p-3 rounded-lg">
          <h3 className="text-lg font-semibold">
            If you want to browse storyboard modal, you need to request to admin
          </h3>
         
        </div>
      </div>
    </div>
  );
}
