interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: (stats: GameStats) => boolean;
  unlocked: boolean;
}

export class AchievementManager {
  static achievements: Achievement[] = [
    {
      id: 'perfect_score',
      title: 'Jedi Grand Master',
      description: 'Score 100% on hard difficulty',
      condition: (stats) => stats.accuracy === 100 && stats.difficulty === 'hard',
      unlocked: false
    },
    // Add more achievements...
  ];

  static async checkAchievements(stats: GameStats) {
    const unlockedAchievements = this.achievements.filter(a => !a.unlocked && a.condition(stats));
    if (unlockedAchievements.length > 0) {
      await this.saveAchievements(unlockedAchievements);
      return unlockedAchievements;
    }
    return [];
  }
}