export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
export const STAR_WARS_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Jedi & Sith",
    question: "Who was Anakin Skywalker's Padawan?",
    options: ["Ahsoka Tano", "Luke Skywalker", "Obi-Wan Kenobi", "Mace Windu"],
    correctAnswer: "Ahsoka Tano",
    difficulty: 'easy'
  },
  {
    id: 2,
    category: "Galactic Politics",
    question: "What was the name of the Clone Army's secret control mechanism?",
    options: ["Inhibitor Chip", "Loyalty Protocol", "Order 66", "Compliance Code"],
    correctAnswer: "Inhibitor Chip",
    difficulty: 'medium'
  },
  {
    id: 3,
    category: "Spacecraft",
    question: "Which ship made the Kessel Run in less than 12 parsecs?",
    options: ["Millennium Falcon", "Slave I", "X-Wing", "TIE Fighter"],
    correctAnswer: "Millennium Falcon",
    difficulty: 'easy'
  },
  {
    id: 4,
    category: "Alien Species",
    question: "What species does Yoda belong to?",
    options: ["Mystery Species", "Green Humanoid", "Jedi Master Race", "Force-Sensitive Species"],
    correctAnswer: "Mystery Species",
    difficulty: 'easy'
  },
  {
    id: 5,
    category: "Legendary Battles",
    question: "On which planet did Obi-Wan and Anakin have their final confrontation?",
    options: ["Mustafar", "Naboo", "Coruscant", "Tatooine"],
    correctAnswer: "Mustafar",
    difficulty: 'medium'
  },
  {
    id: 6,
    category: "Force Abilities",
    question: "What is the technical term for the Jedi mind manipulation technique?",
    options: ["Force Suggestion", "Mental Influence", "Thought Control", "Persuasion Wave"],
    correctAnswer: "Force Suggestion",
    difficulty: 'hard'
  },
  {
    id: 7,
    category: "Star Wars Lore",
    question: "Who was Luke Skywalker's first lightsaber instructor?",
    options: ["Obi-Wan Kenobi", "Yoda", "Anakin Skywalker", "Qui-Gon Jinn"],
    correctAnswer: "Obi-Wan Kenobi",
    difficulty: 'easy'
  },
  {
    id: 8,
    category: "Galactic Conflicts",
    question: "What was the primary weapon of the Separatist droid army?",
    options: ["B1 Battle Droid", "Super Battle Droid", "Destroyer Droid", "Commando Droid"],
    correctAnswer: "B1 Battle Droid",
    difficulty: 'medium'
  },
  {
    id: 9,
    category: "Jedi History",
    question: "Who was the first Jedi to sit on the Jedi Council that was not a Master?",
    options: ["Anakin Skywalker", "Ahsoka Tano", "Luke Skywalker", "Mace Windu"],
    correctAnswer: "Anakin Skywalker",
    difficulty: 'hard'
  },
  {
    id: 10,
    category: "Planetary Systems",
    question: "What is the homeworld of the Wookiees?",
    options: ["Kashyyyk", "Endor", "Tatooine", "Naboo"],
    correctAnswer: "Kashyyyk",
    difficulty: 'easy'
  }
];

export class QuestionManager {
  static getRandomQuestions(
    count: number,
    difficulty?: 'easy' | 'medium' | 'hard'
  ): Question[] {
    let availableQuestions = [...STAR_WARS_QUESTIONS];

    if (difficulty) {
      availableQuestions = availableQuestions.filter(q => q.difficulty === difficulty);
    }

    if (availableQuestions.length === 0) {
      availableQuestions = [...STAR_WARS_QUESTIONS];
    }

    // Ensure we have enough questions
    if (count > availableQuestions.length) {
      // Repeat questions if necessary
      const repeatedQuestions = [];
      while (repeatedQuestions.length < count) {
        repeatedQuestions.push(...availableQuestions);
      }
      return repeatedQuestions.slice(0, count);
    }

    // Return a random selection without changing option order
    return this.shuffleQuestions(availableQuestions).slice(0, count);
  }

  // Improved shuffle that only affects question order, not options
  static shuffleQuestions(questions: Question[]): Question[] {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get questions by difficulty with more robust filtering
  static getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Question[] {
    const filteredQuestions = STAR_WARS_QUESTIONS.filter(q => q.difficulty === difficulty);

    // If no questions of specified difficulty, return all questions
    return filteredQuestions.length > 0
      ? this.shuffleQuestions(filteredQuestions)
      : this.shuffleQuestions(STAR_WARS_QUESTIONS);
  }

  // Additional utility method to get a specific number of unique questions
  static getUniqueQuestions(count: number): Question[] {
    // Ensure unique questions by ID
    const uniqueQuestions = Array.from(
      new Set(this.shuffleQuestions(STAR_WARS_QUESTIONS).map(q => q.id))
    )
    .slice(0, count)
    .map(id => STAR_WARS_QUESTIONS.find(q => q.id === id)!)
    .filter(Boolean);

    return uniqueQuestions.length > 0
      ? uniqueQuestions
      : STAR_WARS_QUESTIONS.slice(0, count);
  }

  // Method to add new questions dynamically
  static addQuestion(question: Question): void {
    // Check for duplicate IDs
    if (!STAR_WARS_QUESTIONS.some(q => q.id === question.id)) {
      STAR_WARS_QUESTIONS.push(question);
    }
  }
}