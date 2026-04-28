import { SceneData } from './types';

export const MOCK_SCENE: SceneData = {
  id: 'scene-001',
  title: '살벌한 알프스 산맥 절벽 등반 어드벤처 【스위스2】',
  // 유튜브 썸네일 이미지
  baseImageUrl: 'https://img.youtube.com/vi/6RD1vy0mnvo/maxresdefault.jpg',
  objects: []
};

// 메인 화면 하단에 나열될 영상 썸네일 이미지 URL들
export const HOME_POSTERS = [
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580204529202-04b6d0b435e0?q=80&w=400&h=600&auto=format&fit=crop",
];

export const LIVE_CHANNELS = [
  { name: "CJ ENM 채널", url: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=640&h=360&auto=format&fit=crop" },
  { name: "JTBC News", url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=640&h=360&auto=format&fit=crop" },
  { name: "무한도전 24/7", url: "https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?q=80&w=640&h=360&auto=format&fit=crop" },
  { name: "YTN LIVE", url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=640&h=360&auto=format&fit=crop" },
  { name: "스폰지밥 정주행", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=640&h=360&auto=format&fit=crop" },
];

export const MOVIES_VOD = [
  "https://images.unsplash.com/photo-1535016120720-40c746a6580c?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533488185672-04e8ee2e4bbf?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=400&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&h=600&auto=format&fit=crop",
];

export const MOVEMENT_STEP = 40;
export const MAX_PAN = 800;

