# Click-to-Explore 🎬🛒

Click-to-Explore는 일반 영상 시청 중, 시청자가 원하는 장면에서 직접 공간을 탐험하고 등장하는 아이템을 바로 구매할 수 있는 차세대 인터랙티브 미디어 프로토타입입니다. (기존 `sceneexplore-tv` 프로젝트를 기반으로 확장된 React 애플리케이션입니다.)

## 🌟 주요 기능 (데모 시나리오)

1. **Seamless 모드 전환:** 
   - 일반 영상 시청 중, 특정 시점에 '탐험(Explore) 모드'로 진입합니다.
   - 탐험 모드 진입 시, 미리 준비된 1인칭 시점의 3D 공간 이동 영상(Fake 3D)이 재생되어 실제 공간을 돌아다니는 듯한 경험을 제공합니다.
2. **AI 기반 아이템 자동 인식:**
   - 탐험 중인 영상 내의 오브젝트(가구, 소품, 의류 등)를 Vertex AI 등 비전 AI 기술을 활용해 자동으로 인식합니다.
   - 인식된 아이템 정보는 실시간으로 화면 내 구매 창(팝업/오버레이)에 표시되어 시청자가 즉시 구매할 수 있도록 유도합니다.

## 🛠 기술 스택

- **Frontend:** React (TypeScript), CSS
- **Backend:** Node.js (Express)
- **AI / API:** Google Cloud Vertex AI API (영상 내 아이템 분석 및 메타데이터 추출용)

## 📁 프로젝트 구조

```text
click-to-explore/
├── backend/                # Node.js 백엔드 서버 (Vertex AI 연동 등 API 처리)
│   ├── .env.local          # 백엔드 환경변수 파일 (Vertex AI 인증 정보 등)
│   └── server.js           # Express 서버 진입점
├── src/                    # React 프론트엔드 소스 코드
│   ├── components/         # VideoPlayer, ExploreVideoPlayer, CreatorDashboard 등 UI 컴포넌트
│   ├── App.tsx             # 메인 애플리케이션 컴포넌트
│   └── types.ts            # TypeScript 타입 정의
├── public/                 # 정적 리소스 (index.html 등)
└── package.json            # 프론트엔드 의존성 및 스크립트
```

## 🚀 실행 방법 (How to Run)

이 프로젝트는 프론트엔드(React)와 백엔드(Node.js) 서버를 각각 실행해야 합니다.

### 1. 백엔드 실행 (Backend)

백엔드 서버는 영상 정보 처리 및 Vertex AI API와의 통신을 담당합니다.

```bash
# 백엔드 디렉토리로 이동
cd click-to-explore/backend

# 패키지 설치
npm install

# 환경변수 설정
# .env.local 파일을 생성하고 필요한 설정(예: GCP_PROJECT_ID, GOOGLE_APPLICATION_CREDENTIALS 등)을 입력하세요.

# 백엔드 서버 실행 (일반적으로 http://localhost:8080 등에서 실행됨)
npm start
```

### 2. 프론트엔드 실행 (Frontend)

프론트엔드는 사용자에게 보여지는 웹 화면입니다.

```bash
# 프로젝트 루트(click-to-explore) 디렉토리에서 실행 (또는 새 터미널 창 열기)
cd click-to-explore

# 패키지 설치
npm install

# 리액트 개발 서버 실행
npm start
```
> 프론트엔드 서버가 실행되면 브라우저에서 자동으로 `http://localhost:3000` 이 열리며 앱을 확인할 수 있습니다.

## 🎬 데모 영상 설정 가이드

현재 데모를 위해 두 가지 타입의 영상이 필요합니다. 제작 중인 영상을 아래의 위치나 컴포넌트 설정에 맞게 반영해주세요.

1. **일반 영상 (탐험 전):** `src/components/VideoPlayer.tsx` 등에서 재생할 기본 스토리/광고 영상
2. **탐험 영상 (Fake 3D 영상):** `src/components/ExploreVideoPlayer.tsx` 모드 진입 시 재생될 공간 이동 영상

*팁: 영상 파일은 `public/` 디렉토리 하위에 폴더(예: `public/videos/`)를 만들어 넣거나, 외부 클라우드 스토리지(GCS, S3, YouTube 등)에 업로드 후 해당 URL을 코드 내 상수에 연결하여 사용하는 것을 권장합니다.*

---
*Developed for Google AI Builder Hackathon.*