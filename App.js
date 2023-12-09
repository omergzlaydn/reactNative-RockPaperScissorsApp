import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import color from './constants/color';
import choices from './data/mockData';

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const handleUserChoice = choice => {
    setUserChoice(choice);
    randomComputerChoice(choice);
  };

  const randomComputerChoice = choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerRandomChoice = choices[randomIndex];
    setComputerChoice(computerRandomChoice);
    determineWinner(choice, computerRandomChoice);
  };

  const determineWinner = (user, computerRandomChoice) => {
    if (user?.name === computerRandomChoice?.name) {
      setResult('Berabere!');
    } else if (
      (user?.name === 'Taş' && computerRandomChoice?.name === 'Makas') ||
      (user?.name === 'Kağıt' && computerRandomChoice?.name === 'Taş') ||
      (user?.name === 'Makas' && computerRandomChoice?.name === 'Kağıt')
    ) {
      setResult('Kazandın!');
      setUserScore(prevScore => prevScore + 1);
    } else {
      setResult('Kaybettin!');
      setComputerScore(prevScore => prevScore + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={color.backgroundColor}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <Text style={styles.title}>TAŞ KAĞIT MAKAS</Text>
        <Text style={styles.computerChoiceText}>Lütfen Seçiniz</Text>
        <View style={styles.choices}>
          {choices?.map((choice, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => handleUserChoice(choice)}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.buttonActive]
                  : styles.button
              }>
              <Image source={choice?.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {computerChoice && (
          <>
            <Text style={styles.computerChoiceText}>Bilgisayarın Seçimi:</Text>
            <View style={styles.button}>
              <Image source={computerChoice?.image} style={styles.image} />
            </View>
          </>
        )}

        {/* Skorları Göster */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreColumn}>
            <Text style={styles.scoreText}>Sen:</Text>
            <Text style={styles.scoreText}>{userScore}</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.scoreColumn}>
            <Text style={styles.computerScoreText}>Bilgisayar:</Text>
            <Text style={styles.computerScoreText}>{computerScore}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.white,
    marginBottom: 20,
  },
  computerChoiceText: { marginVertical: 20, fontSize: 20, color: color.white },
  choice: {},
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  buttonActive: {
    borderWidth: 2,
  },
  choices: { flexDirection: 'row', justifyContent: 'space-around', gap: 10 },
  image: { width: 90, height: 90 },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: color.white,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: color.darkBlue,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scoreColumn: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.green,
  },
  computerScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.red,
  },
  verticalLine: {
    height: '80%',
    width: 1,
    backgroundColor: color.white,
  },
});
