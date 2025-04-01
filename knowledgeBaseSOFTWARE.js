// No export, no private method
class PromptIssuer {
    constructor() {}

    // Renamed from #onProbability to _onProbability for convention
    _onProbability(p) {
        return Math.random() < p;
    }

    responseRegex() {
        return /\<SLICKQUESTION\>([\s\S]+)\<\/SLICKQUESTION\>\s*\<SLICKANSWER\>([\s\S]+)\<\/SLICKANSWER\>/;
    }

    constructPrompt(topic) {
        const withCode = this._onProbability(0.3)
            ? 'en proposant un exemple concret, '
            : '';
        const type = this._onProbability(0.1)
            ? 'avec (si le sujet parle de code) un code à corriger, '
            : this._onProbability(0.1)
            ? "avec (si le sujet parle de code) du code que l'etudiant doit proposer, "
            : this._onProbability(0.9)
            ? "avec (si le sujet parle de code) un code qui a des print et l'étudiant doit prédire ce qui s'affichera,"
            : '';
        const difficulty = this._onProbability(0.2)
            ? "La question/l'exercice doit vérifier la bonne compréhension de l'étudiant, ne doit pas être une application directe, et doit nécessiter un peu de réflexion de sa part. Et ne doit pas toujours être la même chose chaque fois que ce prompt est lancé."
            : this._onProbability(0.2)
            ? "La question/l'exercice doit vérifier une compréhension sur le principe, sans forcément aller dans les détails."
            : '';
        const prompt = `En développement informatique, propose une question/un exercice sur le sujet suivant : "${topic}", ${withCode} et affiche ta réponse uniquement sous cette forme avec rien d'autre : "<SLICKQUESTION> [question] </SLICKQUESTION> <SLICKANSWER> [réponse] </SLICKANSWER>". La réponse doit tenir en moins de 500 mots, sois très concis. ${difficulty}`;
        return prompt;
    }
}

class TopicProvider {
    knowledgeId() {
        return 'SOFTWARE';
    }
    topics() {
        return [
            "SQL: left outer join (l'étudiant doit comprendre seul que c'est cette jointure qu'il faut utiliser)",
            "SQL: cross join (l'étudiant doit comprendre seul que c'est cette jointure qu'il faut utiliser)",
            'typescript: difference entre == et ===',
            'Android: cold flows ou hot flows',
            'SOLID: le I',
            'SOLID: dependency inversion',
            'design pattern: strategy',
            'SQL: quelle jointure utiliser entre inner join ou outer join',
            'une situation relève-t-elle de covariance ou contravariance?',
            "javascript: comment itérer sur les clés d'un objet",
            'typescript: awaits redondants',
            'typescript: async et await quand les utiliser',
            'android kotlin: différents types de hot flows',
            'sql: mise à jour en cascade',
            'nodejs: nvm vs npm différences',
        ];
    }
}
