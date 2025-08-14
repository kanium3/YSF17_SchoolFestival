import styles from '../page.module.css'
import { foodSalesMenu } from './food-sales-menus'
import { FoodSalesCardExporter } from './food-sales-card-exporter'

export function FoodSalesAllergiesFilter(allergies = []) {
  // 頑張って指定されたアレルゲンが入ってないやつだけ取り出してる
  let menus = foodSalesMenu()

  let safemenus = []
  if (allergies.allergies.length > 0) {
    for (let allergy of allergies.allergies) {
      // それぞれのクラスのメニュー
      let okclassmenu = []
      if (safemenus.length === 0) {
        for (let menu of menus) {
          // そのクラスのメニュー一つ一つ
          let okmenu = []

          for (let classmenu of menu.menus) {
            if (classmenu.specificIngredients.includes(allergy) == false)
              okmenu.push(classmenu)
          }
          menu.menus = okmenu
          okclassmenu.push(menu)
        }
        safemenus.push(okclassmenu)
      }
      else {
        for (let menu of menus) {
          // そのクラスのメニュー一つ一つ
          let okmenu = []
          for (let classmenu of menu.menus) {
            if (classmenu.specificIngredients.includes(allergy) == false)
              okmenu.push(classmenu)
          }
          menu.menus = okmenu
          okclassmenu.push(menu)
        }
        safemenus.push(okclassmenu)
      }
    }
  }
  else safemenus = foodSalesMenu()

  let safeCards
  safeCards = allergies.allergies.length > 0 ? safemenus[0].map(item => <FoodSalesCardExporter cardData={item} filteringSubstances={allergies.allergies} key={item.name} />) : safemenus.map(item => <FoodSalesCardExporter cardData={item} filteringSubstances={allergies.allergies} key={item.name} />)

  return (
    <div>
      {/** アレルギー物質を「含まない」やつ */}
      <div id="foodSaleMenus" className={styles.foodSalesMenuArea}>
        { safeCards }
      </div>
    </div>
  )
}
