"use client";

import { AttendanceRecord } from "@/types/TableTypesI";
import { getXLSXData } from "@/utils/contractXLSX";
import { processSingleEntry } from "@/utils/processSingleEntry";
import { sortUniqueData } from "@/utils/sortUniqueData";
import React, { useRef, useState } from "react";

export default function Home() {
  const [excelData, setExcelData] = useState<AttendanceRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null)


  const handleParseExcel = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

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
      console.log("🚀 ~ page.tsx:31 ~ processLateAbsentData ~ sortedData:", sortedData)
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
              
              
              processSingleEntry(singleEntryData)


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
      <input ref={fileInputRef}  type="file" accept=".csv, .xlsx, .xls"  className="file-input file-input-accent" />
      <button onClick={handleParseExcel} className="btn btn-accent">
        Upload Excel
      </button>



      <input ref={fileInputRef}  type="file" accept=".csv, .xlsx, .xls"  className="file-input file-input-secondary" />
      <button onClick={handleParseExcel} className="btn btn-secondary">
        Upload Excel
      </button>


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
