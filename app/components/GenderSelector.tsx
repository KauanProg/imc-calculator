import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Gender } from '../types';

interface Props { selectedGender: Gender; onGenderChange: (gender: Gender) => void }

const GenderSelector: React.FC<Props> = ({ selectedGender, onGenderChange }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Gênero</Text>
    <View style={styles.row}>
      {([
        ['male', 'gender-male', 'Masculino'], ['female', 'gender-female', 'Feminino'],
      ] as const).map(([value, icon, label]) => {
        const selected = selectedGender === value;
        return <TouchableOpacity key={value} activeOpacity={0.8} style={[styles.button, selected && styles.buttonSelected]} onPress={() => onGenderChange(value)}>
          <Icon name={icon} size={22} color={selected ? '#2563EB' : '#64748B'} /><Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
        </TouchableOpacity>;
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 }, label: { fontSize: 15, fontWeight: '600', color: '#334155', marginBottom: 10 }, row: { flexDirection: 'row', gap: 10 },
  button: { flex: 1, minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 4 },
  buttonSelected: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' }, text: { fontSize: 14, color: '#475569', fontWeight: '600' }, textSelected: { color: '#1D4ED8' },
});

export default GenderSelector;
