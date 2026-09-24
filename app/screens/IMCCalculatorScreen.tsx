import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AgeSelector from '../components/AgeSelector';
import GenderSelector from '../components/GenderSelector';
import HeightSlider from '../components/HeightSlider';
import InfoModal from '../components/InfoModal';
import ResultCard from '../components/ResultCard';
import WeightSelector from '../components/WeightSelector';
import { IMCResult } from '../types';
import { calculateIMC } from '../utils/imcCalculator';

const IMCCalculatorScreen: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState(175); const [weight, setWeight] = useState(70); const [age, setAge] = useState(25);
  const [result, setResult] = useState<IMCResult | null>(null); const [showInfoModal, setShowInfoModal] = useState(false); const scrollRef = useRef<ScrollView>(null);
  useEffect(() => { if (result) setResult(calculateIMC(height, weight)); }, [height, weight]);
  const calculate = () => { setResult(calculateIMC(height, weight)); setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80); };
  const reset = () => { setGender('male'); setHeight(175); setWeight(70); setAge(25); setResult(null); scrollRef.current?.scrollTo({ y: 0, animated: true }); };
  return <SafeAreaView style={styles.safe} edges={['top']}><StatusBar barStyle="light-content" backgroundColor="#2563EB" />
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <View style={styles.header}><View><Text style={styles.title}>Calculadora de IMC</Text><Text style={styles.subtitle}>Descubra seu Índice de Massa Corporal</Text></View><View style={styles.headerActions}><TouchableOpacity style={styles.headerButton} onPress={reset}><Icon name="refresh" size={20} color="#FFFFFF" /></TouchableOpacity><TouchableOpacity style={styles.headerButton} onPress={() => setShowInfoModal(true)}><Icon name="information-outline" size={21} color="#FFFFFF" /></TouchableOpacity></View></View>
      <View style={styles.body}><Text style={styles.sectionTitle}>Preencha seus dados</Text><View style={styles.form}><GenderSelector selectedGender={gender} onGenderChange={setGender} /><HeightSlider height={height} onHeightChange={setHeight} /><WeightSelector weight={weight} onWeightChange={setWeight} /><AgeSelector age={age} onAgeChange={setAge} /><TouchableOpacity style={styles.calculateButton} onPress={calculate}><Text style={styles.calculateText}>Calcular IMC</Text><Icon name="arrow-right" size={20} color="#FFFFFF" /></TouchableOpacity></View>{result && <ResultCard result={result} height={height} weight={weight} age={age} gender={gender} />}</View>
    </ScrollView><InfoModal visible={showInfoModal} onClose={() => setShowInfoModal(false)} />
  </SafeAreaView>;
};

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#F8FAFC' }, content: { paddingBottom: 32 }, header: { backgroundColor: '#2563EB', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' }, subtitle: { color: '#DBEAFE', fontSize: 13, marginTop: 4 }, headerActions: { flexDirection: 'row', gap: 4 }, headerButton: { width: 38, height: 38, borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.14)' }, body: { width: '100%', maxWidth: 620, alignSelf: 'center', paddingHorizontal: 16, paddingTop: 24 }, sectionTitle: { color: '#0F172A', fontSize: 18, fontWeight: '700', marginBottom: 12 }, form: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 4, padding: 16 }, calculateButton: { height: 48, backgroundColor: '#2563EB', borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 18 }, calculateText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' } });

export default IMCCalculatorScreen;
