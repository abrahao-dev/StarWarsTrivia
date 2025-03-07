import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { ScoreManager } from '../utils/ScoreManager';
import { gameScreenStyles as styles } from '../styles/GameScreenStyles';

interface GameOverScreenProps {
  score: number;
  totalQuestions: number;
  restartGame: () => void;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  totalQuestions,
  restartGame,
  fadeAnim,
  scaleAnim
}) => {
  const { stars, title, description } = ScoreManager.calculateStarRating({
    totalQuestions,
    correctAnswers: score,
    accuracy: (score / totalQuestions) * 100,
    timeTaken: 0
  });

  const isMissionSuccessful = score / totalQuestions >= 0.5;
  const missionStatusText = isMissionSuccessful ? 'Mission Complete!' : 'Mission Failed!';
  const missionStatusColor = isMissionSuccessful ? '#2ecc71' : '#e74c3c';

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Animated.View
        key={index}
        style={{
          transform: [{
            scale: scaleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1]
            })
          }]
        }}
      >
        <AntDesign
          name={index < stars ? "star" : "staro"}
          size={40}
          color={index < stars ? "#FFD700" : "#888"}
          style={styles.starIcon}
        />
      </Animated.View>
    ));
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#1a1a2e" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.gameOverContainer,
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
          <Text style={[styles.gameOverTitle, { color: missionStatusColor }]}>
            {missionStatusText}
          </Text>

          <View style={styles.starRatingContainer}>
            {renderStars()}
          </View>

          <Text style={styles.performanceTitleText}>{title}</Text>

          <Text style={styles.finalScoreText}>
            Your Galactic Score: {score} / {totalQuestions}
          </Text>

          <Text style={styles.performanceDescriptionText}>
            {description}
          </Text>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={restartGame}
          >
            <Text style={styles.restartButtonText}>Restart Mission</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </>
  );
};