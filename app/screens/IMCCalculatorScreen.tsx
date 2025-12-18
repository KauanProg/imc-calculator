import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AgeSelector from "../components/AgeSelector";
import GenderSelector from "../components/GenderSelector";
import HeightSlider from "../components/HeightSlider";
import InfoModal from "../components/InfoModal";
import ResultCard from "../components/ResultCard";
import WeightSelector from "../components/WeightSelector";

import { IMCResult } from "../types";
import { calculateIMC, calculateIdealWeight } from "../utils/imcCalculator";

const IMCCalculatorScreen: React.FC = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [age, setAge] = useState<number>(25);
  const [result, setResult] = useState<IMCResult | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  useEffect(() => {
    const newResult = calculateIMC(height, weight);
    setResult(newResult);
  }, [height, weight, gender, age]);

  const handleCalculate = () => {
    const newResult = calculateIMC(height, weight);
    setResult(newResult);

    if (newResult.value < 16 || newResult.value >= 35) {
      Alert.alert(
        "Atenção",
        "Seu IMC indica que você deve procurar orientação médica. Este aplicativo não substitui a consulta com um profissional de saúde.",
        [{ text: "Entendi", style: "default" }]
      );
    }
  };

  const handleReset = () => {
    setHeight(175);
    setWeight(70);
    setAge(25);
    setGender("male");
  };

  const getWeightStatus = () => {
    if (!result) return "";
    const idealWeight = calculateIdealWeight(height);

    if (weight < idealWeight.min) return "Abaixo do ideal";
    if (weight > idealWeight.max) return "Acima do ideal";
    return "Peso ideal";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Calculadora de IMC</Text>
            <Text style={styles.subtitle}>
              Descubra seu Índice de Massa Corporal
            </Text>
          </View>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowInfoModal(true)}
          >
            <Icon name="information" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Status</Text>
              <Text style={[styles.statValue, { color: result.color }]}>
                {getWeightStatus()}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Peso Ideal</Text>
              <Text style={styles.statValue}>
                {calculateIdealWeight(height).min}-
                {calculateIdealWeight(height).max}kg
              </Text>
            </View>
          </View>
        )}

        <View style={styles.inputsContainer}>
          <GenderSelector selectedGender={gender} onGenderChange={setGender} />
          <HeightSlider height={height} onHeightChange={setHeight} />
          <WeightSelector weight={weight} onWeightChange={setWeight} />
          <AgeSelector age={age} onAgeChange={setAge} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={handleCalculate}
          >
            <Icon name="calculator" size={24} color="#FFFFFF" />
            <Text style={styles.calculateButtonText}>Calcular IMC</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Icon name="refresh" size={24} color="#6B7280" />
            <Text style={styles.resetButtonText}>Redefinir</Text>
          </TouchableOpacity>
        </View>

        {result && (
          <ResultCard
            result={result}
            height={height}
            weight={weight}
            age={age}
            gender={gender}
          />
        )}
      </ScrollView>

      <InfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 0 : 24,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  infoButton: {
    padding: 8,
  },
  quickStats: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E5E7EB",
  },
  inputsContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  actionButtons: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  calculateButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    padding: 18,
    borderRadius: 16,
    gap: 12,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  resetButton: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    padding: 18,
    borderRadius: 16,
    gap: 8,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  historyContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  clearHistoryText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
  historyCard: {
    width: 140,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  historyDate: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  historyIMC: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  historyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  historyBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  historyDetails: {
    fontSize: 12,
    color: "#6B7280",
  },
  tipsContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 40,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  tipsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tipCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipText: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 12,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default IMCCalculatorScreen;
