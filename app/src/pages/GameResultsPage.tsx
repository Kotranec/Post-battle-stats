import { GameResultsForm } from "../components/forms/GameResultsForm";
import React from "react";
import styles from "./GameResultsPage.module.sass";

export const GameResultsPage = () => {
  return (
    <div className={styles.page}>
      <GameResultsForm />
    </div>
  );
};
