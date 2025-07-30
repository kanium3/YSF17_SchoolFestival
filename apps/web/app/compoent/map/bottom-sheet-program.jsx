import Image from 'next/image'
import styles from './bottom-sheet-program.module.css'

export default function BottomSheetProgram({ program }) {
  if (!program) return (
    <></>
  )
  return (
    <div className={styles['btstp']}>
      <Image
        alt={program.name + 'のPR画像'}
        height={240}
        width={240}
        src={program.options.imagePath ?? '1_1_latimeria logo for no-image_white.png'}
      />
      <p>{program.prText}</p>
    </div>
  )
}
