// No export, no private method
class PromptIssuer {
    constructor() {}

    // Renamed from #onProbability to _onProbability for convention
    _onProbability(p) {
        return Math.random() < p;
    }

    responseRegex() {
        return /\<QUESTION\>(.+)\<\/QUESTION\>\s*\<ANSWER\>(.+)\<\/ANSWER\>/;
    }

    constructPrompt(topic) {
        const familiarTone = this._onProbability(0.1)
            ? 'avec un ton familier, '
            : this._onProbability(0.3)
            ? 'avec un ton journalistique, '
            : '';

        const feminineTone = this._onProbability(0.2)
            ? 'sur un ton féminin, '
            : '';

        const keigo = this._onProbability(0.1) ? 'en keigo, ' : '';

        const weather = this._onProbability(0.2)
            ? 'qui parle de la meteo, '
            : '';

        const aboutTanakaSan = this._onProbability(0.2)
            ? 'mentionnant un certain Tanaka-san, '
            : '';

        const subject = this._onProbability(0.5)
            ? 'de la politique'
            : this._onProbability(0.5)
            ? "du monde de l'entreprise"
            : 'du sexe';

        const onSubject = this._onProbability(0.2)
            ? `sur le sujet ${subject}, `
            : '';

        const prompt = `Fais une phrase complexe en japonais ${familiarTone}${feminineTone}${keigo}${weather}${aboutTanakaSan}${onSubject}contenant l'expression: ${topic}, puis donne la traduction en français et pronconciation en romaji sous cette forme : "<QUESTION> [phrase en japonais] </QUESTION> <ANSWER> [traduction et prononciation] </ANSWER>"`;

        return prompt;
    }
}

class TopicProvider {
    knowledgeId() {
        return 'kanjiPerformance3';
    }
    topics() {
        return [
            '特徴',
            '所属',
            '決定',
            '氷水',
            '接近',
            '生存者',
            '脱獄',
            '地獄',
            '服を脱ぐ',
            '統治',
            '統計',
            '切り抜ける',
            '至って',
            '掃除する',
            'あっという間に',
            '非難',
            '避難',
            '旅行先',
            '懐かしい',
            '壊す',
            '褒める',
            'ちっとも～ない',
            '削除',
            'だけに',
            'なくはない',
            '不幸',
            '辛い',
            'からといって...ということにはならない',
            'くせして',
            'まだしも',
            '滅ぼす',
            'ままに',
            '域外',
            '域内',
            '地域',
            '武器',
            '企画',
            '企業',
            '予想',
            '貴族',
            '責任',
            'て + はじめて',
            '批判',
            '潜在',
            '成績',
            '功績',
            '貴族と真実',
            '警備',
            '公式 et aussi 武器',
            '考慮 et aussi 遠慮',
            '環境',
            '体制',
            '端的',
            '顔　et aussi　頭',
            '何かを呼びかける',
            '一方で',
            '持続可能',
            '拠点',
            '確信',
            '技術',
            '改めて',
            '余儀なくされる',
            '評価',
            '実 et aussi 美 à la fois',
            '基準',
            '恐れる et aussi 怒る à la fois',
            'とすると',
            'と考えると',
            '象徴',
            '実現',
            '容疑者',
            '現段階で',
            '諦める',
            '近年',
            '気象',
            '対策',
            '加速',
            '隠す',
            '警告 et aussi 改造 et 攻撃 à la fois',
            '投票 et aussi 投げる à la fois',
            '潜む et aussi 隠す à la fois',
            '国防',
            '防犯カメラ',
            '魔法 et aussi 考慮 à la fois',
            '秘密 et 精密 et aussi　必死',
            '積極的 et 消極的',
            '優秀',
            '権力闘争',
            '欠如',
            '公式発表',
            '一環として',
            '仕事 et aussi 仕方 et 事件 à la fois',
            '提案',
            '激しい',
            '予感',
            '勝手が違う',
            '定める',
            'にもかかわらず',
            '正義',
            '予算 et aussi 予感',
            '再生可能エネルギー et aussi 持続可能',
            '向上',
            '真似',
            '拒否',
            'た + あげく',
            '単純 et 水準 et aussi 純粋',
            '心理学',
            '改革',
            '影響',
            '影',
            '信頼',
            '適切 et 敵',
            'xxx に気付く',
            '加減',
            '余裕',
            '減る et 感じる',
            '構う',
            '興味深い',
            '重ねる',
            'か...ないかのうちに',
            '欠かす',
            '健全',
            '意向',
            '及ぼす',
            '極める',
            'に違いない',
            '主張',
            '設置',
            '詳細 et aussi 免許証',
            '直面',
            'における',
            '歴史 et aussi 禁止',
            '服装',
            '報じる',
            '地球温暖化',
            'X+との事',
            '不可欠',
            '各国',
            'présent+ことがあります',
            '卒業 et aussi 効率',
            '報道',
            '討論',
            '検討',
            '検査',
            '教える et aussi 考える',
            '事象 et aussi 気象',
            '賛成 et aussi 潜在',
            '前提',
            '裁判 et aussi 装置',
            '敬語',
            '常に',
            '指導',
            '注目を引く',
            '注目の的',
            '数ヶ月',
            '慎む et aussi 慣れる et aussi 慣行',
            '慎重',
            '祭り',
            '会場',
            '寿命',
            '密接',
            '不慮',
            '場面',
        ];
    }
}
