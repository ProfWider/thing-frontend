import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DynamicForm from '@/components/DynamicForm.vue'

describe('DynamicForm', () => {
  it('renders properly', () => {
    const wrapper = mount(DynamicForm, { props: { title: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
