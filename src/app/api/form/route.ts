import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils"; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      ImageName, StudentName, Level, RegNo, AcademicYear, Semester,
      Program, TotalCreditHour, SGPA, DateOfIssue, Subject
    } = body;

    const db = await connectToDB();
    const result = await db.collection("students_report").insertOne({
      ImageName,
      StudentName,
      Level,
      RegNo,
      AcademicYear,
      Semester,
      Program,
      TotalCreditHour,
      SGPA,
      DateOfIssue,
      Subject,
    });

    return NextResponse.json({ message: "Student Saved", id: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error("Form POST Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 },
    );
  }
}
