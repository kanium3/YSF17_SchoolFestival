'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '../page.module.css'
import Link from 'next/link'
import foodMenus from '../../../foodSales.mock.json'

/* eslint-disable-next-line unicorn/no-object-as-default-parameter */
export function FoodSalesCardExporter(cardData_filteringSubstances = {
  cardData: {
    teamId: 'xxxx',
    team: 'unknown_team',
    name: 'unknown_name',
    menus: [
      {
        name: 'unknown_food',
        price: 500,
        specificIngredients: ['卵', 'りんご'],
        ingredients: ['卵', '米', 'りんご'],
      },
    ],
  },
  filteringSubstances: ['小麦'],
}) { // , removedCount
  /* eslint-disable-next-line react/jsx-key */
  const NameAndPrices = cardData_filteringSubstances.cardData.menus?.map(item => <NameAndPrice menu={item} filteringSubstances={cardData_filteringSubstances.filteringSubstances} keys={item.name} />)// メニューを生成してそれを配列化
  /* eslint-disable-next-line react/jsx-key */
  const Ingredients = cardData_filteringSubstances.cardData.menus?.map(item => <Ingredient menu={item} />)// 原材料表示を生成してそれを配列化

  // 除外された数を計算
  const menuCount = foodMenus.find(item => item.id == cardData_filteringSubstances.cardData.teamId).menus.length
  const gavemenuCount = cardData_filteringSubstances.cardData.menus.length

  return (
    <div className={styles.foodSalesMenuCard}>
      <p className={styles.foodSalesMenuTitle}>
        <Link href={`/program/${cardData_filteringSubstances.cardData.teamId}`}>{cardData_filteringSubstances.cardData.team}</Link>
        :&nbsp;&nbsp;
        {cardData_filteringSubstances.cardData.name}
      </p>
      <table className={styles.foodSalesMenuBox}>
        {/** <thread>
          <tr>
            <th scope="row" colSpan={2}>
              <p>
                <Link href={`/program/${cardData_filteringSubstances.cardData.teamId}`}>{cardData_filteringSubstances.cardData.team}</Link>
                :&nbsp;&nbsp;
                {cardData_filteringSubstances.cardData.name}
              </p>
            </th>
          </tr>
        </thread> */}

        {NameAndPrices}

      </table>
      {/** 「合計」を入れることで品目の「目」で「nつ目の品目」と見えることを防ぐ */}
      { cardData_filteringSubstances.filteringSubstances.length > 0 ? <p style={{ textAlign: 'end', paddingRight: '1em' }}>{cardData_filteringSubstances.filteringSubstances.length > 0 ? `合計${menuCount - gavemenuCount}つの品目が除外されました` : ''}</p> : <></>}
      <div className={styles.line} />
      <details className={styles.ingredients}>
        <summary className={styles.ingredientsSummary}>アレルギー・原材料情報</summary>
        <div className={styles.ingredientsTable}>
          {Ingredients}
        </div>
      </details>
    </div>
  )
}

// 商品名とその価格
// スマホの画面の回転のような再読み込みせずに画面幅が変わるようなことがあっても再描画されないので、レイアウトが崩れる可能性はある
export function NameAndPrice(menu_filteringSubstances) {
  const bodyReference = useRef(null)

  const [defaultDisplay, setDefaultDisplay] = useState('table-cell')

  useEffect(() => {
    const emSize = globalThis.getComputedStyle(document.documentElement).fontSize
    if (bodyReference.current.offsetHeight > 2.5 * Number.parseInt(emSize)) {
      // いらないやつをuseStateでdisplay: noneにしたい
      setDefaultDisplay('none')
    }
  }, [menu_filteringSubstances.filteringSubstances])

  return (
    <tbody>
      <tr ref={bodyReference}>
        <th scope="row" style={{ display: `${menu_filteringSubstances.filteringSubstances.length > 0 ? 'table-cell' : 'none'}` }} className={styles.foodSalesMenuSign}>
          <span className={styles.foodSalesMenuBigChars} style={{ borderRight: ' #000000 solid 1px', paddingRight: '0.25em' }}>{ArrayArrayMach(menu_filteringSubstances.menu.mayContain, menu_filteringSubstances.filteringSubstances) ? '△' : 'ー'}</span>
        </th>
        <td scope="row" className={menu_filteringSubstances.filteringSubstances.length > 0 ? styles.foodSalesMenuNameAllergy : styles.foodSalesMenuNameNormal} colSpan={defaultDisplay == 'table-cell' ? 2 : 3}>
          <p className={styles.foodSalesMenuBigChars}>{menu_filteringSubstances.menu.name}</p>
        </td>
        <td className={styles.foodSalesMenuName2Price} style={{ display: `${defaultDisplay}` }}>
          <p className={styles.foodSalesMenuBigChars}>―</p>
        </td>
        <td className={styles.foodSalesMenuPrice} style={{ display: `${defaultDisplay}` }}>
          <p className={styles.foodSalesMenuBigChars}>
            {menu_filteringSubstances.menu.price}
            円
          </p>
        </td>
      </tr>
      <tr style={{ display: `${defaultDisplay == 'table-cell' ? 'none' : 'table-row'}` }}>
        {/** <th className={styles.foodSalesSpaceFor2Rows} colSpan={2}>
          {/** 空けとく空間 /}
        </th> */}
        <td className={styles.foodSalesMenuName2PriceWithSecondRow} style={{ display: `${defaultDisplay == 'table-cell' ? 'none' : 'table-cell'}` }} colSpan={2}>
          <p className={styles.foodSalesMenuBigChars}>―</p>
        </td>
        <td className={styles.foodSalesMenuPrice} style={{ display: `${defaultDisplay == 'table-cell' ? 'none' : 'table-cell'}` }}>
          <p className={styles.foodSalesMenuBigChars}>
            {menu_filteringSubstances.menu.price}
            円
          </p>
        </td>
      </tr>
    </tbody>
  )
}

// 商品名とその原材料
export function Ingredient(menu) {
  return (
    /** <table className={styles.foodIngredient}>
      <tbody>
      <tr>
        <th>{ menu.menu.name }</th>
      </tr>
      <tr>
        <table
          style={{ marginLeft: "0.5em" }}
          className={styles.ingredient}
        >
          <tr>
            <th className={styles.ingredientTitle}>特定原材料27品目:</th>
            <td>{ menu.menu.specificIngredients.join("、") }</td>
          </tr>
          <tr>
            <th className={styles.ingredientTitle}>原材料名:</th>
            <td className={styles.ingredientTd}><p className={styles.ingredientP}>{ menu.menu.ingredients.join("、ああああああああああ") }</p></td>
          </tr>
        </table>
      </tr>
      </tbody>
    </table> */
    <div className={`${styles.foodIngredient} ${styles.divtable}`}>
      <p className={styles.ingredientFoodName}>{menu.menu.name}</p>
      <div className={`${styles.ingredientTable} ${styles.divtable}`} style={{ marginLeft: '0.5em' }}>

        <div className={styles.ingredientTitle}>特定原材料27品目:</div>
        <div>{menu.menu.specificIngredients.join('、')}</div>

        <div className={styles.ingredientTitle}>原材料名:</div>
        <div className={styles.ingredientTd}><p className={styles.ingredientP}>{ConstructingIngreadients(menu.menu)}</p></div>{/** {menu.menu.ingredients.join('、')}</p></div> */}

      </div>
    </div>
  )
}

function ConstructingIngreadients(property) {
  let ingredients = property.ingredients.map(item => (
    {
      name: item,
      compositeIngredients: [],
    }
  ))

  // 原材料で複合原材料のやつはそれを関連付ける
  for (let index of ingredients) {
    if (property.compositeIngredients.includes(item => item.name == index.name)) {
      index.compositeIngredients.push(property.compositeIngredients.find(item => item.name == index.name))
    }
    console.log(property.compositeIngredients[0])
    console.log(index)
  }

  // 文字の配列に成形
  const result = ConstructingIngreadients2string(ingredients)
  return result
  // const result = ingredients.map(item => `${item.name}${item.compositeIngredients.length > 0 ? `(${})`: ""}`)
}

function ConstructingIngreadients2string(property) {
  return property.map(item => (item.compositeIngredients.length > 0 ? `(${ConstructingIngreadients2string(item.compositeIngredients)})` : `${item.name}`)).join('、')
}

function ArrayArrayMach(a1, a2) {
  let mach = false
  for (let a1content of a1) {
    if (a2.includes(a1content))
      mach = true
  }

  return mach
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
