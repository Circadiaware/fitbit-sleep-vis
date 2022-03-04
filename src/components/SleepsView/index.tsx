import { useState, VFC } from "react";
import { Sleep } from "../../models/sleep";
import Heatmap from "../heatmap";
import SleepsList from "../SleepsList";

import styles from "./index.module.css";

const SleepsView: VFC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const [mode, setMode] = useState(0);
  return (
    <div>
      <div className={styles.selector}>
        <div className={mode === 0 ? styles.selected : ""} onClick={() => setMode(0)}>daily</div>
        <div className={mode === 1 ? styles.selected : ""} onClick={() => setMode(1)}>weekly</div>
        <div className={mode === 2 ? styles.selected : ""} onClick={() => setMode(2)}>monthly</div>
        <div className={mode === 3 ? styles.selected : ""} onClick={() => setMode(3)}>yearly</div>
      </div>
      {mode === 0 && <SleepsList sleeps={sleeps} />}
      {mode === 1 && <Heatmap sleeps={sleeps} />}
    </div>
  );
};

export default SleepsView;