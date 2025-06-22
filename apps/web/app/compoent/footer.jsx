"use client"

import { useState } from "react"
import styles from "./footer.module.css"
import Link from "next/link"
import { MdHome, MdOutlineFastfood, MdWysiwyg, MdAccessTime, MdOutlineMap } from "react-icons/md"

function createIcon(Icon) {
  return <Icon size={40} className={styles["ft-icon"]} />;
}

export default function Footer(){
  const [activePage, setActivePage] = useState(null);
  const items = [
    { label: "案内",   href: "/",          icon: MdHome },
    { label: "食品",   href: "/dining",    icon: MdOutlineFastfood },
    { label: "企画",   href: "/program",   icon: MdWysiwyg },
    { label: "時間割", href: "/timetable", icon: MdAccessTime },
    { label: "地図",   href: "/map",       icon: MdOutlineMap }
  ];
  return (
    <footer className={styles["ft"]}>
      <div className={styles["ft-blur"]}/>
      <nav className={styles["ft-main"]}>
        <ul className={styles["ft-list"]}>
          {items.map(({ label, href, icon}) => {
            const isActive = href === activePage;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setActivePage(href)}
                  className={`${styles["ft-item"]} ${isActive ? styles["ft-item-active"] : styles["ft-item-normal"]}`}
                >
                  {createIcon(icon)}
                  <div className={styles["ft-label"]}> {label} </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  )
}
