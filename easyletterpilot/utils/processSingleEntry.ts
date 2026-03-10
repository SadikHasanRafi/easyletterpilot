import { AttendanceRecord } from "@/types/TableTypesI"
import { processEmail } from "./processEmail"





export const processSingleEntry = (singleEntryData: AttendanceRecord[],emailData : {id:string,email:string}[]) => {



    const email:{id:string,email:string} | undefined = emailData.find(m => {
        if (parseInt(m.id) === parseInt(singleEntryData[0].id)) {
            return m
        }
    })
    

    if(email){
        processEmail(singleEntryData,email )
    }

}

