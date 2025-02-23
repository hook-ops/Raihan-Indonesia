// List/Create Assets 02/21/2025 Raihan
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/dbConnect";
import Asset from "@/models/Assets";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    switch (req.method) {
        // case 'GET': {
        //     const { search } = req.query;
        //     console.log("search, type",  " ", search);

        //     const filter: Record<string, any> = {};
        //     // if(search) {
        //     //     filter.name = { $regex: search, $options: 'i' };
        //     // }
        //     if (search) {
        //         filter.type = search;
        //     }

        //     try {
        //         let assets;
        //         if(!filter.type){
        //              assets = (await Asset.find());
        //              console.log("xxxxxxxx");
        //         } else {
        //              assets = (await Asset.find({ type: filter.type}));
        //         }
                
        //         console.log("kkkkkkkkkkkkkkkk", assets);
        //         return res.status(200).json(assets);

        //     } catch (err:any) {
        //         return res.status(500).json({ error: err.message });
        //     }
        // }

        case 'GET': {
            const { search } = req.query;
            console.log("search query:", search);
        
            const filter: Record<string, any> = {};
        
            if (search) {
                // Make the search case-insensitive using regex
                filter.type = { $regex: `^${search}$`, $options: "i" };
            }
        
            try {
                let assets;
                if (!search) {
                    // If no search query, return all assets
                    assets = await Asset.find();
                    console.log("Fetching all assets...");
                } else {
                    // Case-insensitive search for type field
                    assets = await Asset.find(filter);
                    console.log("Fetching filtered assets...");
                }
        
                console.log("Assets found:", assets);
                return res.status(200).json(assets);
        
            } catch (err: any) {
                return res.status(500).json({ error: err.message });
            }
        }
        

        case 'POST': {
            try {
                console.log("++++++++++++++++",req.body);
                const newAsset = await Asset.create(req.body);
                return res.status(201).json(newAsset);
            } catch (error: any) {
                return res.status(405).json({ error: 'Method not allowed' });
            }
        }
    
        default:
            return res.status(405).json({ error: 'Method not allowed' });
         
    }
}