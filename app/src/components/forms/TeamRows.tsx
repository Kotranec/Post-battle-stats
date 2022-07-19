import React, { useState } from "react";
import { PlayerRow } from "./PlayerRow";
import { PlayerPostBattleState } from "./GameResultsForm";
import styles from "./GameResultsForm.module.sass";

interface TeamRowsType {
  team: PlayerPostBattleState[];
  addRemoveFriend: (id: number, friend: boolean) => Promise<void>;
}

export const TeamRows = ({ team, addRemoveFriend }: TeamRowsType) => {
  const [scrollY, setScrollY] = useState<number>(0);
  const a = (element: any) => {
    setScrollY(element.currentTarget.scrollTop);
  };

  return (
    <div className={styles.table} onScroll={a}>
      {team.map((item: PlayerPostBattleState, i: number) => {
        return (
          <PlayerRow
            player={item}
            keyItem={i}
            scrollY={scrollY}
            addRemoveFriend={addRemoveFriend}
          />
        );
      })}
    </div>
  );
};
