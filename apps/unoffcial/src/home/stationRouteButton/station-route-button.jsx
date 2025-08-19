import { NavLink } from 'react-router'
import { MdOutlineOpenInNew } from 'react-icons/md'
import styles from './station-route-button.module.css'

//  何に分類されるか分からないので一旦ここで実装します
export default function RouteToStationButton({ link }) {
  return (
    <NavLink href={link} target="_blank">
      <div className={styles.button}>
        経路
        <MdOutlineOpenInNew className={styles.icon} />
      </div>
    </NavLink>
  )
}
