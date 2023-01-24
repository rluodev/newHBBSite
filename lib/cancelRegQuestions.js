/**
 * 
 */

 export const questions = {
    veri: {
        name: 'Verification Statement',
        type: 'text',
        required: true,
        placeholder: 'Cancel My Registration',
        description: 'Please type "Cancel My Registration" into the textbox below.',
        help: '',
        verify: veri => /Cancel My Registration/.test(veri)
    }
}

export const sections = [
    {
        title: 'Cancel Registration',
        description: 'We\'re sad to see you go!',
        questions: [
            questions.veri,
        ]
    }
];

export default { questions, sections };