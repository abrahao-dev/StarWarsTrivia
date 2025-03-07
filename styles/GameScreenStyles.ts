import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const gameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  categoryText: {
    color: '#00ffff',
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#00ffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  correctButton: {
    backgroundColor: 'rgba(0,255,0,0.3)',
    borderColor: 'green',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  incorrectButton: {
    backgroundColor: 'rgba(255,0,0,0.3)',
    borderColor: 'red',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    color: '#00ffff',
    fontSize: 16,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    paddingHorizontal: 20,
  },
  gameOverTitle: {
    fontSize: 36,
    color: '#ff6b6b',
    marginBottom: 20,
    textAlign: 'center',
  },
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  performanceTitleText: {
    fontSize: 28,
    color: '#00ffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  finalScoreText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  performanceDescriptionText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  restartButton: {
    backgroundColor: '#00ffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  restartButtonText: {
    color: '#16213e',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export const enhancedStyles = StyleSheet.create({
  powerUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  powerUpButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#00ffff',
    marginBottom: 20,
  },
  // Add more enhanced styles...
});