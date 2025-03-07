export class DailyChallengeManager {
  static async getDailyChallenge(): Promise<Question[]> {
    const today = new Date().toISOString().split('T')[0];
    const seed = parseInt(today.replace(/-/g, ''));

    // Use the date as a seed for consistent daily questions
    const questions = STAR_WARS_QUESTIONS.sort((a, b) => {
      return ((a.id * seed) % 100) - ((b.id * seed) % 100);
    });

    return questions.slice(0, 5);
  }
}