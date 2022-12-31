import { useState } from "react";
import "./Student.css";
import { useParams } from "react-router-dom";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryGroup,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryLegend,
} from "victory";
import data from "./studentsData.js";

function StudentDetail() {
  const { name } = useParams();
  const dataPerSelectedStudent = data.filter(
    (task) => task["Wie ben je?"] === name
  );

  const legendData = [
    { name: "Difficulty", symbol: { fill: "green", type: "square", size: 14 } },
    { name: "Enjoyment", symbol: { fill: "blue", type: "square", size: 14 } },
  ];

  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showEnjoyment, setShowEnjoyment] = useState(true);

  return (
    <div>
      <div className="labels">
        <label>
          <input
            type="checkbox"
            checked={showDifficulty}
            onChange={(e) => setShowDifficulty(e.target.checked)}
          />
          Show Difficulty
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={showEnjoyment}
            onChange={(e) => setShowEnjoyment(e.target.checked)}
          />
          Show Enjoyment
        </label>
      </div>
      <VictoryChart
        animate={{ duration: 500 }}
        width={3800}
        height={1200}
        theme={VictoryTheme.material}
        domainPadding={40}
        containerComponent={<VictoryZoomContainer />}
        padding={{ bottom: 260, left: 50 }}
      >
        <VictoryLegend
          x={100}
          y={25}
          centerTitle
          orientation="horizontal"
          gutter={20}
          data={legendData}
          label={<legendLabel />}
          style={{
            title: { fontSize: 30 },
            labels: { fontSize: 30, fontWeight: "bold" },
          }}
        />
        <VictoryAxis
          crossAxis
          style={{
            tickLabels: {
              angle: -40,
              fontSize: 22,
              textAnchor: "end",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: 22,
            },
          }}
          tickValues={[1, 2, 3, 4, 5]}
        />
        <VictoryGroup offset={25}>
          {showDifficulty && (
            <VictoryBar
              animate={{ duration: 500 }}
              data={dataPerSelectedStudent}
              x="Welke opdracht of welk project lever je nu in?"
              y="Hoe moeilijk vond je deze opdracht?"
              alignment="middle"
              style={{
                data: {
                  fill: "green",
                },
              }}
              barWidth={23}
            />
          )}
          {showEnjoyment && (
            <VictoryBar
              animate={{ duration: 500 }}
              data={dataPerSelectedStudent}
              x="Welke opdracht of welk project lever je nu in?"
              y="Hoe leuk vond je deze opdracht?"
              alignment="middle"
              style={{
                data: {
                  fill: "blue",
                },
              }}
              barWidth={23}
            />
          )}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default StudentDetail;
