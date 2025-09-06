import { connectToDB } from "@/app/lib/utils";
import { NextApiRequest , NextApiResponse} from "next";
import { Readable } from "stream";

const archiver = require('archiver')

export default async function handler(req:NextApiRequest , res : NextApiResponse){
    try{
        const db = await connectToDB();
        const data = await db.collection("students_report").find({}).limit(10).toArray();

        res.setHeader("Content-Type" , "application/zip")
        res.setHeader("Content-Disposition" , "attachment; filename=reports.zip")

        const archive = await archiver("zip", { zlib :{level : 9 } });
        archive.pipe(res)
        
        for(const item of data){
            const jsonContent = JSON.stringify(item,null,2)
            archive.append(jsonContent,{name:item.ImageName+'.json'})
            console.log("item : ", item)
        };
        archive.finalize();


    }
    catch(error){
        console.log("Error Occured somewhere in fetching the data from mongo db", error)
        res.status(500).json({message : "Error Occured somewhere in fetching the data", "error" : error})
    }
}
