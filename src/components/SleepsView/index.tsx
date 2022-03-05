import { useState, VFC } from "react";
import { showDate } from "../../models/date";
import { Sleep } from "../../models/sleep";
import HeatmapList from "../HeatmapList";
import SleepsList from "../SleepsList";

import styles from "./index.module.css";

const SleepsView: VFC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const [mode, setMode] = useState(0);

  const weeklyKeyFn = (date: Date): string => {
    const base = new Date(sleeps[0].endDate + " ").getTime()
    const weekDur = 1000 * 60 * 60 * 24 * 7;
    const time = ((date.getTime() - base) / weekDur | 0) * weekDur + base
    return showDate(new Date(time)).slice(0, 10)
  }

  return (
    <div>
      <div className={styles.selector}>
        <div className={mode === 0 ? styles.selected : ""} onClick={() => setMode(0)}>daily</div>
        <div className={mode === 1 ? styles.selected : ""} onClick={() => setMode(1)}>weekly</div>
        <div className={mode === 2 ? styles.selected : ""} onClick={() => setMode(2)}>monthly</div>
        <div className={mode === 3 ? styles.selected : ""} onClick={() => setMode(3)}>yearly</div>
      </div>
      {mode === 0 && <SleepsList sleeps={sleeps} />}
      {mode === 1 && <HeatmapList sleeps={sleeps} keyFn={weeklyKeyFn} />}
      {mode === 2 && <HeatmapList sleeps={sleeps} keyFn={date => showDate(date).slice(0, 7)} />}
      {mode === 3 && <HeatmapList sleeps={sleeps} keyFn={date => showDate(date).slice(0, 4)} />}
    </div>
  );
};

export default SleepsView;
