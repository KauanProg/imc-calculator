import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

interface Props { height: number; onHeightChange: (height: number) => void }

const HeightSlider: React.FC<Props> = ({ height, onHeightChange }) => <View style={styles.container}>
  <View style={styles.header}><Text style={styles.label}>Altura</Text><Text style={styles.value}>{height} <Text style={styles.unit}>cm</Text></Text></View>
  <Slider style={styles.slider} minimumValue={50} maximumValue={250} step={1} value={height} onValueChange={onHeightChange} minimumTrackTintColor="#2563EB" maximumTrackTintColor="#CBD5E1" thumbTintColor="#2563EB" />
  <View style={styles.scale}><Text style={styles.scaleText}>50 cm</Text><Text style={styles.scaleText}>150 cm</Text><Text style={styles.scaleText}>250 cm</Text></View>
</View>;

const styles = StyleSheet.create({
  container: { marginBottom: 24 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, label: { fontSize: 15, fontWeight: '600', color: '#334155' }, value: { fontSize: 22, fontWeight: '700', color: '#1D4ED8' }, unit: { fontSize: 14, fontWeight: '500', color: '#64748B' }, slider: { width: '100%', height: 40 }, scale: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -2 }, scaleText: { fontSize: 12, color: '#94A3B8' },
});

export default HeightSlider;
