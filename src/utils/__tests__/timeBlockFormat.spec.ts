import { describe, it, expect } from 'vitest'
import { formatDay, formatTime, formatTimeRange, groupByDay } from '../timeBlockFormat'
import type { TimeBlock } from '../../types/TimeBlock'

describe('formatDay', () => {
  it('translates the day to German', () => {
    expect(formatDay('MONDAY')).toBe('Montag')
    expect(formatDay('SUNDAY')).toBe('Sonntag')
  })
})

describe('formatTime', () => {
  it('cuts off the seconds', () => {
    expect(formatTime('10:00:00')).toBe('10:00')
    expect(formatTime('09:30:00')).toBe('09:30')
  })

  it('keeps times without seconds unchanged', () => {
    expect(formatTime('10:00')).toBe('10:00')
  })
})

describe('formatTimeRange', () => {
  it('joins start and end with a dash', () => {
    expect(formatTimeRange('10:00:00', '12:00:00')).toBe('10:00–12:00')
  })
})

describe('groupByDay', () => {
  const blocks: TimeBlock[] = [
    {
      id: 1,
      personName: 'Alex',
      dayOfWeek: 'WEDNESDAY',
      startTime: '10:00:00',
      endTime: '12:00:00',
    },
    { id: 2, personName: 'Luca', dayOfWeek: 'MONDAY', startTime: '14:00:00', endTime: '15:00:00' },
    { id: 3, personName: 'Sara', dayOfWeek: 'MONDAY', startTime: '09:00:00', endTime: '10:00:00' },
  ]

  it('returns only days with entries, ordered Monday to Sunday', () => {
    const groups = groupByDay(blocks)
    expect(groups.map((g) => g.day)).toEqual(['MONDAY', 'WEDNESDAY'])
  })

  it('sorts the blocks of a day by start time', () => {
    const monday = groupByDay(blocks)[0]!
    expect(monday.blocks.map((b) => b.id)).toEqual([3, 2])
  })

  it('returns an empty list for no blocks', () => {
    expect(groupByDay([])).toEqual([])
  })

  it('does not change the input array', () => {
    const copy = [...blocks]
    groupByDay(blocks)
    expect(blocks).toEqual(copy)
  })
})
