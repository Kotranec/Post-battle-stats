import { GameResultsPage } from "./pages/GameResultsPage";
import React from "react";
import { createRoot } from "react-dom/client";
import styles from "./index.modules.sass";

const App = () => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>Game results</h1>
      <GameResultsPage />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
