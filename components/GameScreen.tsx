import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

// Import utilities and hooks
import { useGameLogic } from '../hooks/useGameLogic';
import { QuestionManager } from '../utils/QuestionManager';
import { GameOverScreen } from '../components/GameOverScreen';

// Import styles
import { gameScreenStyles as styles } from '../styles/GameScreenStyles';

const GameScreen: React.FC = () => {
  const {
    questions,
    currentQuestion,
    score,
    gameOver,
    selectedAnswer,
    isLoading,
    timeLeft,
    handleAnswer,
    restartGame,
    getButtonStyle
  } = useGameLogic();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Reset animations when question changes
  useEffect(() => {
    if (!isLoading && questions.length > 0) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [currentQuestion, questions, isLoading]);

  // Improved loading state
  if (isLoading || questions.length === 0) {
    return (
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={[styles.loadingText, { color: '#FFD700', marginTop: 20 }]}>
          Loading Questions...
        </Text>
      </LinearGradient>
    );
  }

  // Game Over Screen
  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        totalQuestions={questions.length}
        restartGame={restartGame}
        fadeAnim={fadeAnim}
        scaleAnim={scaleAnim}
      />
    );
  }

  // Question Screen
  return (
    <>
      <StatusBar style="light" backgroundColor="#1a1a2e" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.categoryText}>
            {questions[currentQuestion].category}
          </Text>
          <Text style={styles.questionText}>
            {questions[currentQuestion].question}
          </Text>
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getButtonStyle(option, styles)}
                onPress={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              Score: {score} | Question {currentQuestion + 1}/{questions.length}
            </Text>
            <Text style={styles.scoreText}>
              Time Left: {timeLeft}s
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </>
  );
};

export default GameScreen;