import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeTaken: number;
}

export class ScoreManager {
  static calculateStarRating(stats: GameStats) {
    const { correctAnswers, totalQuestions } = stats;
    const percentageScore = (correctAnswers / totalQuestions) * 100;

    if (percentageScore >= 90) {
      return {
        stars: 5,
        title: "Jedi Master",
        description: "Exceptional knowledge of the Star Wars universe!"
      };
    } else if (percentageScore >= 70) {
      return {
        stars: 4,
        title: "Rebel Alliance Expert",
        description: "Impressive Star Wars trivia skills!"
      };
    } else if (percentageScore >= 50) {
      return {
        stars: 3,
        title: "Padawan Learner",
        description: "Good effort! Keep learning the ways of the Force."
      };
    } else if (percentageScore >= 30) {
      return {
        stars: 2,
        title: "Youngling",
        description: "You're just beginning your Star Wars journey."
      };
    } else {
      return {
        stars: 1,
        title: "Nerf Herder",
        description: "Time to watch some Star Wars movies!"
      };
    }
  }

  static async saveHighScore(score: number) {
    try {
      const existingScores = await this.getHighScores();
      const updatedScores = [...existingScores, score]
        .sort((a, b) => b - a)
        .slice(0, 5);

      await AsyncStorage.setItem('highScores', JSON.stringify(updatedScores));
    } catch (error) {
      console.error('Error saving high score', error);
    }
  }

  static async getHighScores(): Promise<number[]> {
    try {
      const scoresJson = await AsyncStorage.getItem('highScores');
      return scoresJson ? JSON.parse(scoresJson) : [];
    } catch (error) {
      console.error('Error retrieving high scores', error);
      return [];
    }
  }
}