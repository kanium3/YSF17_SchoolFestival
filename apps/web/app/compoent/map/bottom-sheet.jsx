import styles from './bottom-sheet.module.css'

export default function BottomSheet({ ids, onClose }) {
  return (
    <div className={`${styles['bottom-sheet']} ${ids.length > 0 ? styles['open'] : ''}`}>
      {ids && (
        <>
          <div className="bottom-sheet-header">
            <button onClick={onClose}>閉じる</button>
          </div>
          <div className="bottom-sheet-content">
            <p>{ids.join(', ')}</p>
          </div>
        </>
      )}
    </div>
  )
}
