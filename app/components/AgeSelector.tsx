import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props { age: number; onAgeChange: (age: number) => void }

const AgeSelector: React.FC<Props> = ({ age, onAgeChange }) => <View style={styles.container}><Text style={styles.label}>Idade</Text><View style={styles.control}>
  <TouchableOpacity style={styles.action} onPress={() => onAgeChange(Math.max(10, age - 1))}><Icon name="minus" size={22} color="#2563EB" /></TouchableOpacity>
  <View style={styles.display}><Text style={styles.number}>{age}</Text><Text style={styles.unit}>anos</Text></View>
  <TouchableOpacity style={styles.action} onPress={() => onAgeChange(Math.min(120, age + 1))}><Icon name="plus" size={22} color="#2563EB" /></TouchableOpacity>
</View></View>;

const styles = StyleSheet.create({ container: { marginBottom: 6 }, label: { fontSize: 15, fontWeight: '600', color: '#334155', marginBottom: 10 }, control: { height: 58, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 4 }, action: { width: 58, height: '100%', alignItems: 'center', justifyContent: 'center' }, display: { flex: 1, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 5 }, number: { fontSize: 28, fontWeight: '700', color: '#0F172A' }, unit: { fontSize: 14, color: '#64748B' } });

export default AgeSelector;
