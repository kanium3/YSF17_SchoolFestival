import foodMenus from '../../../foodSales.mock.json'
import programs from '../../../program.mock.json'

export function foodSalesMenu() {
  return foodMenus.map((item) => {
    return {
      teamId: item.id,
      team: programs.find(pItem => pItem.id == item.id).team,
      name: programs.find(pItem => pItem.id == item.id).name,
      menus: item.menus,
    }
  })
}
