const word = (id, phrase, lemma, translation, explanation, note) => ({
  id,
  phrase,
  lemma,
  type: '단어 · Salita',
  translation,
  explanation,
  note,
});

const grammar = (id, phrase, lemma, translation, explanation, note) => ({
  id,
  phrase,
  lemma,
  type: '문법 · Gramatika',
  translation,
  explanation,
  note,
});

function buildSegments(text, highlights) {
  const located = highlights
    .map((highlight) => {
      const start = text.indexOf(highlight.phrase);
      if (start < 0) {
        throw new Error(`본문에서 주석 표현을 찾을 수 없습니다: ${highlight.phrase}`);
      }
      return { ...highlight, start, end: start + highlight.phrase.length };
    })
    .sort((a, b) => a.start - b.start);

  const segments = [];
  let cursor = 0;

  located.forEach((highlight) => {
    if (highlight.start < cursor) {
      throw new Error(`주석 표현이 서로 겹칩니다: ${highlight.phrase}`);
    }
    if (highlight.start > cursor) {
      segments.push({ text: text.slice(cursor, highlight.start) });
    }
    segments.push({ text: highlight.phrase, annotationId: highlight.id });
    cursor = highlight.end;
  });

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor) });
  }

  return segments;
}

function page(pageNumber, koreanText, tagalogText, highlights, imageAlt) {
  return {
    pageNumber,
    image: `./story-turtle-monkey-page-${String(pageNumber).padStart(2, '0')}.webp`,
    imageAlt,
    koreanText,
    koreanSegments: buildSegments(koreanText, highlights),
    tagalogText,
    annotations: Object.fromEntries(
      highlights.map(({ id, phrase: _phrase, ...annotation }) => [id, annotation])
    ),
  };
}

export const storyPages = [
  page(
    1,
    '옛날에 거북이와 원숭이가 강물 위를 떠내려오는 바나나 나무 한 그루를 발견했어요. 커다란 초록 잎이 달리고 뿌리도 붙어 있는 아주 좋은 나무였어요. 마치 폭풍에 뽑혀 온 것 같았어요.',
    'Minsan, nakakita ang pagong at ang matsing ng isang puno ng saging na lumulutang sa gitna ng mga alon ng ilog. Napakagandang puno iyon, may malalaking berdeng dahon at may mga ugat pa. Para bang binunot ito ng bagyo.',
    [
      word('drift', '떠내려오는', '떠내려오다', 'maanod papalapit / matangay ng agos', '물의 흐름을 따라 화자가 있는 쪽으로 움직이는 것을 말해요.', 'Ang –아/어 오다 ay nagpapakita ng kilos na papalapit sa nagsasalita.'),
      word('counter-tree', '그루', '그루', 'pantukoy sa bilang ng puno', '나무를 셀 때 사용하는 단위예요.', '나무 한 그루 = isang puno'),
      word('discover', '발견했어요', '발견하다', 'matuklasan / makita', '전에 알지 못했던 것을 찾아내는 말이에요.', '발견했어요는 과거형이에요.'),
      grammar('state-remains', '붙어 있는', '–아/어 있다', 'nananatili sa isang kalagayan', '행동이 끝난 뒤 그 결과 상태가 계속됨을 나타내요.', '뿌리가 붙어 있다 = nakakabit pa rin ang mga ugat'),
    ],
    '강물에 떠내려오는 바나나 나무를 바라보는 거북이와 원숭이'
  ),
  page(
    2,
    '둘은 나무를 강가로 끌어 올렸어요. 거북이가 말했어요. “이 나무를 나눠서 각자 자기 몫을 심자.”',
    'Iniahon nila ito sa pampang. “Hatiin natin ito,” sabi ng pagong, “at itanim ng bawat isa ang kanyang bahagi.”',
    [
      word('haul-up', '끌어 올렸어요', '끌어 올리다', 'hilahin paitaas / iahon', '아래에 있는 것을 잡아당겨 위로 옮기는 말이에요.', '강가로 끌어 올리다 = iahon sa pampang'),
      word('divide', '나눠서', '나누다', 'hatiin', '하나를 여러 부분으로 가르는 말이에요.', '–아서/어서 뒤에 다음 행동이 이어져요.'),
      word('each', '각자', '각자', 'bawat isa', '여러 사람이 저마다 따로 행동하는 것을 뜻해요.', '각자 자기 몫 = kanya-kanyang bahagi'),
    ],
    '바나나 나무를 강가로 함께 끌어 올리는 거북이와 원숭이'
  ),
  page(
    3,
    '둘은 나무 가운데를 잘랐어요. 원숭이는 자기가 더 힘이 세다며 윗부분을 가졌어요. 잎이 달려 있으니 더 빨리 자랄 거라고 생각했거든요.',
    'Hinati nila ito sa gitna. Dahil mas malakas, kinuha ng matsing ang itaas na bahagi ng puno. Akala niya ay mas mabilis itong lalaki dahil may mga dahon ito.',
    [
      word('middle', '가운데', '가운데', 'gitna', '어떤 공간이나 물체의 한복판을 말해요.', '나무 가운데 = gitna ng puno'),
      grammar('claiming', '힘이 세다며', '–다며', 'sinasabing / dahil sa sabi', '들은 말이나 주장을 줄여서 전할 때 사용해요.', '자기가 힘이 세다며 = sinasabing mas malakas siya'),
      grammar('thought', '자랄 거라고 생각했거든요', '–(으)ㄹ 거라고 생각하다', 'akala na mangyayari', '앞으로 일어날 것이라고 예상하거나 믿을 때 사용해요.', '자랄 거라고 생각하다 = akalaing lalaki'),
    ],
    '잎이 달린 윗부분을 차지한 원숭이와 뿌리 부분 옆의 거북이'
  ),
  page(
    4,
    '힘이 약한 거북이는 아랫부분을 가졌어요. 보기에는 못생겼지만 뿌리가 있었어요.',
    'Dahil mas mahina, napunta sa pagong ang ibabang bahagi. Pangit itong tingnan, pero may mga ugat ito.',
    [
      word('lower-part', '아랫부분', '아랫부분', 'ibabang bahagi', '어떤 것의 아래쪽에 있는 부분이에요.', '아랫부분의 반대말은 윗부분이에요.'),
      grammar('looks', '보기에는', '–기에는', 'kung titingnan / para sa', '어떤 기준이나 관점에서 판단할 때 사용해요.', '보기에는 = kung titingnan'),
      grammar('contrast', '못생겼지만', '–지만', 'ngunit / pero', '앞뒤의 내용이 서로 반대일 때 연결해요.', '못생겼지만 뿌리가 있다 = pangit pero may ugat'),
    ],
    '뿌리가 달린 바나나 나무 아랫부분을 맡은 거북이'
  ),
  page(
    5,
    '며칠 뒤 둘이 다시 만났어요. 거북이가 물었어요. “안녕하세요, 원숭이 씨. 바나나 나무는 잘 자라요?”',
    'Makalipas ang ilang araw, nagkita sila. “Kumusta, Ginoong Matsing,” sabi ng pagong. “Kumusta ang puno mo ng saging?”',
    [
      word('days-later', '며칠 뒤', '며칠 뒤', 'makalipas ang ilang araw', '몇 날이 지난 다음을 뜻해요.', '뒤는 시간상 나중을 나타내요.'),
      word('meet-again', '다시 만났어요', '다시 만나다', 'nagkita muli', '헤어졌던 사람이나 대상을 또 만나는 말이에요.', '다시 = muli'),
      word('grow-well', '잘 자라요', '잘 자라다', 'lumalaking mabuti', '식물이나 동물이 건강하게 커지는 것을 말해요.', '잘은 행동이 좋은 상태로 이루어짐을 나타내요.'),
    ],
    '숲길에서 다시 만나 대화하는 거북이와 원숭이'
  ),
  page(
    6,
    '“아이고,” 원숭이가 대답했어요. “벌써 오래전에 죽어 버렸어요! 거북이 씨 나무는요?”',
    '“Naku,” sagot ng matsing, “matagal na itong patay! E ang sa iyo, Binibining Pagong?”',
    [
      word('already', '벌써', '벌써', 'na / agad', '예상보다 빠르게 일이 일어났음을 나타내요.', '벌써 죽었다 = patay na'),
      word('long-ago', '오래전에', '오래전에', 'matagal na ang nakalipas', '지금보다 훨씬 이전의 때를 말해요.', '오래전 + 에'),
      grammar('regret-complete', '죽어 버렸어요', '–아/어 버리다', 'tuluyang nangyari', '일이 완전히 끝났거나 아쉬운 결과가 생겼음을 나타내요.', '죽어 버렸다에는 안타까운 느낌이 있어요.'),
    ],
    '말라 죽은 바나나 나무 옆에서 풀이 죽은 원숭이'
  ),
  page(
    7,
    '“아주 잘 자랐어요. 잎도 나고 열매도 열렸어요. 그런데 나무에 올라갈 수가 없어서 딸 수가 없어요.”',
    '“Napakaganda nga; may mga dahon at bunga na. Kaya lang, hindi ako makaakyat para pitasin ang mga ito.”',
    [
      word('fruit', '열매', '열매', 'bunga', '꽃이 진 뒤 식물에 맺히는 것을 말해요.', '바나나 열매 = bunga ng saging'),
      grammar('cannot-climb', '올라갈 수가 없어서', '–(으)ㄹ 수가 없다', 'hindi kayang gawin', '능력이나 상황 때문에 할 수 없음을 강조해요.', '올라갈 수가 없다 = hindi makaakyat'),
      word('pick', '딸 수가 없어요', '따다', 'pitasin', '나무에 달린 열매나 꽃을 떼어 내는 말이에요.', '열매를 따다 = pumitas ng bunga'),
    ],
    '열매가 가득한 바나나 나무를 올려다보는 거북이'
  ),
  page(
    8,
    '“걱정 마세요. 내가 올라가서 따 줄게요.” 속셈이 나쁜 원숭이가 말했어요. “그래 주세요, 원숭이 씨.” 거북이는 고마워하며 대답했어요.',
    '“Huwag kang mag-alala,” sabi ng masamang-loob na matsing. “Aakyat ako at pipitasin ko ang mga iyon para sa iyo.” “Sige, Ginoong Matsing,” sagot ng pagong na nagpapasalamat.',
    [
      word('dont-worry', '걱정 마세요', '걱정 말다', 'huwag mag-alala', '상대에게 염려하지 말라고 안심시키는 표현이에요.', '–지 마세요는 정중한 금지 표현이에요.'),
      grammar('do-for', '따 줄게요', '–아/어 주다', 'gagawin para sa iyo', '다른 사람을 위해 어떤 행동을 할 때 사용해요.', '따 줄게요 = pipitasin ko para sa iyo'),
      word('hidden-intent', '속셈', '속셈', 'lihim na balak', '마음속에 숨겨 둔 생각이나 계획이에요.', '속셈이 나쁘다 = may masamang balak'),
    ],
    '도와주겠다고 말하지만 열매를 탐내는 원숭이와 고마워하는 거북이'
  ),
  page(
    9,
    '그래서 둘은 거북이네 집으로 함께 걸어갔어요.',
    'At naglakad silang dalawa papunta sa bahay ng pagong.',
    [
      word('therefore', '그래서', '그래서', 'kaya / samakatuwid', '앞의 일이 뒤의 일에 원인이나 이유가 될 때 사용해요.', '그래서 뒤에는 결과가 나와요.'),
      word('together', '함께', '함께', 'magkasama', '둘 이상의 사람이 같이 하는 것을 뜻해요.', '함께 걸어가다 = maglakad nang magkasama'),
      grammar('toward-home', '집으로', '–(으)로', 'patungo sa', '움직이는 방향이나 목적지를 나타내요.', '집으로 가다 = pumunta sa bahay'),
    ],
    '거북이의 집을 향해 숲길을 함께 걷는 두 동물'
  ),
  page(
    10,
    '원숭이는 커다란 초록 잎 사이에 매달린 샛노란 열매를 보자마자 나무 위로 올라갔어요. 그러고는 열매를 마구 따서 우적우적, 허겁지겁 최대한 빨리 먹어 치웠어요.',
    'Nang makita ng matsing ang matingkad na dilaw na mga bunga na nakabitin sa pagitan ng malalaking berdeng dahon, umakyat agad siya. Nagsimula siyang manguha, ngumuya at lumamon nang pinakamabilis na kaya niya.',
    [
      grammar('as-soon-as', '보자마자', '–자마자', 'sa sandaling / agad pagkatapos', '앞의 행동이 끝난 즉시 뒤의 행동이 이어짐을 나타내요.', '보자마자 올라갔다 = umakyat agad nang makita'),
      word('recklessly', '마구', '마구', 'walang patumangga', '순서나 절제 없이 함부로 하는 모습을 나타내요.', '마구 따다 = mamitas nang walang pagpipigil'),
      word('devour', '먹어 치웠어요', '먹어 치우다', 'ubusin sa pagkain', '음식을 남김없이 빠르게 먹는다는 뜻이에요.', '완전히 먹었다는 느낌을 강조해요.'),
    ],
    '바나나 나무 위에서 열매를 허겁지겁 먹는 원숭이'
  ),
  page(
    11,
    '원숭이는 거북이에게 조금도 신경 쓰지 않았어요. “나도 좀 줘요.” 거북이가 말했어요.',
    'Hindi man lang pinapansin ng matsing ang pagong. “Bigyan mo naman ako,” sabi ng pagong.',
    [
      grammar('not-at-all', '조금도', '조금도 –지 않다', 'hindi man lang / hindi kahit kaunti', '부정 표현과 함께 써서 전혀 그렇지 않음을 강조해요.', '조금도 신경 쓰지 않다 = hindi man lang pansinin'),
      word('pay-attention', '신경 쓰지 않았어요', '신경 쓰다', 'pansinin / alalahanin', '어떤 대상에 관심을 두거나 마음을 쓰는 말이에요.', '–지 않다는 부정을 나타내요.'),
      word('give-me', '나도 좀 줘요', '주다', 'bigyan mo rin ako', '상대에게 무엇을 달라고 정중하게 부탁하는 표현이에요.', '좀은 부탁을 부드럽게 만들어요.'),
    ],
    '나무 위 원숭이에게 바나나를 나눠 달라고 부탁하는 거북이'
  ),
  page(
    12,
    '원숭이는 양 볼에 바나나를 가득 문 채 대꾸했어요. “껍질을 먹을 수 있다 해도, 껍질 한 조각도 안 줄 거예요.”',
    'Puno ng saging ang magkabilang pisngi ng matsing nang sumagot siya: “Kahit balat, hindi kita bibigyan, kung nakakain man iyon.”',
    [
      word('both-cheeks', '양 볼', '양 볼', 'magkabilang pisngi', '왼쪽과 오른쪽 두 볼을 함께 이르는 말이에요.', '양은 둘 다라는 뜻이에요.'),
      grammar('while-holding', '가득 문 채', '–(으)ㄴ 채', 'habang nananatili ang kalagayan', '어떤 상태를 그대로 유지하면서 다른 행동을 할 때 사용해요.', '입에 문 채 대답하다'),
      grammar('even-if', '먹을 수 있다 해도', '–다 해도', 'kahit na', '어떤 조건을 인정해도 결과가 달라지지 않음을 나타내요.', '먹을 수 있다 해도 안 주다'),
    ],
    '바나나를 입에 가득 문 채 거절하는 원숭이'
  ),
  page(
    13,
    '거북이는 복수를 궁리했어요. 거북이는 강으로 가서 뾰족한 고둥을 주워 왔어요.',
    'Nag-isip ang pagong ng paghihiganti. Pumunta siya sa ilog at namulot ng matutulis na suso.',
    [
      word('revenge', '복수', '복수', 'paghihiganti', '자신이 당한 일에 대해 상대에게 되갚는 것을 말해요.', '복수를 하다 = maghiganti'),
      word('devise', '궁리했어요', '궁리하다', 'pag-isipang mabuti', '좋은 방법을 찾으려고 깊이 생각하는 말이에요.', '방법을 궁리하다'),
      word('pick-bring', '주워 왔어요', '주워 오다', 'pulutin at dalhin pabalik', '바닥의 물건을 집어서 화자가 있는 곳으로 가져오는 말이에요.', '–아/어 오다는 이동 방향을 보여 줘요.'),
    ],
    '강가에서 뾰족한 고둥을 모으는 거북이'
  ),
  page(
    14,
    '그리고 그 고둥을 바나나 나무 둘레에 빙 둘러 심었어요. 그다음 야자 껍데기 밑에 몸을 숨겼어요.',
    'Itinanim niya ang mga ito sa paligid ng puno ng saging. Pagkatapos, nagtago siya sa ilalim ng bao ng niyog.',
    [
      word('around', '둘레', '둘레', 'paligid', '어떤 물체의 가장자리를 빙 둘러싼 부분이에요.', '나무 둘레 = paligid ng puno'),
      word('all-around', '빙 둘러', '빙 둘러', 'paikot sa buong paligid', '어떤 대상을 원 모양으로 완전히 에워싸는 모습이에요.', '빙 둘러 심다'),
      word('hide', '몸을 숨겼어요', '몸을 숨기다', 'magtago', '다른 사람에게 보이지 않도록 감추는 말이에요.', '껍데기 밑에 숨다'),
    ],
    '고둥을 나무 둘레에 놓고 야자 껍데기 아래 숨은 거북이'
  ),
  page(
    15,
    '원숭이가 나무에서 내려오다가 고둥에 찔려 다쳤어요. 피가 나기 시작했어요.',
    'Pagbaba ng matsing, nasugatan siya at nagsimulang dumugo.',
    [
      grammar('while-coming-down', '내려오다가', '–다가', 'habang ginagawa', '어떤 행동을 하는 중에 다른 일이 생겼음을 나타내요.', '내려오다가 다치다'),
      word('pricked', '찔려', '찔리다', 'matusok', '뾰족한 것에 몸이 닿아 상처가 나는 말이에요.', '고둥에 찔리다'),
      grammar('begin', '나기 시작했어요', '–기 시작하다', 'magsimulang gawin', '어떤 행동이나 상태가 처음으로 나타남을 뜻해요.', '피가 나기 시작하다 = magsimulang dumugo'),
    ],
    '나무에서 내려오다 고둥에 발을 찔린 원숭이'
  ),
  page(
    16,
    '원숭이는 한참을 찾아다닌 끝에 거북이를 찾아냈어요. “이 못된 녀석, 여기 있었구나!”',
    'Matapos ang matagal na paghahanap, natagpuan niya ang pagong. “Hamak na nilalang, nandito ka pala!” sabi niya.',
    [
      word('long-time', '한참을', '한참', 'sa loob ng mahabang sandali', '시간이 꽤 오래 이어지는 것을 나타내요.', '한참을 찾다'),
      grammar('after-searching', '찾아다닌 끝에', '–(으)ㄴ 끝에', 'pagkatapos ng mahabang pagsisikap', '오랫동안 노력한 뒤에 마침내 결과가 생겼음을 나타내요.', '찾아다닌 끝에 발견하다'),
      grammar('realization', '있었구나', '–구나', 'pala', '새롭게 알게 된 사실에 대한 느낌을 나타내요.', '여기 있었구나 = nandito ka pala'),
    ],
    '야자 껍데기 아래 숨은 거북이를 찾아낸 원숭이'
  ),
  page(
    17,
    '“네가 한 나쁜 짓의 대가를 치러야 해. 너는 죽어야 해. 하지만 나는 아주 너그러우니까, 어떻게 죽을지는 네가 고르게 해 주지.”',
    '“Kailangan mong pagbayaran ang kasamaan mo; kailangan mong mamatay. Pero dahil napakabait ko, ikaw na ang pumili kung paano ka mamamatay.”',
    [
      word('pay-price', '대가를 치러야 해', '대가를 치르다', 'pagbayaran ang ginawa', '어떤 행동의 결과나 책임을 감당한다는 뜻이에요.', '–아/어야 하다는 의무를 나타내요.'),
      grammar('because-generous', '너그러우니까', '–(으)니까', 'dahil / sapagkat', '앞의 내용을 이유로 제시할 때 사용해요.', '너그러우니까 고르게 한다'),
      grammar('let-choose', '고르게 해 주지', '–게 하다', 'hayaan o ipagawa', '다른 사람이 어떤 행동을 하도록 허락하거나 시키는 표현이에요.', '고르게 하다 = hayaang pumili'),
    ],
    '거북이를 붙잡고 선택권을 주겠다고 말하는 원숭이'
  ),
  page(
    18,
    '“절구에 넣고 찧을까, 아니면 물에 던져 버릴까? 어느 쪽이 좋아?”',
    '“Dudurugin ba kita sa lusong, o itatapon kita sa tubig? Alin ang gusto mo?”',
    [
      word('mortar', '절구', '절구', 'lusong', '곡식이나 재료를 넣고 찧는 도구예요.', '절구에 넣다'),
      word('pound', '찧을까', '찧다', 'dikdikin', '절구 같은 도구로 여러 번 눌러 부수는 말이에요.', '–(으)ㄹ까는 선택이나 제안을 물어요.'),
      word('which-side', '어느 쪽', '어느 쪽', 'alin / aling panig', '둘 이상의 선택 가운데 하나를 물을 때 사용해요.', '어느 쪽이 좋아? = Alin ang gusto mo?'),
    ],
    '절구와 강물 사이에서 거북이에게 선택을 묻는 원숭이'
  ),
  page(
    19,
    '“절구요, 절구!” 거북이가 대답했어요. “물에 빠지는 게 너무 무서워요.” “오호!” 원숭이가 웃었어요. “그래? 물에 빠지는 게 무섭다고! 그럼 물에 빠뜨려 주지.”',
    '“Sa lusong, sa lusong!” sagot ng pagong. “Takot na takot akong malunod.” “Oho!” tawa ng matsing. “Talaga! Takot kang malunod! Ngayon, lulunurin kita.”',
    [
      grammar('nominalize', '빠지는 게', '–는 게', 'ang paggawa / ang pangyayari', '동작이나 상태를 명사처럼 말할 때 사용해요.', '빠지는 게 무섭다 = nakakatakot ang malunod'),
      word('scary', '무서워요', '무섭다', 'nakakatakot / natatakot', '두렵거나 겁이 나는 마음을 나타내요.', '너무 무서워요 = takot na takot ako'),
      word('make-fall', '빠뜨려 주지', '빠뜨리다', 'ihulog / ilubog', '다른 대상을 물이나 아래쪽으로 떨어지게 하는 말이에요.', '빠지다의 사동 표현이에요.'),
    ],
    '물에 빠지는 것이 무섭다고 연기하는 거북이와 웃는 원숭이'
  ),
  page(
    20,
    '원숭이는 강가로 가서 거북이를 휙 던져 물속에 빠뜨렸어요. 하지만 거북이는 곧 물 위로 떠올라 헤엄쳤어요. 그러고는 속아 넘어간 교활한 원숭이를 보며 웃었어요.',
    'Pumunta ang matsing sa pampang at inihagis ang pagong sa tubig. Pero di nagtagal, lumitaw ang pagong na lumalangoy at pinagtatawanan ang nalinlang at tusong matsing.',
    [
      word('swiftly', '휙', '휙', 'biglang mabilis', '빠르고 세게 움직이는 모양을 나타내는 말이에요.', '휙 던지다'),
      word('surface', '떠올라', '떠오르다', 'lumitaw sa ibabaw', '물속에서 물 위쪽으로 올라오는 것을 말해요.', '물 위로 떠오르다'),
      word('be-fooled', '속아 넘어간', '속아 넘어가다', 'malinlang', '다른 사람의 꾀나 거짓말을 그대로 믿는다는 뜻이에요.', '원숭이가 거북이의 꾀에 속았어요.'),
    ],
    '강물 위로 떠올라 헤엄치며 원숭이를 바라보는 거북이'
  ),
];

export function getStoryPage(pageNumber) {
  return storyPages.find((item) => item.pageNumber === pageNumber) ?? null;
}

export function getAnnotation(pageNumber, annotationId) {
  return getStoryPage(pageNumber)?.annotations[annotationId] ?? null;
}
