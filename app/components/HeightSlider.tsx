import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeightSliderProps {
  height: number;
  onHeightChange: (height: number) => void;
}

const HeightSlider: React.FC<HeightSliderProps> = ({
  height,
  onHeightChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Altura</Text>
        <View style={styles.heightDisplay}>
          <Text style={styles.heightValue}>{height}</Text>
          <Text style={styles.heightUnit}>cm</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Icon name="arrow-down" size={20} color="#6B7280" style={styles.sliderIcon} />
        <Slider
          style={styles.slider}
          minimumValue={50}
          maximumValue={250}
          step={1}
          value={height}
          onValueChange={onHeightChange}
          minimumTrackTintColor="#3B82F6"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#3B82F6"
        />
        <Icon name="arrow-up" size={20} color="#6B7280" style={styles.sliderIcon} />
      </View>

      <View style={styles.scaleContainer}>
        <Text style={styles.scaleText}>50</Text>
        <Text style={styles.scaleText}>150</Text>
        <Text style={styles.scaleText}>250</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  heightDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  heightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 4,
  },
  heightUnit: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderIcon: {
    marginHorizontal: 8,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  scaleText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default HeightSlider;