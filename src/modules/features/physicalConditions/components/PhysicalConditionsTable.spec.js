import { mount } from '@vue/test-utils'
import PhysicalConditionsTable from './PhysicalConditionsTable.vue'

describe('PhysicalConditionsTable.vue', () => {
  it('renders physical conditions', () => {
    const physicalConditions = [
      {
        id: '1',
        attributes: {
          name: 'Test Condition 1',
          description: 'Test Description 1'
        }
      },
      {
        id: '2',
        attributes: {
          name: 'Test Condition 2',
          description: 'Test Description 2'
        }
      }
    ]

    const wrapper = mount(PhysicalConditionsTable, {
      props: {
        physicalConditions
      }
    })

    const tableRows = wrapper.findAll('tbody > tr')
    expect(tableRows.length).toBe(physicalConditions.length)

    physicalConditions.forEach((condition, index) => {
      const row = tableRows[index]
      expect(row.text()).toContain(condition.attributes.name)
      expect(row.text()).toContain(condition.attributes.description)
    })
  })
})