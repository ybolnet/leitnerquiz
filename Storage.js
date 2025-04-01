const DEFAULT_STATS = {correct: 0, incorrect: 10};

class KnowledgeStorage {
    constructor(topics, knowledgeId) {
        this.topics = topics;
        this.knowledgeId = knowledgeId;
    }

    _getKey() {
        return this.knowledgeId;
    }

    getData() {
        const rawData = localStorage.getItem(this._getKey());
        let jsonData;
        if (!rawData) {
            return this.setData({});
        }
        try {
            jsonData = JSON.parse(rawData);
        } catch (error) {
            console.error(
                'Failed to parse data. Resetting performance data.',
                error,
            );
            return this.setData({});
        }
        this.topics.forEach((topic) => {
            if (!jsonData[topic] || typeof jsonData[topic] !== 'object') {
                jsonData[topic] = {...DEFAULT_STATS};
            } else {
                if (typeof jsonData[topic].correct !== 'number')
                    jsonData[topic].correct = DEFAULT_STATS.correct;
                if (typeof jsonData[topic].incorrect !== 'number')
                    jsonData[topic].incorrect = DEFAULT_STATS.incorrect;
            }
        });
        return jsonData;
    }

    saveData(topic, isCorrect) {
        const data = this.getData();

        if (!data[topic] || typeof data[topic] !== 'object') {
            data[topic] = {...DEFAULT_STATS};
        }

        if (isCorrect) {
            data[topic].correct += 1;
        } else {
            data[topic].incorrect += 1;
        }

        this._saveToLocalStorage(data);
    }

    resetPerformanceData() {
        const existingData = this.getData();
        Object.keys(existingData).forEach((topic) => {
            existingData[topic] = {...DEFAULT_STATS};
        });
        this._saveToLocalStorage(existingData);
    }

    setData(newData) {
        const allTopics = new Set([...Object.keys(newData), ...this.topics]);

        allTopics.forEach((topic) => {
            if (!newData[topic] || typeof newData[topic] !== 'object') {
                newData[topic] = {...DEFAULT_STATS};
            } else {
                if (typeof newData[topic].correct !== 'number')
                    newData[topic].correct = DEFAULT_STATS.correct;
                if (typeof newData[topic].incorrect !== 'number')
                    newData[topic].incorrect = DEFAULT_STATS.incorrect;
            }
        });

        this._saveToLocalStorage(newData);
        return newData;
    }

    _saveToLocalStorage(data) {
        try {
            localStorage.setItem(this._getKey(), JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save data to localStorage:', error);
        }
    }
}
