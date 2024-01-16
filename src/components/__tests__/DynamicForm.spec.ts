import { describe, it, expect, vi } from 'vitest'

import { shallowMount, flushPromises } from '@vue/test-utils'
import DynamicForm from '@/components/DynamicForm.vue'
import type {Thing} from '@/types'
import axios from 'axios'

describe('DynamicForm', () => {
  const emptyResponse: Thing[] = []
  const twoItemResponse: Thing[] = [
    { id: 1, name: 'Schere', price: 42, owner: 'arif.wider@htw-berlin.de' },
    { id: 2, name: 'Messer', price: 13, owner: 'arif.wider@htw-berlin.de' }
  ]

  vi.mock('axios')
  vi.mock('@okta/okta-vue')

  it('should render the title passed to it', () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

    const title = 'This is a title!'
    const wrapper = shallowMount(DynamicForm, {
      props: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('should render the items from the backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoItemResponse })

    const item = twoItemResponse[0].name
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(item)
  })

  it('should render message when no items received from backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

    const msg = 'No products yet'
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(msg)
  })
})
