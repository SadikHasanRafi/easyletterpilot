import { AttendanceRecord } from "@/types/TableTypesI";
import { generateTable } from "./generateTable";




export const processEmail = (singleData: AttendanceRecord[], emailData: { id: string; email: string }) => {


      const report : {
      absentTable:string,
      sickLeave:string,
      notAppliedYet:string,
      lateTable:string,
      casualLeave:string
    } = {
      absentTable:"", sickLeave:"", notAppliedYet:"", lateTable:"",casualLeave:""
    }


  singleData.map((data) => {

    
    switch (data.status) {
      
      case "absent":
        report.absentTable = generateTable(
          singleData,
          [
            { key: "date", label: "Date" },
            { key: "department", label: "Department" },
            { key: "posting", label: "Posting" },
            { key: "division", label: "Division" },
          ],
          "Absent",
        );

        console.log(report.absentTable);
        break;

      case "casual leave":
         report.casualLeave = generateTable(
          singleData,
          [
            { key: "date", label: "Date" },
            { key: "department", label: "Department" },
            { key: "posting", label: "Posting" },
            { key: "division", label: "Division" },
          ],
          "Casual Leave",
        );

        console.log(report.casualLeave);

        break;

      case "late":
         report.lateTable = generateTable(
          singleData,
          [
            { key: "date", label: "Date" },
            { key: "inTime", label: "In Time" },
            { key: "department", label: "Department" },
            { key: "posting", label: "Posting" },
            { key: "division", label: "Division" },
          ],
          "Late Attendance",
        );

        console.log(report.lateTable);

        break;
      
      case "not applied yet":
         report.notAppliedYet = generateTable(
          singleData,
          [
            { key: "date", label: "Date" },
            { key: "department", label: "Department" },
            { key: "posting", label: "Posting" },
            { key: "division", label: "Division" },
          ],
          "Not Applied Yet",
        );

        console.log(report.notAppliedYet);

        break;

      case "sick leave":
         report.sickLeave = generateTable(
          singleData,
          [
            { key: "date", label: "Date" },
            { key: "department", label: "Department" },
            { key: "posting", label: "Posting" },
            { key: "division", label: "Division" },
          ],
          "Sick Leave",
        );

        console.log(report.sickLeave);

        break;

      default:
      
      break;
    }
  });

  return report
};
