import styles from '../page.module.css'
import { foodSalesMenu } from './food-sales-menus.js'
import { FoodSalesCardExporter } from './food-sale-card-exporter.jsx'

export function FoodSalesAllergiesFilter({ _allergies = [] }) {
  const saleMenu = foodSalesMenu()
  return (
    // とりあえずそのまま横流し
    <div>
      {/** アレルギー物質を「含まない」やつ */}
      <div id="foodSaleMenus" className={styles.foodSalesMenuArea}>
        {saleMenu.map((item) => {
          return <FoodSalesCardExporter name={item.name} team={item.team} menus={item.menus} teamId={item.teamId} key={item.name} />
        })}
      </div>
      {/** 下はアレルギー物質を「含む」やつ */}
      <div id="foodSaleMenus" className={styles.foodSalesMenuArea}>

      </div>
    </div>
  )
}
