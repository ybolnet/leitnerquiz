class LeitnerAlgorithm {
    constructor(knowledgeStorage) {
        this.storage = knowledgeStorage;
    }

    /**  get a topic to study choosing smartly among them given user performance
     *
     */
    getTopicToStudy() {
        let data = this.storage.getData();

        // If there's no data, return null or throw
        if (!data || Object.keys(data).length === 0) {
            console.warn('No topics available in storage.');
            return null;
        }

        // Convert data into an array with performance values
        let topicList = Object.entries(data).map(([topic, stats]) => {
            let total = stats.correct + stats.incorrect;
            let performance = total === 0 ? 0 : stats.correct / total; // handle divide by zero
            return {topic, performance};
        });

        // Sort by weakest performance (lowest first)
        topicList.sort((a, b) => a.performance - b.performance);

        // Calculate the bottom 20%
        let worst20Percent = Math.ceil(topicList.length * 0.2);
        let worstTopics = topicList.slice(0, worst20Percent);

        // 80% chance to pick from worstTopics, 20% from the entire list
        let takeOnlyLowestPerf = Math.random() < 0.8;
        let listFromWhichToExtract = takeOnlyLowestPerf
            ? worstTopics
            : topicList;

        // Ensure we don't access an empty list
        if (listFromWhichToExtract.length === 0) {
            console.warn('No topics found in selected list.');
            return null;
        }

        // Pick a random topic from the chosen list
        let randomIndex = Math.floor(
            Math.random() * listFromWhichToExtract.length,
        );
        return listFromWhichToExtract[randomIndex].topic;
    }
}
