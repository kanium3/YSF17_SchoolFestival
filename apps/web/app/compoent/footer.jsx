import styles from './footer.module.css'
import Link from 'next/link'
import { MdHome, MdOutlineFastfood, MdWysiwyg, MdAccessTime, MdOutlineMap } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className={styles['ft-main']}>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <MdHome size={40} color="black" />
              <div>案内</div>
            </Link>
          </li>
          <li>
            <Link href="/dining">
              <MdOutlineFastfood size={40} color="black" />
              <div>食品</div>
            </Link>
          </li>
          <li>
            <Link href="/program">
              <MdWysiwyg size={40} color="black" />
              <div>企画</div>
            </Link>
          </li>
          <li>
            <Link href="/timetable">
              <MdAccessTime size={40} color="black" />
              <div>時間割</div>
            </Link>
          </li>
          <li>
            <Link href="/map">
              <MdOutlineMap size={40} color="black" />
              <div>地図</div>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
