import * as XLSX from "xlsx";


export const getEmailXLSX = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      resolve(jsonData);
    };
    reader.onerror = () => {
      reject(new Error("Error reading Excel file"));
    };
    reader.readAsArrayBuffer(file);
  });
};