"use client";

import { AttendanceRecord } from "@/types/TableTypesI";
import { getXLSXData } from "@/utils/contractXLSX";
import { getEmailXLSX } from "@/utils/getEmailXLSX";
import { processSingleEntry } from "@/utils/processSingleEntry";
import { sortUniqueData } from "@/utils/sortUniqueData";
import React, { useRef, useState } from "react";

export default function Home() {
  const [excelData, setExcelData] = useState<AttendanceRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [getEmail, setGetEmail] = useState([])
  const emailInputRef = useRef<HTMLInputElement | null>(null)







  const handleParseExcel = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;


    const emailFile = emailInputRef.current?.files?.[0];
    if (!emailFile) return;

    
      getEmailXLSX(emailFile)
      .then((data) =>{
        setGetEmail(data as [])
      })
      .catch((err) => console.error("Error reading Excel:", err));




    getXLSXData(file)
      .then((data) =>{
        const sortedData = sortUniqueData(data)
        setExcelData(sortedData) 
        processLateAbsentData(sortedData)
      })
      .catch((err) => console.error("Error reading Excel:", err));
  };

  const processLateAbsentData = (data: AttendanceRecord[]) => {
      const sortedData = sortUniqueData(data)
      const singleEntryData: AttendanceRecord[] = []
      




      
      for (let i = 0; i < sortedData.length; i++) {
        // console.log("🚀 ~ page.tsx:39 ~ processLateAbsentData ~ i:", i)
        
        if (i < sortedData.length - 1 ) {
          for (let j = i; j < sortedData.length; j++) {
            if (sortedData[i].id===sortedData[j].id) {
              // console.log("🚀 ~ page.tsx:44 ~ 🟢 ~  j:",  j)
              // console.log("🚀 ~ page.tsx:43 ~🟢 processLateAbsentData ~ sortedData[i].id:", sortedData[i].id,sortedData[j].id,sortedData[j].date)
              singleEntryData.push(sortedData[j])
            }

            else{

              // console.log("🚀 ~ page.tsx:44 ~ 🍎 ~  j:",  j)

              i = j - 1


       

                // console.log("🚀 ~ page.tsx:81 ~ processLateAbsentData ~ email:", emailData.email )

                // console.log("🚀 ~ page.tsx:78 ~ processLateAbsentData ~ email:", email)
                
     
                
                // console.log("🚀 ~ page.tsx:87 ~ processLateAbsentData ~ singleEntryData:", singleEntryData[0].email)
                processSingleEntry(singleEntryData,getEmail)

                  // console.log("----------------------:")
                  singleEntryData.length = 0
              

                
              break

            }

          }
        }
        
      }




  }





  return (
    <div>
      <h1>Read Excel File in React</h1>






      <div className="flex flex-col gap-8 p-6"> 
        {/* Section 1 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4  shadow-sm">
          <input 
            ref={fileInputRef} 
            type="file" 
            accept=".csv, .xlsx, .xls" 
            className="file-input file-input-bordered file-input-accent w-full max-w-xs" 
          />


         <input 
            ref={emailInputRef} 
            type="file" 
            placeholder=".csv, .xlsx, .xls" 
            className="file-input file-input-bordered file-input-secondary w-full max-w-xs" 
          />

          <button onClick={handleParseExcel} className="btn btn-primary px-8">
            Upload Excel
          </button>
        </div>




      </div>










      {/* Optional: Display the data in a table or list */}
      {excelData && excelData.length > 0 && (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Date</th>
                <th>Status</th>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Posting</th>
                <th>In-Time</th>
                <th>Division</th>
              </tr>
            </thead>

            <tbody>
              {excelData.map((row: AttendanceRecord, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.date}</td>
                  <td>{row.status}</td>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.department}</td>
                  <td>{row.posting}</td>
                  <td>{row.inTime}</td>
                  <td>{row.division}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
