'use client'

import { useState, useEffect } from 'react'
import { MdClose, MdUnfoldMore, MdUnfoldLess } from 'react-icons/md'

import styles from './bottom-sheet.module.css'
import ProgramSample from '@/app/program.mock.json'
import { parseProgramsData, solveBasePath } from '@/app/lib/index.js'

/**
 * @param {string[]} ids
 */
export default function BottomSheet({ ids, onClose }) {
  const [opened, setOpened] = useState(false)
  const [selectedId, setSelectedId] = useState(ids ? ids[0] : undefined)
  useEffect(() => {
    setSelectedId(undefined)
  }, [ids])
  const programs = parseProgramsData(ProgramSample)
  return (
    <div className={`${styles['btst']} ${ids.length > 0 ? (opened ? styles['open'] : styles['small']) : styles['none']}`}>
      <div className={styles['btst-header']}>
        <div onClick={() => setOpened(!opened)} className={styles['btst-fold']}>
          {opened
            ? <MdUnfoldLess size={30} />
            : <MdUnfoldMore size={30} />}
        </div>
        <div
          onClick={() => {
            onClose()
            setOpened(false)
          }}
          className={styles['btst-close']}
        >
          <MdClose size={30} />
        </div>
      </div>
      <div>
        {ids.map((id) => {
          const program = [...programs.iter()].find(program => program.id === id)
          if (!program) return (
            <></>
          )
          return (
            <div onClick={() => setSelectedId(id)} key={id}>
              {program.name}
            </div>
          )
        })}
      </div>
      <div>
        {selectedId && (
          <div>
            {[...programs.iter()].find(program => program.id === selectedId).prText}
          </div>
        )}
      </div>
    </div>
  )
}
