import { Audio } from 'expo-av';

export class SoundManager {
  static async playCorrectAnswer() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/correct.mp3')
    );
    await sound.playAsync();
  }

  static async playIncorrectAnswer() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/incorrect.mp3')
    );
    await sound.playAsync();
  }

  static async playBackgroundMusic() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/background.mp3'),
      { isLooping: true }
    );
    await sound.playAsync();
    return sound;
  }
}