import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";

export default function Sidebar() {
  const [{ totalScoreList }, dispatch] = useDataLayerValue();
  React.useEffect(() => {
    console.log(totalScoreList);
  }, []);
  return (
    <div>
      <ul>
        {totalScoreList.length == 0 && <li>No scores available</li>}
        {totalScoreList.length > 0 &&
          totalScoreList.map((score, index) => (
            <li
              key={score.totalScore + "0" + index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div>Score - {score.totalScore}</div>
              <div>Time - {new Date(score.time).toLocaleString()}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
