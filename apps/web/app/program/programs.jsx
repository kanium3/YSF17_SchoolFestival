'use client'

import ProgramInput from '@/app/program/program/program-input.jsx'
import ProgramView from '@/app/program/program/program-view.jsx'
import styles from '@/app/program/programs.module.css'
import { SearchModal } from '@/app/program/program/search-modal.jsx'
import SearchQueryClearButton from '@/app/program/program/search-query-reset.jsx'

/**
 * @returns {JSX.Element}
 * @constructor
 */
export function ProgramsView() {
  return (
    <div>
      <ProgramInput />
      <div className={styles.programSearchLine}>
        <div className={styles.programSearchResetButtonContentDiv}>
          <SearchQueryClearButton />
        </div>
        <SearchModal />
      </div>
      <ProgramView />
    </div>
  )
}
