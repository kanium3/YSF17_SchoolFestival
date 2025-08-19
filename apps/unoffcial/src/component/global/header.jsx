import styles from './header.module.css'
import { NavLink } from 'react-router'

/**
 * ヘッダー部分を表示
 * @param {"smartphone" | "PC"} [view="PC"]
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({ view = 'PC' }) {
  if (view === 'PC') {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <NavLink to="/">🐟</NavLink>
        </div>
        <div className={styles.menu}>
          <NavLink to="/dining">食事</NavLink>
          <NavLink to="/feature">特集</NavLink>
        </div>
      </header>
    )
  }
}
