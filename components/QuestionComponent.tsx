import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Question } from '../utils/QuestionManager';
import { gameScreenStyles as styles } from '../styles/GameScreenStyles';

interface QuestionComponentProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  score: number;
  handleAnswer: (answer: string) => void;
  selectedAnswer: string | null;
  getButtonStyle: (option: string, styles: any) => any;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  timeLeft,
  score,
  handleAnswer,
  selectedAnswer,
  getButtonStyle,
  fadeAnim,
  scaleAnim
}) => {
  return (
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
        {question.category}
      </Text>
      <Text style={styles.questionText}>
        {question.question}
      </Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
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
          Score: {score} | Question {currentQuestion + 1}/{totalQuestions}
        </Text>
        <Text style={styles.scoreText}>
          Time Left: {timeLeft}s
        </Text>
      </View>
    </Animated.View>
  );
};