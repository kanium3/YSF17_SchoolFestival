import cafeteriaMenu from '../../cafeteria.mock.json'
import styles from './page.module.css'

export function MenuExporter() {
  return (
    cafeteriaMenu.menus.map(item => (
      <tr key={item.name}>
        <th scope="row" className={styles.priceTable}>
          <ul className={styles.bulletedTable}>
            <li>{item.name}</li>
          </ul>
        </th>
        <td className={styles.priceTable}>
          /
          {item.price}
          円
        </td>
      </tr>
    ),
    )
  )
}
