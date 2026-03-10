import { AttendanceRecord } from "@/types/TableTypesI";
import * as XLSX from 'xlsx';



function excelDateToJSDate(serial: number) {
  const excelEpoch = new Date(1899, 11, 30)
  const date = new Date(excelEpoch.getTime() + serial * 86400000)
  return date.toISOString().split("T")[0]
}



function excelTimeToString(value: number) {
  const totalSeconds = Math.round(value * 24 * 60 * 60)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`
}





function makeLowerCase(str: string) {
  
  return str ? String(str).toLowerCase() : "";
}

//eslint-disable-next-line
function transformRow(row: any): AttendanceRecord {
  return {
    date: excelDateToJSDate(row["Date"]),
    status: makeLowerCase(row["Status"]),
    id: String(row["ID"]),
    name: row["NAME"],
    department: row["DEPARTMENT"],
    posting: row["POSTING"],
    inTime: excelTimeToString(row["IN-TIME"]),
    division: row["Division"]
  }
}






export const getXLSXData = (file: File): Promise<AttendanceRecord[]> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve([]);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const bufferArray = e.target?.result;
        if (!bufferArray) throw new Error("No data found in file");

        const workbook = XLSX.read(bufferArray, { type: "array" }); // browser needs 'array'
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: AttendanceRecord[] = XLSX.utils
          .sheet_to_json(worksheet)
          .map(transformRow);

        resolve(jsonData.length ? jsonData : []);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
};



