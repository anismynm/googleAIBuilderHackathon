import { SceneData } from './types';

export const MOCK_SCENE: SceneData = {
  id: 'scene-001',
  title: '빠니보틀: 인도 기차 여행의 모든 것',
  // 인도 기차/배낭여행 느낌의 이미지
  baseImageUrl: 'https://images.unsplash.com/photo-1532664189809-02133fee698d?q=80&w=3228&auto=format&fit=crop',
  objects: []
};

// 메인 화면 하단에 나열될 영상 썸네일 이미지 URL들
export const HOME_POSTERS = [
  "https://picsum.photos/400/600?random=1",
  "https://picsum.photos/400/600?random=2",
  "https://picsum.photos/400/600?random=3",
  "https://picsum.photos/400/600?random=4",
  "https://picsum.photos/400/600?random=5",
  "https://picsum.photos/400/600?random=6",
  "https://picsum.photos/400/600?random=7",
  "https://picsum.photos/400/600?random=8",
];

export const MOVEMENT_STEP = 40;
export const MAX_PAN = 800;
