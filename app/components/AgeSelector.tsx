import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AgeSelectorProps {
  age: number;
  onAgeChange: (age: number) => void;
}

const AgeSelector: React.FC<AgeSelectorProps> = ({
  age,
  onAgeChange,
}) => {
  const handleDecrease = () => {
    if (age > 10) {
      onAgeChange(age - 1);
    }
  };

  const handleIncrease = () => {
    if (age < 120) {
      onAgeChange(age + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Idade</Text>
      
      <View style={styles.ageCard}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDecrease}
          activeOpacity={0.7}
        >
          <Icon name="minus-circle" size={40} color="#9CA3AF" />
        </TouchableOpacity>

        <View style={styles.ageDisplay}>
          <Text style={styles.ageValue}>{age}</Text>
          <Text style={styles.ageUnit}>anos</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleIncrease}
          activeOpacity={0.7}
        >
          <Icon name="plus-circle" size={40} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.quickButtons}>
        {[18, 25, 35, 45, 60].map((quickAge) => (
          <TouchableOpacity
            key={quickAge}
            style={[
              styles.quickButton,
              age === quickAge && styles.quickButtonActive,
            ]}
            onPress={() => onAgeChange(quickAge)}
          >
            <Text
              style={[
                styles.quickButtonText,
                age === quickAge && styles.quickButtonTextActive,
              ]}
            >
              {quickAge}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  ageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  button: {
    padding: 8,
  },
  ageDisplay: {
    alignItems: 'center',
    minWidth: 100,
  },
  ageValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  ageUnit: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  quickButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 8,
    minWidth: '18%',
    alignItems: 'center',
  },
  quickButtonActive: {
    backgroundColor: '#3B82F6',
  },
  quickButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  quickButtonTextActive: {
    color: '#FFFFFF',
  },
});

export default AgeSelector;