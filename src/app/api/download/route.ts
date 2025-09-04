import { connectToDB } from "@/app/lib/utils";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        const db = await connectToDB();
        const data = await db.collection("students_report").find({}).limit(10).toArray();
        return NextResponse.json({message:"Success", data},{status:200})
    }
    catch(error){
        console.log("Error Occured somewhere in fetching the data from mongo db", error)
        return NextResponse.json({message : "Error Occured somewhere in fetching the data", "error" : error},{status:500})
    }
}