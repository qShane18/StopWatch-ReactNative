/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



function App(): React.JSX.Element {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [countLap, setCountLap] = useState(0)
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleRecordLap = () => {
    setLaps(prevLaps => [...prevLaps, elapsedTime]);
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((timeInSeconds * 100) % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };
  return (
    <View style={styles.container}>
      <View style={styles.timeWrapper}>
        <Text style={styles.timer}>
          {formatTime(elapsedTime)}
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableHighlight style={styles.LapBtn} underlayColor='gray' onPress={isRunning? handleRecordLap: handleReset}>
          <Text>{elapsedTime==0? "Lap": (isRunning? "Lap": "Reset")}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.StartBtn, 
          isRunning? styles.StopBtn : styles.StartBtn
        ]} underlayColor='gray' onPress={handleStartStop}>
          <Text>{isRunning? "Stop" : "Start"}</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.footer}>
      {laps.map((lap, index) => (
            <View key={index} style={styles.lap}>
              <Text style={styles.lapText}>Lap {index + 1}:</Text>
              <Text style={styles.lapText}>{formatTime(lap)}</Text>
            </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 40,
  },
  timeWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60,
  },
  lap: {
    justifyContent: 'space-around', 
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10
  },
  lapBtn: {
    justifyContent: 'space-around', 
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10
  },
  lapText: {
    fontSize: 30
  },
  LapBtn: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  StartBtn: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6cf577'
  },
  StopBtn: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f56464'
  },
  footer: {
    flexDirection: 'column-reverse',
    height: '30%'
  }
});

export default App;
