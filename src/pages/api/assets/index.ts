// List/Create Assets API Route - Handles fetching and creating assets
// Date: 02/21/2025
// Author: Raihan Hafiz

import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/dbConnect"; 
import Asset from "@/models/Assets"; 

// API route handler function
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect(); 

    switch (req.method) {
      
        // Handle GET request - Retrieve all assets or filter based on search query
        case 'GET': {
            const { search } = req.query; 
            console.log("search query:", search); 
            
            const filter: Record<string, any> = {};
        
            if (search) {
                filter.type = { $regex: `^${search}$`, $options: "i" };
            }
        
            try {
                let assets;
                if (!search) {
                    // If no search query is provided, fetch all assets
                    assets = await Asset.find();
                    console.log("Fetching all assets...");
                } else {
                    // Fetch assets that match the search query
                    assets = await Asset.find(filter);
                    console.log("Fetching filtered assets...");
                }
        
                console.log("Assets found:", assets);
                return res.status(200).json(assets);
        
            } catch (err: any) {
                return res.status(500).json({ error: err.message }); 
            }
        }

        // Handle POST request - Create a new asset
        case 'POST': {
            try {
                const newAsset = await Asset.create(req.body); 
                return res.status(201).json(newAsset); 
            } catch (error: any) {
                return res.status(405).json({ error: 'Method not allowed' }); 
            }
        }
    
        // Handle unsupported request methods
        default:
            return res.status(405).json({ error: 'Method not allowed' }); 
    }
}
