import { ActivityLevel, IMCResult } from '../types';

export const HEALTHY_RANGE = { min: 18.5, max: 24.9 };

export const calculateIMC = (height: number, weight: number): IMCResult => {
  if (height <= 0 || weight <= 0) {
    return {
      value: 0,
      category: 'Inválido',
      color: '#9CA3AF',
      description: 'Digite valores válidos para altura e peso',
      recommendations: ['Verifique se os valores estão corretos'],
      healthyRange: HEALTHY_RANGE,
    };
  }

  const heightInMeters = height / 100;
  const imcValue = weight / (heightInMeters * heightInMeters);
  const roundedIMC = Math.round(imcValue * 10) / 10;

  return getIMCCategory(roundedIMC);
};

const getIMCCategory = (imc: number): IMCResult => {
  let category = '';
  let color = '';
  let description = '';
  let recommendations: string[] = [];

  if (imc < 16) {
    category = 'Magreza Grave';
    color = '#EF4444';
    description = 'Risco muito elevado para a saúde';
    recommendations.push(
      'Procure orientação médica urgente',
      'Aumente o consumo de alimentos nutritivos',
      'Consulte um nutricionista'
    );
  } else if (imc >= 16 && imc < 17) {
    category = 'Magreza Moderada';
    color = '#F97316';
    description = 'Risco elevado para a saúde';
    recommendations.push(
      'Procure orientação médica',
      'Aumente a ingestão calórica',
      'Pratique exercícios de força'
    );
  } else if (imc >= 17 && imc < 18.5) {
    category = 'Magreza Leve';
    color = '#F59E0B';
    description = 'Risco moderado para a saúde';
    recommendations.push(
      'Aumente o consumo de proteínas',
      'Faça pequenas refeições ao longo do dia',
      'Consulte um nutricionista'
    );
  } else if (imc >= 18.5 && imc < 25) {
    category = 'Peso Normal';
    color = '#10B981';
    description = 'Peso saudável para sua altura';
    recommendations.push(
      'Mantenha seus hábitos saudáveis',
      'Continue com atividades físicas regulares',
      'Alimente-se de forma balanceada'
    );
  } else if (imc >= 25 && imc < 30) {
    category = 'Sobrepeso';
    color = '#F59E0B';
    description = 'Risco moderado para a saúde';
    recommendations.push(
      'Aumente a prática de exercícios',
      'Reduza o consumo de alimentos processados',
      'Mantenha uma dieta equilibrada'
    );
  } else if (imc >= 30 && imc < 35) {
    category = 'Obesidade Grau I';
    color = '#F97316';
    description = 'Risco elevado para a saúde';
    recommendations.push(
      'Procure orientação médica',
      'Inicie um programa de exercícios',
      'Consulte um nutricionista'
    );
  } else if (imc >= 35 && imc < 40) {
    category = 'Obesidade Grau II';
    color = '#EF4444';
    description = 'Risco muito elevado para a saúde';
    recommendations.push(
      'Procure orientação médica urgente',
      'Inicie acompanhamento multidisciplinar',
      'Mude seus hábitos alimentares'
    );
  } else {
    category = 'Obesidade Grau III';
    color = '#DC2626';
    description = 'Risco extremamente elevado para a saúde';
    recommendations.push(
      'Procure ajuda médica imediatamente',
      'Inicie tratamento especializado',
      'Siga rigorosamente orientações médicas'
    );
  }

  return {
    value: imc,
    category,
    color,
    description,
    recommendations,
    healthyRange: HEALTHY_RANGE,
  };
};

export const calculateIdealWeight = (height: number): { min: number; max: number } => {
  if (!Number.isFinite(height) || height <= 0) return { min: 0, max: 0 };
  const heightInMeters = height / 100;
  const minWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxWeight = 24.9 * (heightInMeters * heightInMeters);
  
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10,
  };
};

export const calculateDailyCalories = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: ActivityLevel = 'moderate'
): number => {
  if (![weight, height, age].every((value) => Number.isFinite(value) && value > 0)) return 0;
  // Fórmula de Harris-Benedict
  let bmr: number;
  
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Multiplicador de atividade
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
};

export const getHealthTips = (imcResult: IMCResult): string[] => {
  const tips: string[] = [];
  
  if (imcResult.value < 18.5) {
    tips.push(
      'Consuma alimentos ricos em nutrientes e calorias',
      'Faça 5-6 refeições pequenas ao longo do dia',
      'Inclua proteínas em todas as refeições',
      'Pratique exercícios de força para ganhar massa muscular'
    );
  } else if (imcResult.value >= 18.5 && imcResult.value < 25) {
    tips.push(
      'Mantenha uma dieta balanceada e variada',
      'Pratique pelo menos 150 minutos de exercícios semanais',
      'Beba pelo menos 2 litros de água por dia',
      'Durma 7-8 horas por noite'
    );
  } else if (imcResult.value >= 25 && imcResult.value < 30) {
    tips.push(
      'Aumente a ingestão de vegetais e frutas',
      'Reduza o consumo de alimentos processados',
      'Pratique exercícios aeróbicos regularmente',
      'Controle o tamanho das porções'
    );
  } else {
    tips.push(
      'Procure orientação médica especializada',
      'Estabeleça metas realistas de perda de peso',
      'Pratique exercícios com orientação profissional',
      'Mantenha um diário alimentar'
    );
  }

  return tips;
};
