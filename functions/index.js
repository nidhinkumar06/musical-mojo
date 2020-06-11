/**
1. Make sure the audio url is added for the audio and score aduio
2. Check whether you have added atleast 25 questions in each category
3. Check whether you have installed the actions-on-google and lodash plugin
4. Once the function is deployed make sure to enable billing for the cloud function
5. Check whether the cloud function allows unauthenticated users
*/

const functions = require('firebase-functions');
const lodash = require('lodash');
const {
  dialogflow,
  HtmlResponse
} = require('actions-on-google');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const categories = require('./data/categories');
const hindiquestions = require('./data/hindiquestions');
const tamilQuestions = require('./data/tamilQuestions');
const malayalamQuestions = require('./data/malayalamQuestions');
const introBGM = require('./prompts/audio');
const scoreBGM = require('./prompts/scoreAudio');

const app = dialogflow({
  debug: true
});

let questionCount = 0;
let score = 0;


app.intent('Default Welcome Intent', (conv) => {  
  const randomNumber = Math.floor(Math.random() * 10);
  const introMusic = lodash.shuffle(introBGM)[randomNumber];
  const isExistingUser = conv.user.last.seen;

  if (conv.user.last.seen) {
    conv.ask(`<speak>${introMusic} Welcome back to Musical Mojo</speak>`);
  } else {
    conv.ask(`<speak>${introMusic} Welcome to Musical Mojo you can select a language where you can listen to the music and answer the question.Listen as much as you can</speak>`);
  }
  conv.ask(new HtmlResponse({
    url: `https://${firebaseConfig.projectId}.firebaseapp.com/`,
    data: {
      scene: 'WELCOME',
      categories,
      isExistingUser
    }
  }));
});

// Selecting music category
app.intent('music_category', async(conv, params) => {
  const userSelected = await getQuestionByCategory(params.language);
  storeQuestionDetails(params.language, questionCount, score, userSelected, conv);
});


// User replying to the question with answer
app.intent('answer', async(conv) => {
  const questionDetails = conv.user.storage;
  const answer = conv.input.raw;
  questionCount += 1;

  const userSelected = await getQuestionByCategory(questionDetails.category);
  const selectedQuestion = await getSelectedQuestion(questionDetails.category, questionDetails.questionId);
  
  if (lodash.toLower(selectedQuestion.answer) === lodash.toLower(answer)) {
    score = Number(questionDetails.score) + 1;
    storeQuestionDetails(questionDetails.category, questionCount, score, userSelected, conv);
  } else {
    const scoremusic = lodash.shuffle(scoreBGM)[0];
    if(score === 0) {
      conv.ask(`<speak>${scoremusic} Great you gave a try</speak>`);
      conv.ask('would you like to play again');
    } else {
      conv.ask(`<speak>${scoremusic} Amazing</speak>`);
      conv.ask('would you like to play again');
    }
    conv.ask(new HtmlResponse({
      data: {
        scene: 'SHOW_SCORE',
        score
      }
    }));
  }
});

app.intent(['playagain', 'playagain - yes', 'answer - yes'], async(conv) => {
  const category = conv.user.storage.category;
  const userSelected = await getQuestionByCategory(category);
  clearStorage(conv);
  storeQuestionDetails(category, questionCount, score, userSelected, conv);
});

app.intent(['exitgame', 'exitgame - yes', 'answer - no'], (conv) => {
  clearStorage(conv);
  conv.close(`<speak>Thanks for playing. Come back again</speak>`);
});

app.intent('repeat_song', async(conv) => {
  const questionDetails = conv.user.storage;
  if (lodash.isEmpty(questionDetails)) {
    const response = `That's a intro song`;
    conv.ask(`<speak>${response}</speak>`);
    conv.ask(new HtmlResponse());
  } else {
    const question = await getSelectedQuestion(questionDetails.category, questionDetails.questionId);
    storeQuestionDetails(questionDetails.category, questionDetails.questionCount, questionDetails.score, question, conv);
  }
});

app.intent('randomcategory', (conv, { randomcategories }) => {
  const response = `Sorry, musical mojo doesn't have ${randomcategories}. But you can play with hindi, tamil, malayalam`;
  conv.ask(`<speak>${response}</speak>`);
  conv.ask(new HtmlResponse());
});

app.intent('about', (conv) => {
  const response = `Listen to the music and answer the questions asked. The more you answer the more you can listen`;
  conv.ask(`<speak>${response}</speak>`);
  conv.ask(new HtmlResponse());
});

app.intent('Default Fallback Intent', (conv) => {
  const response = `I didn't get that. Can you say it again?`;
  conv.ask(`<speak>${response}</speak>`);
  conv.ask(new HtmlResponse());
});

clearStorage = (conv) => {
  score = 0;
  questionCount = 0;
  conv.user.storage = {};
}

storeQuestionDetails = (category, questionCount, score, userSelected, conv) => {
  conv.user.storage.category = category;
  conv.user.storage.questionCount = questionCount;
  conv.user.storage.score = score;
  conv.user.storage.questionId = userSelected.id;
  
  conv.ask(`<speak><audio src="${userSelected.audioUrl}"/>${userSelected.question}</speak>`);
  conv.ask(new HtmlResponse({
    data: {
      scene: 'SHOW_QUESTION',
      questions: userSelected,
      musicCategory: category
    }
  }));
}

getQuestionByCategory = (category) => {
  let question;
  const randomNumber = Math.floor(Math.random() * 20);
  if (lodash.toLower(category) === 'hindi') {
    question = lodash.shuffle(hindiquestions)[randomNumber];
  } else if (lodash.toLower(category) === 'tamil') {
    question = lodash.shuffle(tamilQuestions)[randomNumber];
  } else if (lodash.toLower(category) === 'malayalam') {
    question = lodash.shuffle(malayalamQuestions)[randomNumber];
  }
  return question;
}

getSelectedQuestion = (category, questionId) => {
  let selectedQuestion;

  if (lodash.toLower(category) === 'hindi') {
    selectedQuestion = lodash.find(hindiquestions, ['id', questionId]);
  } else if (lodash.toLower(category) === 'tamil') {
    selectedQuestion = lodash.find(tamilQuestions, ['id', questionId]);
  } else if (lodash.toLower(category) === 'malayalam') {
    selectedQuestion = lodash.find(malayalamQuestions, ['id', questionId]);
  }
  return selectedQuestion;
}

exports.fulfillment = functions.https.onRequest(app);