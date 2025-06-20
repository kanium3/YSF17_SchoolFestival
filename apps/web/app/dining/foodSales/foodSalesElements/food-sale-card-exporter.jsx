import styles from '../page.module.css'
import Link from 'next/link'

export function FoodSalesCardExporter({
  teamId = 'xxxx',
  team = 'unknown_team',
  name = 'unknown_name',
  menus = [
    {
      name: 'unknown_food',
      price: 500,
      specificIngredients: ['卵', 'りんご'],
      ingredients: ['卵', '米', 'りんご'],
    },
  ],
  key,
}) {
  const NameAndPrices = menus?.map(item => <NameAndPrice name={item.name} price={item.price} key={item.name} />)// メニューを生成してそれを配列化
  const Ingredients = menus?.map(item => <Ingredient name={item.name} specificIngredients={item.specificIngredients} ingredients={item.ingredients} key={item.name} />)// 原材料表示を生成してそれを配列化

  return (
    <div className={styles.foodSalesMenuCard} key={key}>
      <table className={styles.foodSalesMenuBox}>
        <thread>
          <tr>
            <th scope="row" colSpan={3}>
              <p>
                <Link href={`/program/${teamId}`}>{ team }</Link>
                :&nbsp;&nbsp;
                { name }
              </p>
            </th>
          </tr>
        </thread>

        { NameAndPrices }

      </table>
      <div className={styles.line} />
      <details className={styles.ingredients}>
        <summary className={styles.ingredientsSummary}>アレルギー・原材料情報</summary>
        <div className={styles.ingredientsTable}>

          { Ingredients }

        </div>
      </details>
    </div>
  )
}

// 商品名とその価格
export function NameAndPrice({ name, price, key }) {
  return (
    <tbody key={key}>
      <tr>
        <th scope="row" className={styles.foodSalesMenuName}>
          <p className={styles.foodSalesMenuBigChars}>{ name }</p>
        </th>
        <td className={styles.foodSalesMenuName2Price}>
          <p className={styles.foodSalesMenuBigChars}>―</p>
        </td>
        <td className={styles.foodSalesMenuPrice}>
          <p className={styles.foodSalesMenuBigChars}>
            { price }
            円
          </p>
        </td>
      </tr>
    </tbody>
  )
}

// 商品名とその原材料
export function Ingredient({ name, specificIngredients, ingredients, key }) {
  return (
    <table className={styles.foodIngredient} key={key}>
      <tbody>
        <tr>
          <th>{ name }</th>
        </tr>
        <tr>
          <table
            style={{ marginLeft: '0.5em' }}
            className={styles.ingredient}
          >
            <tr>
              <th>特定原材料27品目:</th>
              <td>{ specificIngredients.join('、') }</td>
            </tr>
            <tr>
              <th>原材料名:</th>
              <td><p className={styles.ingredientP}>{ ingredients.join('、') }</p></td>
            </tr>
          </table>
        </tr>
      </tbody>
    </table>
  )
}

/**
 * {/** 例。図形どうしよう  一カード？の塊 }
    <div className={styles.foodSalesMenuCard}>
      <table className={styles.foodSalesMenuBox}>
        <tr>
          <th scope="row" colSpan={3}>
            <p>ここには食販企画名が入るよ</p>
          </th>
        </tr>
        <tr>
          <th scope="row" className={styles.foodSalesMenuName}>
            <p className={styles.foodSalesMenuBigChars}>食べ物名1</p>
          </th>
          <td className={styles.foodSalesMenuName2Price}>
            <p className={styles.foodSalesMenuBigChars}>―</p>
          </td>
          <td className={styles.foodSalesMenuPrice}>
            <p className={styles.foodSalesMenuBigChars}>100円</p>
          </td>
        </tr>
      </table>
      <div className={styles.line}/>
      <details className={styles.ingredients}>
        <summary className={styles.ingredientsSummary}>アレルギー・原材料情報</summary>
        <div className={styles.ingredientsTable}>
          <table>
            <tr>
              <th>食べ物名1</th>
            </tr>
            <tr>
              <table
                style={{ marginLeft: "0.5em" }}
                className={styles.ingredient}
              >
                <tr>
                  <th>特定原材料27品目:</th>
                  <td>卵、りんご</td>
                </tr>
                <tr>
                  <th>原材料名:</th>
                  <td>卵、米、りんご</td>
                </tr>
              </table>
            </tr>
          </table>
        </div>
      </details>
    </div>
 */
