import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import TimeBlockList from '../TimeBlockList.vue'
import type { TimeBlock } from '../../types/TimeBlock'

// axios durch eine Attrappe ersetzen, damit kein echter HTTP-Request rausgeht
vi.mock('axios')

const blocks: TimeBlock[] = [
  { id: 1, personName: 'Alex', dayOfWeek: 'TUESDAY', startTime: '10:00:00', endTime: '12:00:00' },
  { id: 2, personName: 'Luca', dayOfWeek: 'MONDAY', startTime: '11:00:00', endTime: '14:00:00' },
]

describe('TimeBlockList', () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockReset()
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('shows a loading message while the request is running', () => {
    vi.mocked(axios.get).mockReturnValue(new Promise(() => {})) // never resolves
    const wrapper = mount(TimeBlockList)
    expect(wrapper.text()).toContain('Lade Zeitblöcke…')
  })

  it('calls GET /timeblocks on the backend', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: blocks })
    mount(TimeBlockList)
    await flushPromises()
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/timeblocks$/))
  })

  it('renders the blocks grouped by German weekday, Monday first', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: blocks })
    const wrapper = mount(TimeBlockList)
    await flushPromises()

    const days = wrapper.findAll('h3').map((h) => h.text())
    expect(days).toEqual(['Montag', 'Dienstag'])

    const cards = wrapper.findAll('.card')
    expect(cards).toHaveLength(2)
    expect(cards[0]!.text()).toContain('Luca')
    expect(cards[0]!.text()).toContain('11:00–14:00')
    expect(cards[0]!.text()).toContain('belegt')
  })

  it('shows a hint when there are no blocks', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] })
    const wrapper = mount(TimeBlockList)
    await flushPromises()
    expect(wrapper.text()).toContain('Noch keine Zeitblöcke eingetragen.')
  })

  it('shows an error when the backend is not reachable', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'))
    const wrapper = mount(TimeBlockList)
    await flushPromises()
    expect(wrapper.text()).toContain('Backend nicht erreichbar')
    expect(wrapper.text()).not.toContain('Lade Zeitblöcke…')
  })
})
