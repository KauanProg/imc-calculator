
export type Gender = 'male' | 'female';

export interface IMCResult {
  value: number;
  category: string;
  color: string;
  description: string;
  recommendations: string[];
  healthyRange: {
    min: number;
    max: number;
  };
}

export interface UserData {
  gender: Gender;
  height: number;
  weight: number;
  age: number;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}