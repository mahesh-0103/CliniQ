import { create } from 'zustand';
import { PredictionHistoryItem } from './types';

type PredictionState = {
  predictions: PredictionHistoryItem[];
  addPrediction: (prediction: Omit<PredictionHistoryItem, 'date'>) => void;
};

export const usePredictionStore = create<PredictionState>((set) => ({
  predictions: [],
  addPrediction: (prediction) =>
    set((state) => ({
      predictions: [{...prediction, date: new Date().toISOString() }, ...state.predictions],
    })),
}));
