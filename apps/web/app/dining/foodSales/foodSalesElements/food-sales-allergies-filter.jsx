import styles from '../page.module.css';
import { foodSalesMenu } from './food-sales-menus';
import { FoodSalesCardExporter } from './food-sale-card-exporter';

export function FoodSalesAllergiesFilter(_allergies = []) {
  const Cards = foodSalesMenu().map(item => <FoodSalesCardExporter cardData={item}/>);
  return (
    // とりあえずそのまま横流し
    <div>
      {/** アレルギー物質を「含まない」やつ */}
      <div id='foodSaleMenus' className={styles.foodSalesMenuArea}>
        { Cards }
      </div>
      {/** 下はアレルギー物質を「含む」やつ */}
      <div id='foodSaleMenus' className={styles.foodSalesMenuArea}>
        
      </div>
    </div>
  )
}
