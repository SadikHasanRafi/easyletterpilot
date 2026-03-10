import { AttendanceRecord } from "@/types/TableTypesI";

export const sortUniqueData = (data: AttendanceRecord[] ): AttendanceRecord[] => {
  data.sort((a, b) => {
    const idA = parseInt(a.id);
    const idB = parseInt(b.id);
    return idA - idB
  })
  return data
}