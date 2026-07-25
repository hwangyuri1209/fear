export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { task } = req.body || {};

  if (!task || typeof task !== 'string' || !task.trim()) {
    return res.status(400).json({ error: '할 일을 입력해 주세요.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: '서버 환경변수(GEMINI_API_KEY)가 설정되지 않았습니다.' });
  }

  const prompt = `사용자가 오늘 미루고 있는 할 일: "${task}"

[역할]
당신은 으스스하고 고딕스러운 분위기의 '운명의 미래 경고장 작성자'입니다.

[지시사항]
사용자가 위 할 일을 오늘 안 하고 미뤘을 때, 가까운 미래(또는 10년 뒤)에 찾아올 약간 비극적이고, 으스스하지만 위트와 잔재미가 담긴 '미래 경고장'을 작성하세요.

[작성 가이드라인]
1. 제목: 섬뜩하면서도 유머러스한 헤드라인 (예: 🩸 [비극적 경고] 2036년, 네가 미룬 그 일의 대가)
2. 본문: 긴장감 넘치는 고딕 잔혹 소설 문체로 작성하되, 과장된 비극과 반전 위트를 섞어 피식 웃음이 나오게 할 것. (3~4문단)
3. 마무리: 소름 돋으면서도 당장 그 일을 하게 만드는 강력한 한 줄 문구.
4. 한국어로 작성하며 마크다운 형식을 적절히 사용할 것.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Gemini API 호출에 실패했습니다.');
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '경고장을 작성하는 도중 흑마법에 오차가 생겼습니다.';

    return res.status(200).json({ warningLetter: resultText });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || '서버 오류가 발생했습니다.' });
  }
}
