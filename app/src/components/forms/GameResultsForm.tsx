import React, { useState, useEffect } from "react";
import { TeamRows } from "./TeamRows";
import styles from "./GameResultsForm.module.sass";

export type PlayerPostBattleState = {
  id: number;
  nickname: string;
  scores: number;
  state: boolean;
  kills: number;
  deaths: number;
  winner: boolean;
  friend: boolean;
  fights: number;
  victories: number;
};

export const GameResultsForm = () => {
  const [players, setPlayers] = useState<PlayerPostBattleState[]>([]);
  const [scoreFirstTeam, setScoreFirstTeam] = useState<number>(0);
  const [scoreSecondTeam, setScoreSecondTeam] = useState<number>(0);

  const getPlayers = async () => {
    const response = await fetch("http://localhost:8080/api/next-battle", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    setPlayers([...jsonResponse]);
    jsonResponse[0].winner
      ? setScoreFirstTeam(scoreFirstTeam + 1)
      : setScoreSecondTeam(scoreSecondTeam + 1);
  };

  const postAddRemoveFriend = async (id: number, friend: boolean) => {
    const response = await fetch(
      "http://localhost:8080/api/add-remove-friend",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          friend: friend,
        }),
      }
    );

    if (response.status == 200) {
      const jsonResponse = await response.json();
      const playersAfterChange = players.map((item: PlayerPostBattleState) => {
        if (item.id === jsonResponse.id) {
          return { ...item, friend: !jsonResponse.friend };
        }
        return item;
      });
      setPlayers([...playersAfterChange]);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles.title}>
        Results of the current series of battles
      </div>
      <div className={styles.title}>
        {scoreFirstTeam} - {scoreSecondTeam}
      </div>
      <div className={styles.formAllTeams}>
        <div className={styles.formOneTeam}>
          <div className={styles.title}>
            Allies {players[0]?.winner ? "win" : "losing"}
          </div>
          <TeamRows
            team={players.slice(0, 50).sort((a, b) => b.scores - a.scores)}
            addRemoveFriend={postAddRemoveFriend}
          />
        </div>
        <div className={styles.formOneTeam}>
          <div className={styles.title}>
            Opponents {players[0]?.winner ? "losing" : "win"}
          </div>
          <TeamRows
            team={players.slice(50).sort((a, b) => b.scores - a.scores)}
            addRemoveFriend={postAddRemoveFriend}
          />
        </div>
      </div>
      <div className={styles.actionRow}>
        <button className={styles.btnSubmit} type="button" onClick={getPlayers}>
          Next battle {">>"}
        </button>
      </div>
    </div>
  );
};
