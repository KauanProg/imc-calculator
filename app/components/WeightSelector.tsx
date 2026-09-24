import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props { weight: number; onWeightChange: (weight: number) => void }

const WeightSelector: React.FC<Props> = ({ weight, onWeightChange }) => {
  const [editing, setEditing] = useState(false); const [text, setText] = useState(String(weight)); const inputRef = useRef<TextInput>(null);
  useEffect(() => { if (!editing) setText(String(weight)); }, [weight, editing]);
  const finish = () => { const value = Number(text.replace(',', '.')); if (Number.isFinite(value) && value >= 20 && value <= 300) onWeightChange(Math.round(value * 10) / 10); else setText(String(weight)); setEditing(false); Keyboard.dismiss(); };
  return <View style={styles.container}><Text style={styles.label}>Peso</Text><View style={styles.control}>
    <TouchableOpacity style={styles.action} onPress={() => onWeightChange(Math.max(20, weight - 1))}><Icon name="minus" size={22} color="#2563EB" /></TouchableOpacity>
    <TouchableOpacity style={styles.display} onPress={() => { setEditing(true); setTimeout(() => inputRef.current?.focus(), 0); }}>
      {editing ? <TextInput ref={inputRef} autoFocus style={styles.input} value={text} onChangeText={setText} onBlur={finish} onSubmitEditing={finish} keyboardType="decimal-pad" returnKeyType="done" /> : <Text style={styles.number}>{weight}</Text>}<Text style={styles.unit}>kg</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.action} onPress={() => onWeightChange(Math.min(300, weight + 1))}><Icon name="plus" size={22} color="#2563EB" /></TouchableOpacity>
  </View></View>;
};

const styles = StyleSheet.create({ container: { marginBottom: 20 }, label: { fontSize: 15, fontWeight: '600', color: '#334155', marginBottom: 10 }, control: { height: 58, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 4 }, action: { width: 58, height: '100%', alignItems: 'center', justifyContent: 'center' }, display: { flex: 1, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 5 }, number: { fontSize: 28, fontWeight: '700', color: '#0F172A' }, input: { minWidth: 86, fontSize: 26, fontWeight: '700', textAlign: 'center', color: '#1D4ED8', padding: 0 }, unit: { fontSize: 14, color: '#64748B' } });

export default WeightSelector;
