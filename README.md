# 🩸 안 하면 무서워지는 앱 (Fear Todo App)

사용자가 오늘 미루고 있는 할 일을 입력하면, **Gemini API**가 10년 뒤 찾아올 비극적이고 으스스하지만 위트 있는 미래 경고장을 작성해 주는 고딕 다크 모드 웹 앱입니다.

---

## 🚀 주요 기능
- **미루기 방지 미래 경고장 생성**: Gemini API 기반 맞춤형 유머러스 경고글 생성
- **고딕 다크 UI**: 어두운 배경과 피처럼 붉은 강조색의 시각적 연출
- **안전한 서버리스 아키텍처**: API 키 노출 방지를 위한 Vercel Serverless Function 구현

---

## 🛠️ Vercel 배포 방법

1. **GitHub에 코드 업로드**
   - 이 ZIP 파일의 압축을 풀고 전체 코드를 GitHub 리포지토리에 푸시합니다.

2. **Vercel 프로젝트 연동**
   - [Vercel](https://vercel.com)에 로그인 후 `Add New...` > `Project`를 클릭합니다.
   - GitHub 리포지토리를 선택하여 Import합니다.

3. **환경변수(Environment Variables) 설정**
   - Vercel 프로젝트 설정의 **Environment Variables** 탭으로 이동합니다.
   - Key: `GEMINI_API_KEY`
   - Value: Google AI Studio에서 발급받은 Gemini API 키 입력

4. **Deploy**
   - Deploy 버튼을 눌러 배포를 완료합니다.

---

## 📜 라이선스
MIT License
