class ExportingUX {
    constructor(knowledgeStorage) {
        this.storage = knowledgeStorage;
    }

    exportData() {
        const performanceData = this.storage.getData();
        const jsonString = JSON.stringify(performanceData, null, 2);

        const blob = new Blob([jsonString], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        let fileName = prompt(
            'Entrez le nom du fichier à exporter :',
            `performance-${new Date().toISOString().split('T')[0]}.json`,
        );

        if (!fileName) {
            this._displayMessage(
                'Export annulé : aucun nom de fichier fourni.',
            );
            return;
        }

        if (!fileName.toLowerCase().endsWith('.json')) {
            fileName += '.json';
        }

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this._displayMessage('Données exportées avec succès !');
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) {
                this._displayMessage('Aucun fichier sélectionné.');
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);

                    if (!this._validateImportedData(importedData)) {
                        this._displayMessage(
                            'Le format du fichier est invalide.',
                        );
                        return;
                    }

                    this.storage.setData(importedData);
                    this._displayMessage('Données importées avec succès !');

                    if (typeof this.onImportSuccess === 'function') {
                        this.onImportSuccess();
                    }
                } catch (error) {
                    console.error("Erreur lors de l'import :", error);
                    this._displayMessage("Erreur lors de l'import du fichier.");
                }
            };

            reader.readAsText(file);
        });

        input.click();
    }

    _validateImportedData(data) {
        if (typeof data !== 'object' || data === null) return false;

        return Object.values(data).every((stats) => {
            return (
                typeof stats === 'object' &&
                typeof stats.correct === 'number' &&
                typeof stats.incorrect === 'number'
            );
        });
    }

    _displayMessage(text) {
        const messageEl = document.getElementById('message');
        if (!messageEl) {
            alert(text);
            return;
        }

        messageEl.innerText = text;
        messageEl.style.display = 'block';

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 4000);
    }

    setOnImportSuccessCallback(callback) {
        this.onImportSuccess = callback;
    }
}
