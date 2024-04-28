/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';



function App(): React.JSX.Element {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [latestElapsedTime, setLatestElapsedTime] = useState(0);

  let i = 0;

  const [minLap, setMinLap] = useState(99999999);
  const [maxLap, setMaxLap] = useState(-1);

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

  useEffect(() => {
    if(laps[0] < minLap) {
      setMinLap(laps[0]);
    } else if(laps[0] > maxLap) {
      setMaxLap(laps[0]);
    }
  }, [laps])


  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLatestElapsedTime(0);
    setLaps([]);
    setMinLap(99999999);
    setMaxLap(-1);
  };

  const handleRecordLap = () => {
    const lap = elapsedTime - latestElapsedTime;
    setLatestElapsedTime(elapsedTime);
    setLaps(prevLaps => [lap, ...prevLaps]);
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((timeInSeconds * 100) % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds},${milliseconds}`;
  };

  console.log("re-render");

  return (
      <View style={styles.container}>
        <View style={styles.timeWrapper}>
          <Text style={styles.timer}>
            {formatTime(elapsedTime)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <View style={[styles.BtnRoundedBorder, {borderColor: '#363436'}, elapsedTime==0? {opacity: 0.6}: {opacity: 1}]}>
            <TouchableHighlight style={[styles.LapBtn]} underlayColor='gray' onPress={isRunning? handleRecordLap: handleReset} disabled={!isRunning && elapsedTime==0? true: false}>
              <Text style={{color: '#F5F2F5'}}>{elapsedTime==0 || isRunning? "Lap": "Reset"}</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.BtnRoundedBorder, isRunning? {borderColor: '#350E0E'} : {borderColor: '#0A2A13'}]}>
              <TouchableHighlight style={[styles.StartBtn, 
                isRunning? styles.StopBtn : styles.StartBtn
              ]} underlayColor='gray' onPress={handleStartStop}>
                <Text style={ isRunning?{color: '#EA4C45'}:{color: '#2DC653'}}>{isRunning? "Stop" : "Start"}</Text>
              </TouchableHighlight>
            </View>
        </View>
        <View style={styles.footer}>
          <View style={[styles.currentLap, laps.length==0 && !isRunning? {display: 'none'}: {display: 'flex'}]}>
                  <Text style={styles.lapText}>Lap {laps.length + 1}</Text>
                  <Text style={styles.lapText}>{formatTime(elapsedTime - latestElapsedTime)}</Text>
          </View>
          
          <ScrollView>
          {laps.map((lap, index) => 
          { 
            return (
                <View key={index} style={styles.lap}>
                  <Text style={[styles.lapText, lap <= minLap?{color: '#2DC653'} : (lap >= maxLap? {color: '#EA4C45'}: {color: '#fff'})]}>Lap {laps.length - index}</Text>
                  <Text style={[styles.lapText, lap <= minLap?{color: '#2DC653'} : (lap >= maxLap? {color: '#EA4C45'}: {color: '#fff'})]}>{formatTime(lap)}</Text>
                </View>)
          })}
          </ScrollView>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#000',
  },
  timeWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingBottom: 16,
    borderBottomColor: '#241D24',
    borderBottomWidth: 1
  },
  timer: {
    fontSize: 60,
    color: 'white',
  },
  currentLap: {
    justifyContent: 'space-between', 
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    marginTop: 16,
    marginHorizontal: 20,
  },
  lap: {
    justifyContent: 'space-between', 
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    borderBottomColor: '#241D24',
    borderBottomWidth: 1
  },
  lapText: {
    color: 'white',
    fontSize: 20
  },
  LapBtn: {
    borderWidth: 2,
    width: 100,
    height: 100,
    backgroundColor: "#363436",
    color: 'gray',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  StartBtn: {
    borderWidth: 2,
    color: '#2DC653',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A2A13',
  },
  BtnRoundedBorder: {
    borderRadius: 50,
    borderWidth: 2,
  },
  StopBtn: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#350E0E'
  },
  footer: {
    flexDirection: 'column',
    height: '50%'
  }
});

export default App;
