var BG=[], TC=[], VOWELS=[], LANG_NAMES={}, EXPLAIN_BASE={}, EXPLAIN_LANG={}, VD={}, SP={}, FONT_GLYPH_PATHS={};
var languageConfig=[
  {code:'ko',label:'한국어'},
  {code:'en',label:'English'},
  {code:'ja',label:'日本語'},
  {code:'zh',label:'中文(简体)'},
  {code:'zh-TW',label:'中文(繁體)'},
  {code:'vi',label:'Tiếng Việt'},
  {code:'th',label:'ไทย'},
  {code:'id',label:'Bahasa Indonesia'},
  {code:'mn',label:'Монгол'},
  {code:'ru',label:'Русский'},
  {code:'uz',label:"O'zbekcha"},
  {code:'kk',label:'Қазақша'},
  {code:'ky',label:'Кыргызча'},
  {code:'ne',label:'नेपाली'},
  {code:'my',label:'မြန်မာ'},
  {code:'km',label:'ខ្មែរ'},
  {code:'fil',label:'Filipino'},
  {code:'hi',label:'हिन्दी'},
  {code:'bn',label:'বাংলা'},
  {code:'ar',label:'العربية'},
  {code:'es',label:'Español'},
  {code:'fr',label:'Français'},
  {code:'de',label:'Deutsch'},
  {code:'sw',label:'Kiswahili'},
  {code:'ha',label:'Hausa'}
];
var SUPPORTED_LANGS=languageConfig.map(function(lang){return lang.code;});
var UI_TEXT={
  "ko": {
    "appTitle": "한글 모음 획순 배우기",
    "appSubtitle": "천 · 지 · 인 원리 · 기본/획추가/결합/이중모음",
    "nativeLang": "사용언어",
    "home": "첫 페이지로",
    "nextStep": "다음 단계로",
    "prevStep": "이전 단계로",
    "toStep1": "STEP 1로",
    "principleTitle": "천(天),지(地),인(人)",
    "principleIntro": "하늘의 해가 사람과 땅 사이를 이동하며 모음을 만듭니다.",
    "person": "사람",
    "ground": "땅",
    "sky": "하늘",
    "sheetNote": "자음은 혀로 막거나 입을 닫아서 공기의 흐름을 방해 하지만 모음은 입모양과 혀의 위치변화로만 소리냅니다.",
    "principleJumpLabel": "천지인 기본 모음 바로가기",
    "animationTitle": "획순 애니메이션",
    "replay": "다시 보기",
    "coach": "천천히 따라 써 보세요.",
    "soundListen": "소리 듣기",
    "repeat": "따라하기",
    "analyze": "분석하기",
    "audioStatus": "음성 파일이 없으면 브라우저 음성으로 재생돼요.",
    "vowelNameSound": "모음 이름과 소리",
    "listenPronunciation": "발음 듣기",
    "articulationTitle": "발음 설명",
    "relatedWords": "관련 단어",
    "imageAlt": "단어 그림",
    "imagePlaceholder": "그림",
    "flipHint": "카드를 눌러 뜻을 확인하세요.",
    "flipCard": "카드뒤집기",
    "frontSide": "앞면 보기",
    "listen": "듣기",
    "meaningKo": "뜻",
    "example": "예문",
    "combo": "조합",
    "comboListen": "조합 듣기",
    "practiceTitle": "간단한 쓰기 연습",
    "practicePlaceholder": "여기에 따라 쓰기",
    "practiceDefault": "획순을 본 뒤 직접 입력해 보세요.",
    "practiceGood": "좋아요. 정확하게 썼어요.",
    "practiceWrongPrefix": "정답은 ",
    "practiceWrongSuffix": " 입니다. 다시 따라 써 보세요.",
    "noWords": "관련 단어가 없습니다.",
    "dataPending": "데이터 준비 중",
    "pendingStroke": "획순 데이터가 추가되면 애니메이션이 표시됩니다.",
    "pendingTitle": "데이터 준비 중",
    "pendingHint": "데이터 준비 중이어도 페이지를 열 수 있어요.",
    "selectedLanguage": "선택 언어",
    "warningTrend": "주의할 발음 경향",
    "warningPrefix": "주의할 발음 경향: ",
    "articulationGeneric": "{vowel} 모음은 {sound} 소리로 발음합니다. 입모양과 혀의 위치를 확인하며 천천히 따라 해 보세요.",
    "homeCompany": "AI와 함께하는 즐거운 한국어 학습",
    "homeTeacher": "AI와 함께 쉽게 배우는 한글",
    "pageLabel": "{vowel} 페이지",
    "initError": "앱 초기화 중 오류가 났습니다. ZIP 압축을 풀어 폴더 구조를 유지해 주세요."
  },
  "en": {
    "appTitle": "Learn Korean Vowel Stroke Order",
    "appSubtitle": "Heaven · Earth · Human principle · Basic/added/combined/diphthong vowels",
    "nativeLang": "Language",
    "home": "First page",
    "nextStep": "Next step",
    "prevStep": "Previous step",
    "toStep1": "Go to STEP 1",
    "principleTitle": "Cheonjiin Principle",
    "principleIntro": "The sun of heaven moves between human and earth to form vowels.",
    "person": "Human",
    "ground": "Earth",
    "sky": "Heaven",
    "sheetNote": "Consonants block airflow with the tongue or lips, but vowels are made mainly by mouth shape and tongue position.",
    "principleJumpLabel": "Cheonjiin basic vowel shortcuts",
    "animationTitle": "Stroke order animation",
    "replay": "Replay",
    "coach": "Follow along slowly.",
    "soundListen": "Listen",
    "repeat": "Practice",
    "analyze": "Analyze",
    "audioStatus": "If no audio file is available, browser speech will play.",
    "vowelNameSound": "Vowel name and sound",
    "listenPronunciation": "Listen to pronunciation",
    "articulationTitle": "Pronunciation guide",
    "relatedWords": "Related words",
    "imageAlt": "Word image",
    "imagePlaceholder": "Word",
    "flipHint": "Tap the card to check the meaning.",
    "flipCard": "Flip card",
    "frontSide": "Front side",
    "listen": "Listen",
    "meaningKo": "Meaning",
    "example": "Example",
    "combo": "Combination",
    "comboListen": "Listen to combination",
    "practiceTitle": "Simple writing practice",
    "practicePlaceholder": "Type here",
    "practiceDefault": "After watching the stroke order, type it yourself.",
    "practiceGood": "Good. You typed it correctly.",
    "practiceWrongPrefix": "The answer is ",
    "practiceWrongSuffix": ". Try again.",
    "noWords": "No related words.",
    "dataPending": "Data coming soon",
    "pendingStroke": "The animation will appear when stroke data is added.",
    "pendingTitle": "Data coming soon",
    "pendingHint": "You can open the page even while data is being prepared.",
    "selectedLanguage": "Selected language",
    "warningTrend": "Pronunciation tendency to watch",
    "warningPrefix": "Watch this pronunciation tendency: ",
    "articulationGeneric": "Pronounce the vowel {vowel} as {sound}. Watch the mouth shape and tongue position, then repeat slowly.",
    "homeCompany": "Enjoy learning Korean with AI",
    "homeTeacher": "Learn Hangul easily with AI",
    "pageLabel": "{vowel} page",
    "initError": "The app could not start. Please unzip the ZIP file and keep the folder structure."
  },
  "ja": {
    "appTitle": "韓国語母音の筆順を学ぶ",
    "appSubtitle": "天・地・人の原理 · 基本/画追加/結合/二重母音",
    "nativeLang": "母語",
    "home": "最初のページへ",
    "nextStep": "次のステップへ",
    "prevStep": "前のステップへ",
    "toStep1": "STEP 1へ",
    "principleTitle": "天地人の原理",
    "principleIntro": "天の太陽が人と地の間を動き、母音を作ります。",
    "person": "人",
    "ground": "地",
    "sky": "天",
    "sheetNote": "子音は舌や唇で空気の流れを妨げますが、母音は口の形と舌の位置で発音します。",
    "principleJumpLabel": "天地人 基本母音ショートカット",
    "animationTitle": "筆順アニメーション",
    "replay": "もう一度",
    "coach": "ゆっくりまねして書きましょう。",
    "soundListen": "音を聞く",
    "repeat": "まねする",
    "analyze": "分析",
    "audioStatus": "音声ファイルがない場合はブラウザー音声で再生します。",
    "vowelNameSound": "母音の名前と音",
    "listenPronunciation": "発音を聞く",
    "articulationTitle": "発音説明",
    "relatedWords": "関連単語",
    "imageAlt": "単語画像",
    "imagePlaceholder": "単語",
    "flipHint": "カードを押して意味を確認しましょう。",
    "flipCard": "カードを裏返す",
    "frontSide": "表を見る",
    "listen": "聞く",
    "meaningKo": "意味",
    "example": "例文",
    "combo": "組み合わせ",
    "comboListen": "組み合わせを聞く",
    "practiceTitle": "簡単な書き練習",
    "practicePlaceholder": "ここに入力",
    "practiceDefault": "筆順を見たあと、自分で入力してみましょう。",
    "practiceGood": "いいですね。正しく入力できました。",
    "practiceWrongPrefix": "正解は ",
    "practiceWrongSuffix": " です。もう一度やってみましょう。",
    "noWords": "関連単語がありません。",
    "dataPending": "データ準備中",
    "pendingStroke": "筆順データが追加されるとアニメーションが表示されます。",
    "pendingTitle": "データ準備中",
    "pendingHint": "データ準備中でもページを開けます。",
    "selectedLanguage": "選択言語",
    "warningTrend": "注意する発音傾向",
    "warningPrefix": "注意する発音傾向: ",
    "articulationGeneric": "母音 {vowel} は {sound} の音で発音します。口の形と舌の位置を確認しながらゆっくりまねしましょう。",
    "homeCompany": "AIと一緒に楽しく韓国語学習",
    "homeTeacher": "AIと一緒にハングルを簡単に学ぶ",
    "pageLabel": "{vowel} ページ",
    "initError": "アプリを起動できませんでした。ZIPファイルを解凍してフォルダ構造を保ってください。"
  },
  "zh": {
    "appTitle": "学习韩语元音笔顺",
    "appSubtitle": "天 · 地 · 人原理 · 基本/加笔/结合/复合元音",
    "nativeLang": "母语",
    "home": "回到第一页",
    "nextStep": "下一步",
    "prevStep": "上一步",
    "toStep1": "到 STEP 1",
    "principleTitle": "天地人原理",
    "principleIntro": "天上的太阳在人和地之间移动，形成元音。",
    "person": "人",
    "ground": "地",
    "sky": "天",
    "sheetNote": "辅音会用舌头或嘴唇阻挡气流，而元音主要通过口形和舌位发音。",
    "principleJumpLabel": "天地人基本元音快捷键",
    "animationTitle": "笔顺动画",
    "replay": "再看一次",
    "coach": "请慢慢跟着写。",
    "soundListen": "听声音",
    "repeat": "跟读",
    "analyze": "分析",
    "audioStatus": "如果没有音频文件，将使用浏览器语音播放。",
    "vowelNameSound": "元音名称和声音",
    "listenPronunciation": "听发音",
    "articulationTitle": "发音说明",
    "relatedWords": "相关单词",
    "imageAlt": "单词图片",
    "imagePlaceholder": "单词",
    "flipHint": "点击卡片查看意思。",
    "flipCard": "翻卡片",
    "frontSide": "看正面",
    "listen": "听",
    "meaningKo": "意思",
    "example": "例句",
    "combo": "组合",
    "comboListen": "听组合",
    "practiceTitle": "简单书写练习",
    "practicePlaceholder": "在这里输入",
    "practiceDefault": "看完笔顺后，请自己输入。",
    "practiceGood": "很好，输入正确。",
    "practiceWrongPrefix": "正确答案是 ",
    "practiceWrongSuffix": "。请再试一次。",
    "noWords": "没有相关单词。",
    "dataPending": "数据准备中",
    "pendingStroke": "添加笔顺数据后会显示动画。",
    "pendingTitle": "数据准备中",
    "pendingHint": "数据准备中也可以打开页面。",
    "selectedLanguage": "选择的语言",
    "warningTrend": "需要注意的发音倾向",
    "warningPrefix": "需要注意的发音倾向：",
    "articulationGeneric": "元音 {vowel} 发 {sound} 的音。请观察口形和舌位，慢慢跟读。",
    "homeCompany": "和 AI 一起快乐学习韩语",
    "homeTeacher": "和 AI 一起轻松学习韩文",
    "pageLabel": "{vowel} 页面",
    "initError": "无法启动应用。请解压ZIP文件并保持文件夹结构。"
  },
  "vi": {
    "appTitle": "Học thứ tự nét nguyên âm tiếng Hàn",
    "appSubtitle": "Nguyên lý Thiên · Địa · Nhân · Nguyên âm cơ bản/thêm nét/kết hợp/đôi",
    "nativeLang": "Tiếng mẹ đẻ",
    "home": "Trang đầu",
    "nextStep": "Bước tiếp theo",
    "prevStep": "Bước trước",
    "toStep1": "Đến STEP 1",
    "principleTitle": "Nguyên lý Cheonjiin",
    "principleIntro": "Mặt trời của trời di chuyển giữa người và đất để tạo nguyên âm.",
    "person": "Người",
    "ground": "Đất",
    "sky": "Trời",
    "sheetNote": "Phụ âm chặn luồng hơi bằng lưỡi hoặc môi, còn nguyên âm được tạo chủ yếu bằng hình dạng miệng và vị trí lưỡi.",
    "principleJumpLabel": "Lối tắt nguyên âm cơ bản Cheonjiin",
    "animationTitle": "Hoạt ảnh thứ tự nét",
    "replay": "Xem lại",
    "coach": "Hãy viết theo thật chậm.",
    "soundListen": "Nghe âm",
    "repeat": "Luyện theo",
    "analyze": "Phân tích",
    "audioStatus": "Nếu không có tệp âm thanh, trình duyệt sẽ phát giọng nói.",
    "vowelNameSound": "Tên và âm nguyên âm",
    "listenPronunciation": "Nghe phát âm",
    "articulationTitle": "Giải thích phát âm",
    "relatedWords": "Từ liên quan",
    "imageAlt": "Hình từ vựng",
    "imagePlaceholder": "Từ",
    "flipHint": "Nhấn thẻ để xem nghĩa.",
    "flipCard": "Lật thẻ",
    "frontSide": "Xem mặt trước",
    "listen": "Nghe",
    "meaningKo": "Nghĩa",
    "example": "Câu ví dụ",
    "combo": "Kết hợp",
    "comboListen": "Nghe kết hợp",
    "practiceTitle": "Luyện viết đơn giản",
    "practicePlaceholder": "Nhập vào đây",
    "practiceDefault": "Sau khi xem thứ tự nét, hãy tự nhập.",
    "practiceGood": "Tốt lắm. Bạn đã nhập đúng.",
    "practiceWrongPrefix": "Đáp án là ",
    "practiceWrongSuffix": ". Hãy thử lại.",
    "noWords": "Không có từ liên quan.",
    "dataPending": "Đang chuẩn bị dữ liệu",
    "pendingStroke": "Hoạt ảnh sẽ xuất hiện khi dữ liệu nét được thêm.",
    "pendingTitle": "Đang chuẩn bị dữ liệu",
    "pendingHint": "Bạn vẫn có thể mở trang khi dữ liệu đang chuẩn bị.",
    "selectedLanguage": "Ngôn ngữ đã chọn",
    "warningTrend": "Xu hướng phát âm cần chú ý",
    "warningPrefix": "Xu hướng phát âm cần chú ý: ",
    "articulationGeneric": "Phát âm nguyên âm {vowel} là {sound}. Hãy quan sát hình dạng miệng và vị trí lưỡi rồi lặp lại chậm rãi.",
    "homeCompany": "Học tiếng Hàn vui cùng AI",
    "homeTeacher": "Học Hangul dễ dàng cùng AI",
    "pageLabel": "Trang {vowel}",
    "initError": "Không thể khởi tạo ứng dụng. Hãy giải nén ZIP và giữ nguyên cấu trúc thư mục."
  },
  "es": {
    "appTitle": "Aprende el orden de trazos de las vocales coreanas",
    "appSubtitle": "Principio cielo · tierra · persona · vocales básicas/agregadas/combinadas/diptongos",
    "nativeLang": "Lengua materna",
    "home": "Primera página",
    "nextStep": "Siguiente paso",
    "prevStep": "Paso anterior",
    "toStep1": "Ir a STEP 1",
    "principleTitle": "Principio Cheonjiin",
    "principleIntro": "El sol del cielo se mueve entre la persona y la tierra para formar vocales.",
    "person": "Persona",
    "ground": "Tierra",
    "sky": "Cielo",
    "sheetNote": "Las consonantes bloquean el aire con la lengua o los labios; las vocales se hacen principalmente con la forma de la boca y la posición de la lengua.",
    "principleJumpLabel": "Accesos a vocales básicas Cheonjiin",
    "animationTitle": "Animación del orden de trazos",
    "replay": "Ver de nuevo",
    "coach": "Síguelo lentamente.",
    "soundListen": "Escuchar",
    "repeat": "Practicar",
    "analyze": "Analizar",
    "audioStatus": "Si no hay archivo de audio, se reproducirá la voz del navegador.",
    "vowelNameSound": "Nombre y sonido de la vocal",
    "listenPronunciation": "Escuchar pronunciación",
    "articulationTitle": "Guía de pronunciación",
    "relatedWords": "Palabras relacionadas",
    "imageAlt": "Imagen de palabra",
    "imagePlaceholder": "Palabra",
    "flipHint": "Toca la tarjeta para ver el significado.",
    "flipCard": "Girar tarjeta",
    "frontSide": "Ver frente",
    "listen": "Escuchar",
    "meaningKo": "Significado",
    "example": "Ejemplo",
    "combo": "Combinación",
    "comboListen": "Escuchar combinación",
    "practiceTitle": "Práctica simple de escritura",
    "practicePlaceholder": "Escribe aquí",
    "practiceDefault": "Después de ver el orden de trazos, escríbelo.",
    "practiceGood": "Bien. Lo escribiste correctamente.",
    "practiceWrongPrefix": "La respuesta es ",
    "practiceWrongSuffix": ". Inténtalo otra vez.",
    "noWords": "No hay palabras relacionadas.",
    "dataPending": "Datos en preparación",
    "pendingStroke": "La animación aparecerá cuando se agreguen los datos de trazos.",
    "pendingTitle": "Datos en preparación",
    "pendingHint": "Puedes abrir la página aunque los datos estén en preparación.",
    "selectedLanguage": "Idioma seleccionado",
    "warningTrend": "Tendencia de pronunciación a vigilar",
    "warningPrefix": "Tendencia de pronunciación a vigilar: ",
    "articulationGeneric": "Pronuncia la vocal {vowel} como {sound}. Observa la forma de la boca y la posición de la lengua, y repite lentamente.",
    "homeCompany": "Aprende coreano con AI de forma divertida",
    "homeTeacher": "Aprende Hangul fácilmente con AI",
    "pageLabel": "Página {vowel}",
    "initError": "No se pudo iniciar la app. Descomprime el ZIP y conserva la estructura de carpetas."
  }
};
var STEP_TEXT={
  ko:[{title:'천 · 지 · 인 원리 소개',subtitle:'모음의 원리',summary:'사람(ㅣ), 땅(ㅡ), 하늘의 해(·)가 만나 한글의 기본 모음을 만듭니다.',principles:[['ㅣ','사람이 서 있는 모양'],['ㅡ','땅이 평평하게 놓인 모양'],['·','하늘의 둥근 점']]},{title:'기본모음',subtitle:'하늘의 해가 사람과 땅의 곁으로 움직여서 기본모음들이 만들어집니다.',summary:'하늘의 점이 사람과 땅 주위를 움직이며 기본 모음이 생깁니다.',principles:[['ㅏ ㅓ','하늘(·)이 사람(ㅣ) 주변을 움직입니다.'],['ㅗ ㅜ','하늘(·)이 땅(ㅡ)을 기준으로 돕니다.'],['ㅡ','움직임이 멈추면 땅의 선으로 남습니다.']]},{title:'획 추가',subtitle:'획을 추가하여 기본모음을 확장합니다.',summary:'기본 모음에 같은 방향의 획을 추가해 ㅑ, ㅕ, ㅛ, ㅠ로 확장합니다.',principles:[['ㅏ→ㅑ','오른쪽 획을 하나 더합니다.'],['ㅓ→ㅕ','왼쪽 획을 하나 더합니다.'],['ㅗ→ㅛ / ㅜ→ㅠ','위아래 획을 하나 더합니다.']]},{title:'모음 결합',subtitle:'두 개의 모음이 결합합니다.',summary:'기본 모음 또는 획 추가 모음에 ㅣ가 결합해 새로운 소리를 만듭니다.',principles:[['ㅏ+ㅣ=ㅐ','ㅏ 옆에 ㅣ가 붙습니다.'],['ㅓ+ㅣ=ㅔ','ㅓ 옆에 ㅣ가 붙습니다.'],['ㅑ/ㅕ+ㅣ','ㅒ, ㅖ로 이어집니다.']]},{title:'이중 모음',subtitle:'모음들이 결합하여 이중모음이 됩니다.',summary:'두 모음이 이어지며 입모양이 이동하는 이중모음으로 발전합니다.',principles:[['ㅗ 계열','ㅘ, ㅙ, ㅚ처럼 입모양이 앞쪽으로 움직입니다.'],['ㅜ 계열','ㅝ, ㅞ, ㅟ처럼 둥근 입에서 이동합니다.'],['ㅡ+ㅣ=ㅢ','평평한 입모양에서 ㅣ로 이어집니다.']]}],
  en:[{title:'Cheonjiin principle',subtitle:'Vowels are made from heaven, earth, and human.',summary:'Human (ㅣ), earth (ㅡ), and heaven (·) create the basic directions of Korean vowels.',principles:[['ㅣ','The shape of a standing person'],['ㅡ','The flat shape of earth'],['·','The round point of heaven']]},{title:'Basic vowels',subtitle:'Heaven beside human, heaven moving around earth',summary:'The point of heaven moves around human and earth to form basic vowels.',principles:[['ㅏ ㅓ','Heaven (·) moves around human (ㅣ).'],['ㅗ ㅜ','Heaven (·) moves around earth (ㅡ).'],['ㅡ','When the movement stops, it remains as the earth line.']]},{title:'Added-stroke vowels',subtitle:'Add one stroke to widen the sound.',summary:'Add a stroke in the same direction to make ㅑ, ㅕ, ㅛ, and ㅠ.',principles:[['ㅏ→ㅑ','Add one stroke on the right.'],['ㅓ→ㅕ','Add one stroke on the left.'],['ㅗ→ㅛ / ㅜ→ㅠ','Add one stroke above or below.']]},{title:'Combined vowels',subtitle:'Two vowels combine.',summary:'ㅣ combines with a basic or added-stroke vowel to make a new sound.',principles:[['ㅏ+ㅣ=ㅐ','ㅣ is added beside ㅏ.'],['ㅓ+ㅣ=ㅔ','ㅣ is added beside ㅓ.'],['ㅑ/ㅕ+ㅣ','They continue into ㅒ and ㅖ.']]},{title:'Diphthongs',subtitle:'The mouth shape moves as the sound develops.',summary:'Two vowels connect and become diphthongs with moving mouth shape.',principles:[['ㅗ group','The mouth moves forward in ㅘ, ㅙ, ㅚ.'],['ㅜ group','The sound moves from a rounded mouth in ㅝ, ㅞ, ㅟ.'],['ㅡ+ㅣ=ㅢ','It moves from a flat mouth shape to ㅣ.']]}]
};
STEP_TEXT.ja=[{title:'天地人の原理',subtitle:'母音は天・地・人から作られます。',summary:'人(ㅣ)、地(ㅡ)、天(·)が韓国語母音の基本方向を作ります。',principles:[['ㅣ','立っている人の形'],['ㅡ','平らな地の形'],['·','天を表す丸い点']]},{title:'基本母音',subtitle:'人の横の天、地の周りを動く天',summary:'天の点が人と地の周りを動き、基本母音になります。',principles:[['ㅏ ㅓ','天(·)が人(ㅣ)の周りを動きます。'],['ㅗ ㅜ','天(·)が地(ㅡ)を基準に動きます。'],['ㅡ','動きが止まると地の線として残ります。']]},{title:'画追加母音',subtitle:'画を一つ足して音を広げます。',summary:'基本母音に同じ方向の画を足してㅑ、ㅕ、ㅛ、ㅠに広げます。',principles:[['ㅏ→ㅑ','右側の画を一つ足します。'],['ㅓ→ㅕ','左側の画を一つ足します。'],['ㅗ→ㅛ / ㅜ→ㅠ','上または下に画を一つ足します。']]},{title:'結合母音',subtitle:'二つの母音が結合します。',summary:'基本母音または画追加母音にㅣが結合し、新しい音を作ります。',principles:[['ㅏ+ㅣ=ㅐ','ㅏの横にㅣが付きます。'],['ㅓ+ㅣ=ㅔ','ㅓの横にㅣが付きます。'],['ㅑ/ㅕ+ㅣ','ㅒ、ㅖにつながります。']]},{title:'二重母音',subtitle:'口の形が動きながら音が変化します。',summary:'二つの母音がつながり、口の形が動く二重母音になります。',principles:[['ㅗ 系列','ㅘ、ㅙ、ㅚのように口の形が前へ動きます。'],['ㅜ 系列','ㅝ、ㅞ、ㅟのように丸い口から動きます。'],['ㅡ+ㅣ=ㅢ','平らな口の形からㅣへつながります。']]}];
STEP_TEXT.zh=[{title:'天地人原理',subtitle:'元音由天、地、人构成。',summary:'人(ㅣ)、地(ㅡ)、天(·)形成韩语元音的基本方向。',principles:[['ㅣ','站立的人形'],['ㅡ','平坦的大地形'],['·','表示天空的圆点']]},{title:'基本元音',subtitle:'人旁边的天，围绕地移动的天',summary:'天的点在人和地周围移动，形成基本元音。',principles:[['ㅏ ㅓ','天(·)在人(ㅣ)周围移动。'],['ㅗ ㅜ','天(·)以地(ㅡ)为基准移动。'],['ㅡ','移动停止后留下地的横线。']]},{title:'加笔元音',subtitle:'再加一笔，让声音扩展。',summary:'在基本元音上按同一方向加一笔，扩展为ㅑ、ㅕ、ㅛ、ㅠ。',principles:[['ㅏ→ㅑ','在右边再加一笔。'],['ㅓ→ㅕ','在左边再加一笔。'],['ㅗ→ㅛ / ㅜ→ㅠ','在上方或下方再加一笔。']]},{title:'结合元音',subtitle:'两个元音结合。',summary:'ㅣ与基本元音或加笔元音结合，形成新的声音。',principles:[['ㅏ+ㅣ=ㅐ','ㅣ加在ㅏ旁边。'],['ㅓ+ㅣ=ㅔ','ㅣ加在ㅓ旁边。'],['ㅑ/ㅕ+ㅣ','继续形成ㅒ、ㅖ。']]},{title:'复合元音',subtitle:'口形移动，声音继续变化。',summary:'两个元音相连，形成口形移动的复合元音。',principles:[['ㅗ 系列','像ㅘ、ㅙ、ㅚ一样，口形向前移动。'],['ㅜ 系列','像ㅝ、ㅞ、ㅟ一样，从圆唇口形移动。'],['ㅡ+ㅣ=ㅢ','从平展口形连接到ㅣ。']]}];
STEP_TEXT.vi=[{title:'Nguyên lý Cheonjiin',subtitle:'Nguyên âm được tạo từ trời, đất và người.',summary:'Người (ㅣ), đất (ㅡ) và trời (·) tạo hướng cơ bản của nguyên âm tiếng Hàn.',principles:[['ㅣ','Hình dáng người đứng'],['ㅡ','Hình dáng mặt đất phẳng'],['·','Dấu tròn của trời']]},{title:'Nguyên âm cơ bản',subtitle:'Trời bên cạnh người, trời di chuyển quanh đất',summary:'Dấu chấm của trời di chuyển quanh người và đất để tạo nguyên âm cơ bản.',principles:[['ㅏ ㅓ','Trời (·) di chuyển quanh người (ㅣ).'],['ㅗ ㅜ','Trời (·) di chuyển theo đất (ㅡ).'],['ㅡ','Khi chuyển động dừng lại, nó còn lại như đường đất.']]},{title:'Nguyên âm thêm nét',subtitle:'Thêm một nét để mở rộng âm.',summary:'Thêm một nét cùng hướng vào nguyên âm cơ bản để tạo ㅑ, ㅕ, ㅛ, ㅠ.',principles:[['ㅏ→ㅑ','Thêm một nét bên phải.'],['ㅓ→ㅕ','Thêm một nét bên trái.'],['ㅗ→ㅛ / ㅜ→ㅠ','Thêm một nét phía trên hoặc dưới.']]},{title:'Nguyên âm kết hợp',subtitle:'Hai nguyên âm kết hợp với nhau.',summary:'ㅣ kết hợp với nguyên âm cơ bản hoặc thêm nét để tạo âm mới.',principles:[['ㅏ+ㅣ=ㅐ','ㅣ được thêm bên cạnh ㅏ.'],['ㅓ+ㅣ=ㅔ','ㅣ được thêm bên cạnh ㅓ.'],['ㅑ/ㅕ+ㅣ','Tiếp tục thành ㅒ và ㅖ.']]},{title:'Nguyên âm đôi',subtitle:'Hình dạng miệng di chuyển khi âm phát triển.',summary:'Hai nguyên âm nối với nhau thành nguyên âm đôi có chuyển động miệng.',principles:[['Nhóm ㅗ','Miệng di chuyển về phía trước trong ㅘ, ㅙ, ㅚ.'],['Nhóm ㅜ','Âm di chuyển từ miệng tròn trong ㅝ, ㅞ, ㅟ.'],['ㅡ+ㅣ=ㅢ','Di chuyển từ miệng phẳng sang ㅣ.']]}];
STEP_TEXT.es=[{title:'Principio Cheonjiin',subtitle:'Las vocales se crean con cielo, tierra y persona.',summary:'Persona (ㅣ), tierra (ㅡ) y cielo (·) crean las direcciones básicas de las vocales coreanas.',principles:[['ㅣ','Forma de una persona de pie'],['ㅡ','Forma plana de la tierra'],['·','Punto redondo del cielo']]},{title:'Vocales básicas',subtitle:'El cielo junto a la persona, el cielo alrededor de la tierra',summary:'El punto del cielo se mueve alrededor de la persona y la tierra para formar vocales básicas.',principles:[['ㅏ ㅓ','El cielo (·) se mueve alrededor de la persona (ㅣ).'],['ㅗ ㅜ','El cielo (·) se mueve tomando la tierra (ㅡ) como base.'],['ㅡ','Cuando el movimiento se detiene, queda como línea de tierra.']]},{title:'Vocales con trazo añadido',subtitle:'Añade un trazo para ampliar el sonido.',summary:'Añade un trazo en la misma dirección para formar ㅑ, ㅕ, ㅛ y ㅠ.',principles:[['ㅏ→ㅑ','Añade un trazo a la derecha.'],['ㅓ→ㅕ','Añade un trazo a la izquierda.'],['ㅗ→ㅛ / ㅜ→ㅠ','Añade un trazo arriba o abajo.']]},{title:'Vocales combinadas',subtitle:'Dos vocales se combinan.',summary:'ㅣ se combina con una vocal básica o añadida para crear un sonido nuevo.',principles:[['ㅏ+ㅣ=ㅐ','ㅣ se añade junto a ㅏ.'],['ㅓ+ㅣ=ㅔ','ㅣ se añade junto a ㅓ.'],['ㅑ/ㅕ+ㅣ','Continúan como ㅒ y ㅖ.']]},{title:'Diptongos',subtitle:'La forma de la boca se mueve mientras cambia el sonido.',summary:'Dos vocales se conectan y se convierten en diptongos con movimiento de boca.',principles:[['Grupo ㅗ','La boca se mueve hacia adelante en ㅘ, ㅙ, ㅚ.'],['Grupo ㅜ','El sonido se mueve desde una boca redondeada en ㅝ, ㅞ, ㅟ.'],['ㅡ+ㅣ=ㅢ','Pasa de una boca plana a ㅣ.']]}];
var DIR_TEXT={
  '위에서 아래로':{en:'Top to bottom',ja:'上から下へ',zh:'从上到下',vi:'Từ trên xuống dưới',es:'De arriba abajo'},
  '왼쪽에서 오른쪽으로':{en:'Left to right',ja:'左から右へ',zh:'从左到右',vi:'Từ trái sang phải',es:'De izquierda a derecha'}
};
var WARNING_TEXT={
  '‘오’처럼 하지 마세요':{en:'Do not make it sound like 오.',ja:'「オ」のようにしないでください。',zh:'不要发成“오”。',vi:'Đừng phát âm giống “오”.',es:'No lo pronuncies como “오”.'},
  '‘오’에 가깝게 하지 마세요':{en:'Do not move it too close to 오.',ja:'「オ」に近づけすぎないでください。',zh:'不要太接近“오”。',vi:'Đừng phát âm quá gần “오”.',es:'No lo acerques demasiado a “오”.'},
  '입을 너무 크게 벌리지 마세요':{en:'Do not open your mouth too wide.',ja:'口を大きく開けすぎないでください。',zh:'嘴不要张得太大。',vi:'Đừng mở miệng quá rộng.',es:'No abras demasiado la boca.'},
  '‘아’처럼 하지 마세요':{en:'Do not make it sound like 아.',ja:'「ア」のようにしないでください。',zh:'不要发成“아”。',vi:'Đừng phát âm giống “아”.',es:'No lo pronuncies como “아”.'},
  '혀를 너무 앞으로 두지 마세요':{en:'Do not place your tongue too far forward.',ja:'舌を前に出しすぎないでください。',zh:'舌头不要太靠前。',vi:'Đừng đặt lưỡi quá ra trước.',es:'No coloques la lengua demasiado adelante.'},
  'ㅓ처럼 낮아지지 않게 하세요':{en:'Do not lower it until it sounds like ㅓ.',ja:'ㅓのように低くならないようにしてください。',zh:'不要低到像ㅓ。',vi:'Đừng hạ âm đến mức giống ㅓ.',es:'No lo bajes hasta que suene como ㅓ.'},
  'ㅗ와 섞이지 않게 하세요':{en:'Keep it distinct from ㅗ.',ja:'ㅗと混ざらないようにしてください。',zh:'请和ㅗ区分开。',vi:'Hãy phân biệt rõ với ㅗ.',es:'Mantenlo distinto de ㅗ.'},
  '입술을 너무 약하게 둥글게 하지 마세요':{en:'Do not round your lips too weakly.',ja:'唇の丸め方が弱くなりすぎないようにしてください。',zh:'嘴唇不要圆得太弱。',vi:'Đừng làm tròn môi quá nhẹ.',es:'No redondees los labios con demasiada debilidad.'},
  '입술을 둥글게 하지 마세요':{en:'Do not round your lips.',ja:'唇を丸めないでください。',zh:'不要把嘴唇圆起来。',vi:'Đừng làm tròn môi.',es:'No redondees los labios.'},
  '‘어’처럼 하지 마세요':{en:'Do not make it sound like 어.',ja:'「オ/어」のようにしないでください。',zh:'不要发成“어”。',vi:'Đừng phát âm giống “어”.',es:'No lo pronuncies como “어”.'},
  '‘우’처럼 하지 마세요':{en:'Do not make it sound like 우.',ja:'「ウ」のようにしないでください。',zh:'不要发成“우”。',vi:'Đừng phát âm giống “우”.',es:'No lo pronuncies como “우”.'},
  '‘이’처럼 하지 마세요':{en:'Do not make it sound like 이.',ja:'「イ」のようにしないでください。',zh:'不要发成“이”。',vi:'Đừng phát âm giống “이”.',es:'No lo pronuncies como “이”.'},
  '‘야’를 두 음절처럼 하지 마세요':{en:'Do not split 야 into two syllables.',ja:'「야」を二音節のように分けないでください。',zh:'不要把“야”分成两个音节。',vi:'Đừng tách “야” thành hai âm tiết.',es:'No dividas “야” en dos sílabas.'},
  '‘요’처럼 하지 마세요':{en:'Do not make it sound like 요.',ja:'「ヨ/요」のようにしないでください。',zh:'不要发成“요”。',vi:'Đừng phát âm giống “요”.',es:'No lo pronuncies como “요”.'},
  '‘여’를 ‘요’처럼 하지 마세요':{en:'Do not make 여 sound like 요.',ja:'「여」を「요」のようにしないでください。',zh:'不要把“여”发成“요”。',vi:'Đừng phát âm “여” giống “요”.',es:'No pronuncies “여” como “요”.'},
  'ㅗ와 구분해 주세요':{en:'Distinguish it from ㅗ.',ja:'ㅗと区別してください。',zh:'请和ㅗ区分。',vi:'Hãy phân biệt với ㅗ.',es:'Distinguirlo de ㅗ.'},
  'ㅔ와 너무 같아지지 않게 하세요':{en:'Do not make it too similar to ㅔ.',ja:'ㅔと同じになりすぎないようにしてください。',zh:'不要和ㅔ太像。',vi:'Đừng để quá giống ㅔ.',es:'No lo hagas demasiado parecido a ㅔ.'},
  'ㅔ와 구분해 주세요':{en:'Distinguish it from ㅔ.',ja:'ㅔと区別してください。',zh:'请和ㅔ区分。',vi:'Hãy phân biệt với ㅔ.',es:'Distinguirlo de ㅔ.'},
  'ㅐ와 너무 같아지지 않게 하세요':{en:'Do not make it too similar to ㅐ.',ja:'ㅐと同じになりすぎないようにしてください。',zh:'不要和ㅐ太像。',vi:'Đừng để quá giống ㅐ.',es:'No lo hagas demasiado parecido a ㅐ.'},
  'ㅐ와 구분해 주세요':{en:'Distinguish it from ㅐ.',ja:'ㅐと区別してください。',zh:'请和ㅐ区分。',vi:'Hãy phân biệt với ㅐ.',es:'Distinguirlo de ㅐ.'},
  'ㅖ처럼 하지 마세요':{en:'Do not make it sound like ㅖ.',ja:'ㅖのようにしないでください。',zh:'不要发成ㅖ。',vi:'Đừng phát âm giống ㅖ.',es:'No lo pronuncies como ㅖ.'},
  'ㅖ와 섞이지 않게 하세요':{en:'Keep it distinct from ㅖ.',ja:'ㅖと混ざらないようにしてください。',zh:'请和ㅖ区分开。',vi:'Hãy phân biệt rõ với ㅖ.',es:'Mantenlo distinto de ㅖ.'},
  'ㅒ처럼 하지 마세요':{en:'Do not make it sound like ㅒ.',ja:'ㅒのようにしないでください。',zh:'不要发成ㅒ。',vi:'Đừng phát âm giống ㅒ.',es:'No lo pronuncies como ㅒ.'},
  'ㅒ와 섞이지 않게 하세요':{en:'Keep it distinct from ㅒ.',ja:'ㅒと混ざらないようにしてください。',zh:'请和ㅒ区分开。',vi:'Hãy phân biệt rõ với ㅒ.',es:'Mantenlo distinto de ㅒ.'},
  '‘오아’가 끊어지지 않게 하세요':{en:'Do not break 오아 into separate sounds.',ja:'「오아」が切れないようにしてください。',zh:'不要把“오아”断开。',vi:'Đừng tách “오아” thành hai âm rời.',es:'No cortes “오아” en sonidos separados.'},
  '‘왜’를 두 음절처럼 하지 마세요':{en:'Do not split 왜 into two syllables.',ja:'「왜」を二音節のように分けないでください。',zh:'不要把“왜”分成两个音节。',vi:'Đừng tách “왜” thành hai âm tiết.',es:'No dividas “왜” en dos sílabas.'},
  'ㅚ와 섞이지 않게 하세요':{en:'Keep it distinct from ㅚ.',ja:'ㅚと混ざらないようにしてください。',zh:'请和ㅚ区分开。',vi:'Hãy phân biệt rõ với ㅚ.',es:'Mantenlo distinto de ㅚ.'},
  '입술을 너무 빨리 펴지 마세요':{en:'Do not spread your lips too quickly.',ja:'唇を早く広げすぎないでください。',zh:'嘴唇不要张开得太快。',vi:'Đừng mở môi quá nhanh.',es:'No estires los labios demasiado rápido.'},
  '‘웨’처럼 하지 마세요':{en:'Do not make it sound like 웨.',ja:'「웨」のようにしないでください。',zh:'不要发成“웨”。',vi:'Đừng phát âm giống “웨”.',es:'No lo pronuncies como “웨”.'},
  '‘우어’가 끊어지지 않게 하세요':{en:'Do not break 우어 into separate sounds.',ja:'「우어」が切れないようにしてください。',zh:'不要把“우어”断开。',vi:'Đừng tách “우어” thành hai âm rời.',es:'No cortes “우어” en sonidos separados.'},
  '‘워’를 ‘오’처럼 하지 마세요':{en:'Do not make 워 sound like 오.',ja:'「워」を「오」のようにしないでください。',zh:'不要把“워”发成“오”。',vi:'Đừng phát âm “워” giống “오”.',es:'No pronuncies “워” como “오”.'},
  '‘웨’를 두 음절처럼 하지 마세요':{en:'Do not split 웨 into two syllables.',ja:'「웨」を二音節のように分けないでください。',zh:'不要把“웨”分成两个音节。',vi:'Đừng tách “웨” thành hai âm tiết.',es:'No dividas “웨” en dos sílabas.'},
  '‘으’ 소리를 빼지 마세요':{en:'Do not drop the 으 sound.',ja:'「으」の音を抜かないでください。',zh:'不要省掉“으”的音。',vi:'Đừng bỏ âm “으”.',es:'No omitas el sonido “으”.'},
  '두 소리가 분리되지 않게 하세요':{en:'Do not separate the two sounds.',ja:'二つの音を分けないでください。',zh:'不要把两个声音分开。',vi:'Đừng tách hai âm ra.',es:'No separes los dos sonidos.'},
  '한 음절로 이어서 말해보세요':{en:'Say it smoothly as one syllable.',ja:'一音節として続けて言ってみましょう。',zh:'请连成一个音节说。',vi:'Hãy nói liền thành một âm tiết.',es:'Dilo seguido como una sola sílaba.'}
};
// Common language policy shared by the Hangul learning apps.
// New UI languages reuse a close existing UI pack where this app has no full UI translation yet.
['id','mn','kk','ky','my','fil','bn','ar','fr','de','sw','ha','zh-TW'].forEach(function(lang){
  if(!UI_TEXT[lang]){
    var base = lang==='zh-TW' ? 'zh' : (lang==='kk'||lang==='ky' ? 'ru' : (lang==='bn' ? 'hi' : 'en'));
    UI_TEXT[lang]=Object.assign({}, UI_TEXT[base]||UI_TEXT.en);
  }
  if(!STEP_TEXT[lang]){
    var stepBase = lang==='zh-TW' ? 'zh' : (lang==='kk'||lang==='ky' ? 'ru' : 'en');
    STEP_TEXT[lang]=(STEP_TEXT[stepBase]||STEP_TEXT.en).map(function(step){return Object.assign({}, step, {principles:step.principles});});
  }
});
Object.assign(UI_TEXT['zh-TW'], {nativeLang:'語言'});
Object.assign(UI_TEXT.id, {nativeLang:'Bahasa'});
Object.assign(UI_TEXT.mn, {nativeLang:'Хэл'});
Object.assign(UI_TEXT.kk, {nativeLang:'Тіл'});
Object.assign(UI_TEXT.ky, {nativeLang:'Тил'});
Object.assign(UI_TEXT.my, {nativeLang:'ဘာသာစကား'});
Object.assign(UI_TEXT.fil, {nativeLang:'Wika'});
Object.assign(UI_TEXT.bn, {nativeLang:'ভাষা'});
Object.assign(UI_TEXT.ar, {nativeLang:'اللغة'});
Object.assign(UI_TEXT.fr, {nativeLang:'Langue'});
Object.assign(UI_TEXT.de, {nativeLang:'Sprache'});
Object.assign(UI_TEXT.sw, {nativeLang:'Lugha'});
Object.assign(UI_TEXT.ha, {nativeLang:'Harshe'});
Object.keys(DIR_TEXT).forEach(function(key){SUPPORTED_LANGS.forEach(function(lang){if(!Object.prototype.hasOwnProperty.call(DIR_TEXT[key],lang)) DIR_TEXT[key][lang]=lang==='ko'?key:(DIR_TEXT[key].en||key);});});
Object.keys(WARNING_TEXT).forEach(function(key){SUPPORTED_LANGS.forEach(function(lang){if(!Object.prototype.hasOwnProperty.call(WARNING_TEXT[key],lang)) WARNING_TEXT[key][lang]='';});});
function currentLang(){var el=document.getElementById('nativeLang'); var v=el ? el.value : 'ko'; return SUPPORTED_LANGS.indexOf(v)>-1 ? v : 'ko';}
function languageLabel(code){var found=languageConfig.find(function(lang){return lang.code===code;}); return (LANG_NAMES && LANG_NAMES[code]) || (found && found.label) || code;}
function t(key, vars){var lang=currentLang(); var pack=UI_TEXT[lang] || (lang==='ko' ? UI_TEXT.ko : UI_TEXT.en) || UI_TEXT.ko || {}; var text=pack[key] || UI_TEXT.en[key] || UI_TEXT.ko[key] || key; Object.keys(vars||{}).forEach(function(k){text=text.replace(new RegExp('\\{'+k+'\\}','g'),vars[k]);}); return text;}
function stepText(step){var lang=currentLang(); var list=STEP_TEXT[lang] || (lang==='ko' ? STEP_TEXT.ko : STEP_TEXT.en) || STEP_TEXT.ko; return list[step] || STEP_TEXT.en[step] || STEP_TEXT.ko[step] || {};}
function dirText(dir){var lang=currentLang(); if(lang==='ko') return dir; return (DIR_TEXT[dir]&&DIR_TEXT[dir][lang]) || (DIR_TEXT[dir]&&DIR_TEXT[dir].en) || dir;}
function warningText(text, lang){return (WARNING_TEXT[text]&&WARNING_TEXT[text][lang]) || (WARNING_TEXT[text]&&WARNING_TEXT[text].en) || text;}
function setText(selector, value){var el=document.querySelector(selector); if(el) el.textContent=value;}
function setAllText(selector, value){document.querySelectorAll(selector).forEach(function(el){el.textContent=value;});}
function renderLanguageSelector(){
  var select=document.getElementById('nativeLang');
  if(!select) return;
  var selected=SUPPORTED_LANGS.indexOf(select.value)>-1 ? select.value : 'ko';
  select.innerHTML='';
  languageConfig.forEach(function(lang){
    var option=document.createElement('option');
    option.value=lang.code;
    option.textContent=lang.label;
    select.appendChild(option);
  });
  select.value=selected;
}
/* i18n completion aliases */
['th','ne','hi','ru','uz','km'].forEach(function(lang){if(!UI_TEXT[lang]) UI_TEXT[lang]=Object.assign({}, UI_TEXT.en);});
['th','ne','hi','ru','uz','km'].forEach(function(lang){if(!STEP_TEXT[lang]) STEP_TEXT[lang]=STEP_TEXT.en.map(function(step){return Object.assign({}, step, {principles:step.principles});});});
Object.keys(DIR_TEXT).forEach(function(key){['ko','en','vi','zh','ja','th','ne','hi','es','ru','uz','km'].forEach(function(lang){if(!Object.prototype.hasOwnProperty.call(DIR_TEXT[key],lang)) DIR_TEXT[key][lang]=lang==='ko'?key:(DIR_TEXT[key].en||key);});});
Object.keys(WARNING_TEXT).forEach(function(key){['ko','en','vi','zh','ja','th','ne','hi','es','ru','uz','km'].forEach(function(lang){if(!Object.prototype.hasOwnProperty.call(WARNING_TEXT[key],lang)) WARNING_TEXT[key][lang]='';});});
Object.assign(UI_TEXT.th,{appTitle:'เรียนลำดับขีดสระเกาหลี',appSubtitle:'หลักฟ้า · ดิน · คน · สระพื้นฐาน/เพิ่มขีด/ผสม/สระประสม',nativeLang:'ภาษาแม่',home:'หน้าแรก',nextStep:'ขั้นถัดไป',prevStep:'ขั้นก่อนหน้า',toStep1:'ไป STEP 1',principleTitle:'หลัก Cheonjiin',principleIntro:'ดวงอาทิตย์แห่งฟ้าเคลื่อนระหว่างคนกับดินเพื่อสร้างสระ',person:'คน',ground:'ดิน',sky:'ฟ้า',sheetNote:'พยัญชนะขวางลมหายใจด้วยลิ้นหรือริมฝีปาก แต่สระเกิดจากรูปปากและตำแหน่งลิ้นเป็นหลัก',animationTitle:'แอนิเมชันลำดับขีด',replay:'ดูอีกครั้ง',coach:'ค่อย ๆ เขียนตามนะ',soundListen:'ฟังเสียง',repeat:'ฝึกตาม',analyze:'วิเคราะห์',audioStatus:'ถ้าไม่มีไฟล์เสียง จะใช้เสียงจากเบราว์เซอร์',vowelNameSound:'ชื่อและเสียงสระ',listenPronunciation:'ฟังการออกเสียง',articulationTitle:'คำอธิบายการออกเสียง',relatedWords:'คำที่เกี่ยวข้อง',imageAlt:'รูปคำศัพท์',imagePlaceholder:'คำ',flipHint:'แตะการ์ดเพื่อดูความหมาย',flipCard:'พลิกการ์ด',frontSide:'ดูด้านหน้า',listen:'ฟัง',meaningKo:'ภาษาเกาหลี',example:'ตัวอย่าง',combo:'การผสม',comboListen:'ฟังการผสม',practiceTitle:'ฝึกเขียนง่าย ๆ',practicePlaceholder:'พิมพ์ที่นี่',practiceDefault:'ดูขีดแล้วลองพิมพ์เอง',practiceGood:'ดีมาก พิมพ์ถูกต้อง',practiceWrongPrefix:'คำตอบคือ ',practiceWrongSuffix:' ลองอีกครั้ง',noWords:'ไม่มีคำที่เกี่ยวข้อง',dataPending:'กำลังเตรียมข้อมูล',pendingStroke:'แอนิเมชันจะแสดงเมื่อเพิ่มข้อมูลขีดแล้ว',selectedLanguage:'ภาษาที่เลือก',warningTrend:'แนวโน้มการออกเสียงที่ต้องระวัง',warningPrefix:'ควรระวัง: ',articulationGeneric:'ออกเสียงสระ {vowel} เป็นเสียง {sound} ดูรูปปากและตำแหน่งลิ้น แล้วทำตามช้า ๆ',homeCompany:'เรียนภาษาเกาหลีอย่างสนุกกับ AI',homeTeacher:'เรียนฮันกึลง่าย ๆ กับ AI',pageLabel:'หน้า {vowel}'});
Object.assign(UI_TEXT.ne,{appTitle:'कोरियाली स्वर स्ट्रोक क्रम सिक्नुहोस्',appSubtitle:'आकाश · धरती · मानिस सिद्धान्त · आधारभूत/थप/जोडिएका/द्विस्वर',nativeLang:'मातृभाषा',home:'पहिलो पृष्ठ',nextStep:'अर्को चरण',prevStep:'अघिल्लो चरण',toStep1:'STEP 1 मा जानुहोस्',principleTitle:'Cheonjiin सिद्धान्त',principleIntro:'आकाशको सूर्य मानिस र धरतीबीच सर्दै स्वर बनाउँछ।',person:'मानिस',ground:'धरती',sky:'आकाश',sheetNote:'व्यञ्जनले जिब्रो वा ओठले हावाको बाटो रोक्छ, तर स्वर मुख्यतः मुखको आकार र जिब्रोको स्थानले बन्छ।',animationTitle:'स्ट्रोक क्रम एनिमेसन',replay:'फेरि हेर्नुहोस्',coach:'बिस्तारै पछ्याएर लेख्नुहोस्।',soundListen:'आवाज सुन्नुहोस्',repeat:'अभ्यास गर्नुहोस्',analyze:'विश्लेषण',audioStatus:'अडियो फाइल नभए ब्राउजर आवाज प्रयोग हुन्छ।',vowelNameSound:'स्वरको नाम र आवाज',listenPronunciation:'उच्चारण सुन्नुहोस्',articulationTitle:'उच्चारण मार्गदर्शन',relatedWords:'सम्बन्धित शब्द',imageAlt:'शब्दको चित्र',imagePlaceholder:'शब्द',flipHint:'अर्थ हेर्न कार्ड थिच्नुहोस्।',flipCard:'कार्ड पल्टाउनुहोस्',frontSide:'अगाडि हेर्नुहोस्',listen:'सुन्नुहोस्',meaningKo:'कोरियाली',example:'उदाहरण',combo:'जोडाइ',comboListen:'जोडाइ सुन्नुहोस्',practiceTitle:'सरल लेखन अभ्यास',practicePlaceholder:'यहाँ टाइप गर्नुहोस्',practiceDefault:'स्ट्रोक क्रम हेरेपछि आफैं टाइप गर्नुहोस्।',practiceGood:'राम्रो। तपाईंले ठीक टाइप गर्नुभयो।',practiceWrongPrefix:'उत्तर ',practiceWrongSuffix:' हो। फेरि प्रयास गर्नुहोस्।',noWords:'सम्बन्धित शब्द छैन।',dataPending:'डाटा तयार हुँदैछ',pendingStroke:'स्ट्रोक डाटा थपिएपछि एनिमेसन देखिनेछ।',selectedLanguage:'चयन गरिएको भाषा',warningTrend:'ध्यान दिनुपर्ने उच्चारण प्रवृत्ति',warningPrefix:'ध्यान दिनुहोस्: ',articulationGeneric:'स्वर {vowel} लाई {sound} आवाजका रूपमा उच्चारण गर्नुहोस्। मुखको आकार र जिब्रोको स्थान हेरेर बिस्तारै दोहोर्याउनुहोस्।',homeCompany:'AI सँग रमाइलो कोरियाली सिकाइ',homeTeacher:'AI सँग सजिलो हाङ्गुल सिकाइ',pageLabel:'{vowel} पृष्ठ'});
Object.assign(UI_TEXT.hi,{appTitle:'कोरियाई स्वर स्ट्रोक क्रम सीखें',appSubtitle:'आकाश · धरती · मनुष्य सिद्धांत · मूल/जोड़े गए/संयुक्त/द्विस्वर',nativeLang:'मातृभाषा',home:'पहला पृष्ठ',nextStep:'अगला चरण',prevStep:'पिछला चरण',toStep1:'STEP 1 पर जाएँ',principleTitle:'Cheonjiin सिद्धांत',principleIntro:'आकाश का सूर्य मनुष्य और धरती के बीच चलता है और स्वर बनाता है।',person:'मनुष्य',ground:'धरती',sky:'आकाश',sheetNote:'व्यंजन जीभ या होंठों से हवा रोकते हैं, लेकिन स्वर मुख्य रूप से मुँह के आकार और जीभ की स्थिति से बनते हैं।',animationTitle:'स्ट्रोक क्रम एनिमेशन',replay:'फिर देखें',coach:'धीरे-धीरे देखकर लिखें।',soundListen:'ध्वनि सुनें',repeat:'अभ्यास करें',analyze:'विश्लेषण',audioStatus:'ऑडियो फाइल न हो तो ब्राउज़र आवाज चलेगी।',vowelNameSound:'स्वर का नाम और ध्वनि',listenPronunciation:'उच्चारण सुनें',articulationTitle:'उच्चारण मार्गदर्शन',relatedWords:'संबंधित शब्द',imageAlt:'शब्द चित्र',imagePlaceholder:'शब्द',flipHint:'अर्थ देखने के लिए कार्ड दबाएँ।',flipCard:'कार्ड पलटें',frontSide:'सामने देखें',listen:'सुनें',meaningKo:'कोरियाई',example:'उदाहरण',combo:'संयोजन',comboListen:'संयोजन सुनें',practiceTitle:'सरल लेखन अभ्यास',practicePlaceholder:'यहाँ टाइप करें',practiceDefault:'स्ट्रोक क्रम देखने के बाद खुद टाइप करें।',practiceGood:'अच्छा। आपने सही टाइप किया।',practiceWrongPrefix:'उत्तर ',practiceWrongSuffix:' है। फिर कोशिश करें।',noWords:'संबंधित शब्द नहीं।',dataPending:'डेटा तैयार हो रहा है',pendingStroke:'स्ट्रोक डेटा जुड़ने पर एनिमेशन दिखेगा।',selectedLanguage:'चुनी हुई भाषा',warningTrend:'ध्यान देने योग्य उच्चारण प्रवृत्ति',warningPrefix:'ध्यान दें: ',articulationGeneric:'स्वर {vowel} को {sound} ध्वनि की तरह बोलें। मुँह के आकार और जीभ की स्थिति देखकर धीरे-धीरे दोहराएँ।',homeCompany:'AI के साथ मज़ेदार कोरियाई सीखना',homeTeacher:'AI के साथ आसान हंगुल सीखना',pageLabel:'{vowel} पृष्ठ'});
Object.assign(UI_TEXT.ru,{appTitle:'Порядок написания корейских гласных',appSubtitle:'Принцип небо · земля · человек · базовые/добавленные/составные/дифтонги',nativeLang:'Родной язык',home:'Первая страница',nextStep:'Следующий шаг',prevStep:'Предыдущий шаг',toStep1:'К STEP 1',principleTitle:'Принцип Cheonjiin',principleIntro:'Солнце неба движется между человеком и землей, образуя гласные.',person:'Человек',ground:'Земля',sky:'Небо',sheetNote:'Согласные перекрывают поток воздуха языком или губами, а гласные образуются главным образом формой рта и положением языка.',animationTitle:'Анимация порядка штрихов',replay:'Повторить',coach:'Пишите медленно по образцу.',soundListen:'Слушать',repeat:'Практика',analyze:'Анализ',audioStatus:'Если нет аудиофайла, будет использован голос браузера.',vowelNameSound:'Название и звук гласной',listenPronunciation:'Слушать произношение',articulationTitle:'Пояснение произношения',relatedWords:'Связанные слова',imageAlt:'Картинка слова',imagePlaceholder:'Слово',flipHint:'Нажмите карточку, чтобы увидеть значение.',flipCard:'Перевернуть',frontSide:'Лицевая сторона',listen:'Слушать',meaningKo:'Корейский',example:'Пример',combo:'Сочетание',comboListen:'Слушать сочетание',practiceTitle:'Простая практика письма',practicePlaceholder:'Введите здесь',practiceDefault:'Посмотрите порядок штрихов и введите сами.',practiceGood:'Хорошо. Введено правильно.',practiceWrongPrefix:'Ответ: ',practiceWrongSuffix:'. Попробуйте еще раз.',noWords:'Нет связанных слов.',dataPending:'Данные готовятся',pendingStroke:'Анимация появится после добавления данных штрихов.',selectedLanguage:'Выбранный язык',warningTrend:'Произносительная тенденция',warningPrefix:'Обратите внимание: ',articulationGeneric:'Произнесите гласную {vowel} как звук {sound}. Следите за формой рта и положением языка, затем повторите медленно.',homeCompany:'Веселое изучение корейского с AI',homeTeacher:'Легкое изучение хангыль с AI',pageLabel:'Страница {vowel}'});
Object.assign(UI_TEXT.uz,{appTitle:'Koreys unlilari chiziq tartibini o‘rganish',appSubtitle:'Osmon · yer · inson tamoyili · asosiy/qo‘shimcha/birikkan/diftong unlilar',nativeLang:'Ona tili',home:'Birinchi sahifa',nextStep:'Keyingi bosqich',prevStep:'Oldingi bosqich',toStep1:'STEP 1 ga o‘tish',principleTitle:'Cheonjiin tamoyili',principleIntro:'Osmon quyoshi inson va yer orasida harakatlanib unlilarni hosil qiladi.',person:'Inson',ground:'Yer',sky:'Osmon',sheetNote:'Undoshlar havo oqimini til yoki lab bilan to‘sadi, unlilar esa asosan og‘iz shakli va til joylashuvi bilan hosil bo‘ladi.',animationTitle:'Chiziq tartibi animatsiyasi',replay:'Qayta ko‘rish',coach:'Sekin ergashib yozing.',soundListen:'Tinglash',repeat:'Mashq qilish',analyze:'Tahlil',audioStatus:'Audio fayl bo‘lmasa, brauzer ovozi ishlatiladi.',vowelNameSound:'Unli nomi va tovushi',listenPronunciation:'Talaffuzni tinglash',articulationTitle:'Talaffuz izohi',relatedWords:'Bog‘liq so‘zlar',imageAlt:'So‘z rasmi',imagePlaceholder:'So‘z',flipHint:'Ma’noni ko‘rish uchun kartani bosing.',flipCard:'Kartani aylantirish',frontSide:'Old tomon',listen:'Tinglash',meaningKo:'Koreyscha',example:'Misol',combo:'Biriktirish',comboListen:'Biriktirishni tinglash',practiceTitle:'Oddiy yozish mashqi',practicePlaceholder:'Bu yerga yozing',practiceDefault:'Chiziq tartibini ko‘rib, o‘zingiz yozing.',practiceGood:'Yaxshi. To‘g‘ri yozdingiz.',practiceWrongPrefix:'Javob ',practiceWrongSuffix:'. Qayta urinib ko‘ring.',noWords:'Bog‘liq so‘z yo‘q.',dataPending:'Ma’lumot tayyorlanmoqda',pendingStroke:'Chiziq ma’lumoti qo‘shilganda animatsiya chiqadi.',selectedLanguage:'Tanlangan til',warningTrend:'E’tibor beriladigan talaffuz odati',warningPrefix:'E’tibor bering: ',articulationGeneric:'{vowel} unlisi {sound} tovushi kabi talaffuz qilinadi. Og‘iz shakli va til joylashuvini kuzatib, sekin takrorlang.',homeCompany:'AI bilan qiziqarli koreys tili',homeTeacher:'AI bilan Hangulni oson o‘rganish',pageLabel:'{vowel} sahifasi'});
Object.assign(UI_TEXT.km,{appTitle:'រៀនលំដាប់គូសស្រៈកូរ៉េ',appSubtitle:'គោលការណ៍ មេឃ · ដី · មនុស្ស · ស្រៈមូលដ្ឋាន/បន្ថែម/ផ្សំ/ស្រៈពីរ',nativeLang:'ភាសាកំណើត',home:'ទំព័រដំបូង',nextStep:'ជំហានបន្ទាប់',prevStep:'ជំហានមុន',toStep1:'ទៅ STEP 1',principleTitle:'គោលការណ៍ Cheonjiin',principleIntro:'ព្រះអាទិត្យនៃមេឃផ្លាស់ទីរវាងមនុស្សនិងដី ដើម្បីបង្កើតស្រៈ។',person:'មនុស្ស',ground:'ដី',sky:'មេឃ',sheetNote:'ព្យញ្ជនៈរារាំងខ្យល់ដោយអណ្តាតឬបបូរមាត់ ប៉ុន្តែស្រៈកើតពីទម្រង់មាត់និងទីតាំងអណ្តាត។',animationTitle:'ចលនាលំដាប់គូស',replay:'មើលម្តងទៀត',coach:'សូមសរសេរតាមយឺតៗ។',soundListen:'ស្តាប់សំឡេង',repeat:'ហាត់តាម',analyze:'វិភាគ',audioStatus:'បើគ្មានឯកសារសំឡេង នឹងប្រើសំឡេងកម្មវិធីរុករក។',vowelNameSound:'ឈ្មោះនិងសំឡេងស្រៈ',listenPronunciation:'ស្តាប់ការបញ្ចេញសំឡេង',articulationTitle:'ការណែនាំបញ្ចេញសំឡេង',relatedWords:'ពាក្យពាក់ព័ន្ធ',imageAlt:'រូបពាក្យ',imagePlaceholder:'ពាក្យ',flipHint:'ចុចកាតដើម្បីមើលន័យ។',flipCard:'ត្រឡប់កាត',frontSide:'មើលផ្នែកមុខ',listen:'ស្តាប់',meaningKo:'កូរ៉េ',example:'ឧទាហរណ៍',combo:'ការផ្សំ',comboListen:'ស្តាប់ការផ្សំ',practiceTitle:'ហាត់សរសេរងាយៗ',practicePlaceholder:'វាយនៅទីនេះ',practiceDefault:'មើលលំដាប់គូស រួចវាយដោយខ្លួនឯង។',practiceGood:'ល្អ។ អ្នកវាយត្រឹមត្រូវ។',practiceWrongPrefix:'ចម្លើយគឺ ',practiceWrongSuffix:'។ សូមព្យាយាមម្តងទៀត។',noWords:'គ្មានពាក្យពាក់ព័ន្ធ។',dataPending:'កំពុងរៀបចំទិន្នន័យ',pendingStroke:'ចលនានឹងបង្ហាញពេលបន្ថែមទិន្នន័យគូស។',selectedLanguage:'ភាសាដែលបានជ្រើស',warningTrend:'ទម្លាប់បញ្ចេញសំឡេងត្រូវប្រយ័ត្ន',warningPrefix:'សូមប្រយ័ត្ន: ',articulationGeneric:'បញ្ចេញស្រៈ {vowel} ជាសំឡេង {sound}។ មើលទម្រង់មាត់និងទីតាំងអណ្តាត រួចធ្វើតាមយឺតៗ។',homeCompany:'រៀនកូរ៉េយ៉ាងរីករាយជាមួយ AI',homeTeacher:'រៀន Hangul ងាយៗជាមួយ AI',pageLabel:'ទំព័រ {vowel}'});
DIR_TEXT['위에서 아래로'].th='จากบนลงล่าง'; DIR_TEXT['위에서 아래로'].ne='माथिबाट तल'; DIR_TEXT['위에서 아래로'].hi='ऊपर से नीचे'; DIR_TEXT['위에서 아래로'].ru='Сверху вниз'; DIR_TEXT['위에서 아래로'].uz='Yuqoridan pastga'; DIR_TEXT['위에서 아래로'].km='ពីលើចុះក្រោម';
DIR_TEXT['왼쪽에서 오른쪽으로'].th='จากซ้ายไปขวา'; DIR_TEXT['왼쪽에서 오른쪽으로'].ne='बायाँबाट दायाँ'; DIR_TEXT['왼쪽에서 오른쪽으로'].hi='बाएँ से दाएँ'; DIR_TEXT['왼쪽에서 오른쪽으로'].ru='Слева направо'; DIR_TEXT['왼쪽에서 오른쪽으로'].uz='Chapdan o‘ngga'; DIR_TEXT['왼쪽에서 오른쪽으로'].km='ពីឆ្វេងទៅស្តាំ';
function localizedStepPack(lang){
  var pack={
    th:['หลัก Cheonjiin','สระพื้นฐาน','สระเพิ่มขีด','สระผสม','สระประสม'],
    ne:['Cheonjiin सिद्धान्त','आधारभूत स्वर','थप स्ट्रोक स्वर','जोडिएका स्वर','द्विस्वर'],
    hi:['Cheonjiin सिद्धांत','मूल स्वर','जोड़े गए स्ट्रोक स्वर','संयुक्त स्वर','द्विस्वर'],
    ru:['Принцип Cheonjiin','Базовые гласные','Гласные с добавленным штрихом','Составные гласные','Дифтонги'],
    uz:['Cheonjiin tamoyili','Asosiy unlilar','Qo‘shimcha chiziqli unlilar','Birikkan unlilar','Diftonglar'],
    km:['គោលការណ៍ Cheonjiin','ស្រៈមូលដ្ឋាន','ស្រៈបន្ថែមគូស','ស្រៈផ្សំ','ស្រៈពីរ']
  }[lang];
  var summaries={
    th:'เรียนรู้การสร้างสระจากหลักฟ้า ดิน และคน',
    ne:'आकाश, धरती र मानिसबाट स्वर कसरी बन्छ सिक्नुहोस्।',
    hi:'आकाश, धरती और मनुष्य से स्वर बनने का तरीका सीखें।',
    ru:'Узнайте, как гласные образуются из неба, земли и человека.',
    uz:'Unlilar osmon, yer va inson tamoyilidan qanday tuzilishini o‘rganing.',
    km:'រៀនពីរបៀបបង្កើតស្រៈពីមេឃ ដី និងមនុស្ស។'
  };
  return STEP_TEXT.en.map(function(step,i){return {title:pack[i],subtitle:pack[i],summary:i===0?summaries[lang]:pack[i],principles:step.principles};});
}
['th','ne','hi','ru','uz','km'].forEach(function(lang){STEP_TEXT[lang]=localizedStepPack(lang);});
var STEP_HOME_COPY={
  ko:[
    {title:'기본모음',subtitle:'하늘의 해가 사람과 땅의 곁으로 움직여서 기본모음들이 만들어집니다.'},
    {title:'획 추가',subtitle:'획을 추가하여 기본모음을 확장합니다.'},
    {title:'모음 결합',subtitle:'두 개의 모음이 결합합니다.'},
    {title:'이중 모음',subtitle:'모음들이 결합하여 이중모음이 됩니다.'}
  ],
  en:[
    {title:'Basic vowels',subtitle:'The sun of heaven moves beside human and earth to create the basic vowels.'},
    {title:'Added strokes',subtitle:'Added strokes expand the basic vowels.'},
    {title:'Vowel combinations',subtitle:'Two vowels combine.'},
    {title:'Diphthongs',subtitle:'Vowels combine to become diphthongs.'}
  ],
  vi:[
    {title:'Nguyên âm cơ bản',subtitle:'Mặt trời của trời di chuyển bên cạnh người và đất để tạo các nguyên âm cơ bản.'},
    {title:'Thêm nét',subtitle:'Thêm nét để mở rộng nguyên âm cơ bản.'},
    {title:'Kết hợp nguyên âm',subtitle:'Hai nguyên âm kết hợp với nhau.'},
    {title:'Nguyên âm đôi',subtitle:'Các nguyên âm kết hợp để trở thành nguyên âm đôi.'}
  ],
  zh:[
    {title:'基本元音',subtitle:'天空的太阳移动到人和地的旁边，形成基本元音。'},
    {title:'加笔',subtitle:'通过加笔扩展基本元音。'},
    {title:'元音结合',subtitle:'两个元音结合。'},
    {title:'复合元音',subtitle:'元音结合后成为复合元音。'}
  ],
  ja:[
    {title:'基本母音',subtitle:'天の太陽が人と地のそばへ動き、基本母音が作られます。'},
    {title:'画の追加',subtitle:'画を追加して基本母音を広げます。'},
    {title:'母音の結合',subtitle:'二つの母音が結合します。'},
    {title:'二重母音',subtitle:'母音が結合して二重母音になります。'}
  ],
  th:[
    {title:'สระพื้นฐาน',subtitle:'ดวงอาทิตย์แห่งฟ้าเคลื่อนไปข้างคนและดิน จึงเกิดสระพื้นฐาน'},
    {title:'เพิ่มขีด',subtitle:'เพิ่มขีดเพื่อขยายสระพื้นฐาน'},
    {title:'ผสมสระ',subtitle:'สระสองตัวผสมกัน'},
    {title:'สระประสม',subtitle:'สระผสมกันจนกลายเป็นสระประสม'}
  ],
  ne:[
    {title:'आधारभूत स्वर',subtitle:'आकाशको सूर्य मानिस र धरतीको छेउतिर सर्दा आधारभूत स्वरहरू बन्छन्।'},
    {title:'स्ट्रोक थप',subtitle:'स्ट्रोक थपेर आधारभूत स्वरहरू विस्तार गरिन्छ।'},
    {title:'स्वर जोडाइ',subtitle:'दुई स्वर जोडिन्छन्।'},
    {title:'द्विस्वर',subtitle:'स्वरहरू जोडिएर द्विस्वर बन्छन्।'}
  ],
  hi:[
    {title:'मूल स्वर',subtitle:'आकाश का सूर्य मनुष्य और धरती के पास चलता है, जिससे मूल स्वर बनते हैं।'},
    {title:'स्ट्रोक जोड़ना',subtitle:'स्ट्रोक जोड़कर मूल स्वरों का विस्तार होता है।'},
    {title:'स्वर संयोजन',subtitle:'दो स्वर मिलते हैं।'},
    {title:'द्विस्वर',subtitle:'स्वर मिलकर द्विस्वर बनते हैं।'}
  ],
  es:[
    {title:'Vocales básicas',subtitle:'El sol del cielo se mueve junto a la persona y la tierra para crear las vocales básicas.'},
    {title:'Trazos añadidos',subtitle:'Los trazos añadidos amplían las vocales básicas.'},
    {title:'Combinación de vocales',subtitle:'Dos vocales se combinan.'},
    {title:'Diptongos',subtitle:'Las vocales se combinan y se convierten en diptongos.'}
  ],
  ru:[
    {title:'Базовые гласные',subtitle:'Солнце неба движется рядом с человеком и землей, образуя базовые гласные.'},
    {title:'Добавление штриха',subtitle:'Добавленные штрихи расширяют базовые гласные.'},
    {title:'Сочетание гласных',subtitle:'Две гласные соединяются.'},
    {title:'Дифтонги',subtitle:'Гласные соединяются и становятся дифтонгами.'}
  ],
  uz:[
    {title:'Asosiy unlilar',subtitle:'Osmon quyoshi inson va yer yoniga harakatlanib asosiy unlilarni hosil qiladi.'},
    {title:'Chiziq qo‘shish',subtitle:'Chiziq qo‘shish asosiy unlilarni kengaytiradi.'},
    {title:'Unli birikmasi',subtitle:'Ikki unli birikadi.'},
    {title:'Diftonglar',subtitle:'Unlilar birikib diftonglarga aylanadi.'}
  ],
  km:[
    {title:'ស្រៈមូលដ្ឋាន',subtitle:'ព្រះអាទិត្យនៃមេឃផ្លាស់ទីទៅក្បែរមនុស្សនិងដី ដើម្បីបង្កើតស្រៈមូលដ្ឋាន។'},
    {title:'បន្ថែមគូស',subtitle:'ការបន្ថែមគូសពង្រីកស្រៈមូលដ្ឋាន។'},
    {title:'ការផ្សំស្រៈ',subtitle:'ស្រៈពីរផ្សំគ្នា។'},
    {title:'ស្រៈពីរ',subtitle:'ស្រៈផ្សំគ្នាក្លាយជាស្រៈពីរ។'}
  ]
};
Object.keys(STEP_HOME_COPY).forEach(function(lang){
  var list=STEP_TEXT[lang];
  if(!list) return;
  STEP_HOME_COPY[lang].forEach(function(copy,index){
    if(list[index+1]) Object.assign(list[index+1],copy);
  });
});
var PRINCIPLE_REPLAY_TEXT={
  ko:'다시 재생',
  en:'Replay',
  vi:'Phát lại',
  zh:'重新播放',
  ja:'もう一度再生',
  th:'เล่นอีกครั้ง',
  ne:'फेरि चलाउनुहोस्',
  hi:'फिर चलाएँ',
  es:'Reproducir de nuevo',
  ru:'Воспроизвести снова',
  uz:'Qayta ijro etish',
  km:'ចាក់ម្តងទៀត'
};
Object.keys(PRINCIPLE_REPLAY_TEXT).forEach(function(lang){
  if(UI_TEXT[lang]) UI_TEXT[lang].principleReplay=PRINCIPLE_REPLAY_TEXT[lang];
});

/* full 25-language UI policy for vowel app */
(function(){
  var packs={
    id:{appTitle:'Belajar Urutan Goresan Vokal Korea',appSubtitle:'Prinsip langit · bumi · manusia · vokal dasar/tambahan/gabungan/diftong',nativeLang:'Bahasa',home:'Halaman pertama',nextStep:'Langkah berikutnya',prevStep:'Langkah sebelumnya',toStep1:'Ke STEP 1',principleTitle:'Prinsip Cheonjiin',principleIntro:'Matahari langit bergerak di antara manusia dan bumi untuk membentuk vokal.',person:'Manusia',ground:'Bumi',sky:'Langit',sheetNote:'Konsonan menghalangi aliran udara dengan lidah atau bibir, sedangkan vokal terutama dibentuk oleh bentuk mulut dan posisi lidah.',animationTitle:'Animasi urutan goresan',replay:'Putar ulang',coach:'Ikuti dan tulis perlahan.',soundListen:'Dengarkan suara',repeat:'Ikuti',analyze:'Analisis',audioStatus:'Jika tidak ada file audio, suara browser akan digunakan.',vowelNameSound:'Nama dan bunyi vokal',listenPronunciation:'Dengarkan pelafalan',articulationTitle:'Penjelasan pelafalan',relatedWords:'Kata terkait',imageAlt:'Gambar kata',imagePlaceholder:'Kata',flipHint:'Tekan kartu untuk melihat arti.',flipCard:'Balik kartu',frontSide:'Lihat depan',listen:'Dengar',meaningKo:'Bahasa Korea',example:'Contoh',combo:'Gabungan',comboListen:'Dengar gabungan',practiceTitle:'Latihan menulis sederhana',practicePlaceholder:'Ketik di sini',practiceDefault:'Lihat urutan goresan lalu ketik sendiri.',practiceGood:'Bagus. Jawaban benar.',practiceWrongPrefix:'Jawabannya ',practiceWrongSuffix:'. Coba lagi.',noWords:'Tidak ada kata terkait.',dataPending:'Data sedang disiapkan',pendingStroke:'Animasi muncul setelah data goresan ditambahkan.',selectedLanguage:'Bahasa pilihan',warningTrend:'Hal pelafalan yang perlu diperhatikan',warningPrefix:'Perhatikan: ',articulationGeneric:'Ucapkan vokal {vowel} sebagai bunyi {sound}. Perhatikan bentuk mulut dan posisi lidah, lalu ulangi perlahan.',homeCompany:'Belajar Korea menyenangkan dengan AI',homeTeacher:'Belajar Hangul mudah dengan AI',pageLabel:'Halaman {vowel}'},
    mn:{appTitle:'Солонгос эгшгийн зурлагын дараалал',appSubtitle:'Тэнгэр · газар · хүн зарчим · үндсэн/нэмэлт/нийлмэл/хос эгшиг',nativeLang:'Хэл',home:'Эхний хуудас',nextStep:'Дараагийн алхам',prevStep:'Өмнөх алхам',toStep1:'STEP 1 рүү',principleTitle:'Чонжиин зарчим',principleIntro:'Тэнгэрийн нар хүн ба газрын хооронд хөдөлж эгшиг бүтээнэ.',person:'Хүн',ground:'Газар',sky:'Тэнгэр',sheetNote:'Гийгүүлэгч нь хэл эсвэл уруулаар агаарыг хаадаг бол эгшиг нь голчлон амны хэлбэр, хэлний байрлалаар бүтдэг.',animationTitle:'Зурлагын дарааллын хөдөлгөөн',replay:'Дахин тоглуулах',coach:'Аажмаар дагаж бичээрэй.',soundListen:'Дуу сонсох',repeat:'Дагаж хийх',analyze:'Шинжлэх',audioStatus:'Аудио файл байхгүй бол хөтөчийн дууг ашиглана.',vowelNameSound:'Эгшгийн нэр ба авиа',listenPronunciation:'Дуудлага сонсох',articulationTitle:'Дуудлагын тайлбар',relatedWords:'Холбоотой үг',imageAlt:'Үгийн зураг',imagePlaceholder:'Үг',flipHint:'Утгыг харахын тулд картыг дарна уу.',flipCard:'Карт эргүүлэх',frontSide:'Нүүрийг харах',listen:'Сонсох',meaningKo:'Солонгос',example:'Жишээ',combo:'Нийлэмж',comboListen:'Нийлэмж сонсох',practiceTitle:'Энгийн бичих дасгал',practicePlaceholder:'Энд бичнэ үү',practiceDefault:'Зурлагын дарааллыг хараад өөрөө бичнэ үү.',practiceGood:'Сайн байна. Зөв бичлээ.',practiceWrongPrefix:'Хариу нь ',practiceWrongSuffix:'. Дахин оролдоорой.',noWords:'Холбоотой үг алга.',dataPending:'Мэдээлэл бэлтгэж байна',pendingStroke:'Зурлагын мэдээлэл нэмэгдэхэд хөдөлгөөн гарна.',selectedLanguage:'Сонгосон хэл',warningTrend:'Анхаарах дуудлага',warningPrefix:'Анхаар: ',articulationGeneric:'{vowel} эгшгийг {sound} авиагаар дуудна. Амны хэлбэр, хэлний байрлалыг ажиглаад аажмаар давтаарай.',homeCompany:'AI-тай хөгжилтэй солонгос хэл',homeTeacher:'AI-тай хангыль амархан суръя',pageLabel:'{vowel} хуудас'},
    fil:{appTitle:'Matuto ng Pagkakasunod ng Guhit ng Patinig sa Korean',appSubtitle:'Prinsipyo ng langit · lupa · tao · batayan/dagdag/pinagsama/diptonggo',nativeLang:'Wika',home:'Unang pahina',nextStep:'Susunod na hakbang',prevStep:'Nakaraang hakbang',toStep1:'Pumunta sa STEP 1',principleTitle:'Prinsipyong Cheonjiin',principleIntro:'Gumagalaw ang araw ng langit sa pagitan ng tao at lupa upang makabuo ng patinig.',person:'Tao',ground:'Lupa',sky:'Langit',sheetNote:'Hinaharang ng katinig ang hangin gamit ang dila o labi, ngunit ang patinig ay pangunahing nabubuo sa hugis ng bibig at posisyon ng dila.',animationTitle:'Animasyon ng pagkakasunod ng guhit',replay:'Ulitin',coach:'Dahan-dahang gayahin ang pagsulat.',soundListen:'Pakinggan',repeat:'Gayahin',analyze:'Suriin',audioStatus:'Kung walang audio file, gagamitin ang boses ng browser.',vowelNameSound:'Pangalan at tunog ng patinig',listenPronunciation:'Pakinggan ang bigkas',articulationTitle:'Paliwanag sa bigkas',relatedWords:'Kaugnay na salita',imageAlt:'Larawan ng salita',imagePlaceholder:'Salita',flipHint:'Pindutin ang kard para makita ang kahulugan.',flipCard:'Baliktarin ang kard',frontSide:'Harap',listen:'Makinig',meaningKo:'Korean',example:'Halimbawa',combo:'Pagsasama',comboListen:'Pakinggan ang pagsasama',practiceTitle:'Simpleng pagsasanay sa pagsulat',practicePlaceholder:'I-type dito',practiceDefault:'Tingnan ang guhit at subukang i-type.',practiceGood:'Magaling. Tama ang sagot.',practiceWrongPrefix:'Ang sagot ay ',practiceWrongSuffix:'. Subukan muli.',noWords:'Walang kaugnay na salita.',dataPending:'Inihahanda ang datos',pendingStroke:'Lalabas ang animasyon kapag nadagdag ang datos ng guhit.',selectedLanguage:'Napiling wika',warningTrend:'Dapat bantayan sa bigkas',warningPrefix:'Tandaan: ',articulationGeneric:'Bigkasin ang patinig na {vowel} bilang tunog na {sound}. Tingnan ang hugis ng bibig at posisyon ng dila, pagkatapos ay ulitin nang dahan-dahan.',homeCompany:'Masayang pag-aaral ng Korean gamit ang AI',homeTeacher:'Madaling Hangul gamit ang AI',pageLabel:'Pahina {vowel}'},
    sw:{appTitle:'Jifunze Mpangilio wa Mistari ya Vokali za Kikorea',appSubtitle:'Kanuni ya mbingu · ardhi · binadamu · vokali msingi/za kuongeza/za kuunganisha/vokali mbili',nativeLang:'Lugha',home:'Ukurasa wa kwanza',nextStep:'Hatua inayofuata',prevStep:'Hatua iliyotangulia',toStep1:'Nenda STEP 1',principleTitle:'Kanuni ya Cheonjiin',principleIntro:'Jua la mbinguni husogea kati ya binadamu na ardhi ili kuunda vokali.',person:'Binadamu',ground:'Ardhi',sky:'Mbingu',sheetNote:'Konsonanti huzuia hewa kwa ulimi au midomo, lakini vokali huundwa hasa na umbo la mdomo na nafasi ya ulimi.',animationTitle:'Uhuishaji wa mpangilio wa mistari',replay:'Cheza tena',coach:'Andika polepole ukifuata.',soundListen:'Sikiliza sauti',repeat:'Fuata',analyze:'Chambua',audioStatus:'Ikiwa hakuna faili ya sauti, sauti ya kivinjari itatumika.',vowelNameSound:'Jina na sauti ya vokali',listenPronunciation:'Sikiliza matamshi',articulationTitle:'Maelezo ya matamshi',relatedWords:'Maneno yanayohusiana',imageAlt:'Picha ya neno',imagePlaceholder:'Neno',flipHint:'Bonyeza kadi kuona maana.',flipCard:'Geuza kadi',frontSide:'Tazama mbele',listen:'Sikiliza',meaningKo:'Kikorea',example:'Mfano',combo:'Muunganiko',comboListen:'Sikiliza muunganiko',practiceTitle:'Mazoezi rahisi ya kuandika',practicePlaceholder:'Andika hapa',practiceDefault:'Tazama mpangilio wa mistari kisha andika mwenyewe.',practiceGood:'Vizuri. Umeandika sahihi.',practiceWrongPrefix:'Jibu ni ',practiceWrongSuffix:'. Jaribu tena.',noWords:'Hakuna neno linalohusiana.',dataPending:'Data inaandaliwa',pendingStroke:'Uhuishaji utaonekana baada ya kuongeza data ya mistari.',selectedLanguage:'Lugha iliyochaguliwa',warningTrend:'Tahadhari ya matamshi',warningPrefix:'Tahadhari: ',articulationGeneric:'Tamka vokali {vowel} kama sauti {sound}. Angalia umbo la mdomo na nafasi ya ulimi, kisha rudia polepole.',homeCompany:'Jifunze Kikorea kwa furaha na AI',homeTeacher:'Jifunze Hangul kwa urahisi na AI',pageLabel:'Ukurasa wa {vowel}'},
    ha:{appTitle:'Koyi Tsarin Rubuta Wasulan Koriya',appSubtitle:'Ka’idar sama · kasa · mutum · wasula na asali/karawa/hadawa/biyu',nativeLang:'Harshe',home:'Shafi na farko',nextStep:'Mataki na gaba',prevStep:'Matakin baya',toStep1:'Je zuwa STEP 1',principleTitle:'Ka’idar Cheonjiin',principleIntro:'Ranar sama tana motsi tsakanin mutum da kasa don samar da wasula.',person:'Mutum',ground:'Kasa',sky:'Sama',sheetNote:'Baƙaƙe suna toshe iska da harshe ko leɓe, amma wasula suna samuwa ne musamman ta siffar baki da matsayin harshe.',animationTitle:'Motsin tsarin rubutu',replay:'Sake kunnawa',coach:'Bi a hankali ka rubuta.',soundListen:'Saurari sauti',repeat:'Bi ka maimaita',analyze:'Bincika',audioStatus:'Idan babu fayil ɗin sauti, za a yi amfani da muryar burauza.',vowelNameSound:'Suna da sautin wasali',listenPronunciation:'Saurari furuci',articulationTitle:'Bayanin furuci',relatedWords:'Kalmomi masu dangantaka',imageAlt:'Hoton kalma',imagePlaceholder:'Kalma',flipHint:'Danna kati don ganin ma’ana.',flipCard:'Juya kati',frontSide:'Duba gaba',listen:'Saurara',meaningKo:'Koriya',example:'Misali',combo:'Haɗawa',comboListen:'Saurari haɗawa',practiceTitle:'Sauƙin atisayen rubutu',practicePlaceholder:'Rubuta a nan',practiceDefault:'Kalli tsarin rubutu sannan ka rubuta da kanka.',practiceGood:'Madalla. Ka rubuta daidai.',practiceWrongPrefix:'Amsa ita ce ',practiceWrongSuffix:'. Sake gwadawa.',noWords:'Babu kalma mai dangantaka.',dataPending:'Ana shirya bayanai',pendingStroke:'Motsi zai bayyana bayan an ƙara bayanan rubutu.',selectedLanguage:'Harshe da aka zaba',warningTrend:'Abin lura a furuci',warningPrefix:'Ka lura: ',articulationGeneric:'Furta wasalin {vowel} da sautin {sound}. Kalli siffar baki da matsayin harshe, sannan ka maimaita a hankali.',homeCompany:'Koyi Koriya cikin nishadi da AI',homeTeacher:'Koyi Hangul cikin sauki da AI',pageLabel:'Shafin {vowel}'}
  };
  var alias={'zh-TW':'zh',kk:'ru',ky:'ru',bn:'hi',my:'en',ar:'en',fr:'en',de:'en'};
  Object.keys(alias).forEach(function(lang){
    UI_TEXT[lang]=Object.assign({}, UI_TEXT[alias[lang]]||UI_TEXT.en, UI_TEXT[lang]||{});
  });
  Object.keys(packs).forEach(function(lang){
    UI_TEXT[lang]=Object.assign({}, UI_TEXT.en, UI_TEXT[lang]||{}, packs[lang]);
  });
  var stepPacks={
    id:['Prinsip Cheonjiin','Vokal dasar','Goresan tambahan','Gabungan vokal','Diftong'],
    mn:['Чонжиин зарчим','Үндсэн эгшиг','Нэмэлт зурлага','Эгшгийн нийлэмж','Хос эгшиг'],
    fil:['Prinsipyong Cheonjiin','Batayang patinig','Dagdag na guhit','Pinagsamang patinig','Diptonggo'],
    sw:['Kanuni ya Cheonjiin','Vokali msingi','Mistari ya kuongeza','Muunganiko wa vokali','Vokali mbili'],
    ha:['Ka’idar Cheonjiin','Wasula na asali','Ƙarin rubutu','Haɗin wasula','Wasula biyu']
  };
  var summaries={
    id:'Pelajari bagaimana vokal dibuat dari langit, bumi, dan manusia.',
    mn:'Эгшиг тэнгэр, газар, хүнээс хэрхэн бүтдгийг сурна.',
    fil:'Alamin kung paano nabubuo ang patinig mula sa langit, lupa, at tao.',
    sw:'Jifunze jinsi vokali zinavyoundwa kutoka mbingu, ardhi, na binadamu.',
    ha:'Koyi yadda wasula suke samuwa daga sama, kasa, da mutum.'
  };
  Object.keys(stepPacks).forEach(function(lang){
    STEP_TEXT[lang]=STEP_TEXT.en.map(function(step,i){
      return {title:stepPacks[lang][i],subtitle:stepPacks[lang][i],summary:i===0?summaries[lang]:stepPacks[lang][i],principles:step.principles};
    });
  });
  ['zh-TW','kk','ky','bn','my','ar','fr','de'].forEach(function(lang){
    var base=alias[lang]||'en';
    STEP_TEXT[lang]=(STEP_TEXT[base]||STEP_TEXT.en).map(function(step){return Object.assign({}, step, {principles:step.principles});});
  });
  var homeCopy={
    id:['Vokal dasar','Goresan tambahan','Gabungan vokal','Diftong'],
    mn:['Үндсэн эгшиг','Нэмэлт зурлага','Эгшгийн нийлэмж','Хос эгшиг'],
    fil:['Batayang patinig','Dagdag na guhit','Pinagsamang patinig','Diptonggo'],
    sw:['Vokali msingi','Mistari ya kuongeza','Muunganiko wa vokali','Vokali mbili'],
    ha:['Wasula na asali','Ƙarin rubutu','Haɗin wasula','Wasula biyu']
  };
  Object.keys(homeCopy).forEach(function(lang){
    for(var i=0;i<homeCopy[lang].length;i++){
      if(STEP_TEXT[lang] && STEP_TEXT[lang][i+1]){
        STEP_TEXT[lang][i+1].title=homeCopy[lang][i];
        STEP_TEXT[lang][i+1].subtitle=homeCopy[lang][i];
      }
    }
  });
  var dir={
    id:{down:'Dari atas ke bawah',right:'Dari kiri ke kanan'},
    mn:{down:'Дээрээс доош',right:'Зүүнээс баруун'},
    fil:{down:'Mula itaas pababa',right:'Mula kaliwa pakanan'},
    sw:{down:'Kutoka juu kwenda chini',right:'Kutoka kushoto kwenda kulia'},
    ha:{down:'Daga sama zuwa kasa',right:'Daga hagu zuwa dama'}
  };
  Object.keys(dir).forEach(function(lang){
    if(DIR_TEXT['위에서 아래로']) DIR_TEXT['위에서 아래로'][lang]=dir[lang].down;
    if(DIR_TEXT['왼쪽에서 오른쪽으로']) DIR_TEXT['왼쪽에서 오른쪽으로'][lang]=dir[lang].right;
  });
  SUPPORTED_LANGS.forEach(function(lang){
    Object.keys(DIR_TEXT).forEach(function(key){
      if(!Object.prototype.hasOwnProperty.call(DIR_TEXT[key],lang)) DIR_TEXT[key][lang]=(DIR_TEXT[key][alias[lang]]||DIR_TEXT[key].en||key);
    });
    Object.keys(WARNING_TEXT).forEach(function(key){
      if(!Object.prototype.hasOwnProperty.call(WARNING_TEXT[key],lang)) WARNING_TEXT[key][lang]=(WARNING_TEXT[key][alias[lang]]||WARNING_TEXT[key].en||'');
    });
  });
})();

const EMBEDDED_VOWEL_DATA = {
  "BG": [
    "#FAECE7",
    "#E6F1FB",
    "#E1F5EE"
  ],
  "TC": [
    "#993C1D",
    "#185FA5",
    "#0F6E56"
  ],
  "VOWELS": [
    "ㅏ",
    "ㅓ",
    "ㅗ",
    "ㅜ",
    "ㅡ",
    "ㅣ",
    "ㅑ",
    "ㅕ",
    "ㅛ",
    "ㅠ",
    "ㅐ",
    "ㅔ",
    "ㅒ",
    "ㅖ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅢ"
  ],
  "LANG_NAMES": {
    "ko": "한국어",
    "en": "English",
    "vi": "Tiếng Việt",
    "zh": "中文",
    "ja": "日本語",
    "th": "ไทย",
    "ne": "नेपाली",
    "hi": "हिन्दी",
    "es": "Español",
    "ru": "Русский",
    "uz": "O'zbekcha",
    "km": "ខ្មែរ"
  },
  "EXPLAIN_BASE": {
    "ㅏ": "입을 크게 벌리고 혀는 입 아래에 닿지 않은 상태로 '아' 하세요.",
    "ㅓ": "'아'보다 입을 적게 벌리고 '아'했을때보다 혀를 조금 뒤로 한 상태로  '어' 하세요.",
    "ㅗ": "입술을 동그랗게 하고 '오' 하세요.",
    "ㅜ": "입술을 동그랗게 앞으로 조금 내밀고 혀가 입 안에서 뒤로 간 상태에서 '우'하세요. 혀가 '우''으''이' 중 '우' 할 때 제일 뒤에 있고 아래에 닿지 않고 위에 있어요.",
    "ㅡ": "턱이 살짝 나온 느낌으로 혀가 입 안에서 살짝 뒤로 간 상태에서 '으'하세요.",
    "ㅣ": "입을 옆으로 벌리면서 혀가 아래 이빨 뒤에 붙은 상태에서 '이'하세요. '으','이'를 해보면 혀가 '이'할 때 혀가 '으'보다 앞으로 나온다는  느낄거예요.",
    "ㅑ": "'이','아'를 점점 빠르게 소리내면서 '야'소리가 나도록 하세요.",
    "ㅕ": "'이', '어'를  점점 빠르게 소리내면서 '여'소리가 나도록 하세요.",
    "ㅛ": "입술을 동그랗게 하고 혀를 뒤로 움직이며 '이','오'를 빠르게 소리내면서  '요' 하세요.",
    "ㅐ": "입을 옆으로 크게 벌리며 혀는 아래 이빨 뒤에 놓고 '애'합니다.",
    "ㅔ": "입을 자연스럽게 벌리고 혀는 아래 이빨뒤에 놓고 '에'합니다. '애'보다 입이 크게 벌어지지 않아요.",
    "ㅒ": "입을 넓게 벌리고 턱이 아래로 내려가면서 '얘'합니다.",
    "ㅖ": "'이''에'를 점점 빠르게소리내면서 '예'소리가 나도록 하세요.",
    "ㅘ": "'오','아'를 점점빠르게 소리내면서 '와'소리가 나도록 하세요.",
    "ㅙ": "'오','애'를 점점 빠르게 소리내면서 '왜'소리가 나도록 하세요.",
    "ㅚ": "입술을 동그랗게 한 상태에서 입술을 조금 펴며 '외' 하세요.",
    "ㅝ": "'우','어'를 점점  빠르게 소리내면서 '워'소리가 나도록 하세요",
    "ㅞ": "우''에'를 점점 빠르게 소리내면서 '웨'소리가 나도록 하세요",
    "ㅟ": "'우','이'를 점점 빠르게 소리내면서 '위'소리가 나도록 하세요.",
    "ㅢ": "'으','이'를 점점 빠르게 소리내면서 '의'소리가 나도록 하세요.",
    "ㅠ": "입술을 동그랗게 앞으로 조금 내밀고 혀를 뒤로 움직이며 '이','우'를 빠르게 소리내면서 '유' 하세요"
  },
  "EXPLAIN_LANG": {
    "ja": {
      "prefix": "주의할 발음 경향: ",
      "map": {
        "ㅏ": "",
        "ㅗ": "",
        "ㅜ": "ㅗ와 섞이지 않게 하세요",
        "ㅣ": "",
        "ㅑ": "‘야’를 두 음절처럼 하지 마세요",
        "ㅕ": "‘요’처럼 하지 마세요",
        "ㅛ": "",
        "ㅐ": "ㅔ와 너무 같아지지 않게 하세요",
        "ㅔ": "ㅐ와 너무 같아지지 않게 하세요",
        "ㅒ": "ㅖ처럼 하지 마세요",
        "ㅖ": "ㅒ처럼 하지 마세요",
        "ㅘ": "‘오아’가 끊어지지 않게 하세요",
        "ㅙ": "‘왜’를 두 음절처럼 하지 마세요",
        "ㅚ": "입술을 너무 빨리 펴지 마세요",
        "ㅝ": "‘우어’가 끊어지지 않게 하세요",
        "ㅞ": "‘웨’를 두 음절처럼 하지 마세요",
        "ㅟ": "입술을 너무 빨리 펴지 마세요",
        "ㅓ": "‘오’처럼 하지 마세요",
        "ㅡ": "입술을 둥글게 하지 마세요",
        "ㅠ": "",
        "ㅢ": "‘으’ 소리를 빼지 마세요"
      }
    },
    "zh": {
      "prefix": "주의할 발음 경향: ",
      "map": {
        "ㅏ": "",
        "ㅓ": "‘오’에 가깝게 하지 마세요",
        "ㅜ": "",
        "ㅑ": "",
        "ㅛ": "",
        "ㅐ": "ㅔ와 구분해 주세요",
        "ㅔ": "ㅐ와 구분해 주세요",
        "ㅒ": "ㅖ와 섞이지 않게 하세요",
        "ㅘ": "",
        "ㅙ": "ㅚ와 섞이지 않게 하세요",
        "ㅚ": "‘웨’처럼 하지 마세요",
        "ㅝ": "‘워’를 ‘오’처럼 하지 마세요",
        "ㅞ": "ㅚ와 섞이지 않게 하세요",
        "ㅟ": "‘웨’처럼 하지 마세요",
        "ㅗ": "ㅓ처럼 낮아지지 않게 하세요",
        "ㅡ": "‘어’처럼 하지 마세요",
        "ㅣ": "",
        "ㅕ": "‘여’를 ‘요’처럼 하지 마세요",
        "ㅠ": "",
        "ㅖ": "ㅒ와 섞이지 않게 하세요",
        "ㅢ": "‘이’처럼 하지 마세요"
      }
    },
    "vi": {
      "prefix": "주의할 발음 경향: ",
      "map": {
        "ㅏ": "",
        "ㅗ": "",
        "ㅜ": "입술을 너무 약하게 둥글게 하지 마세요",
        "ㅟ": "",
        "ㅓ": "입을 너무 크게 벌리지 마세요",
        "ㅡ": "‘우’처럼 하지 마세요",
        "ㅣ": "",
        "ㅑ": "",
        "ㅕ": "",
        "ㅛ": "",
        "ㅠ": "",
        "ㅐ": "",
        "ㅔ": "",
        "ㅒ": "",
        "ㅖ": "",
        "ㅘ": "",
        "ㅙ": "",
        "ㅚ": "",
        "ㅝ": "",
        "ㅞ": "",
        "ㅢ": "두 소리가 분리되지 않게 하세요"
      }
    },
    "es": {
      "prefix": "주의할 발음 경향: ",
      "map": {
        "ㅏ": "",
        "ㅜ": "",
        "ㅟ": "",
        "ㅓ": "‘아’처럼 하지 마세요",
        "ㅗ": "",
        "ㅡ": "‘이’처럼 하지 마세요",
        "ㅣ": "",
        "ㅑ": "",
        "ㅕ": "",
        "ㅛ": "",
        "ㅠ": "",
        "ㅐ": "",
        "ㅔ": "",
        "ㅒ": "",
        "ㅖ": "",
        "ㅘ": "",
        "ㅙ": "",
        "ㅚ": "",
        "ㅝ": "",
        "ㅞ": "",
        "ㅢ": "‘이’처럼 하지 마세요"
      }
    },
    "en": {
      "prefix": "주의할 발음 경향: ",
      "map": {
        "ㅏ": "",
        "ㅜ": "",
        "ㅟ": "",
        "ㅓ": "혀를 너무 앞으로 두지 마세요",
        "ㅗ": "",
        "ㅡ": "혀를 너무 앞으로 두지 마세요",
        "ㅣ": "",
        "ㅑ": "",
        "ㅕ": "",
        "ㅛ": "",
        "ㅠ": "",
        "ㅐ": "",
        "ㅔ": "",
        "ㅒ": "",
        "ㅖ": "",
        "ㅘ": "",
        "ㅙ": "",
        "ㅚ": "",
        "ㅝ": "",
        "ㅞ": "",
        "ㅢ": "한 음절로 이어서 말해보세요"
      }
    },
    "default": {
      "prefix": "",
      "map": {}
    },
    "ko": {
      "prefix": "",
      "map": {}
    },
    "th": {
      "prefix": "",
      "map": {}
    },
    "ne": {
      "prefix": "",
      "map": {}
    },
    "hi": {
      "prefix": "",
      "map": {}
    },
    "ru": {
      "prefix": "",
      "map": {}
    },
    "uz": {
      "prefix": "",
      "map": {}
    },
    "km": {
      "prefix": "",
      "map": {}
    }
  },
  "VD": {
    "ㅏ": {
      "roman": "a",
      "eng": "아",
      "sound": "아",
      "combo": "아",
      "paths": [
        {
          "d": "M 45.2 8.0 L 48.9 12.0 L 49.2 132.0",
          "dir": "위에서 아래로",
          "start": [
            45,
            8
          ],
          "end": [
            49,
            132
          ]
        },
        {
          "d": "M 49.2 65.6 L 74.8 65.3",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            49,
            66
          ],
          "end": [
            75,
            65
          ]
        }
      ]
    },
    "ㅓ": {
      "roman": "eo",
      "eng": "어",
      "sound": "어",
      "combo": "어",
      "paths": [
        {
          "d": "M 42.4 60.6 L 75.5 60.0",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            42,
            61
          ],
          "end": [
            76,
            60
          ]
        },
        {
          "d": "M 73.8 8.0 L 77.6 14.4 L 77.2 132.0",
          "dir": "위에서 아래로",
          "start": [
            74,
            8
          ],
          "end": [
            77,
            132
          ]
        }
      ]
    },
    "ㅗ": {
      "roman": "o",
      "eng": "오",
      "sound": "오",
      "combo": "오",
      "paths": [
        {
          "d": "M 54.9 49.9 L 54.9 88.5",
          "dir": "위에서 아래로",
          "start": [
            55,
            50
          ],
          "end": [
            55,
            88
          ]
        },
        {
          "d": "M 8.0 88.2 L 17.0 90.1 L 112.0 88.5",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            8,
            88
          ],
          "end": [
            112,
            88
          ]
        }
      ]
    },
    "ㅜ": {
      "roman": "u",
      "eng": "우",
      "sound": "우",
      "combo": "우",
      "paths": [
        {
          "d": "M 8.0 38.6 L 19.3 40.7 L 112.0 38.1",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            8,
            39
          ],
          "end": [
            112,
            38
          ]
        },
        {
          "d": "M 62.5 41.7 L 62.1 101.9",
          "dir": "위에서 아래로",
          "start": [
            62,
            42
          ],
          "end": [
            62,
            102
          ]
        }
      ]
    },
    "ㅡ": {
      "roman": "eu",
      "eng": "으",
      "sound": "으",
      "combo": "으",
      "paths": [
        {
          "d": "M 8.0 68.7 L 18.6 71.3 L 112.0 70.6",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            8,
            69
          ],
          "end": [
            112,
            71
          ]
        }
      ]
    },
    "ㅣ": {
      "roman": "i",
      "eng": "이",
      "sound": "이",
      "combo": "이",
      "paths": [
        {
          "d": "M 58.2 8.0 L 61.8 14.5 L 61.8 132.0",
          "dir": "위에서 아래로",
          "start": [
            58,
            8
          ],
          "end": [
            62,
            132
          ]
        }
      ]
    },
    "ㅑ": {
      "roman": "ya",
      "eng": "야",
      "sound": "야",
      "combo": "야",
      "paths": [
        {
          "d": "M 43.4 8.0 L 48.8 14.0 L 49.7 132.0",
          "dir": "위에서 아래로",
          "start": [
            43,
            8
          ],
          "end": [
            50,
            132
          ]
        },
        {
          "d": "M 52.3 51.3 L 75.0 51.3",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            52,
            51
          ],
          "end": [
            75,
            51
          ]
        },
        {
          "d": "M 51.7 87.6 L 76.6 86.8",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            52,
            88
          ],
          "end": [
            77,
            87
          ]
        }
      ]
    },
    "ㅕ": {
      "roman": "yeo",
      "eng": "여",
      "sound": "여",
      "combo": "여",
      "paths": [
        {
          "d": "M 46.5 46.9 L 73.9 45.3",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            46,
            47
          ],
          "end": [
            74,
            45
          ]
        },
        {
          "d": "M 44.9 79.0 L 73.0 77.5",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            45,
            79
          ],
          "end": [
            73,
            77
          ]
        },
        {
          "d": "M 70.5 8.0 L 75.1 16.0 L 74.2 132.0",
          "dir": "위에서 아래로",
          "start": [
            70,
            8
          ],
          "end": [
            74,
            132
          ]
        }
      ]
    },
    "ㅛ": {
      "roman": "yo",
      "eng": "요",
      "sound": "요",
      "combo": "요",
      "paths": [
        {
          "d": "M 40.1 52.9 L 40.0 90.0",
          "dir": "위에서 아래로",
          "start": [
            40,
            53
          ],
          "end": [
            40,
            90
          ]
        },
        {
          "d": "M 69.4 48.8 L 69.8 89.5",
          "dir": "위에서 아래로",
          "start": [
            69,
            49
          ],
          "end": [
            70,
            90
          ]
        },
        {
          "d": "M 8.0 89.4 L 14.8 91.2 L 112.0 89.8",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            8,
            89
          ],
          "end": [
            112,
            90
          ]
        }
      ]
    },
    "ㅐ": {
      "roman": "ae",
      "eng": "애",
      "sound": "애",
      "combo": "애",
      "paths": [
        {
          "d": "M 45.2 16.3 L 48.3 22.2 L 48.3 123.7",
          "dir": "위에서 아래로",
          "start": [
            45,
            16
          ],
          "end": [
            48,
            124
          ]
        },
        {
          "d": "M 48.3 70.8 L 74.8 70.3",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            48,
            71
          ],
          "end": [
            75,
            70
          ]
        },
        {
          "d": "M 70.5 8.0 L 74.5 14.8 L 74.5 132.0",
          "dir": "위에서 아래로",
          "start": [
            71,
            8
          ],
          "end": [
            75,
            132
          ]
        }
      ]
    },
    "ㅔ": {
      "roman": "e",
      "eng": "에",
      "sound": "에",
      "combo": "에",
      "paths": [
        {
          "d": "M 35.7 66.1 L 58.9 64.2",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            36,
            66
          ],
          "end": [
            59,
            64
          ]
        },
        {
          "d": "M 54.6 14.9 L 59.5 22.1 L 59.2 124.2",
          "dir": "위에서 아래로",
          "start": [
            55,
            15
          ],
          "end": [
            59,
            124
          ]
        },
        {
          "d": "M 80.8 8.0 L 84.0 16.1 L 84.3 132.0",
          "dir": "위에서 아래로",
          "start": [
            81,
            8
          ],
          "end": [
            84,
            132
          ]
        }
      ]
    },
    "ㅒ": {
      "roman": "yae",
      "eng": "얘",
      "sound": "얘",
      "combo": "얘",
      "paths": [
        {
          "d": "M 45.1 16.3 L 49.4 24.6 L 49.7 123.4",
          "dir": "위에서 아래로",
          "start": [
            45,
            16
          ],
          "end": [
            50,
            123
          ]
        },
        {
          "d": "M 51.7 52.1 L 74.3 51.5",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            52,
            52
          ],
          "end": [
            74,
            52
          ]
        },
        {
          "d": "M 51.7 87.3 L 74.9 86.2",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            52,
            87
          ],
          "end": [
            75,
            86
          ]
        },
        {
          "d": "M 71.2 8.0 L 74.9 14.6 L 74.9 132.0",
          "dir": "위에서 아래로",
          "start": [
            71,
            8
          ],
          "end": [
            75,
            132
          ]
        }
      ]
    },
    "ㅖ": {
      "roman": "ye",
      "eng": "예",
      "sound": "예",
      "combo": "예",
      "paths": [
        {
          "d": "M 40.7 50.9 L 59.4 49.9",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            41,
            51
          ],
          "end": [
            59,
            50
          ]
        },
        {
          "d": "M 33.6 79.8 L 58.8 78.4",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            34,
            80
          ],
          "end": [
            59,
            78
          ]
        },
        {
          "d": "M 56.2 14.6 L 61.1 22.0 L 59.6 121.5",
          "dir": "위에서 아래로",
          "start": [
            56,
            15
          ],
          "end": [
            60,
            121
          ]
        },
        {
          "d": "M 82.7 8.0 L 86.4 16.3 L 85.3 132.0",
          "dir": "위에서 아래로",
          "start": [
            83,
            8
          ],
          "end": [
            85,
            132
          ]
        }
      ]
    },
    "ㅘ": {
      "roman": "wa",
      "eng": "와",
      "sound": "와",
      "combo": "와",
      "paths": [
        {
          "d": "M 36.5 55.2 L 38.4 83.5",
          "dir": "위에서 아래로",
          "start": [
            36,
            55
          ],
          "end": [
            38,
            84
          ]
        },
        {
          "d": "M 8.0 84.4 L 17.4 87.6 L 40.2 84.4 L 84.2 75.4",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            8,
            84
          ],
          "end": [
            84,
            75
          ]
        },
        {
          "d": "M 84.8 14.5 L 88.3 18.9 L 87.8 125.5",
          "dir": "위에서 아래로",
          "start": [
            85,
            14
          ],
          "end": [
            88,
            126
          ]
        },
        {
          "d": "M 89.4 69.6 L 112.0 69.6",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            89,
            70
          ],
          "end": [
            112,
            70
          ]
        }
      ]
    },
    "ㅙ": {
      "roman": "wae",
      "eng": "왜",
      "sound": "왜",
      "combo": "왜",
      "paths": [
        {
          "d": "M 35.1 56.2 L 36.0 86.1",
          "dir": "위에서 아래로",
          "start": [
            35,
            56
          ],
          "end": [
            36,
            86
          ]
        },
        {
          "d": "M 11.8 87.2 L 22.5 90.7 L 78.2 76.6",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            12,
            87
          ],
          "end": [
            78,
            77
          ]
        },
        {
          "d": "M 78.7 15.5 L 83.7 23.8 L 82.7 120.2",
          "dir": "위에서 아래로",
          "start": [
            79,
            15
          ],
          "end": [
            83,
            120
          ]
        },
        {
          "d": "M 85.1 70.0 L 106.3 68.9",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            85,
            70
          ],
          "end": [
            106,
            69
          ]
        },
        {
          "d": "M 102.3 8.0 L 108.2 14.3 L 106.6 132.0",
          "dir": "위에서 아래로",
          "start": [
            102,
            8
          ],
          "end": [
            107,
            132
          ]
        }
      ]
    },
    "ㅚ": {
      "roman": "oe",
      "eng": "외",
      "sound": "외",
      "combo": "외",
      "paths": [
        {
          "d": "M 43.5 58.0 L 43.4 85.9",
          "dir": "위에서 아래로",
          "start": [
            44,
            58
          ],
          "end": [
            43,
            86
          ]
        },
        {
          "d": "M 14.8 88.2 L 21.4 90.8 L 98.7 78.1",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            15,
            88
          ],
          "end": [
            99,
            78
          ]
        },
        {
          "d": "M 101.2 8.0 L 105.2 15.5 L 104.2 132.0",
          "dir": "위에서 아래로",
          "start": [
            101,
            8
          ],
          "end": [
            104,
            132
          ]
        }
      ]
    },
    "ㅝ": {
      "roman": "wo",
      "eng": "워",
      "sound": "워",
      "combo": "워",
      "paths": [
        {
          "d": "M 13.9 78.5 L 26.1 80.0 L 90.6 68.7",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            14,
            79
          ],
          "end": [
            91,
            69
          ]
        },
        {
          "d": "M 53.7 76.6 L 52.7 120.3",
          "dir": "위에서 아래로",
          "start": [
            54,
            77
          ],
          "end": [
            53,
            120
          ]
        },
        {
          "d": "M 74.6 87.2 L 104.3 86.5",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            75,
            87
          ],
          "end": [
            104,
            87
          ]
        },
        {
          "d": "M 103.5 8.0 L 106.1 15.3 L 105.7 132.0",
          "dir": "위에서 아래로",
          "start": [
            103,
            8
          ],
          "end": [
            106,
            132
          ]
        }
      ]
    },
    "ㅞ": {
      "roman": "we",
      "eng": "웨",
      "sound": "웨",
      "combo": "웨",
      "paths": [
        {
          "d": "M 13.4 64.0 L 25.7 65.1 L 44.6 63.4 L 69.6 55.9",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            13,
            64
          ],
          "end": [
            70,
            56
          ]
        },
        {
          "d": "M 40.3 65.7 L 40.1 110.8",
          "dir": "위에서 아래로",
          "start": [
            40,
            66
          ],
          "end": [
            40,
            111
          ]
        },
        {
          "d": "M 60.0 80.3 L 82.5 78.8",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            60,
            80
          ],
          "end": [
            83,
            79
          ]
        },
        {
          "d": "M 80.2 16.6 L 83.1 20.6 L 83.1 120.5",
          "dir": "위에서 아래로",
          "start": [
            80,
            17
          ],
          "end": [
            83,
            121
          ]
        },
        {
          "d": "M 102.3 8.0 L 106.6 13.4 L 106.4 132.0",
          "dir": "위에서 아래로",
          "start": [
            102,
            8
          ],
          "end": [
            106,
            132
          ]
        }
      ]
    },
    "ㅟ": {
      "roman": "wi",
      "eng": "위",
      "sound": "위",
      "combo": "위",
      "paths": [
        {
          "d": "M 13.2 68.9 L 24.5 72.1 L 99.8 58.5",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            13,
            69
          ],
          "end": [
            100,
            58
          ]
        },
        {
          "d": "M 54.5 68.8 L 54.2 117.8",
          "dir": "위에서 아래로",
          "start": [
            54,
            69
          ],
          "end": [
            54,
            118
          ]
        },
        {
          "d": "M 100.7 8.0 L 106.8 16.1 L 106.3 132.0",
          "dir": "위에서 아래로",
          "start": [
            101,
            8
          ],
          "end": [
            106,
            132
          ]
        }
      ]
    },
    "ㅢ": {
      "roman": "ui",
      "eng": "의",
      "sound": "의",
      "combo": "의",
      "paths": [
        {
          "d": "M 14.3 92.4 L 38.2 93.0 L 104.2 78.4",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            14,
            92
          ],
          "end": [
            104,
            78
          ]
        },
        {
          "d": "M 102.8 8.0 L 105.7 15.1 L 105.7 132.0",
          "dir": "위에서 아래로",
          "start": [
            103,
            8
          ],
          "end": [
            106,
            132
          ]
        }
      ]
    },
    "ㅠ": {
      "roman": "yu",
      "eng": "유",
      "sound": "유",
      "combo": "유",
      "paths": [
        {
          "d": "M 8.0 36.5 L 17.9 38.6 L 112.0 35.7",
          "dir": "왼쪽에서 오른쪽으로",
          "start": [
            8,
            36
          ],
          "end": [
            112,
            36
          ]
        },
        {
          "d": "M 42.1 38.9 L 41.9 100.5",
          "dir": "위에서 아래로",
          "start": [
            42,
            39
          ],
          "end": [
            42,
            101
          ]
        },
        {
          "d": "M 81.0 37.6 L 81.0 104.3",
          "dir": "위에서 아래로",
          "start": [
            81,
            38
          ],
          "end": [
            81,
            104
          ]
        }
      ]
    }
  },
  "SP": {
    "1": {
      "l": "매우 느림",
      "d": 1800
    },
    "2": {
      "l": "느리게",
      "d": 1100
    },
    "3": {
      "l": "보통",
      "d": 650
    },
    "4": {
      "l": "빠르게",
      "d": 360
    },
    "5": {
      "l": "매우 빠름",
      "d": 190
    }
  },
  "SHEET_VOWEL_DATA": {
    "ㅏ": {
      "vowel": "ㅏ",
      "sound_name": "아",
      "sound": "아",
      "articulation": "입을 크게 벌리고 혀는 입 아래에 닿지 않은 상태로 '아' 하세요.",
      "words": [
        {
          "id": "gaji",
          "word": "가지",
          "note": "채소",
          "image": "images/words/gaji.png",
          "audio": "audio/words/gaji.mp3",
          "meaning": {
            "ko": "가지",
            "en": "eggplant",
            "vi": "cà tím",
            "zh": "茄子",
            "ja": "なす",
            "th": "มะเขือยาว",
            "ne": "भ्यान्टा",
            "hi": "बैंगन",
            "es": "berenjena",
            "ru": "баклажан",
            "uz": "baqlajon",
            "km": "ត្រប់"
          },
          "example": {}
        },
        {
          "id": "gagu",
          "word": "가구",
          "note": "",
          "image": "images/words/gagu.png",
          "audio": "audio/words/gagu.mp3",
          "meaning": {
            "ko": "가구",
            "en": "furniture",
            "vi": "đồ nội thất",
            "zh": "家具",
            "ja": "家具",
            "th": "เฟอร์นิเจอร์",
            "ne": "फर्निचर",
            "hi": "फर्नीचर",
            "es": "muebles",
            "ru": "мебель",
            "uz": "mebel",
            "km": "គ្រឿងសង្ហារឹម"
          },
          "example": {}
        }
      ],
      "warnings": {
        "ja": "",
        "zh": "",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅓ": {
      "vowel": "ㅓ",
      "sound_name": "어",
      "sound": "어",
      "articulation": "'아'보다 입을 적게 벌리고 '아'했을때보다 혀를 조금 뒤로 한 상태로  '어' 하세요.",
      "words": [
        {
          "id": "geowi",
          "word": "거위",
          "note": "",
          "image": "images/words/geowi.png",
          "audio": "audio/words/geowi.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "geomi",
          "word": "거미",
          "note": "",
          "image": "images/words/geomi.png",
          "audio": "audio/words/geomi.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘오’처럼 하지 마세요",
        "zh": "‘오’에 가깝게 하지 마세요",
        "vi": "입을 너무 크게 벌리지 마세요",
        "es": "‘아’처럼 하지 마세요",
        "en": "혀를 너무 앞으로 두지 마세요"
      }
    },
    "ㅗ": {
      "vowel": "ㅗ",
      "sound_name": "오",
      "sound": "오",
      "articulation": "입술을 동그랗게 하고 '오' 하세요.",
      "words": [
        {
          "id": "oi",
          "word": "오이",
          "note": "",
          "image": "images/words/oi.png",
          "audio": "audio/words/oi.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "oi",
          "word": "오이",
          "note": "",
          "image": "images/words/oi.png",
          "audio": "audio/words/oi.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "",
        "zh": "ㅓ처럼 낮아지지 않게 하세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅜ": {
      "vowel": "ㅜ",
      "sound_name": "우",
      "sound": "우",
      "articulation": "입술을 동그랗게 앞으로 조금 내밀고 혀가 입 안에서 뒤로 간 상태에서 '우'하세요. 혀가 '우''으''이' 중 '우' 할 때 제일 뒤에 있고 아래에 닿지 않고 위에 있어요.",
      "words": [
        {
          "id": "uyu",
          "word": "우유",
          "note": "",
          "image": "images/words/uyu.png",
          "audio": "audio/words/uyu.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "ubi",
          "word": "우비",
          "note": "",
          "image": "images/words/ubi.png",
          "audio": "audio/words/ubi.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "ㅗ와 섞이지 않게 하세요",
        "zh": "",
        "vi": "입술을 너무 약하게 둥글게 하지 마세요",
        "es": "",
        "en": ""
      }
    },
    "ㅡ": {
      "vowel": "ㅡ",
      "sound_name": "으",
      "sound": "으",
      "articulation": "턱이 살짝 나온 느낌으로 혀가 입 안에서 살짝 뒤로 간 상태에서 '으'하세요.",
      "words": [
        {
          "id": "eua",
          "word": "으아",
          "note": "감탄사",
          "image": "images/words/eua.png",
          "audio": "audio/words/eua.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "eui",
          "word": "으이",
          "note": "",
          "image": "images/words/eui.png",
          "audio": "audio/words/eui.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "입술을 둥글게 하지 마세요",
        "zh": "‘어’처럼 하지 마세요",
        "vi": "‘우’처럼 하지 마세요",
        "es": "‘이’처럼 하지 마세요",
        "en": "혀를 너무 앞으로 두지 마세요"
      }
    },
    "ㅣ": {
      "vowel": "ㅣ",
      "sound_name": "이",
      "sound": "이",
      "articulation": "입을 옆으로 벌리면서 혀가 아래 이빨 뒤에 붙은 상태에서 '이'하세요. '으','이'를 해보면 혀가 '이'할 때 혀가 '으'보다 앞으로 나온다는  느낄거예요.",
      "words": [
        {
          "id": "ima",
          "word": "이마",
          "note": "",
          "image": "images/words/ima.png",
          "audio": "audio/words/ima.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "iyu",
          "word": "이유",
          "note": "",
          "image": "images/words/iyu.png",
          "audio": "audio/words/iyu.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "",
        "zh": "",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅑ": {
      "vowel": "ㅑ",
      "sound_name": "야",
      "sound": "야",
      "articulation": "'이','아'를 점점 빠르게 소리내면서 '야'소리가 나도록 하세요.",
      "words": [
        {
          "id": "yagu",
          "word": "야구",
          "note": "",
          "image": "images/words/yagu.png",
          "audio": "audio/words/yagu.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "yaho",
          "word": "야호",
          "note": "감탄사",
          "image": "images/words/yaho.png",
          "audio": "audio/words/yaho.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘야’를 두 음절처럼 하지 마세요",
        "zh": "",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅕ": {
      "vowel": "ㅕ",
      "sound_name": "여",
      "sound": "여",
      "articulation": "'이', '어'를  점점 빠르게 소리내면서 '여'소리가 나도록 하세요.",
      "words": [
        {
          "id": "yeoja",
          "word": "여자",
          "note": "",
          "image": "images/words/yeoja.png",
          "audio": "audio/words/yeoja.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "yeobo",
          "word": "여보",
          "note": "",
          "image": "images/words/yeobo.png",
          "audio": "audio/words/yeobo.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘요’처럼 하지 마세요",
        "zh": "‘여’를 ‘요’처럼 하지 마세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅛ": {
      "vowel": "ㅛ",
      "sound_name": "요",
      "sound": "요",
      "articulation": "입술을 동그랗게 하고 혀를 뒤로 움직이며 '이','오'를 빠르게 소리내면서  '요' 하세요.",
      "words": [
        {
          "id": "yoga",
          "word": "요가",
          "note": "",
          "image": "images/words/yoga.png",
          "audio": "audio/words/yoga.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "yori",
          "word": "요리",
          "note": "",
          "image": "images/words/yori.png",
          "audio": "audio/words/yori.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "",
        "zh": "",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅠ": {
      "vowel": "ㅠ",
      "sound_name": "유",
      "sound": "유",
      "articulation": "입술을 동그랗게 앞으로 조금 내밀고 혀를 뒤로 움직이며 '이','우'를 빠르게 소리내면서 '유' 하세요",
      "words": [
        {
          "id": "yuri",
          "word": "유리",
          "note": "",
          "image": "images/words/yuri.png",
          "audio": "audio/words/yuri.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "uyu",
          "word": "우유",
          "note": "",
          "image": "images/words/uyu.png",
          "audio": "audio/words/uyu.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "ㅗ와 구분해 주세요",
        "zh": "",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅐ": {
      "vowel": "ㅐ",
      "sound_name": "애",
      "sound": "애",
      "articulation": "입을 옆으로 크게 벌리며 혀는 아래 이빨 뒤에 놓고 '애'합니다.",
      "words": [
        {
          "id": "aegyo",
          "word": "애교",
          "note": "",
          "image": "images/words/aegyo.png",
          "audio": "audio/words/aegyo.mp3",
          "meaning": {
            "ko": "애교",
            "en": "cute charm",
            "vi": "sự duyên dáng dễ thương",
            "zh": "撒娇",
            "ja": "愛嬌",
            "th": "ความน่ารัก",
            "ne": "मिठो चुलबुलेपन",
            "hi": "प्यारा आकर्षण",
            "es": "encanto tierno",
            "ru": "милое обаяние",
            "uz": "yoqimli erkalik",
            "km": "ភាពគួរឱ្យស្រឡាញ់"
          },
          "example": {}
        },
        {
          "id": "uae",
          "word": "우애",
          "note": "",
          "image": "images/words/uae.png",
          "audio": "audio/words/uae.mp3",
          "meaning": {
            "ko": "우애",
            "en": "friendship",
            "vi": "tình bạn",
            "zh": "友爱",
            "ja": "友愛",
            "th": "มิตรภาพ",
            "ne": "मित्रता",
            "hi": "मित्रता",
            "es": "amistad",
            "ru": "дружба",
            "uz": "do‘stlik",
            "km": "មិត្តភាព"
          },
          "example": {}
        }
      ],
      "warnings": {
        "ja": "ㅔ와 너무 같아지지 않게 하세요",
        "zh": "ㅔ와 구분해 주세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅔ": {
      "vowel": "ㅔ",
      "sound_name": "에",
      "sound": "에",
      "articulation": "입을 자연스럽게 벌리고 혀는 아래 이빨뒤에 놓고 '에'합니다. '애'보다 입이 크게 벌어지지 않아요.",
      "words": [
        {
          "id": "ege",
          "word": "에게",
          "note": "",
          "image": "images/words/ege.png",
          "audio": "audio/words/ege.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "eseo",
          "word": "에서",
          "note": "",
          "image": "images/words/eseo.png",
          "audio": "audio/words/eseo.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "ㅐ와 너무 같아지지 않게 하세요",
        "zh": "ㅐ와 구분해 주세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅒ": {
      "vowel": "ㅒ",
      "sound_name": "얘",
      "sound": "얘",
      "articulation": "입을 넓게 벌리고 턱이 아래로 내려가면서 '얘'합니다.",
      "words": [
        {
          "id": "yae",
          "word": "얘",
          "note": "이 아이 → 이애 → 얘",
          "image": "images/words/yae.png",
          "audio": "audio/words/yae.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "yaeya",
          "word": "얘야",
          "note": "",
          "image": "images/words/yaeya.png",
          "audio": "audio/words/yaeya.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "ㅖ처럼 하지 마세요",
        "zh": "ㅖ와 섞이지 않게 하세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅖ": {
      "vowel": "ㅖ",
      "sound_name": "예",
      "sound": "예",
      "articulation": "'이''에'를 점점 빠르게소리내면서 '예'소리가 나도록 하세요.",
      "words": [
        {
          "id": "ye",
          "word": "예",
          "note": "감탄사",
          "image": "images/words/ye.png",
          "audio": "audio/words/ye.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "yego",
          "word": "예고",
          "note": "",
          "image": "images/words/yego.png",
          "audio": "audio/words/yego.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "ㅒ처럼 하지 마세요",
        "zh": "ㅒ와 섞이지 않게 하세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅘ": {
      "vowel": "ㅘ",
      "sound_name": "와",
      "sound": "와",
      "articulation": "'오','아'를 점점빠르게 소리내면서 '와'소리가 나도록 하세요.",
      "words": [
        {
          "id": "wayo",
          "word": "와요",
          "note": "",
          "image": "images/words/wayo.png",
          "audio": "audio/words/wayo.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "yeohowa",
          "word": "여호와",
          "note": "",
          "image": "images/words/yeohowa.png",
          "audio": "audio/words/yeohowa.mp3",
          "meaning": {
            "ko": "여호와",
            "en": "Jehovah",
            "vi": "Giê-hô-va",
            "zh": "耶和华",
            "ja": "エホバ",
            "th": "พระยะโฮวา",
            "ne": "यहोवा",
            "hi": "यहोवा",
            "es": "Jehová",
            "ru": "Иегова",
            "uz": "Yahova",
            "km": "ព្រះយេហូវ៉ា"
          },
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘오아’가 끊어지지 않게 하세요",
        "zh": "",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅙ": {
      "vowel": "ㅙ",
      "sound_name": "왜",
      "sound": "왜",
      "articulation": "'오','애'를 점점 빠르게 소리내면서 '왜'소리가 나도록 하세요.",
      "words": [
        {
          "id": "wae",
          "word": "왜",
          "note": "",
          "image": "images/words/wae.png",
          "audio": "audio/words/wae.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "waeyo",
          "word": "왜요?",
          "note": "",
          "image": "images/words/waeyo.png",
          "audio": "audio/words/waeyo.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘왜’를 두 음절처럼 하지 마세요",
        "zh": "ㅚ와 섞이지 않게 하세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅚ": {
      "vowel": "ㅚ",
      "sound_name": "외",
      "sound": "외",
      "articulation": "입술을 동그랗게 한 상태에서 입술을 조금 펴며 '외' 하세요.",
      "words": [
        {
          "id": "yeooe",
          "word": "예외",
          "note": "",
          "image": "images/words/yeooe.png",
          "audio": "audio/words/yeooe.mp3",
          "meaning": {
            "ko": "예외",
            "en": "exception",
            "vi": "ngoại lệ",
            "zh": "例外",
            "ja": "例外",
            "th": "ข้อยกเว้น",
            "ne": "अपवाद",
            "hi": "अपवाद",
            "es": "excepción",
            "ru": "исключение",
            "uz": "istisno",
            "km": "ករណីលើកលែង"
          },
          "example": {}
        },
        {
          "id": "haeoe",
          "word": "해외",
          "note": "",
          "image": "images/words/haeoe.png",
          "audio": "audio/words/haeoe.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "입술을 너무 빨리 펴지 마세요",
        "zh": "‘웨’처럼 하지 마세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅝ": {
      "vowel": "ㅝ",
      "sound_name": "워",
      "sound": "워",
      "articulation": "'우','어'를 점점  빠르게 소리내면서 '워'소리가 나도록 하세요",
      "words": [
        {
          "id": "syawo",
          "word": "샤워",
          "note": "",
          "image": "images/words/syawo.png",
          "audio": "audio/words/syawo.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘우어’가 끊어지지 않게 하세요",
        "zh": "‘워’를 ‘오’처럼 하지 마세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅞ": {
      "vowel": "ㅞ",
      "sound_name": "웨",
      "sound": "웨",
      "articulation": "우''에'를 점점 빠르게 소리내면서 '웨'소리가 나도록 하세요",
      "words": [
        {
          "id": "weiteo",
          "word": "웨이터",
          "note": "",
          "image": "images/words/weiteo.png",
          "audio": "audio/words/weiteo.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘웨’를 두 음절처럼 하지 마세요",
        "zh": "ㅚ와 섞이지 않게 하세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅟ": {
      "vowel": "ㅟ",
      "sound_name": "위",
      "sound": "위",
      "articulation": "'우','이'를 점점 빠르게 소리내면서 '위'소리가 나도록 하세요.",
      "words": [
        {
          "id": "gawi",
          "word": "가위",
          "note": "",
          "image": "images/words/gawi.png",
          "audio": "audio/words/gawi.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "wichi",
          "word": "위치",
          "note": "",
          "image": "images/words/wichi.png",
          "audio": "audio/words/wichi.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "입술을 너무 빨리 펴지 마세요",
        "zh": "‘웨’처럼 하지 마세요",
        "vi": "",
        "es": "",
        "en": ""
      }
    },
    "ㅢ": {
      "vowel": "ㅢ",
      "sound_name": "의",
      "sound": "의",
      "articulation": "'으','이'를 점점 빠르게 소리내면서 '의'소리가 나도록 하세요.",
      "words": [
        {
          "id": "uisa",
          "word": "의사",
          "note": "",
          "image": "images/words/uisa.png",
          "audio": "audio/words/uisa.mp3",
          "meaning": {},
          "example": {}
        },
        {
          "id": "uija",
          "word": "의자",
          "note": "",
          "image": "images/words/uija.png",
          "audio": "audio/words/uija.mp3",
          "meaning": {},
          "example": {}
        }
      ],
      "warnings": {
        "ja": "‘으’ 소리를 빼지 마세요",
        "zh": "‘이’처럼 하지 마세요",
        "vi": "두 소리가 분리되지 않게 하세요",
        "es": "‘이’처럼 하지 마세요",
        "en": "한 음절로 이어서 말해보세요"
      }
    }
  }
};

const EMBEDDED_WORD_DATA = {
  "WORDS_BY_VOWEL": {
    "ㅏ": [
      {
        "id": "gagu",
        "word": "가구",
        "note": "",
        "image": "images/words/gagu.png",
        "audio": "audio/words/gagu.mp3",
        "meaning": {
          "ko": "가구",
          "en": "furniture",
          "vi": "đồ nội thất",
          "zh": "家具",
          "ja": "家具",
          "th": "เฟอร์นิเจอร์",
          "ne": "फर्निचर",
          "hi": "फर्नीचर",
          "es": "muebles",
          "ru": "мебель",
          "uz": "mebel",
          "km": "គ្រឿងសង្ហារឹម",
          "zh-TW": "家具",
          "id": "perabot",
          "mn": "тавилга",
          "kk": "жиһаз",
          "ky": "эмерек",
          "my": "ပရိဘောဂ",
          "fil": "muwebles",
          "bn": "আসবাবপত্র",
          "ar": "أثاث",
          "fr": "meuble",
          "de": "Möbel",
          "sw": "samani",
          "ha": "kayan daki"
        },
        "example": {}
      }
    ],
    "ㅓ": [
      {
        "id": "geomi",
        "word": "거미",
        "note": "",
        "image": "images/words/geomi.png",
        "audio": "audio/words/geomi.mp3",
        "meaning": {
          "ko": "거미",
          "en": "spider",
          "vi": "nhện",
          "zh": "蜘蛛",
          "ja": "クモ",
          "th": "แมงมุม",
          "ne": "माकुरा",
          "hi": "मकड़ी",
          "es": "araña",
          "ru": "паук",
          "uz": "o'rgimchak",
          "km": "សត្វពីងពាង",
          "zh-TW": "蜘蛛",
          "id": "laba-laba",
          "mn": "аалз",
          "kk": "өрмекші",
          "ky": "жөргөмүш",
          "my": "ပင့်ကူ",
          "fil": "gagamba",
          "bn": "মাকড়সা",
          "ar": "عنكبوت",
          "fr": "araignée",
          "de": "Spinne",
          "sw": "buibui",
          "ha": "gizo-gizo"
        },
        "example": {}
      }
    ],
    "ㅗ": [
      {
        "id": "oi",
        "word": "오이",
        "note": "",
        "image": "images/words/oi.png",
        "audio": "audio/words/oi.mp3",
        "meaning": {
          "ko": "오이",
          "en": "cucumber",
          "vi": "dưa leo",
          "zh": "黄瓜",
          "ja": "きゅうり",
          "th": "แตงกวา",
          "ne": "काँक्रो",
          "hi": "खीरा",
          "es": "pepino",
          "ru": "огурец",
          "uz": "bodring",
          "km": "ត្រសក់",
          "zh-TW": "黃瓜",
          "id": "mentimun",
          "mn": "өргөст хэмх",
          "kk": "қияр",
          "ky": "бадыраң",
          "my": "သခွားသီး",
          "fil": "pipino",
          "bn": "শসা",
          "ar": "خيار",
          "fr": "concombre",
          "de": "Gurke",
          "sw": "tango",
          "ha": "kokwamba"
        },
        "example": {}
      }
    ],
    "ㅜ": [
      {
        "id": "uyu",
        "word": "우유",
        "note": "",
        "image": "images/words/uyu.png",
        "audio": "audio/words/uyu.mp3",
        "meaning": {
          "ko": "우유",
          "en": "milk",
          "vi": "sữa",
          "zh": "牛奶",
          "ja": "牛乳",
          "th": "นม",
          "ne": "दूध",
          "hi": "दूध",
          "es": "leche",
          "ru": "молоко",
          "uz": "sut",
          "km": "ទឹកដោះគោ",
          "zh-TW": "牛奶",
          "id": "susu",
          "mn": "сүү",
          "kk": "сүт",
          "ky": "сүт",
          "my": "နို့",
          "fil": "gatas",
          "bn": "দুধ",
          "ar": "حليب",
          "fr": "lait",
          "de": "Milch",
          "sw": "maziwa",
          "ha": "madara"
        },
        "example": {}
      }
    ],
    "ㅡ": [],
    "ㅣ": [
      {
        "id": "ima",
        "word": "이마",
        "note": "",
        "image": "images/words/ima.png",
        "audio": "audio/words/ima.mp3",
        "meaning": {
          "ko": "이마",
          "en": "forehead",
          "vi": "trán",
          "zh": "额头",
          "ja": "おでこ",
          "th": "หน้าผาก",
          "ne": "निधार",
          "hi": "माथा",
          "es": "frente",
          "ru": "лоб",
          "uz": "peshona",
          "km": "ថ្ងាស",
          "zh-TW": "額頭",
          "id": "dahi",
          "mn": "дух",
          "kk": "маңдай",
          "ky": "маңдай",
          "my": "နဖူး",
          "fil": "noo",
          "bn": "কপাল",
          "ar": "جبهة",
          "fr": "front",
          "de": "Stirn",
          "sw": "paji la uso",
          "ha": "goshi"
        },
        "example": {}
      }
    ],
    "ㅑ": [
      {
        "id": "yagu",
        "word": "야구",
        "note": "",
        "image": "images/words/yagu.png",
        "audio": "audio/words/yagu.mp3",
        "meaning": {
          "ko": "야구",
          "en": "baseball",
          "vi": "bóng chày",
          "zh": "棒球",
          "ja": "野球",
          "th": "เบสบอล",
          "ne": "बेसबल",
          "hi": "बेसबॉल",
          "es": "béisbol",
          "ru": "бейсбол",
          "uz": "beysbol",
          "km": "បេស្បល",
          "zh-TW": "棒球",
          "id": "bisbol",
          "mn": "бейсбол",
          "kk": "бейсбол",
          "ky": "бейсбол",
          "my": "ဘေ့စ်ဘော",
          "fil": "baseball",
          "bn": "বেসবল",
          "ar": "بيسبول",
          "fr": "baseball",
          "de": "Baseball",
          "sw": "besiboli",
          "ha": "wasan baseball"
        },
        "example": {}
      }
    ],
    "ㅕ": [
      {
        "id": "yeoja",
        "word": "여자",
        "note": "",
        "image": "images/words/yeoja.png",
        "audio": "audio/words/yeoja.mp3",
        "meaning": {
          "ko": "여자",
          "en": "woman",
          "vi": "phụ nữ",
          "zh": "女人",
          "ja": "女性",
          "th": "ผู้หญิง",
          "ne": "महिला",
          "hi": "महिला",
          "es": "mujer",
          "ru": "женщина",
          "uz": "ayol",
          "km": "ស្ត្រី",
          "zh-TW": "女人",
          "id": "perempuan",
          "mn": "эмэгтэй",
          "kk": "әйел",
          "ky": "аял",
          "my": "အမျိုးသမီး",
          "fil": "babae",
          "bn": "নারী",
          "ar": "امرأة",
          "fr": "femme",
          "de": "Frau",
          "sw": "mwanamke",
          "ha": "mace"
        },
        "example": {}
      }
    ],
    "ㅛ": [
      {
        "id": "yori",
        "word": "요리",
        "note": "",
        "image": "images/words/yori.png",
        "audio": "audio/words/yori.mp3",
        "meaning": {
          "ko": "요리",
          "en": "cooking",
          "vi": "nấu ăn",
          "zh": "料理",
          "ja": "料理",
          "th": "การทำอาหาร",
          "ne": "पकाउने काम",
          "hi": "खाना बनाना",
          "es": "cocina",
          "ru": "готовка",
          "uz": "pishirish",
          "km": "ការធ្វើម្ហូប",
          "zh-TW": "料理",
          "id": "masakan",
          "mn": "хоол хийх",
          "kk": "ас әзірлеу",
          "ky": "тамак жасоо",
          "my": "ချက်ပြုတ်ခြင်း",
          "fil": "pagluluto",
          "bn": "রান্না",
          "ar": "طبخ",
          "fr": "cuisine",
          "de": "Kochen",
          "sw": "upishi",
          "ha": "girki"
        },
        "example": {}
      }
    ],
    "ㅠ": [
      {
        "id": "yuri",
        "word": "유리",
        "note": "",
        "image": "images/words/yuri.png",
        "audio": "audio/words/yuri.mp3",
        "meaning": {
          "ko": "유리",
          "en": "glass",
          "vi": "kính",
          "zh": "玻璃",
          "ja": "ガラス",
          "th": "แก้ว",
          "ne": "सिसा",
          "hi": "काँच",
          "es": "vidrio",
          "ru": "стекло",
          "uz": "shisha",
          "km": "កញ្ចក់",
          "zh-TW": "玻璃",
          "id": "kaca",
          "mn": "шил",
          "kk": "әйнек",
          "ky": "айнек",
          "my": "ဖန်",
          "fil": "salamin",
          "bn": "কাচ",
          "ar": "زجاج",
          "fr": "verre",
          "de": "Glas",
          "sw": "kioo",
          "ha": "gilashi"
        },
        "example": {}
      }
    ],
    "ㅐ": [],
    "ㅔ": [],
    "ㅒ": [],
    "ㅖ": [
      {
        "id": "ye",
        "word": "예",
        "note": "감탄사",
        "image": "images/words/ye.png",
        "audio": "audio/words/ye.mp3",
        "meaning": {
          "ko": "공손한 대답",
          "en": "yes",
          "vi": "vâng",
          "zh": "是",
          "ja": "はい",
          "th": "ครับ/ค่ะ",
          "ne": "हजुर",
          "hi": "जी",
          "es": "sí",
          "ru": "да",
          "uz": "ha",
          "km": "បាទ/ចាស",
          "zh-TW": "是",
          "id": "ya",
          "mn": "тийм",
          "kk": "иә",
          "ky": "ооба",
          "my": "ဟုတ်ကဲ့",
          "fil": "oo",
          "bn": "হ্যাঁ",
          "ar": "نعم",
          "fr": "oui",
          "de": "ja",
          "sw": "ndiyo",
          "ha": "eh"
        },
        "example": {}
      }
    ],
    "ㅘ": [
      {
        "id": "wayo",
        "word": "와요",
        "note": "",
        "image": "images/words/wayo.png",
        "audio": "audio/words/wayo.mp3",
        "meaning": {
          "ko": "오다의 공손한 형태",
          "en": "polite form of come",
          "vi": "dạng lịch sự của đến",
          "zh": "来的礼貌形式",
          "ja": "来るの丁寧な形",
          "th": "รูปสุภาพของ มา",
          "ne": "आउनुको विनम्र रूप",
          "hi": "आना का विनम्र रूप",
          "es": "forma cortés de venir",
          "ru": "вежливая форма приходить",
          "uz": "kelmoqning odobli shakli",
          "km": "ទម្រង់គួរសមនៃ មក",
          "zh-TW": "來",
          "id": "datang",
          "mn": "ирдэг",
          "kk": "келеді",
          "ky": "келет",
          "my": "လာသည်",
          "fil": "dumarating",
          "bn": "আসে",
          "ar": "يأتي",
          "fr": "vient",
          "de": "kommt",
          "sw": "anakuja",
          "ha": "yana zuwa"
        },
        "example": {}
      }
    ],
    "ㅙ": [
      {
        "id": "wae",
        "word": "왜",
        "note": "",
        "image": "images/words/wae.png",
        "audio": "audio/words/wae.mp3",
        "meaning": {
          "ko": "왜",
          "en": "why",
          "vi": "tại sao",
          "zh": "为什么",
          "ja": "なぜ",
          "th": "ทำไม",
          "ne": "किन",
          "hi": "क्यों",
          "es": "por qué",
          "ru": "почему",
          "uz": "nega",
          "km": "ហេតុអ្វី",
          "zh-TW": "為什麼",
          "id": "mengapa",
          "mn": "яагаад",
          "kk": "неге",
          "ky": "эмне үчүн",
          "my": "ဘာကြောင့်",
          "fil": "bakit",
          "bn": "কেন",
          "ar": "لماذا",
          "fr": "pourquoi",
          "de": "warum",
          "sw": "kwa nini",
          "ha": "me ya sa"
        },
        "example": {}
      }
    ],
    "ㅚ": [
      {
        "id": "chamoe",
        "word": "참외",
        "note": "과일",
        "image": "",
        "audio": "audio/words/chamoe.mp3",
        "meaning": {
          "ko": "참외",
          "en": "Korean melon",
          "ja": "マクワウリ",
          "zh": "香瓜",
          "zh-TW": "香瓜",
          "vi": "dưa lê Hàn Quốc",
          "th": "เมลอนเกาหลี",
          "id": "melon Korea",
          "mn": "солонгос амтат гуа",
          "ru": "корейская дыня",
          "uz": "koreys qovuni",
          "kk": "корей қауыны",
          "ky": "корей коону",
          "ne": "कोरियाली खरबुजा",
          "my": "ကိုရီးယား သခွားမွှေး",
          "km": "ឪឡឹកកូរ៉េ",
          "fil": "Korean melon",
          "hi": "कोरियाई खरबूजा",
          "bn": "কোরিয়ান মেলন",
          "ar": "شمام كوري",
          "es": "melón coreano",
          "fr": "melon coréen",
          "de": "koreanische Melone",
          "sw": "tikiti la Kikorea",
          "ha": "kankana ta Koriya"
        },
        "example": {}
      }
    ],
    "ㅝ": [
      {
        "id": "syawo",
        "word": "샤워",
        "note": "",
        "image": "images/words/syawo.png",
        "audio": "audio/words/syawo.mp3",
        "meaning": {
          "ko": "샤워",
          "en": "shower",
          "vi": "tắm vòi sen",
          "zh": "淋浴",
          "ja": "シャワー",
          "th": "อาบน้ำฝักบัว",
          "ne": "नुहाउने",
          "hi": "शावर",
          "es": "ducha",
          "ru": "душ",
          "uz": "dush",
          "km": "ងូតទឹក",
          "zh-TW": "淋浴",
          "id": "mandi pancuran",
          "mn": "шүршүүр",
          "kk": "душ",
          "ky": "душ",
          "my": "ရေချိုးခန်း",
          "fil": "shower",
          "bn": "শাওয়ার",
          "ar": "دش",
          "fr": "douche",
          "de": "Dusche",
          "sw": "bafu la manyunyu",
          "ha": "shawa"
        },
        "example": {}
      }
    ],
    "ㅞ": [
      {
        "id": "wehas",
        "word": "웨하스",
        "note": "과자",
        "image": "",
        "audio": "audio/words/wehas.mp3",
        "meaning": {
          "ko": "웨하스",
          "en": "wafer cookie",
          "ja": "ウエハース",
          "zh": "威化饼",
          "zh-TW": "威化餅",
          "vi": "bánh xốp",
          "th": "เวเฟอร์",
          "id": "wafer",
          "mn": "вафли",
          "ru": "вафля",
          "uz": "vafli",
          "kk": "вафли",
          "ky": "вафли",
          "ne": "वेफर",
          "my": "ဝေဖာ",
          "km": "នំវ៉ាហ្វឺ",
          "fil": "wafer",
          "hi": "वेफर",
          "bn": "ওয়েফার",
          "ar": "ويفر",
          "es": "barquillo",
          "fr": "gaufrette",
          "de": "Waffel",
          "sw": "biskuti ya wafer",
          "ha": "wafer"
        },
        "example": {}
      }
    ],
    "ㅟ": [
      {
        "id": "gawi",
        "word": "가위",
        "note": "",
        "image": "images/words/gawi.png",
        "audio": "audio/words/gawi.mp3",
        "meaning": {
          "ko": "가위",
          "en": "scissors",
          "vi": "kéo",
          "zh": "剪刀",
          "ja": "はさみ",
          "th": "กรรไกร",
          "ne": "कैंची",
          "hi": "कैंची",
          "es": "tijeras",
          "ru": "ножницы",
          "uz": "qaychi",
          "km": "កន្ត្រៃ",
          "zh-TW": "剪刀",
          "id": "gunting",
          "mn": "хайч",
          "kk": "қайшы",
          "ky": "кайчы",
          "my": "ကတ်ကြေး",
          "fil": "gunting",
          "bn": "কাঁচি",
          "ar": "مقص",
          "fr": "ciseaux",
          "de": "Schere",
          "sw": "mkasi",
          "ha": "almakashi"
        },
        "example": {}
      }
    ],
    "ㅢ": [
      {
        "id": "uija",
        "word": "의자",
        "note": "",
        "image": "images/words/uija.png",
        "audio": "audio/words/uija.mp3",
        "meaning": {
          "ko": "의자",
          "en": "chair",
          "vi": "ghế",
          "zh": "椅子",
          "ja": "椅子",
          "th": "เก้าอี้",
          "ne": "कुर्सी",
          "hi": "कुर्सी",
          "es": "silla",
          "ru": "стул",
          "uz": "stul",
          "km": "កៅអី",
          "zh-TW": "椅子",
          "id": "kursi",
          "mn": "сандал",
          "kk": "орындық",
          "ky": "отургуч",
          "my": "ကုလားထိုင်",
          "fil": "upuan",
          "bn": "চেয়ার",
          "ar": "كرسي",
          "fr": "chaise",
          "de": "Stuhl",
          "sw": "kiti",
          "ha": "kujera"
        },
        "example": {}
      }
    ]
  }
};

function applyVowelData(data){
  data = data || {};
  BG = data.BG || [];
  TC = data.TC || [];
  VOWELS = data.VOWELS || [];
  LANG_NAMES = data.LANG_NAMES || {};
  EXPLAIN_BASE = data.EXPLAIN_BASE || {};
  EXPLAIN_LANG = data.EXPLAIN_LANG || {};
  VD = data.VD || {};
  SP = data.SP || {};
}

async function loadVowelData(){
  try{
    const res = await fetch('data/vowels.json', {cache:'no-store'});
    if(!res.ok) throw new Error('vowels.json 파일을 불러오지 못했습니다.');
    const data = await res.json();
    applyVowelData(data);
  }catch(e){
    applyVowelData(EMBEDDED_VOWEL_DATA);
    console.warn('data/vowels.json을 직접 불러오지 못해 내장 데이터를 사용합니다.', e);
  }
}

var JAMO_STROKE_VOWELS='ㅐㅔㅒㅖㅘㅙㅚㅝㅞㅟㅢ';

function jamoPathDraw(p){
  if(!p) return '';
  if(p.manualCenterD && p.centerD) return p.centerD;
  return p.centerD || p.d || '';
}

function applyJamoStrokeDb(db){
  if(!db || !db.chars) return;
  JAMO_STROKE_VOWELS.split('').forEach(function(ch){
    if(!VD[ch] || !db.chars[ch]) return;
    var paths=(db.chars[ch].paths || []).map(function(p){
      return {d:jamoPathDraw(p), dir:p.dir || ''};
    }).filter(function(p){ return p.d; });
    if(paths.length) VD[ch].paths=paths;
  });
}

async function loadJamoStrokeDb(){
  // 획순은 vowels.json(실라블 JSON 변환본)을 사용합니다.
}

function applyWordData(data){
  WORDS_BY_VOWEL = (data && data.WORDS_BY_VOWEL) ? data.WORDS_BY_VOWEL : {};
}

async function loadWordData(){
  try{
    const res = await fetch('data/words.json', {cache:'no-store'});
    if(!res.ok) throw new Error('words.json 파일을 불러오지 못했습니다.');
    const data = await res.json();
    applyWordData(data);
  }catch(e){
    applyWordData(EMBEDDED_WORD_DATA);
    console.warn('data/words.json을 직접 불러오지 못해 내장 단어 데이터를 사용합니다.', e);
  }
}

function wordNoteText(note){
  if(!note) return '';
  var lang=currentLang();
  var map={
    '채소':{en:'vegetable',ja:'野菜',zh:'蔬菜',vi:'rau củ',th:'ผัก',ne:'तरकारी',hi:'सब्ज़ी',es:'verdura',ru:'овощ',uz:'sabzavot',km:'បន្លែ'},
    '감탄사':{en:'exclamation',ja:'感嘆詞',zh:'感叹词',vi:'thán từ',th:'คำอุทาน',ne:'विस्मयादिबोधक',hi:'विस्मयादिबोधक',es:'interjección',ru:'междометие',uz:'undov so‘z',km:'ពាក្យឧទាន'},
    '이 아이 → 이애 → 얘':{en:'이 아이 → 이애 → 얘',ja:'이 아이 → 이애 → 얘',zh:'이 아이 → 이애 → 얘',vi:'이 아이 → 이애 → 얘',th:'이 아이 → 이애 → 얘',ne:'이 아이 → 이애 → 얘',hi:'이 아이 → 이애 → 얘',es:'이 아이 → 이애 → 얘',ru:'이 아이 → 이애 → 얘',uz:'이 아이 → 이애 → 얘',km:'이 아이 → 이애 → 얘'}
  };
  return lang==='ko' ? note : ((map[note]&&map[note][lang]) || note || '');
}
function getLangText(obj, lang){
  if(!obj) return '';
  var value=obj[lang] || obj.en || obj.ko || '';
  if(typeof value==='string' && /^\?+$/.test(value.trim())) return obj.en || obj.ko || '';
  return value;
}

function translateStatic(){
  setText('.title h1',t('appTitle'));
  setText('.title p',t('appSubtitle'));
  setText('label[for="nativeLang"]',t('nativeLang'));
  document.title=t('appTitle');
  setAllText('.step-nav-btn',t('home'));
  setText('.principle-nav .next-step-btn',t('toStep1'));
  setText('#prevStepBtn',t('prevStep'));
  var nextBtn=document.getElementById('nextStepBtn'); if(nextBtn){ nextBtn.innerHTML='<img src="images/company-logo.png" alt="'+t('homeCompany')+'"/>'+t('nextStep'); }
  setText('.cheonjiin-page-copy h2',t('principleTitle'));
  setText('.cheonjiin-page-copy > p',t('principleIntro'));
  var pl=document.querySelectorAll('.cheonjiin-page-list span');
  if(pl[0]) pl[0].innerHTML='<b>&#12643;</b> '+t('person');
  if(pl[1]) pl[1].innerHTML='<b>&#12641;</b> '+t('ground');
  if(pl[2]) pl[2].innerHTML='<b>&middot;</b> '+t('sky');
  setText('.cheonjiin-sheet-note p',t('sheetNote'));
  var jump=document.querySelector('.principle-vowel-jump'); if(jump) jump.setAttribute('aria-label',t('principleJumpLabel'));
  document.querySelectorAll('#basicGrid .series-row').forEach(function(row,i){
    var copy=stepText(i);
    var head=row.querySelector('.series-head');
    if(head) head.innerHTML='<span>STEP '+i+'</span><small>'+(i===0?copy.subtitle:copy.title)+'</small>';
    var subtitle=row.querySelector('.series-subtitle');
    if(subtitle) subtitle.textContent=copy.subtitle;
  });
  var entry=document.querySelector('.cheonjiin-entry .cheonjiin-copy');
  if(entry){var principleCopy=stepText(0); entry.innerHTML='<strong>'+t('principleTitle')+'</strong><span>'+principleCopy.summary+'</span>';}
  var company=document.querySelector('.home-brand-company span'); if(company) company.textContent=t('homeCompany');
  var teacher=document.querySelector('.home-brand-teacher span'); if(teacher) teacher.textContent=t('homeTeacher');
  setText('.animation-panel .section-title',t('animationTitle'));
  setText('#replayStrokeBtn',t('replay'));
  setText('.coach-bubble',t('coach'));
  setText('#soundListenBtn',t('soundListen'));
  setText('#repeatPracticeBtn',t('repeat'));
  setText('#analyzePracticeBtn',t('analyze'));
  setText('#audioStatus',t('audioStatus'));
  setText('.info-panel > .section-title',t('vowelNameSound'));
  setText('.listen-label',t('listenPronunciation'));
  setText('.info-panel .section-title.mt',t('articulationTitle'));
  setText('.word-section > .section-title',t('relatedWords'));
  var img=document.getElementById('wordImage'); if(img) img.alt=t('imageAlt');
  var pageTitle=document.getElementById('pageTitle'); if(pageTitle) pageTitle.textContent=t('pageLabel',{vowel:cur});
  setText('.flash-front .word-action-btn',t('flipCard'));
  var backBtns=document.querySelectorAll('.flash-back .word-action-btn'); if(backBtns[0]) backBtns[0].textContent=t('frontSide'); if(backBtns[1]) backBtns[1].textContent=t('listen');
  setText('.support-grid .support-card:nth-child(2) .section-title',t('combo'));
  var spkCombo=document.getElementById('spkCombo'); if(spkCombo) spkCombo.title=t('comboListen');
  setText('.support-grid .support-card:nth-child(3) .section-title',t('practiceTitle'));
  var input=document.getElementById('practiceInput'); if(input) input.placeholder=t('practicePlaceholder');
  var spkPractice=document.getElementById('spkPractice'); if(spkPractice) spkPractice.title=t('listen');
  var spkMain=document.getElementById('spkMain'); if(spkMain) spkMain.title=t('listenPronunciation');
  var spkWord=document.getElementById('spkWord'); if(spkWord) spkWord.title=t('listen');
  var koTitle=document.querySelector('.flash-back .word-back-box .word-back-title'); if(koTitle) koTitle.textContent=t('meaningKo');
  var exTitle=document.querySelector('.flash-back .word-back-box:nth-of-type(3) .word-back-title'); if(exTitle) exTitle.textContent=t('example');
}
function setLanguage(){
  translateStatic();
  updateStepInfo(currentStep);
  if(hasCurrentVowelData()) renderStrokeLabels();
  if(selectedWord) updateWordCard();
  updateExplain(true);
}

function renderWordList(){
  var wl=document.getElementById('wordList'); if(!wl) return;
  wl.innerHTML=''; selectedWord=null; selectedWordBtn=null;
  var wrap=document.getElementById('wordCardWrap'); if(wrap) wrap.classList.remove('show');
  var arr=(WORDS_BY_VOWEL && WORDS_BY_VOWEL[cur]) ? WORDS_BY_VOWEL[cur] : [];
  if(!arr.length){
    var empty=document.createElement('div'); empty.className='word-sub'; empty.textContent=t('noWords'); wl.appendChild(empty); return;
  }
  arr.forEach(function(w,idx){
    var b=document.createElement('button'); b.className='word-chip'; b.textContent=w.word || '';
    if(w.note) b.title=w.note;
    b.onclick=function(){selectWord(w,b);}; wl.appendChild(b);
    if(idx===0) setTimeout(function(){selectWord(w,b);},0);
  });
}
function selectWord(w,btn){
  selectedWord=w; if(selectedWordBtn) selectedWordBtn.classList.remove('active');
  selectedWordBtn=btn; if(btn) btn.classList.add('active');
  var wrap=document.getElementById('wordCardWrap'); var card=document.getElementById('wordFlashCard');
  if(wrap) wrap.classList.add('show'); if(card) card.classList.remove('flipped');
  updateWordCard();
}
function updateWordCard(){
  if(!selectedWord) return;
  var lang=currentLang();
  var word=selectedWord.word || '';
  var note=selectedWord.note || '';
  var meaningKo=(selectedWord.meaning && selectedWord.meaning.ko) || '';
  var meaningNative=(lang==='ko') ? '' : ((selectedWord.meaning && selectedWord.meaning[lang]) || '');
  var exampleKo=(selectedWord.example && selectedWord.example.ko) || '';
  var exampleNative=(lang==='ko') ? '' : ((selectedWord.example && selectedWord.example[lang]) || '');
  var nativeBox=document.getElementById('wordMeaningNative');
  var nativeWrap=nativeBox ? nativeBox.closest('.word-back-box') : null;
  var koBox=document.getElementById('wordMeaningKo');
  var koWrap=koBox ? koBox.closest('.word-back-box') : null;
  var exampleKoEl=document.getElementById('wordExampleKo');
  var wordTextEl=document.getElementById('wordText');
  if(wordTextEl) wordTextEl.textContent=word;
  document.getElementById('wordShort').textContent=wordNoteText(note) || t('flipHint');
  document.getElementById('wordMeaningKo').textContent=meaningKo;
  document.getElementById('wordMeaningNativeTitle').textContent=languageLabel(lang) || t('selectedLanguage');
  document.getElementById('wordMeaningNative').textContent=meaningNative;
  if(nativeWrap) nativeWrap.style.display=(lang==='ko' || !meaningNative) ? 'none' : '';
  if(koWrap) koWrap.style.display=(lang==='ko' && meaningKo) ? '' : 'none';
  document.getElementById('wordExampleKo').textContent=exampleKo;
  if(exampleKoEl) exampleKoEl.style.display=(lang==='ko') ? '' : 'none';
  document.getElementById('wordExampleNative').textContent=exampleNative;
  document.querySelectorAll('.flash-back .word-back-box').forEach(function(box){var body=Array.from(box.children).filter(function(ch){return !ch.classList.contains('word-back-title');}).map(function(ch){return ch.textContent.trim();}).join(''); box.style.display=body ? '' : 'none';});
  if(nativeWrap) nativeWrap.style.display=(lang==='ko' || !meaningNative) ? 'none' : '';
  if(koWrap) koWrap.style.display=(lang==='ko' && meaningKo) ? '' : 'none';
  if(exampleKoEl) exampleKoEl.style.display=(lang==='ko') ? '' : 'none';
  var img=document.getElementById('wordImage'), ph=document.getElementById('wordPlaceholder');
  function showWordPlaceholder(){
    if(img) img.style.display='none';
    if(ph){ ph.style.display='flex'; ph.textContent=word || t('imagePlaceholder'); }
    if(wordTextEl) wordTextEl.textContent='';
  }
  function showWordImage(){
    if(img) img.style.display='block';
    if(ph) ph.style.display='none';
    if(wordTextEl) wordTextEl.textContent=word;
  }
  if(img && ph){
    showWordPlaceholder();
    if(selectedWord.image){
      img.onload=showWordImage;
      img.onerror=showWordPlaceholder;
      img.src=selectedWord.image;
    }
  }
}
function updateWordTexts(){ updateWordCard(); }
function flipWordCard(){
  var card=document.getElementById('wordFlashCard'); if(card) card.classList.toggle('flipped');
}
function spkWord(){
  if(!selectedWord) return;
  playWordAudio(selectedWord);
}
function playWordAudio(w){
  var btn=document.getElementById('spkWord'); if(btn) btn.classList.add('playing');
  var src=(w.audio || ('audio/words/'+(w.id || w.roman || w.word)+'.mp3')).replace(/\.mp3$/,'.wav');
  var audio=new Audio(src); var done=false;
  function finish(){if(done) return; done=true; if(btn) btn.classList.remove('playing');}
  audio.onended=finish;
  audio.onerror=function(){speak(w.word || w.kr || '', 'spkWord', finish);};
  audio.play().catch(function(){speak(w.word || w.kr || '', 'spkWord', finish);});
  setTimeout(finish,4000);
}

var cur='ㅏ', aBtn=null, tok=0, WORDS_BY_VOWEL={}, selectedWord=null, selectedWordBtn=null, wordRenderToken=0, currentStep=1;
var principleSoundTimers=[], principleSoundLoop=null;
var VOWEL_STEPS=[
  {step:0,title:'천 · 지 · 인 원리 소개',subtitle:'모음의 원리',items:[],principles:[['ㅣ','사람이 서 있는 모양'],['ㅡ','땅이 평평하게 놓인 모양'],['·','하늘의 둥근 점']],summary:'사람(ㅣ), 땅(ㅡ), 하늘의 해(·)가 만나 한글의 기본 모음을 만듭니다.'},
  {step:1,title:'기본 모음',subtitle:'사람 곁의 하늘, 땅을 도는 하늘',items:['ㅏ','ㅓ','ㅗ','ㅜ','ㅡ','ㅣ'],principles:[['ㅏ ㅓ','하늘(·)이 사람(ㅣ) 주변을 움직입니다.'],['ㅗ ㅜ','하늘(·)이 땅(ㅡ)을 기준으로 돕니다.'],['ㅡ','움직임이 멈추면 땅의 선으로 남습니다.']],summary:'하늘의 점이 사람과 땅 주위를 움직이며 기본 모음이 생깁니다.'},
  {step:2,title:'획 추가 모음',subtitle:'획을 하나 더해 소리를 넓힙니다.',items:['ㅑ','ㅕ','ㅛ','ㅠ'],principles:[['ㅏ→ㅑ','오른쪽 획을 하나 더합니다.'],['ㅓ→ㅕ','왼쪽 획을 하나 더합니다.'],['ㅗ→ㅛ / ㅜ→ㅠ','위아래 획을 하나 더합니다.']],summary:'기본 모음에 같은 방향의 획을 추가해 ㅑ, ㅕ, ㅛ, ㅠ로 확장합니다.'},
  {step:3,title:'결합 모음',subtitle:'두 개의 모음이 결합합니다.',items:['ㅐ','ㅔ','ㅒ','ㅖ'],principles:[['ㅏ+ㅣ=ㅐ','ㅏ 옆에 ㅣ가 붙습니다.'],['ㅓ+ㅣ=ㅔ','ㅓ 옆에 ㅣ가 붙습니다.'],['ㅑ/ㅕ+ㅣ','ㅒ, ㅖ로 이어집니다.']],summary:'기본 모음 또는 획 추가 모음에 ㅣ가 결합해 새로운 소리를 만듭니다.'},
  {step:4,title:'이중모음',subtitle:'입모양이 이동하며 소리가 발전합니다.',items:['ㅘ','ㅙ','ㅚ','ㅝ','ㅞ','ㅟ','ㅢ'],principles:[['ㅗ 계열','ㅘ, ㅙ, ㅚ처럼 입모양이 앞쪽으로 움직입니다.'],['ㅜ 계열','ㅝ, ㅞ, ㅟ처럼 둥근 입에서 이동합니다.'],['ㅡ+ㅣ=ㅢ','평평한 입모양에서 ㅣ로 이어집니다.']],summary:'두 모음이 이어지며 입모양이 이동하는 이중모음으로 발전합니다.'}
];
function spkIcon(){return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
function getStepForVowel(v){
  for(var i=0;i<VOWEL_STEPS.length;i++){ if(VOWEL_STEPS[i].items.indexOf(v)>-1) return VOWEL_STEPS[i]; }
  return VOWEL_STEPS[1];
}
function updateStepInfo(step){
  var data=VOWEL_STEPS.find(function(s){return s.step===step;}) || getStepForVowel(cur);
  var copy=stepText(data.step);
  currentStep=data.step;
  var title=document.getElementById('stepTitle'), summary=document.getElementById('stepSummary'), box=document.getElementById('stepPrinciples'), feature=document.getElementById('stepFeature');
  if(title) title.textContent='STEP '+data.step+' '+copy.title;
  if(summary) summary.textContent=copy.summary;
  if(feature) feature.textContent=copy.title;
  if(box){
    box.innerHTML='';
    (copy.principles || data.principles).forEach(function(p){
      var card=document.createElement('div'); card.className='mini-principle';
      card.innerHTML='<strong>'+p[0]+'</strong><span>'+p[1]+'</span>';
      box.appendChild(card);
    });
  }
}
function stopPrincipleAnimationSounds(){
  principleSoundTimers.forEach(function(id){clearTimeout(id);});
  principleSoundTimers=[];
  if(principleSoundLoop){clearInterval(principleSoundLoop); principleSoundLoop=null;}
}
function stopPrincipleAnimationPlayback(){
  stopPrincipleAnimationSounds();
  if(window.speechSynthesis) window.speechSynthesis.cancel();
  var principle=document.getElementById('principleScreen');
  if(principle) principle.classList.add('principle-paused');
}
function playPrincipleAnimationSounds(){
  stopPrincipleAnimationSounds();
  var seq=[
    {delay:2200,sound:'아'},
    {delay:4400,sound:'어'},
    {delay:7000,sound:'오'},
    {delay:9840,sound:'우'},
    {delay:11000,sound:'으'}
  ];
  function schedule(){
    seq.forEach(function(item){
      principleSoundTimers.push(setTimeout(function(){
        var screen=document.getElementById('principleScreen');
        if(screen && !screen.classList.contains('hidden')) speak(item.sound,null);
      },item.delay));
    });
  }
  schedule();
  principleSoundLoop=setInterval(function(){
    principleSoundTimers.forEach(function(id){clearTimeout(id);});
    principleSoundTimers=[];
    schedule();
  },12000);
}
function cheonjiinSvgMarkup(){
  return '<svg class="cheonjiin-svg" viewBox="0 0 250 190" role="img" aria-label="천지인 모음 생성 애니메이션"><rect class="cj-stage" x="18" y="18" width="214" height="154" rx="22"></rect><line class="cj-person" x1="125" y1="42" x2="125" y2="134"></line><line class="cj-ground" x1="65" y1="132" x2="185" y2="132"></line><circle class="cj-sky" cx="125" cy="92" r="9"></circle><text class="cj-made cj-a" x="172" y="93">ㅏ</text><text class="cj-made cj-eo" x="59" y="93">ㅓ</text><text class="cj-made cj-o" x="125" y="68">ㅗ</text><text class="cj-made cj-u" x="125" y="165">ㅜ</text><text class="cj-made cj-eu" x="125" y="154">ㅡ</text></svg><button class="principle-replay-btn" type="button" onclick="replayPrincipleAnimation()">'+t('principleReplay')+'</button>';
}
function replayPrincipleAnimation(){
  stopPrincipleAnimationSounds();
  if(window.speechSynthesis) window.speechSynthesis.cancel();
  var principle=document.getElementById('principleScreen'), art=document.getElementById('cheonjiinPageArt');
  if(principle) principle.classList.remove('principle-paused');
  if(art) art.innerHTML=cheonjiinSvgMarkup();
  playPrincipleAnimationSounds();
}
function showPrincipleStep(){
  tok++;
  updateStepInfo(0);
  var step=document.getElementById('stepScreen'), learn=document.getElementById('learnScreen'), principle=document.getElementById('principleScreen'), art=document.getElementById('cheonjiinPageArt');
  if(step) step.classList.add('hidden');
  if(learn) learn.classList.add('hidden');
  if(principle) principle.classList.remove('hidden');
  if(principle) principle.classList.remove('principle-paused');
  if(art) art.innerHTML=cheonjiinSvgMarkup();
  playPrincipleAnimationSounds();
  document.querySelectorAll('.vbtn').forEach(function(btn){btn.classList.remove('active');});
  window.scrollTo({top:0,behavior:'smooth'});
}
function showHomeScreen(){
  tok++;
  var step=document.getElementById('stepScreen'), learn=document.getElementById('learnScreen'), principle=document.getElementById('principleScreen');
  if(step) step.classList.remove('hidden');
  if(learn) learn.classList.add('hidden');
  if(principle) principle.classList.add('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderLearnNav(v){
  var nav=document.getElementById('learnVowelNav'); if(!nav) return;
  var step=getStepForVowel(v); nav.innerHTML='';
  step.items.forEach(function(item){
    var btn=document.createElement('button'); btn.type='button'; btn.className='learn-vowel-btn'+(item===v?' active':''); btn.textContent=item;
    btn.onclick=function(){selectVowelFromNav(item);}; nav.appendChild(btn);
  });
}
function selectVowelFromNav(v){
  var topBtn=null;
  document.querySelectorAll('.vbtn').forEach(function(btn){if(btn.textContent===v) topBtn=btn;});
  pick(v,topBtn);
}
function getFirstAvailableVowel(stepNumber){
  var step=VOWEL_STEPS.find(function(s){return s.step===stepNumber;});
  return step && step.items.length ? step.items[0] : null;
}
function updateStepMoveButtons(v){
  var nextBtn=document.getElementById('nextStepBtn'), prevBtn=document.getElementById('prevStepBtn');
  var step=getStepForVowel(v), nextVowel=null, prevVowel=null;
  for(var next=step.step+1; next<=4; next++){ nextVowel=getFirstAvailableVowel(next); if(nextVowel) break; }
  for(var prev=step.step-1; prev>=1; prev--){ prevVowel=getFirstAvailableVowel(prev); if(prevVowel) break; }
  if(nextBtn){ nextBtn.dataset.nextVowel=nextVowel || ''; nextBtn.disabled=!nextVowel; }
  if(prevBtn){ prevBtn.dataset.prevVowel=prevVowel || ''; prevBtn.disabled=!prevVowel; }
}
function updateNextStepButton(v){ updateStepMoveButtons(v); }
function goNextStep(){
  var btn=document.getElementById('nextStepBtn');
  var nextVowel=btn ? btn.dataset.nextVowel : '';
  if(nextVowel) selectVowelFromNav(nextVowel);
}
function goPrevStep(){
  var btn=document.getElementById('prevStepBtn');
  var prevVowel=btn ? btn.dataset.prevVowel : '';
  if(prevVowel) selectVowelFromNav(prevVowel);
}
function showLearnScreen(v){
  var step=document.getElementById('stepScreen'), learn=document.getElementById('learnScreen'), principle=document.getElementById('principleScreen'), title=document.getElementById('pageTitle');
  if(step) step.classList.add('hidden');
  if(principle) principle.classList.add('hidden');
  if(learn) learn.classList.remove('hidden');
  if(title) title.textContent=t('pageLabel',{vowel:v});
  renderLearnNav(v);
  updateNextStepButton(v);
  window.scrollTo({top:0,behavior:'smooth'});
}
function buildGrid(){
  var g=document.getElementById('basicGrid'); g.innerHTML='';
  VOWEL_STEPS.forEach(function(step){
    var row=document.createElement('div'); row.className='series-row';
    var head=document.createElement('div'); head.className='series-head';
    var copy=stepText(step.step); head.innerHTML='<span>STEP '+step.step+'</span><small>'+(step.step===0?copy.subtitle:copy.title)+'</small>';
    var letters=document.createElement('div'); letters.className='series-letters';
    if(step.step===0){
      var card=document.createElement('button'); card.className='cheonjiin-card cheonjiin-entry'; card.type='button';
      var principleCopy=stepText(0);
      card.innerHTML='<div class="cheonjiin-copy"><strong>'+t('principleTitle')+'</strong><span>'+principleCopy.summary+'</span></div>';
      card.onclick=showPrincipleStep;
      letters.appendChild(card);
    }else{
      var buttonRow=document.createElement('div'); buttonRow.className='vowel-button-row';
      step.items.forEach(function(v){
        var b=document.createElement('button'); b.className='vbtn'+(v==='ㅏ'?' active':''); b.type='button'; b.textContent=v;
        if(!VD[v]){ b.className+=' pending'; b.title=t('pendingHint'); }
        if(v==='ㅏ') aBtn=b;
        b.onclick=function(){pick(v,b);}; buttonRow.appendChild(b);
      });
      var subtitle=document.createElement('small'); subtitle.className='series-subtitle'; subtitle.textContent=copy.subtitle;
      letters.appendChild(buttonRow); letters.appendChild(subtitle);
    }
    row.appendChild(head); row.appendChild(letters); g.appendChild(row);
  });
  var brand=document.createElement('div');
  brand.className='home-brand-row';
  brand.innerHTML='<div class="home-brand-card home-brand-company"><img src="images/company-logo.png" alt="'+t('homeCompany')+'"/><div><strong>KOREAN EDU</strong><span>'+t('homeCompany')+'</span></div></div><div class="home-brand-card home-brand-teacher"><img src="images/teacher-logo.png" alt="'+t('homeTeacher')+'"/><div><strong>TK쌤</strong><span>'+t('homeTeacher')+'</span></div></div>';
  g.appendChild(brand);
  updateStepInfo(1);
}
function pick(v,btn){
  if(aBtn) aBtn.classList.remove('active');
  if(btn) btn.classList.add('active');
  aBtn=btn; cur=v;
  updateStepInfo(getStepForVowel(v).step);
  showLearnScreen(v);
  if(VD[v]){ renderVowel(v); playLesson(true); }
  else renderPendingVowel(v);
}
function renderPendingVowel(v){
  var step=getStepForVowel(v);
  var copy=stepText(step.step);
  document.getElementById('dChar').textContent=v;
  document.getElementById('dRoman').textContent=copy.title;
  document.getElementById('dEng').textContent=t('dataPending');
  var listenText=document.getElementById('phonemeListenText'); if(listenText) listenText.textContent=v;
  var feature=document.getElementById('stepFeature'); if(feature) feature.textContent=stepText(step.step).title;
  var lb=document.getElementById('strokeLabels'); if(lb) lb.innerHTML='<div class="label"><span class="badge">!</span><span>'+t('pendingStroke')+'</span></div>';
  document.getElementById('cVowel').textContent=v;
  document.getElementById('cResult').textContent=v;
  document.getElementById('cResult').style.opacity='1';
  document.getElementById('practiceTarget').textContent=v;
  document.getElementById('practiceInput').value='';
  document.getElementById('practiceMsg').textContent=t('pendingStroke'); renderWordList(); updateExplain(false);
  document.getElementById('explainKo').textContent=stepText(step.step).summary;
  document.getElementById('explainLangTitle').textContent=t('meaningKo');
  document.getElementById('explainNative').textContent='';
}
function hasCurrentVowelData(){return !!VD[cur];}
function getVowelPaths(){
  var d=VD[cur];
  return (d && d.paths) ? d.paths : [];
}
function makeSvg(tag){return document.createElementNS('http://www.w3.org/2000/svg',tag);}

// ── Stroke animation (batchim-style: renderStroke + setupPaths + playAnim) ──
var STROKE_VIEWBOX_W=120;
var STROKE_VIEWBOX_H=140;
var FIXED_STROKE_TRANSFORM='';
var STROKE_COLORS=['#d85a30','#185fa5','#5d8c3b','#8a5aa8','#d09a28','#c4475a'];
var ORDER_MARKER_R=6.72;
var ORDER_MARKER_FONT=8.4;
var ORDER_MARKER_STROKE=1.344;
var MARKER_GAP=2.5;

function markerMinDist(){return ORDER_MARKER_R*2+MARKER_GAP;}
function markerHitsOther(x,y,placed){
  var minDist=markerMinDist(), minDistSq=minDist*minDist;
  return placed.some(function(prev){
    var dx=prev.x-x, dy=prev.y-y;
    return dx*dx+dy*dy<minDistSq;
  });
}
function markerPoint(anchor,placed){
  if(!markerHitsOther(anchor.x,anchor.y,placed)) return {x:anchor.x,y:anchor.y};
  var step=markerMinDist()*0.82;
  for(var ring=1;ring<=10;ring++){
    var dist=step*ring, slices=8+ring*2, twist=ring*0.35;
    for(var i=0;i<slices;i++){
      var angle=twist+(Math.PI*2*i)/slices;
      var x=anchor.x+Math.cos(angle)*dist;
      var y=anchor.y+Math.sin(angle)*dist;
      if(!markerHitsOther(x,y,placed)) return {x:x,y:y};
    }
  }
  var x=anchor.x, y=anchor.y;
  for(var attempt=0;attempt<16;attempt++){
    var pushed=false;
    for(var j=0;j<placed.length;j++){
      var prev=placed[j];
      var dx=x-prev.x, dy=y-prev.y;
      var dist=Math.hypot(dx,dy);
      var need=markerMinDist();
      if(dist>0 && dist<need){
        var push=(need-dist)/dist+0.05;
        x+=dx*push; y+=dy*push; pushed=true;
      }else if(dist===0){ x+=need; pushed=true; }
    }
    if(!pushed && !markerHitsOther(x,y,placed)) return {x:x,y:y};
  }
  return {x:x,y:y};
}
function pathPoints(path){
  var nums=(String(path.d||'').match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
  var points=[];
  for(var i=0;i<nums.length-1;i+=2) points.push({x:nums[i],y:nums[i+1]});
  return points;
}
function appendOrderMarker(parent,point,number,placed,color){
  var pos=markerPoint(point,placed);
  placed.push(pos);
  var marker=makeSvg('g');
  marker.setAttribute('class','order-marker');
  var circle=makeSvg('circle');
  circle.setAttribute('cx',String(pos.x));
  circle.setAttribute('cy',String(pos.y));
  circle.setAttribute('r',String(ORDER_MARKER_R));
  circle.setAttribute('fill',color);
  circle.setAttribute('stroke','#ffffff');
  circle.setAttribute('stroke-width',String(ORDER_MARKER_STROKE));
  marker.appendChild(circle);
  var text=makeSvg('text');
  text.setAttribute('x',String(pos.x));
  text.setAttribute('y',String(pos.y));
  text.setAttribute('text-anchor','middle');
  text.setAttribute('dominant-baseline','central');
  text.setAttribute('fill','#ffffff');
  text.setAttribute('font-size',String(ORDER_MARKER_FONT));
  text.setAttribute('font-weight','800');
  text.setAttribute('font-family','Arial, sans-serif');
  text.textContent=String(number);
  marker.appendChild(text);
  parent.appendChild(marker);
}
function appendStrokePaths(parent,paths){
  var ghostLayer=makeSvg('g');
  ghostLayer.setAttribute('class','stroke-ghosts');
  var strokeLayer=makeSvg('g');
  strokeLayer.setAttribute('class','stroke-draws');
  var markerLayer=makeSvg('g');
  markerLayer.setAttribute('class','stroke-markers');
  paths.forEach(function(p){
    if(!p || !p.d) return;
    var ghost=makeSvg('path');
    ghost.setAttribute('d',p.d);
    ghost.setAttribute('fill','none');
    ghost.setAttribute('stroke','#6f6f6f');
    ghost.setAttribute('stroke-width','20.4');
    ghost.setAttribute('stroke-linecap','round');
    ghost.setAttribute('stroke-linejoin','round');
    ghost.setAttribute('opacity','0.22');
    ghostLayer.appendChild(ghost);
  });
  paths.forEach(function(p,i){
    if(!p || !p.d) return;
    var color=STROKE_COLORS[i%STROKE_COLORS.length];
    var el=makeSvg('path');
    el.id='sp'+i;
    el.setAttribute('d',p.d);
    el.setAttribute('fill','none');
    el.setAttribute('stroke',color);
    el.setAttribute('stroke-width','9');
    el.setAttribute('stroke-linecap','round');
    el.setAttribute('stroke-linejoin','round');
    strokeLayer.appendChild(el);
  });
  var placed=[];
  paths.forEach(function(p,i){
    if(!p || !p.d) return;
    var color=STROKE_COLORS[i%STROKE_COLORS.length];
    var points=pathPoints(p);
    if(points.length) appendOrderMarker(markerLayer,points[0],i+1,placed,color);
  });
  parent.appendChild(ghostLayer);
  parent.appendChild(strokeLayer);
  parent.appendChild(markerLayer);
}
function applyStrokeGroupCenter(group){
  if(!group) return;
  var box;
  try{ box=group.getBBox(); }catch(e){ return; }
  if(!box.width && !box.height) return;
  var tx=STROKE_VIEWBOX_W/2-(box.x+box.width/2);
  var ty=STROKE_VIEWBOX_H/2-(box.y+box.height/2);
  var center='translate('+tx.toFixed(2)+','+ty.toFixed(2)+')';
  group.setAttribute('transform', FIXED_STROKE_TRANSFORM ? (FIXED_STROKE_TRANSFORM+' '+center) : center);
}
function renderStrokeLabels(){
  var lb=document.getElementById('strokeLabels');
  if(!lb) return;
  lb.innerHTML=getVowelPaths().map(function(p,i){
    var ci=i%STROKE_COLORS.length;
    return '<div class="label"><span class="badge badge-'+ci+'">'+(i+1)+'</span><span>'+dirText(p.dir)+'</span></div>';
  }).join('');
}
function renderStroke(){
  var svg=document.getElementById('svgArea');
  if(!svg) return;
  svg.innerHTML='';
  var paths=getVowelPaths();
  var group=makeSvg('g');
  group.setAttribute('class','unified-glyph strokePaths-fixed');
  if(FIXED_STROKE_TRANSFORM) group.setAttribute('transform',FIXED_STROKE_TRANSFORM);
  appendStrokePaths(group,paths);
  svg.appendChild(group);
  applyStrokeGroupCenter(group);
  renderStrokeLabels();
}
function setupPaths(){
  getVowelPaths().forEach(function(_,i){
    var el=document.getElementById('sp'+i);
    if(!el) return;
    var len=el.getTotalLength();
    el.style.transition='none';
    el.style.strokeDasharray=len;
    el.style.strokeDashoffset=len;
  });
}
function animPath(el,dur){
  return new Promise(function(resolve){
    el.style.transition='stroke-dashoffset '+dur+'ms ease-in-out';
    el.style.strokeDashoffset=0;
    setTimeout(resolve,dur+80);
  });
}
async function playAnim(){
  var t=++tok;
  var slider=document.getElementById('speedSlider');
  var dur=SP[slider && slider.value || 3].d;
  document.getElementById('cResult').style.opacity='0';
  document.getElementById('explainKo').style.opacity='.25';
  document.getElementById('explainNative').style.opacity='.25';
  await sleep(80);
  if(t!==tok) return;
  setupPaths();
  await sleep(30);
  if(t!==tok) return;
  var paths=getVowelPaths();
  for(var i=0;i<paths.length;i++){
    if(t!==tok) return;
    var el=document.getElementById('sp'+i);
    if(el) await animPath(el,dur);
    if(t!==tok) return;
    if(i<paths.length-1) await sleep(50);
    if(t!==tok) return;
  }
  if(t!==tok) return;
  await sleep(180);
  document.getElementById('cResult').style.opacity='1';
  updateExplain(true);
}
function onSpeed(v){
  var label=document.getElementById('speedLabel');
  if(label && SP[v]) label.textContent=SP[v].l;
}
function replayStrokeAnimation(){
  if(!hasCurrentVowelData()) return;
  playAnim();
}

function renderVowel(v){
  tok++;
  cur=v;
  renderStroke();
  var d=VD[v];
  document.getElementById('dChar').textContent=v;
  document.getElementById('dRoman').textContent=d.roman;
  document.getElementById('dEng').textContent=d.eng;
  var listenText=document.getElementById('phonemeListenText');
  if(listenText) listenText.textContent=d.sound || v;
  updateStepInfo(getStepForVowel(v).step);
  document.getElementById('cVowel').textContent=v;
  document.getElementById('cResult').textContent=d.combo;
  document.getElementById('cResult').style.opacity='0';
  document.getElementById('practiceTarget').textContent=d.combo;
  document.getElementById('practiceInput').value='';
  document.getElementById('practiceMsg').textContent=t('practiceDefault');
  renderWordList();
  updateExplain(false);
}
function playPrincipleVowel(v,btn){
  stopPrincipleAnimationPlayback();
  var d=VD[v];
  if(btn) btn.classList.add('playing');
  function finish(){ if(btn) btn.classList.remove('playing'); }
  if(d) playPronunciation(d.roman,d.sound,null).then(finish);
  else speak(v,null,finish);
}
async function playLesson(withSound){
  var lessonTok=tok;
  if(withSound) await playPronunciation(VD[cur].roman, VD[cur].sound, 'spkMain');
  if(lessonTok!==tok) return;
  await playAnim();
}
function playPronunciation(name,fallbackText,btnId){
  return new Promise(function(resolve){
    var btn=document.getElementById(btnId); if(btn) btn.classList.add('playing');
    var audio=new Audio('audio/'+name+'.wav');
    var done=false; function finish(){if(done) return; done=true; if(btn) btn.classList.remove('playing'); resolve();}
    audio.onended=finish; audio.onerror=function(){speak(fallbackText,btnId,resolve);};
    audio.play().catch(function(){speak(fallbackText,btnId,resolve);});
    setTimeout(finish,3000);
  });
}
function speak(text,btnId,cb){
  if(!window.speechSynthesis){ if(cb) cb(); return; }
  window.speechSynthesis.cancel(); var btn=document.getElementById(btnId); if(btn) btn.classList.add('playing');
  var u=new SpeechSynthesisUtterance(text); u.lang='ko-KR'; u.rate=0.82;
  u.onend=function(){if(btn) btn.classList.remove('playing'); if(cb) cb();}; u.onerror=function(){if(btn) btn.classList.remove('playing'); if(cb) cb();};
  window.speechSynthesis.speak(u);
}
function spkCur(){if(hasCurrentVowelData()) playPronunciation(VD[cur].roman,VD[cur].sound,'spkMain');}
function spkCmb(){if(hasCurrentVowelData()) playPronunciation(VD[cur].roman,VD[cur].combo,'spkCombo');}
function updateExplain(show){
  var lang=currentLang();
  var d=VD[cur] || {};
  var base=lang==='ko' ? ((EXPLAIN_BASE && EXPLAIN_BASE[cur]) || '') : t('articulationGeneric',{vowel:cur,sound:d.sound || cur});
  var warningPack=EXPLAIN_LANG[lang] || {};
  var warning=(lang!=='ko' && warningPack.map && warningPack.map[cur]) ? warningText(warningPack.map[cur], lang) : '';
  document.getElementById('explainKo').textContent=base;
  document.getElementById('explainLangTitle').textContent=warning ? ((languageLabel(lang) || t('selectedLanguage')) + ' ' + t('warningTrend')) : '';
  document.getElementById('explainNative').textContent=warning ? (t('warningPrefix') + warning) : '';
  document.getElementById('explainNative').style.display=warning ? '' : 'none';
  document.getElementById('explainLangTitle').style.display=warning ? '' : 'none';
  document.getElementById('explainKo').style.opacity=show? '1':'.25'; document.getElementById('explainNative').style.opacity=show? '1':'.25';
  updateWordTexts();
  translateStatic();
}
function checkPractice(){
  var val=document.getElementById('practiceInput').value.trim(); var ans=hasCurrentVowelData()?VD[cur].combo:cur; var msg=document.getElementById('practiceMsg');
  if(!val){msg.textContent=t('practiceDefault'); msg.style.color='#888'; return;}
  if(val===ans){msg.textContent=t('practiceGood'); msg.style.color='#0F6E56';}
  else{msg.textContent=t('practiceWrongPrefix')+ans+t('practiceWrongSuffix'); msg.style.color='#D85A30';}
}


async function initApp(){
  try{
    await loadVowelData();
    await loadJamoStrokeDb();
    await loadWordData();
    renderLanguageSelector();
    document.getElementById('spkCombo').innerHTML=spkIcon();
    document.getElementById('spkPractice').innerHTML=spkIcon();
    document.getElementById('spkWord').innerHTML=spkIcon();
    var speedSlider=document.getElementById('speedSlider');
    if(speedSlider){
      speedSlider.addEventListener('input',function(){onSpeed(speedSlider.value);});
      onSpeed(speedSlider.value);
    }
    var replayBtn=document.getElementById('replayStrokeBtn');
    if(replayBtn) replayBtn.addEventListener('click',replayStrokeAnimation);
    buildGrid();
    translateStatic();
    if(new URLSearchParams(location.search).get('page')==='basic'){
      document.documentElement.classList.add('embed-basic');
      pick('ㅏ', aBtn);
    } else {
      showHomeScreen();
    }
  }catch(e){
    document.body.insertAdjacentHTML('afterbegin','<div style="margin:12px;padding:12px;border-radius:12px;background:#fff2f2;color:#9b1c1c;font-size:14px;">'+t('initError')+'</div>');
    console.error(e);
  }
}
initApp();
























