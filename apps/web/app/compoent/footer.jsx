"use client"

import { useState } from "react"
import styles from "./footer.module.css"
import Link from "next/link"
import { MdHome, MdOutlineFastfood, MdWysiwyg, MdAccessTime, MdOutlineMap } from "react-icons/md"


export default function Footer(){
  const [activePage, setActivePage] = useState(null);
  const items = [
    { label: "案内",   href: "/",          Icon: MdHome },
    { label: "食品",   href: "/dining",    Icon: MdOutlineFastfood },
    { label: "企画",   href: "/program",   Icon: MdWysiwyg },
    { label: "時間割", href: "/timetable", Icon: MdAccessTime },
    { label: "地図",   href: "/map",       Icon: MdOutlineMap }
  ];
  return (
    <footer className={styles["ft"]}>
      <div className={styles["ft-blur"]}/>
      <nav className={styles["ft-main"]}>
        <ul className={styles["ft-list"]}>
          {items.map(({ label, href, Icon}) => {
            const isActive = href === activePage;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setActivePage(href)}
                  className={`${styles["ft-item"]} ${isActive ? styles["ft-item-active"] : styles["ft-item-normal"]}`}
                >
                  <Icon size={40} className={styles["ft-icon"]} />
                  <span className={styles["ft-label"]}> {label} </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  )
}
