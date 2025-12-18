import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface WeightSelectorProps {
  weight: number;
  onWeightChange: (weight: number) => void;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({
  weight,
  onWeightChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(weight.toString());
  const inputRef = useRef<TextInput>(null);

  // Sincronizar o valor de entrada quando o peso muda externamente
  useEffect(() => {
    if (!isEditing) {
      setInputValue(weight.toString());
    }
  }, [weight, isEditing]);

  const handleDecrease = () => {
    if (weight > 20) {
      onWeightChange(weight - 1);
    }
  };

  const handleIncrease = () => {
    if (weight < 300) {
      onWeightChange(weight + 1);
    }
  };

  const handleInputFocus = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const handleInputChange = (text: string) => {
    // Permitir apenas números e ponto decimal
    const cleanedText = text.replace(/[^0-9.,]/g, '');
    
    // Substituir vírgula por ponto para consistência
    const normalizedText = cleanedText.replace(',', '.');
    
    setInputValue(normalizedText);
  };

  const handleInputSubmit = () => {
    const numericValue = parseFloat(inputValue);
    
    if (!isNaN(numericValue) && numericValue >= 20 && numericValue <= 300) {
      onWeightChange(Math.round(numericValue * 10) / 10); // Arredondar para 1 casa decimal
    } else {
      // Se valor inválido, restaurar valor anterior
      setInputValue(weight.toString());
    }
    
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleInputBlur = () => {
    handleInputSubmit();
  };

  const handleQuickWeightSelect = (quickWeight: number) => {
    onWeightChange(quickWeight);
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
    if (isEditing) {
      handleInputSubmit();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Peso</Text>
        
        <View style={styles.weightCard}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDecrease}
            activeOpacity={0.7}
          >
            <Icon name="minus-circle" size={40} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.weightDisplay}
            onPress={handleInputFocus}
            activeOpacity={0.9}
          >
            {isEditing ? (
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  style={styles.weightInput}
                  value={inputValue}
                  onChangeText={handleInputChange}
                  onSubmitEditing={handleInputSubmit}
                  onBlur={handleInputBlur}
                  keyboardType="numeric"
                  maxLength={5}
                  autoFocus
                  selectTextOnFocus
                  returnKeyType="done"
                />
                <Text style={styles.inputUnit}>kg</Text>
              </View>
            ) : (
              <>
                <Text style={styles.weightValue}>{weight}</Text>
                <Text style={styles.weightUnit}>kg</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleIncrease}
            activeOpacity={0.7}
          >
            <Icon name="plus-circle" size={40} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Valores rápidos */}
        <View style={styles.quickButtons}>
          <Text style={styles.quickLabel}>Valores rápidos:</Text>
          <View style={styles.quickButtonsRow}>
            {[50, 60, 70, 80, 90].map((quickWeight) => (
              <TouchableOpacity
                key={quickWeight}
                style={[
                  styles.quickButton,
                  weight === quickWeight && styles.quickButtonActive,
                ]}
                onPress={() => handleQuickWeightSelect(quickWeight)}
              >
                <Text
                  style={[
                    styles.quickButtonText,
                    weight === quickWeight && styles.quickButtonTextActive,
                  ]}
                >
                  {quickWeight}kg
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  weightCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
  },
  button: {
    padding: 8,
    minWidth: 48,
    alignItems: 'center',
  },
  weightDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    position: 'relative',
  },
  weightValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  weightUnit: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightInput: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3B82F6',
    textAlign: 'center',
    minWidth: 120,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    paddingVertical: 4,
    marginRight: 8,
  },
  inputUnit: {
    fontSize: 24,
    color: '#3B82F6',
    fontWeight: '500',
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EFF6FF',
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  quickButtons: {
    marginTop: 8,
  },
  quickLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  quickButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginBottom: 8,
    minWidth: '18%',
    alignItems: 'center',
  },
  quickButtonActive: {
    backgroundColor: '#3B82F6',
  },
  quickButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  quickButtonTextActive: {
    color: '#FFFFFF',
  },
  virtualKeyboard: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  keyboardLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default WeightSelector;