class FeedbackQueue {
    constructor(maxSize = 5) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    addItem({question, correctAnswer, userAnswer, topic}) {
        if (this.queue.length >= this.maxSize) {
            console.warn('Queue is already full.');
            return;
        }
        this.queue.push({question, correctAnswer, userAnswer, topic});
    }

    isFull() {
        return this.queue.length >= this.maxSize;
    }

    getItems() {
        return this.queue;
    }

    clear() {
        this.queue = [];
    }
}
