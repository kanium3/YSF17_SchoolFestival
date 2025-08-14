'use client'

import { useEffect, useState } from 'react'
import styles from './bottom-menu.module.css'
import { MdHome, MdOutlineFastfood, MdOutlineArticle } from 'react-icons/md'
import { NavLink, useParams } from 'react-router'

export default function BottomMenu() {
  /*
    activePathの初期化・更新について:
    pathname = "/a/b/c" とすると、
    最初 (レンダリング): b以下があろうと /a に初期化
    その後 (ページ遷移): b以下がない場合に限り /a に更新
  */

  /** @type {string} */
  const pathname = useParams()
  const [activePage, setActivePage] = useState(() => {
    const splitPath = pathname.split('/')
    return '/' + splitPath[1]
  })
  useEffect(() => {
    const splitPath = pathname.split('/')
    if (splitPath.length === 2) {
      setActivePage('/' + splitPath[1])
    }
  }, [pathname])

  const items = [
    { label: '案内', href: '/', Icon: MdHome },
    { label: '食品', href: '/dining', Icon: MdOutlineFastfood },
    { label: '特集', href: '/feature', Icon: MdOutlineArticle },
  ]
  return (
    <footer className={styles['btmenu-base']}>
      <div className={styles['btmenu-blur']} />
      <nav className={styles['btmenu-main']}>
        <ul className={styles['btmenu-list']}>
          {items.map(({ label, href, Icon }) => {
            const isActive = href === activePage
            return (
              <li key={href}>
                <NavLink
                  to={href}
                  className={`${styles['btmenu-item']} ${isActive ? styles['btmenu-item-active'] : styles['btmenu-item-normal']}`}
                >
                  <Icon size={40} className={styles['btmenu-icon']} />
                  <span className={styles['btmenu-label']}>
                    {' '}
                    {label}
                    {' '}
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </footer>
  )
}
