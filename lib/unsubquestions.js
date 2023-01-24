/**
 * 
 */

 export const questions = {
    email: {
        name: 'Your Email',
        type: 'email',
        required: true,
        placeholder: 'jane@example.com',
        description: 'We\'ll use this to remove you from our database of subscribed emails.',
        help: '',
        verify: email => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
    },
    reasonForLeaving: {
        name: 'If you have a few moments, could you let us know why you\'re unsubscribing?',
        type: 'text',
        required: false,
        placeholder: 'Type text here...',
        description: '',
        help: '',
        verify: () => true
    }
}

export const sections = [
    {
        title: 'Unsubscribe',
        description: 'We\'re sad to see you go!',
        questions: [
            questions.email,
            questions.reasonForLeaving
        ]
    }
];

export default { questions, sections };