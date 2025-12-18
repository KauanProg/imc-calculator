import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Gender } from '../types';

interface GenderSelectorProps {
  selectedGender: Gender;
  onGenderChange: (gender: Gender) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onGenderChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gênero</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'male' && styles.genderButtonSelected,
          ]}
          onPress={() => onGenderChange('male')}
        >
          <View
            style={[
              styles.iconContainer,
              selectedGender === 'male' && styles.iconContainerSelected,
            ]}
          >
            <Icon
              name="gender-male"
              size={32}
              color={selectedGender === 'male' ? '#3B82F6' : '#9CA3AF'}
            />
          </View>
          <Text
            style={[
              styles.genderText,
              selectedGender === 'male' && styles.genderTextSelected,
            ]}
          >
            Masculino
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'female' && styles.genderButtonSelected,
          ]}
          onPress={() => onGenderChange('female')}
        >
          <View
            style={[
              styles.iconContainer,
              selectedGender === 'female' && styles.iconContainerSelected,
            ]}
          >
            <Icon
              name="gender-female"
              size={32}
              color={selectedGender === 'female' ? '#EC4899' : '#9CA3AF'}
            />
          </View>
          <Text
            style={[
              styles.genderText,
              selectedGender === 'female' && styles.genderTextSelected,
            ]}
          >
            Feminino
          </Text>
        </TouchableOpacity>
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
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 0.48,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  genderButtonSelected: {
    backgroundColor: '#F0F9FF',
    borderColor: '#3B82F6',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  iconContainerSelected: {
    backgroundColor: '#EFF6FF',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  genderTextSelected: {
    color: '#1F2937',
  },
});

export default GenderSelector;