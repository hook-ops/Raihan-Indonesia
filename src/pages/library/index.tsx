import { useState, useEffect } from 'react';
import AssetCard from '../../components/AssetCard';
import AssetModal from '../../components/AssetModal';
import CreateAssetModal from "../../components/CreateAssetModal";
import RequestAssetModal from '@/components/RequestAssetModal';
import axios from 'axios';
import kpiData from "../../models/kpi_data";
import DataVizModal from '@/components/DataVizModal';
import StoryboardModal from '@/components/StoryboardModal';

export default function LibraryPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [trendAssets, setTrendAssets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Featured");

  const [selectedFeaturedAsset, setSelectedFeaturedAsset] = useState<any>(null);
  const [selectedTrendingAsset, setSelectedTrendingAsset] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
  const [isDataVizModalOpen, setIsDataVizModalOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchAssets();
      fetchTrendAssets();
    } else {
      fetchAssets();
      fetchTrendAssets();
    }
  }, [searchQuery]);
  

  const fetchAssets = async () => {
    try {
      const res = await axios.get(`/api/assets`);
      const data = res.data;
  
      // Apply case-insensitive filtering
      const filteredAssets = data.filter(asset =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      setAssets(filteredAssets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const fetchTrendAssets = async () => {
    try {
      const res = await axios.get(`/api/assets?search=`);
      setTrendAssets(res.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleAssetClick = (asset: any) => {
    setSelectedAsset(asset._id === selectedAsset?._id ? null : asset);
  };

  const handleTrendingCardClick = (asset: any) => {
    setSelectedTrendingAsset(asset._id === selectedTrendingAsset?._id ? null : asset);
    setSelectedFeaturedAsset(null); 
    setActiveTab("Featured");
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "KPI" && selectedAsset) {
      fetchKPIData(selectedAsset.name);
    } else if (tab === "Data Viz" && selectedAsset) {
      setIsDataVizModalOpen(true);
    } else if ( tab === "Layout" && selectedAsset ) {
      setIsModalOpen(true);
    } else if ( tab === "Storyboard"  && selectedAsset) {
      setIsStoryboardOpen(true);
    };

  };

  const fetchKPIData = (assetName: string) => {
    if (kpiData[assetName]) {
      setSelectedKPI(kpiData[assetName]);
    } else {
      setSelectedKPI([]);
    }
  };

  return (
    <div className="max-w-5xl px-48 mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
      <div className="absolute top-6 right-96 px-24 flex gap-4">
        <button onClick={() => setIsCreateModalOpen(true)} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">Create</button>
        <button onClick={() => setIsRequestModalOpen(true)} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">Request</button>
      </div>

      <h1 className="text-5xl text-center font-bold mb-8">Library</h1>
      <input type="text" className="w-full border rounded p-2 mb-4" placeholder="Type to search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <div className="flex bg-gray-100 p-2 rounded-lg mb-4">
        {["Featured", "KPI", "Data Viz", "Layout", "Storyboard"].map((tab) => (
          <button key={tab} className={`w-full px-6 py-2 text-sm font-medium rounded-md ${activeTab === tab ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`} onClick={() => handleTabClick(tab)}>{tab}</button>
        ))}
      </div>
     
      <h1 className="font-bold text-3xl mb-3 w-full">{activeTab}</h1>
      <h1 className="text-sm mb-5 w-full text-gray-600 ">Created top picks from this week</h1>

      {activeTab === "KPI" && selectedKPI ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">KPI Details</h2>
          {selectedKPI.map((kpi: any) => (
            <div key={kpi.id} className="mb-4 border p-3 rounded-lg">
              <h3 className="text-lg font-semibold">{kpi.name}</h3>
              <p>{kpi.description}</p>
              <p><strong>Metric ID:</strong> {kpi.metricID}</p>
              <p><strong>Calculation:</strong> {kpi.calculation}</p>
              <p><strong>Visuals:</strong> {kpi.visualsAvailable.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : activeTab === "Data Viz" && selectedKPI ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">Data Viz Details</h2>
          {selectedKPI.map((kpi: any) => (
            <div key={kpi.id} className="mb-4 border p-3 rounded-lg">
              <h3 className="text-lg font-semibold">{kpi.name}</h3>
              <p>{kpi.description}</p>
              <p><strong>Metric ID:</strong> {kpi.metricID}</p>
              <p><strong>Calculation:</strong> {kpi.calculation}</p>
              <p><strong>Visuals:</strong> {kpi.visualsAvailable.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : activeTab !== "Layout" && activeTab !== "Storyboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {assets.map((asset) => (
              <AssetCard 
                key={asset._id} 
                asset={asset} 
                refreshAssets={fetchAssets} 
                onClick={() => handleAssetClick(asset)} 
                isSelected={selectedAsset && selectedAsset._id === asset._id} 
              />
            ))}
          </div>
      )
      
      }

      <h1 className="font-bold text-3xl  w-full py-6">Trending</h1>
      <h6 className="text-sm mb-4 w-full text-gray-600">Most popular by community</h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {trendAssets.map((trendAsset) => (
          <AssetCard
            key={trendAsset._id}
            asset={trendAsset}
            refreshAssets={fetchAssets}
            onClick={() => handleTrendingCardClick(trendAsset)}
            isSelected={selectedTrendingAsset && selectedTrendingAsset._id === trendAsset._id}
          />
        ))}
      </div>

      {isDataVizModalOpen && selectedAsset && (
        <DataVizModal
          assetData={selectedAsset}
          onClose={() => setIsDataVizModalOpen(false)}
        />
      )}
   
      {isModalOpen && selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAsset(null);
          }}
        />
      )}
      {isStoryboardOpen && selectedAsset && (
        <StoryboardModal
          asset={selectedAsset}

          onClose={() => {
            setIsStoryboardOpen(false);
            setSelectedAsset(null);
          }}

        />
      )}

      {isRequestModalOpen && <RequestAssetModal onClose={() => setIsRequestModalOpen(false)} refreshAssets={fetchAssets} />}
      {isCreateModalOpen && <CreateAssetModal onClose={() => setIsCreateModalOpen(false)} refreshAssets={fetchAssets} />}
    </div>
  );
}
