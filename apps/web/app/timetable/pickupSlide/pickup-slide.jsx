'use client'
import programsData_day1 from '../timetableElements/programsData/programsData_day1.json'
import programsData_day2 from '../timetableElements/programsData/programsData_day2.json'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import styles from './pickup-slide-style.module.css'
import { useState } from 'react'

function shuffle(A) {
  let rep = Array.from({ length: A.length }).map((_, index) => A[index])
  for (const [index, x] of rep.entries()) {
    const r = Math.floor(index + (rep.length - index) * Math.random())
    rep[index] = rep[r]
    rep[r] = x
  }
  return rep
}

export function PickupSlide() {
  // 現在時刻と蒼煌祭開催中かどうかを取得
  const now = new Date()
  const openingTime = new Date('2025-09-06T10:00+09:00')
  const closingTime_day1 = new Date('2025-09-06T15:00+09:00')
  const openingTime_day2 = new Date('2025-09-07T10:00+09:00')
  const closingTime = new Date('2025-09-07T15:00+09:00')
  const state = now < openingTime ? 'unopen' : (now < closingTime ? 'opened' : 'closed')

  // 全てのイベントデータを取得
  let programs_day1 = structuredClone(programsData_day1)
  for (const element of programs_day1) {
    for (let index = 0; index < element.timetable.length; index++) {
      element.timetable[index].programsInfo = element
      element.timetable[index].start = new Date(`2025-09-06T${element.timetable[index].start}+09:00`)
      element.timetable[index].end = new Date(`2025-09-06T${element.timetable[index].end}+09:00`)
    }
  }
  let programs_day2 = structuredClone(programsData_day2)
  for (const element of programs_day2) {
    for (let index = 0; index < element.timetable.length; index++) {
      element.timetable[index].programsInfo = element
      element.timetable[index].start = new Date(`2025-09-07T${element.timetable[index].start}+09:00`)
      element.timetable[index].end = new Date(`2025-09-07T${element.timetable[index].end}+09:00`)
    }
  }
  // 蒼煌祭が始まる前、もしくは終了した後は全てのイベントを各企画からランダムに選択
  // 9月6日の蒼煌祭開催前はday1に行われるイベントを各企画からランダムに選ぶ
  // 蒼煌祭中であれば、始まる時間が現在に近いイベントを各企画から1つずつ選ぶ
  // day1終了後、day2開催前ならday2に行われるイベントを各企画からランダムに選ぶ
  let selectedEvents
  if (state == 'opened') {
    selectedEvents = closingTime_day1 <= now && now <= openingTime_day2
      ? programs_day2.map(x => shuffle(x.timetable.filter(event => event.type == 'event'))[0])
      : [programs_day1, programs_day2][now.getDate() - 6].map(x => x.timetable.find(event => event.type == 'event' && event.start > now))
  }
  else {
    selectedEvents = now.getMonth() == 8 && now.getDate() == 6
      ? programs_day1.map(x => shuffle(x.timetable.filter(event => event.type == 'event'))[0])
      : programs_day1.map(x => shuffle(x.timetable.filter(event => event.type == 'event'))[0])
        // eslint-disable-next-line unicorn/prefer-spread
          .concat(programs_day2.map(x => shuffle(x.timetable.filter(event => event.type == 'event'))[0]))
  }
  selectedEvents = shuffle(selectedEvents)
  const [pickup_index, setPickup_index] = useState(0)
  const [displayEvents] = useState(selectedEvents)
  const move_forward = () => {
    setPickup_index((pickup_index + 1) % displayEvents.length)
  }
  const move_backward = () => {
    setPickup_index((pickup_index + displayEvents.length - 1) % displayEvents.length)
  }
  const now_displayed = displayEvents[pickup_index]
  return (
    <div className={styles.slideBackground}>
      <div className={styles.slide}>
        <p className={`${styles.text} ${styles.time_text}`}>{`${now_displayed.start.getDate() == 6 ? 'DAY1' : 'DAY2'} ${now_displayed.start.getHours()}:${now_displayed.start.getMinutes().toString().padStart(2, '0')}～`}</p>
        <p className={`${styles.text} ${styles.programName}`}>{now_displayed.name}</p>
        <p className={`${styles.text} ${styles.description}`}>{now_displayed.description}</p>
        <p className={`${styles.text} ${styles.team_text}`}>{now_displayed.programsInfo.team}</p>
        <p className={`${styles.text} ${styles.location_text}`}>
          @
          {now_displayed.location}
        </p>
        <p className={`${styles.text} ${styles.hashtag}`}>
          #
          {now_displayed.programsInfo.hashtag}
        </p>
        <button className={`${styles.button} ${styles.backward}`} onClick={move_backward}><MdKeyboardArrowLeft className={styles.icons} /></button>
        <button className={`${styles.button} ${styles.forward}`} onClick={move_forward}><MdKeyboardArrowRight className={styles.icons} /></button>
      </div>
    </div>
  )
}
