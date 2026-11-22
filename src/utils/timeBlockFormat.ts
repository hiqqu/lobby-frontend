import type { DayOfWeek, TimeBlock } from '../types/TimeBlock'

// Reihenfolge der Wochentage (Mo–So) und ihre deutschen Namen
export const DAYS_IN_ORDER: DayOfWeek[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

const GERMAN_DAY_NAMES: Record<DayOfWeek, string> = {
  MONDAY: 'Montag',
  TUESDAY: 'Dienstag',
  WEDNESDAY: 'Mittwoch',
  THURSDAY: 'Donnerstag',
  FRIDAY: 'Freitag',
  SATURDAY: 'Samstag',
  SUNDAY: 'Sonntag',
}

export interface DayGroup {
  day: DayOfWeek
  blocks: TimeBlock[]
}

// 'MONDAY' -> 'Montag'
export function formatDay(day: DayOfWeek): string {
  return GERMAN_DAY_NAMES[day]
}

// '10:00:00' -> '10:00'
export function formatTime(time: string): string {
  return time.slice(0, 5)
}

// ('10:00:00', '12:00:00') -> '10:00–12:00'
export function formatTimeRange(start: string, end: string): string {
  return formatTime(start) + '–' + formatTime(end)
}

// Gruppiert die Blöcke nach Wochentag (Mo–So), nur Tage mit Einträgen,
// innerhalb eines Tages nach Startzeit sortiert.
export function groupByDay(blocks: TimeBlock[]): DayGroup[] {
  return DAYS_IN_ORDER.map((day) => ({
    day,
    blocks: blocks
      .filter((block) => block.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  })).filter((group) => group.blocks.length > 0)
}
