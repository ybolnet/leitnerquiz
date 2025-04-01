class AIPartner {
    constructor() {
        this.API_KEY = 'YOUR_OPENAI_KEY';
    }
    async getQuestion(prompt) {
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [{role: 'user', content: prompt}],
                    max_tokens: 1000,
                }),
            },
        );
        const data = await response.json();
        if (
            !data ||
            !data.choices ||
            !data.choices[0] ||
            !data.choices[0].message
        ) {
            throw new Error("Réponse inattendue de l'API");
        }
        const responseText = data.choices[0].message.content;
        return responseText;
    }
}
