export type VisualizerSettingInfo = {
  output: string;
  turn: number;
  maxTurn: number;
  visualizerMode: boolean;
};

export type VisualizerResult = {
  svgString1: string;
  svgString2: string;
  err: string;
  score: number;
  scores: Float64Array;
};
