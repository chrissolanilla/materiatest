//need this to load scss
import './creator.scss';

let widgetState = {
    words1: [],
    words2: [],
    words3: [],
    words4: [],
    description1: '',
    description2: '',
    description3: '',
    description4: ''
};

function updatePreview() {
    widgetState.words1 = document.getElementById('Words1').value.split(',').map(word => word.trim());
    widgetState.words2 = document.getElementById('Words2').value.split(',').map(word => word.trim());
    widgetState.words3 = document.getElementById('Words3').value.split(',').map(word => word.trim());
    widgetState.words4 = document.getElementById('Words4').value.split(',').map(word => word.trim());

    const allWords = [...widgetState.words1, ...widgetState.words2, ...widgetState.words3, ...widgetState.words4].filter(word => word);

    const previewItems = document.querySelectorAll('.previewItem');
    previewItems.forEach((item, index) => {
        item.textContent = allWords[index] || '';
    });
}

function updateDescription() {
    widgetState.description1 = document.getElementById('Description1').value.trim();
    widgetState.description2 = document.getElementById('Description2').value.trim();
    widgetState.description3 = document.getElementById('Description3').value.trim();
    widgetState.description4 = document.getElementById('Description4').value.trim();
}

document.querySelectorAll('.CreatorAnswers input').forEach(input => {
    input.addEventListener('input', updatePreview);
});

document.querySelectorAll('.AnswerDescriptions input').forEach(input => {
    input.addEventListener('input', updateDescription);
});

Materia.CreatorCore.start({
    initNewWidget: (widget, baseUrl, mediaUrl) => {
        // Setup for a new widget
    },
    initExistingWidget: (widget, title, qset, qsetVersion, baseUrl, mediaUrl) => {
        _title = title;
        _qset = qset;
        // Populate existing words and descriptions if editing
        document.getElementById('Words1').value = qset.words1.join(', ');
        document.getElementById('Words2').value = qset.words2.join(', ');
        document.getElementById('Words3').value = qset.words3.join(', ');
        document.getElementById('Words4').value = qset.words4.join(', ');

        document.getElementById('Description1').value = qset.description1;
        document.getElementById('Description2').value = qset.description2;
        document.getElementById('Description3').value = qset.description3;
        document.getElementById('Description4').value = qset.description4;

        // Update internal state
        widgetState.words1 = qset.words1;
        widgetState.words2 = qset.words2;
        widgetState.words3 = qset.words3;
        widgetState.words4 = qset.words4;
        widgetState.description1 = qset.description1;
        widgetState.description2 = qset.description2;
        widgetState.description3 = qset.description3;
        widgetState.description4 = qset.description4;

        updatePreview();
    },
    onSaveClicked: (mode = 'save') => {
        // Save widget data
        const qset = {
            words1: widgetState.words1,
            words2: widgetState.words2,
            words3: widgetState.words3,
            words4: widgetState.words4,
            description1: widgetState.description1,
            description2: widgetState.description2,
            description3: widgetState.description3,
            description4: widgetState.description4,
        };
        Materia.CreatorCore.save(_title, qset);
    },
});
