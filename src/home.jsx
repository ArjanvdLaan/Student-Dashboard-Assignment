import { useState } from "react";
import "./home.css";
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

function Home() {
  // Group the data by exercise
  const dataByExercise = data.reduce((acc, task) => {
    const exercise = task["Welke opdracht of welk project lever je nu in?"];
    acc[exercise] = acc[exercise] || [];
    acc[exercise].push(task);
    return acc;
  }, {});

  // Calculate the average difference and enjoyment for each exercise
  const results = {};
  for (const [exercise, tasks] of Object.entries(dataByExercise)) {
    let totalDifference = 0;
    let totalEnjoyment = 0;
    for (const task of tasks) {
      totalDifference += task["Hoe moeilijk vond je deze opdracht?"];
      totalEnjoyment += task["Hoe leuk vond je deze opdracht?"];
    }
    const averageDifference = totalDifference / tasks.length;
    const averageEnjoyment = totalEnjoyment / tasks.length;
    results[exercise] = {
      exercise: exercise,
      averageDifference: averageDifference,
      averageEnjoyment: averageEnjoyment,
    };
  }
  
  const resultsArray = Object.values(results);

  const legendData = [
    { name: "Difficulty", symbol: { fill: "green", type: "square", size: 14 } },
    {
      name: "Enjoyment",
      data: { fontSize: 30 },
      symbol: { fill: "blue", type: "square", size: 14 },
    },
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
        width={4000}
        height={1200}
        theme={VictoryTheme.material}
        domainPadding={40}
        containerComponent={<VictoryZoomContainer />}
        padding={{ bottom: 260, left: 55 }}
      >
        <VictoryLegend
          x={100}
          y={10}
          title="Average enjoyment and difficulty per exercise of Winc Academy students"
          centerTitle
          orientation="horizontal"
          gutter={20}
          data={legendData}
          label={<legendLabel />}
          style={{
            title: { fontSize: 30, fontWeight: "bold" },
            labels: { fontSize: 30, fontWeight: "bold" },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: 22,
            },
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
        <VictoryGroup offset={25}>
          {showDifficulty && (
            <VictoryBar
              data={resultsArray}
              alignment="middle"
              style={{
                data: {
                  fill: "green",
                },
              }}
              barWidth={23}
              x="exercise"
              y={(datum) => datum.averageDifference}
            />
          )}
          {showEnjoyment && (
            <VictoryBar
              data={resultsArray}
              alignment="middle"
              style={{
                data: {
                  fill: "blue",
                },
              }}
              barWidth={23}
              x="exercise"
              y={(datum) => datum.averageEnjoyment}
            ></VictoryBar>
          )}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default Home;
