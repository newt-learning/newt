import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { G, Rect, Line, Text } from "react-native-svg";
import _ from "lodash";
import { scalePoint, scaleLinear } from "d3-scale";
import { GRAY_3, BLUE, GRAY_2, GRAY_1 } from "../design/colors";

const BarChart = ({ data, containerStyle }) => {
  // Temp. fix. Need to figure out the loading error in StatsContext where the data is being fetched.
  if (_.isEmpty(data)) {
    return null;
  }

  // Check if all the y-values are zero. If they are, gotta change some stuff in
  // the graph, because scaleLinear handles domains of [0, 0] weirdly.
  const allZeroes = _.every(data, ["y", 0]);

  const SVGHeight = 225;
  const { width: SVGWidth } = Dimensions.get("window");
  const chartMargin = 25;
  const graphHeight = SVGHeight - 2 * chartMargin;
  const graphWidth = SVGWidth - 2 * chartMargin;
  const barWidth = 16;

  // X Scale
  const xDomain = data.map((item) => item.x);
  const xRange = [0, graphWidth];
  const scaleX = scalePoint().domain(xDomain).range(xRange).padding(1);

  // Y Scale
  const yMax = _.maxBy(data, (item) => item.y).y; // maxBy returns the whole object
  const niceMaxVal = Math.ceil(yMax / 10) * 10;
  const yDomain = [0, niceMaxVal];
  // If the data is all zeroes, make y-range [0,0]
  const yRange = allZeroes ? [0, 0] : [0, graphHeight];
  const scaleY = scaleLinear().domain(yDomain).range(yRange);

  // Middle Label
  const middleValue = niceMaxVal / 2;

  return (
    <View style={containerStyle}>
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight + chartMargin}>
          {/* Top dotted axis */}
          {!allZeroes && (
            <Line
              x1="0"
              y1={scaleY(niceMaxVal) * -1}
              x2={graphWidth - 5}
              y2={scaleY(niceMaxVal) * -1}
              stroke={GRAY_3}
              strokeWidth="0.5"
              strokeDasharray={[3, 3]}
            />
          )}
          {/* Top y-label */}
          <Text
            x={graphWidth + 1}
            y={scaleY(niceMaxVal) * -1 + 4}
            textAnchor="start"
            fontSize="12"
            fill={GRAY_2}
          >
            {niceMaxVal}
          </Text>
          {/* Middle dotted axis */}
          {!allZeroes && (
            <Line
              x1="0"
              y1={scaleY(middleValue) * -1}
              x2={graphWidth - 5}
              y2={scaleY(middleValue) * -1}
              stroke={GRAY_3}
              strokeWidth="0.5"
              strokeDasharray={[3, 3]}
            />
          )}
          {/* Middle y-label */}
          {!allZeroes && (
            <Text
              x={graphWidth + 3}
              y={scaleY(middleValue) * -1 + 4}
              textAnchor="start"
              fontSize="12"
              fill={GRAY_2}
            >
              {middleValue}
            </Text>
          )}
          {/* Bars */}
          {!allZeroes &&
            data.map((item) => (
              <Rect
                key={item.x}
                x={scaleX(item.x) - barWidth / 2}
                y={scaleY(item.y) * -1}
                rx={4}
                width={barWidth}
                height={scaleY(item.y)}
                fill={BLUE}
              />
            ))}
          {/* x-axis */}
          <Line
            x1="0"
            y1="0"
            x2={graphWidth}
            y2="0"
            stroke={GRAY_3}
            strokeWidth="1"
          />
          {/* X-axis labels */}
          {data.map((item) => (
            <Text
              key={`Label ${item.x}`}
              fontSize="12"
              fill={GRAY_1}
              x={scaleX(item.x)}
              y="16"
              textAnchor="middle"
            >
              {item.x}
            </Text>
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default BarChart;
