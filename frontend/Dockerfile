# Node.js 기반 이미지 선택
FROM node:20-alpine

# 작업 디렉터리 설정
WORKDIR /app

# package.json과 package-lock.json 파일을 복사
COPY package*.json ./

# 필요한 npm 패키지 설치
RUN npm install

# 소스 코드 복사
COPY . .

# React 앱 빌드 (프로덕션 환경인 경우)
RUN npm run build

# 포트 노출
EXPOSE 3000

# React 개발 서버 실행
CMD ["npm", "start"]