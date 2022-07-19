import React, { useState } from "react";
import styles from "./GameResultsForm.module.sass";
import { PlayerPostBattleState } from "./GameResultsForm";

interface PlayerRowType {
  player: PlayerPostBattleState;
  keyItem: number;
  scrollY: number;
  addRemoveFriend: (id: number, friend: boolean) => Promise<void>;
}

export const PlayerRow = ({
  player,
  keyItem,
  addRemoveFriend,
  scrollY,
}: PlayerRowType) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const ref = React.createRef<HTMLDivElement>();

  const focusEnterHendler = (e: React.SyntheticEvent<EventTarget>) => {
    setShowTooltip(true);
    ref.current?.offsetTop && setTop(ref.current.offsetTop - scrollY + 25);
  };
  const focusLeaveHendler = (e: React.SyntheticEvent<EventTarget>) => {
    setShowTooltip(false);
  };

  return (
    <div onMouseEnter={focusEnterHendler} onMouseLeave={focusLeaveHendler}>
      <div
        className={player.state ? styles.row : styles.rowDeth}
        key={player.id}
        ref={ref}
      >
        <div
          className={player.friend ? styles.labelFriend : styles.label}
          key={player.id + "1"}
        >
          {keyItem + 1} {player.nickname}
        </div>
        <div
          className={player.friend ? styles.labelFriend : styles.label}
          key={player.id + "2"}
        >
          {player.scores}
        </div>
      </div>
      {showTooltip && (
        <div className={styles.tooltip} style={{ top: top }}>
          <div>
            <b>
              <u>{player.nickname}</u>
            </b>
          </div>
          <div>
            <u>Last battle:</u>
          </div>
          <div>battle - {player.winner ? "win" : "lost"}</div>
          <div>state - {player.state ? "alive" : "dead"}</div>
          <div>scores - {player.scores}</div>
          <div>kills - {player.kills}</div>
          <div>deaths - {player.deaths}</div>
          <hr />
          <div>
            <u>All battles:</u>
          </div>
          <div>fights - {player.fights}</div>
          <div>victories - {player.victories}</div>
          <div>
            winrate - {(player.victories / (player.fights / 100)).toFixed(2)}%
          </div>
          <div>
            <button
              className={styles.btnSubmit}
              type="button"
              onClick={() => addRemoveFriend(player.id, player.friend)}
            >
              {player.friend ? "Remove from friends" : "Friend request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
