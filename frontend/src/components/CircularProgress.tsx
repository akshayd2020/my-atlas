import { useState, useEffect } from 'react';
import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const INITIAL_OFFSET = 0;
const circleConfig = {
  viewBox: '-10 -15 38 38',
  x: '21',
  y: '19',
  radio: 3,
  strokeWidth: 200,
  //borderWidth: 20,
  //borderRadius: 100,
  //radio: '15.91549430918954',
};

const CircleProgressBarBase = ({ trailStrokeColor, strokeColor }) => {
  const [progressBar, setProgressBar] = useState(0);
  const percentage = 100;

  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, 65);
  };

  useEffect(() => {
    if (percentage > 0) updatePercentage();
  });

  useEffect(() => {
    if (progressBar < percentage) updatePercentage();
  });

  return (
    <View>
      <Svg viewBox={circleConfig.viewBox}>
        <Circle
        //   className="ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
        />
        <Circle
        //   className="path"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeDasharray={`${progressBar} ${100 - progressBar}`}
          strokeDashoffset={INITIAL_OFFSET}
        />
      </Svg>
    </View>
  );
};

export default CircleProgressBarBase;
