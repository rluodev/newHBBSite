/**
 * Full Name ✅
 * Ponouns ✅
 * Technical Skill Level ✅
 * Dietery Restrictions ✅
 * Parent/Guardian Name ✅
 * Parent/Guardian Email ✅
 * Email ✅
 * Shirt Size ✅
 * Date of Birth + Grade ✅
 * Vaccination Status ✅
 * Tabs or Spaces
 * Pineapple on Pizza
 */

import caSchools from './caSchools.js';
const schoolsList = caSchools.map(school => school.city ? `${school.school} - ${school.city}` : school.school ?? '');

 export const questions = {
    fullName: {
        name: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'Jane Doe',
        description: '',
        help: '',
        verify: () => true
    },
    email: {
        name: 'Email',
        type: 'email',
        required: true,
        placeholder: 'jane@example.com',
        description: 'We\'ll reach out to you via email for your vaccination status, event waivers, and more.',
        help: '',
        verify: email => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
    },
    pronouns: {
        name: 'Pronouns',
        type: 'text',
        required: false,
        placeholder: 'they/them',
        description: '',
        help: '',
        verify: () => true
    },
    parentName: {
        name: 'Parent Name',
        type: 'text',
        required: true,
        placeholder: 'John Doe',
        description: '',
        help: '',
        verify: () => true
    },
    parentEmail: {
        name: 'Parent Email',
        type: 'email',
        required: true,
        placeholder: 'john@example.com',
        description: '',
        help: '',
        verify: email => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
    },
    dateOfBirth: {
        name: 'Birthday',
        type: 'date',
        required: true,
        description: 'All high school & upper-middle-school aged students are welcome to come!',
        help: '',
        verify: () => true
    },
    shirtSize: {
        name: 'T-Shirt Size',
        special: 'select',
        options: [
            'Extra Small',
            'Small',
            'Medium',
            'Large',
            'Extra Large'
        ],
        required: true,
        description: 'You won\'t want to miss our awesome swag!',
        help: '',
        verify: () => true
    },
    skillLevel: {
        name: 'Skill Level',
        special: 'select',
        options: [
            'Beginner: I have never coded before or just started learning',
            'Intermediate: I have taken CS classes OR worked on small individual projects',
            'Advanced: I\'m comfortable with my skill set and can work on a project without much guidance'
        ],
        required: true,
        description: 'How would you describe your technical skills? Everyone\'s welcome at the event, but this helps us gauge what resources we need to provide.',
        help: '',
        verify: () => true
    },
    dietaryRestrictions: {
        name: 'Dietary Restrictions',
        special: 'multiSelect',
        options: [
            'Vegetarian',
            'Vegan',
            'Kosher',
            'Halal',
            'Dairy-free',
            'Gluten-free',
            'Nut allergy',
            'None',
            { custom: true }
        ],
        dontDisplayAll: false,
        placeholder: 'Select or add...',
        required: true,
        description: 'Select \'None\' if you don\'t have any allergies.',
        help: '',
        verify: () => true
    },
    school: {
        name: 'School',
        special: 'select',
        options: [ ...schoolsList, { custom: true } ],
        dontDisplayAll: true,
        required: true,
        description: '',
        help: '',
        verify: () => true
    },
    extra: {
        name: 'Is there anything else you would like to tell us about yourself? (optional)',
        type: 'text',
        required: false,
        placeholder: 'I am...',
        description: 'Please don\'t write an essay, this is just a field for us to get to know you a bit better.',
        help: '',
        verify: () => true
    }
}

export const sections = [
    {
        title: 'Basic Information',
        description: 'Let\'s start off with the basics',
        questions: [
            questions.fullName,
            questions.email,
            questions.dateOfBirth,
            questions.pronouns
        ]
    },
    {
        title: 'Parent/Guardian Contact',
        description: 'Contact information for your parent/guardian',
        questions: [
            questions.parentName,
            questions.parentEmail
        ]
    },
    {
        title: 'Your Profile',
        description: 'Let\'s get to know you a bit better',
        questions: [
            questions.shirtSize,
            questions.skillLevel,
            questions.dietaryRestrictions,
            questions.school,
            questions.extra
        ]
    }
];

export default { questions, sections };