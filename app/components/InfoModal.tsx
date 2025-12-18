import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const categories = [
    {
      name: 'Magreza Grave',
      range: '< 16',
      color: '#EF4444',
      description: 'Procure ajuda médica imediatamente',
    },
    {
      name: 'Magreza Moderada',
      range: '16 - 16.9',
      color: '#F97316',
      description: 'Risco elevado, consulte um médico',
    },
    {
      name: 'Magreza Leve',
      range: '17 - 18.4',
      color: '#F59E0B',
      description: 'Atenção, risco moderado',
    },
    {
      name: 'Peso Normal',
      range: '18.5 - 24.9',
      color: '#10B981',
      description: 'Peso saudável, mantenha os hábitos',
    },
    {
      name: 'Sobrepeso',
      range: '25 - 29.9',
      color: '#F59E0B',
      description: 'Atenção, risco moderado',
    },
    {
      name: 'Obesidade Grau I',
      range: '30 - 34.9',
      color: '#F97316',
      description: 'Risco elevado, consulte um médico',
    },
    {
      name: 'Obesidade Grau II',
      range: '35 - 39.9',
      color: '#EF4444',
      description: 'Risco muito elevado',
    },
    {
      name: 'Obesidade Grau III',
      range: '≥ 40',
      color: '#DC2626',
      description: 'Procure ajuda médica imediatamente',
    },
  ];

  const openWHOWebsite = () => {
    Linking.openURL('https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sobre o IMC</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>O que é IMC?</Text>
              <Text style={styles.sectionText}>
                O Índice de Massa Corporal (IMC) é uma medida internacional usada para 
                calcular se uma pessoa está no peso ideal. Desenvolvido pelo polímata 
                Lambert Quételet no século XIX, o IMC é um cálculo simples que permite 
                avaliar se o peso está adequado à altura.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Como calcular?</Text>
              <View style={styles.formulaCard}>
                <Text style={styles.formulaTitle}>Fórmula do IMC</Text>
                <Text style={styles.formula}>IMC = Peso ÷ (Altura × Altura)</Text>
                <Text style={styles.formulaExample}>
                  Exemplo: 70kg ÷ (1.75m × 1.75m) = 22.86
                </Text>
                <View style={styles.formulaNote}>
                  <Icon name="information" size={16} color="#3B82F6" />
                  <Text style={styles.formulaNoteText}>
                    Peso em kg, altura em metros
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Classificação</Text>
              {categories.map((category, index) => (
                <View key={index} style={styles.categoryRow}>
                  <View style={styles.categoryColor} />
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryRange}>{category.range}</Text>
                  </View>
                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Limitações</Text>
              <View style={styles.limitationsContainer}>
                <View style={styles.limitationItem}>
                  <Icon name="alert-circle" size={20} color="#F59E0B" />
                  <Text style={styles.limitationText}>
                    Não considera massa muscular
                  </Text>
                </View>
                <View style={styles.limitationItem}>
                  <Icon name="alert-circle" size={20} color="#F59E0B" />
                  <Text style={styles.limitationText}>
                    Não distingue gordura de músculo
                  </Text>
                </View>
                <View style={styles.limitationItem}>
                  <Icon name="alert-circle" size={20} color="#F59E0B" />
                  <Text style={styles.limitationText}>
                    Não considera distribuição de gordura
                  </Text>
                </View>
                <View style={styles.limitationItem}>
                  <Icon name="alert-circle" size={20} color="#F59E0B" />
                  <Text style={styles.limitationText}>
                    Varia com idade e etnia
                  </Text>
                </View>
              </View>
              <Text style={styles.disclaimer}>
                O IMC é uma ferramenta de triagem, não um diagnóstico. Consulte um 
                profissional de saúde para avaliação completa.
              </Text>
            </View>

            <TouchableOpacity style={styles.whoButton} onPress={openWHOWebsite}>
              <Icon name="web" size={20} color="#FFFFFF" />
              <Text style={styles.whoButtonText}>Site Oficial da OMS</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Entendi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  formulaCard: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 8,
  },
  formula: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  formulaExample: {
    fontSize: 14,
    color: '#4B5563',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  formulaNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formulaNoteText: {
    fontSize: 12,
    color: '#3B82F6',
    marginLeft: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  categoryColor: {
    width: 4,
    height: 40,
    backgroundColor: '#10B981',
    borderRadius: 2,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  categoryRange: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'right',
    flex: 1,
  },
  limitationsContainer: {
    marginBottom: 16,
  },
  limitationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  limitationText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
    flex: 1,
  },
  disclaimer: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  whoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  whoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  closeButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default InfoModal;