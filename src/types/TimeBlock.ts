export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY' //Uniontype: TypeScript-Gegenstück zum Java-Enum

export interface TimeBlock {
  id: number
  personName: string
  dayOfWeek: DayOfWeek
  startTime: string // kommt im JSON als "10:00:00" (Java LocalTime)
  endTime: string
}
