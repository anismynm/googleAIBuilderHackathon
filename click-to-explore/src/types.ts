export enum AppMode {
  HOME = 'HOME',
  WATCHING = 'WATCHING',
  EXPLORING = 'EXPLORING',
  DASHBOARD = 'DASHBOARD'
}

export interface Position {
  x: number;
  y: number;
}

export interface InteractiveObject {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  price?: string;
  type: 'physics' | 'commerce' | 'info';
}

export interface SceneData {
  id: string;
  title: string;
  baseImageUrl: string;
  objects: InteractiveObject[];
}
