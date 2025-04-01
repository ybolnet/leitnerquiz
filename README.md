# leitnerquiz
leitner flashcards with AI


Flashcard project looserly based on leitner flashcards.

cards are topics, the actual question is IA generated given the topic.

each knowlege base is a file knowledgeBaseSOMETHING.js.
in this file, list the topics you want to be smart on, one knowledge id, and build the prompt as smartly as you want given the topic.

To use it, change it in the knowledge.htm here:
<script src="./knowledgeBaseTHE_ONE__YOU__WANT__TO__PRACTISE.js"></script>


The prompt will be sent to openAI API.

So put your open key in AIPartner.js.


The project can be launched on a common browser by clicking goint on knowledge.htm with no need to launch a server.
