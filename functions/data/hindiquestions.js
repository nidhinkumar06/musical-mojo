/**
1. Make sure the audio format is .ogg format and audio length should not exceed more than 20 secs
2. If you are going to add a new movie name or musician name check the Dialogflow entities whether that name is available or not
3. If the name is not available means add the name and it;s synonyms in the entities
4. You can add n number of questions here make sure the id is increemented
5. Add atleast 25 questions to start
*/

'use strict';
module.exports = [
    {
        id: 1,
        question: 'Who is the singer',
        option1: 'G.V.Prakash Kumar',
        option2: 'Vijay Yesudas',
        option3: 'Barkat Virani',
        option4: 'G. Venugopal',
        answer: 'G.V.Prakash Kumar',
        audioUrl: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'
    },
    {
        id: 2,
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
        audioUrl: ''
    },
];