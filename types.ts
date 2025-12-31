
export type AspectRatio = '1:1' | '16:9' | '9:16' | '3:4' | '4:3';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  aspectRatio: AspectRatio;
}

export interface GenerationState {
  isGenerating: boolean;
  error: string | null;
  currentMessage: string;
}
