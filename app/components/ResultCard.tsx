import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IMCResult } from '../types';
import { calculateIdealWeight, calculateDailyCalories } from '../utils/imcCalculator';

interface ResultCardProps {
  result: IMCResult;
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
}

const ResultCard: React.FC<ResultCardProps> = ({
  result,
  height,
  weight,
  age,
  gender,
}) => {
  const idealWeight = calculateIdealWeight(height);
  const dailyCalories = calculateDailyCalories(weight, height, age, gender);

  const handleShare = async () => {
    try {
      const message = `Meu IMC: ${result.value}\nCategoria: ${result.category}\nAltura: ${height}cm\nPeso: ${weight}kg\nPeso ideal: ${idealWeight.min}-${idealWeight.max}kg`;
      
      await Share.share({
        message,
        title: 'Meu Resultado de IMC',
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o resultado.');
    }
  };

  const getProgressValue = () => {
    const { min, max } = result.healthyRange;
    if (result.value < min) return 0;
    if (result.value > max) return 100;
    return ((result.value - min) / (max - min)) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resultado</Text>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share-variant" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.resultMain}>
        <View style={styles.imcValueContainer}>
          <Text style={styles.imcLabel}>SEU IMC</Text>
          <Text style={[styles.imcValue, { color: result.color }]}>
            {result.value.toFixed(1)}
          </Text>
          <View style={[styles.categoryBadge, { backgroundColor: `${result.color}20` }]}>
            <Text style={[styles.categoryText, { color: result.color }]}>
              {result.category}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{result.description}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Baixo peso</Text>
          <Text style={styles.progressLabel}>Normal</Text>
          <Text style={styles.progressLabel}>Sobrepeso</Text>
          <Text style={styles.progressLabel}>Obesidade</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressBackground} />
          <View
            style={[
              styles.progressFill,
              { width: `${getProgressValue()}%`, backgroundColor: result.color },
            ]}
          />
          <View
            style={[
              styles.progressIndicator,
              { left: `${getProgressValue()}%`, backgroundColor: result.color },
            ]}
          >
            <View style={styles.indicatorValue}>
              <Text style={styles.indicatorText}>{result.value.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.progressScale}>
          <Text style={styles.scaleText}>15</Text>
          <Text style={styles.scaleText}>18.5</Text>
          <Text style={styles.scaleText}>25</Text>
          <Text style={styles.scaleText}>30</Text>
          <Text style={styles.scaleText}>40</Text>
        </View>
      </View>

      {/* Additional Info */}
      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Icon name="weight-kilogram" size={24} color="#3B82F6" />
          <Text style={styles.infoLabel}>Peso Ideal</Text>
          <Text style={styles.infoValue}>
            {idealWeight.min}-{idealWeight.max} kg
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Icon name="fire" size={24} color="#EF4444" />
          <Text style={styles.infoLabel}>Calorias/dia</Text>
          <Text style={styles.infoValue}>{dailyCalories} kcal</Text>
        </View>

        <View style={styles.infoCard}>
          <Icon name="ruler" size={24} color="#10B981" />
          <Text style={styles.infoLabel}>Altura</Text>
          <Text style={styles.infoValue}>{height} cm</Text>
        </View>

        <View style={styles.infoCard}>
          <Icon name="scale-bathroom" size={24} color="#8B5CF6" />
          <Text style={styles.infoLabel}>Peso Atual</Text>
          <Text style={styles.infoValue}>{weight} kg</Text>
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>Recomendações</Text>
        {result.recommendations.map((recommendation, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Icon name="check-circle" size={20} color="#10B981" />
            <Text style={styles.recommendationText}>{recommendation}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  resultMain: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imcValueContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  imcLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  imcValue: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 8,
    position: 'relative',
  },
  progressBackground: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressIndicator: {
    position: 'absolute',
    top: -12,
    width: 4,
    height: 32,
    borderRadius: 2,
    alignItems: 'center',
  },
  indicatorValue: {
    position: 'absolute',
    top: -30,
    backgroundColor: '#1F2937',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  indicatorText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  progressScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  recommendationsContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#0C4A6E',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});

export default ResultCard;