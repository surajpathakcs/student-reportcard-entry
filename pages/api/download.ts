import { connectToDB } from "@/app/lib/utils";
import { NextApiRequest , NextApiResponse} from "next";
import archiver from 'archiver'

export default async function handler(req:NextApiRequest , res : NextApiResponse){
    try{
        const db = await connectToDB();
        const data = await db.collection("students_report").find({}).toArray();
        console.log("number of files ",data.length)

        res.setHeader("Content-Type" , "application/zip")
        res.setHeader("Content-Disposition" , "attachment; filename=reports.zip")

        const archive = await archiver("zip", { zlib :{level : 9 } });
        archive.pipe(res)
        
        for (const [index, item] of data.entries()) {
            const jsonContent = JSON.stringify(item, null, 2);
            const filename = `${item.ImageName || "file"}_${index}.json`; // fallback + index to ensure uniqueness
            archive.append(jsonContent, { name: filename });
        }
        archive.finalize();


    }
    catch(error){
        console.log("Error Occured somewhere in fetching the data from mongo db", error)
        res.status(500).json({message : "Error Occured somewhere in fetching the data", "error" : error})
    }
}
