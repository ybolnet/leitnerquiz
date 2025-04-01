class QuestionMapper {
    constructor(regex) {
        this.mappingRegex = regex;
    }
    map(question) {
        const match = question.match(this.mappingRegex);
        if (match) {
            return {
                question: match[1],
                answer: match[2],
            };
        } else {
            throw new Error('Le format de la réponse est incorrect.');
        }
    }
}
