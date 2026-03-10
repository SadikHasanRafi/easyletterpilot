import { AttendanceRecord } from "@/types/TableTypesI";

export const processEmail = (singleData: AttendanceRecord[], emailData: { id: string; email: string }) => {
  // console.log("🚀 ~ processSingleEntry ~ singleEntryData:", singleData)

  singleData.map((data) => {
    switch (data.status) {
        case "absent":
          console.log("🚀 ~ processEmail.ts:8 ~ processEmail ~ data:", data)
        
        break;

      case "casual leave":
                  console.log("🚀 ~ processEmail.ts:8 ~ processEmail ~ data:", data)

        break;

      case "late":
          console.log("🚀 ~ processEmail.ts:8 ~ processEmail ~ data:", data)

      break;

      case "not applied yet":
          console.log("🚀 ~ processEmail.ts:8 ~ processEmail ~ data:", data)

      break;

      case "sick leave":
          console.log("🚀 ~ processEmail.ts:8 ~ processEmail ~ data:", data)

      break;

      default:
        break;
    }
  });
};
