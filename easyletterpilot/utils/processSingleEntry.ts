import { AttendanceRecord } from "@/types/TableTypesI"





export const processSingleEntry = (singleEntryData: AttendanceRecord[],emailData : {id:string,email:string}[]) => {



    const email:{id:string,email:string} | undefined = emailData.find(m => {
        if (parseInt(m.id) === parseInt(singleEntryData[0].id)) {
            return m
        }
    })
    console.log("🚀 ~ processSingleEntry.ts:16 ~ processSingleEntry ~ email:",email && email.email)


}

