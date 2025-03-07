import { useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { QuestionManager, Question, STAR_WARS_QUESTIONS } from '../utils/QuestionManager';
import { ScoreManager } from '../utils/ScoreManager';

export const useGameLogic = (initialDifficulty: 'easy' | 'medium' | 'hard' = 'easy') => {
  // State management
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Timer and difficulty state
  const [timeLeft, setTimeLeft] = useState(15);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(initialDifficulty);

  // Add new state for power-ups
  const [powerUps, setPowerUps] = useState({
    fiftyFifty: 1,
    timeFreeze: 1,
    skipQuestion: 1
  });

  // Track recent performance
  const [recentScores, setRecentScores] = useState<number[]>([]);

  // Initialize questions on component mount
  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        setIsLoading(true);
        const initialQuestions = QuestionManager.getRandomQuestions(6, difficulty);

        // Reset all state when initializing new questions
        setQuestions(initialQuestions);
        setCurrentQuestion(0);
        setScore(0);
        setGameOver(false);
        setSelectedAnswer(null);
        setTimeLeft(15);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load questions', error);
        setIsLoading(false);
      }
    };

    initializeQuestions();

    // Cleanup function
    return () => {
      setQuestions([]);
      setCurrentQuestion(0);
      setScore(0);
      setGameOver(false);
      setSelectedAnswer(null);
      setTimeLeft(15);
    };
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (!gameOver && selectedAnswer === null && !isLoading && questions.length > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            handleAnswer('');
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [currentQuestion, selectedAnswer, gameOver, isLoading, questions]);

  // Difficulty progression
  useEffect(() => {
    if (score > 0 && score % 3 === 0) {
      switch (difficulty) {
        case 'easy':
          setDifficulty('medium');
          break;
        case 'medium':
          setDifficulty('hard');
          break;
      }
    }
  }, [score]);

  // Handle game over and high score
  useEffect(() => {
    if (gameOver) {
      ScoreManager.saveHighScore(score);
    }
  }, [gameOver]);

  // Add adaptive difficulty
  const calculateDifficulty = (recentScores: number[]) => {
    const averageScore = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    if (averageScore > 80) return 'hard';
    if (averageScore > 60) return 'medium';
    return 'easy';
  };

  // Update difficulty based on performance
  useEffect(() => {
    if (recentScores.length >= 3) {
      const newDifficulty = calculateDifficulty(recentScores);
      setDifficulty(newDifficulty);
    }
  }, [recentScores]);

  const handleAnswer = (answer: string) => {
    if (
      questions.length === 0 ||
      currentQuestion >= questions.length ||
      selectedAnswer !== null ||
      gameOver
    ) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedAnswer(answer);

    const isCorrect = answer === questions[currentQuestion].correctAnswer;

    // Use a more reliable way to handle state updates
    setTimeout(() => {
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      const isLastQuestion = currentQuestion === questions.length - 1;

      if (isLastQuestion) {
        setGameOver(true);
        ScoreManager.saveHighScore(score);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
      }
    }, 1000);
  };

  const restartGame = () => {
    setIsLoading(true);

    // Reset all state in a predictable order
    setGameOver(false);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTimeLeft(15);
    setDifficulty('easy');

    const newQuestions = QuestionManager.getRandomQuestions(6, 'easy');
    setQuestions(newQuestions);

    setIsLoading(false);
  };

  const getButtonStyle = (option: string, styles: any) => {
    // Ensure styling only applies to the current question
    if (questions.length === 0 || currentQuestion >= questions.length) return styles.optionButton;

    // Only highlight if an answer has been selected for THIS question
    if (selectedAnswer !== null) {
      // Highlight correct answer in green
      if (option === questions[currentQuestion].correctAnswer) {
        return styles.correctButton;
      }

      // Highlight selected incorrect answer in red
      if (option === selectedAnswer && option !== questions[currentQuestion].correctAnswer) {
        return styles.incorrectButton;
      }
    }

    return styles.optionButton;
  };

  // Add power-up handlers
  const useFiftyFifty = () => {
    if (powerUps.fiftyFifty > 0) {
      const correctAnswer = questions[currentQuestion].correctAnswer;
      const wrongOptions = questions[currentQuestion].options.filter(
        option => option !== correctAnswer
      );
      const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

      const newOptions = [correctAnswer, randomWrongOption].sort(() => Math.random() - 0.5);
      setQuestions(prev => [
        ...prev.slice(0, currentQuestion),
        { ...prev[currentQuestion], options: newOptions },
        ...prev.slice(currentQuestion + 1)
      ]);
      setPowerUps(prev => ({ ...prev, fiftyFifty: prev.fiftyFifty - 1 }));
    }
  };

  return {
    questions,
    currentQuestion,
    score,
    gameOver,
    selectedAnswer,
    isLoading,
    timeLeft,
    difficulty,
    handleAnswer,
    restartGame,
    getButtonStyle,
    useFiftyFifty
  };
};