"use client";
import React, { useState } from "react";
import { number } from "zod/v4-mini";

interface Subject {
  Code: string;
  Name: string;
  CreditHours: number;
  GradePoint: number;
  Grade: string;
}

const FormPage = () => {
  const emptySubject = (): Subject => ({
    Code: "",
    Name: "",
    CreditHours: 0,
    GradePoint: 0,
    Grade: "",
  });

  const [student, setStudent] = useState({
    StudentName: "",
    Level: "Bachelors",
    RegNo: "",
    AcademicYear: "",
    Semester: "",
    Program: "",
    TotalCreditHour: "",
    SGPA: "",
    DateOfIssue: new Date().toISOString().split("T")[0],
  });

  const [subjects, setSubjects] = useState<Subject[]>([emptySubject()]);

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = [...subjects];
    updated[index] = {
      ...updated[index],
      [name]: name === "CreditHours" || name === "GradePoint" ? Number(value) : value,
    };
    setSubjects(updated);
  };

  const addSubject = () => setSubjects([...subjects, emptySubject()]);

  const removeSubject = (index: number) => {
    const updated = [...subjects];
    updated.splice(index, 1);
    setSubjects(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...student,
      RegNo: Number(student.RegNo),
      AcademicYear: Number(student.AcademicYear),
      TotalCreditHour: Number(student.TotalCreditHour),
      SGPA: Number(student.SGPA),
      Subject: subjects,
    };

    const res = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(await res.json());
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="border rounded-xl p-6 w-full max-w-4xl space-y-6 bg-gray-200 m-2 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(student).map(([key, val]) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="mb-1 font-medium">{key}</label>
              <input
                name={key}
                id={key}
                value={val}
                onChange={handleStudentChange}
                type={key.includes("Date") || key === "DateOfIssue" ? "date" : ["SGPA", "TotalCreditHour", "RegNo", "AcademicYear"].includes(key) ? "number" : "text"}
                className="border px-3 py-2 rounded"
              />
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-6 mb-2">Subjects</h3>
          {subjects.map((subject, index) => (
            <div key={index} className="bg-gray-100 p-2  rounded-2xl grid grid-cols-1 sm:grid-cols-5 gap-3 mb-2">
              {Object.entries(subject).map(([field, val]) => (
                <input
                  key={field}
                  name={field}
                  value={val}
                  placeholder={field}
                  onChange={(e) => handleSubjectChange(index, e)}
                  type={["CreditHours", "GradePoint"].includes(field) ? "number" : "text"}
                  className="border px-2 py-1 rounded"
                />
              ))}
              <button type="button" onClick={() => removeSubject(index)} className=" text-white bg-red-500 border py-2 rounded-3xl hover:bg-red-600 transition">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSubject} className="px-5 border rounded-3xl bg-blue-500 hover:bg-blue-600 text-white py-2">
             Add Subject
          </button>
        </div>

        <button type="submit" className="border w-full py-2 rounded-3xl bg-green-500 text-white hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
