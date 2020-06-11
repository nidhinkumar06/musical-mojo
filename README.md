<div align="center">
  <img src="musicalmojo/src/assets/musicalmojo.jpg" alt="aog" height="105">
</div>

<div align="center">
  <h1>Google Assistant Interactive Canvas action using Angular</h1>
  <p>Create an Interactive canvas action using Angular</p>
</div>

**NOTE**

This is an experimental project and will receive minimal maintenance. Only bugs for security issues will be accepted. No feature requests will be accepted. Pull requests will be acknowledged and reviewed as soon as possible. There is no associated SLAs.

**ABOUT GAME**

Musical Mojo is an song quiz action where you can select an language based on the selected language a song will be played for 20 secs once the song is completed you will be asked a question along with options.

Once you select an option it will check whether the answer is correct or not.If the answer is correct a new song will be played with question and options.

If the answer is wrong you will be shown the score along with play again and exit options

You can play the game from Google Assistant by just saying `Ok Google Talk to Musical Mojo` or you can click the [directory link here](https://assistant.google.com/services/a/uid/0000003beb37116f?hl=en_in&source=web)

## Setup Instructions

### Prerequisites

1. Node.js and NPM
   - We recommend installing using [nvm for Linux/Mac](https://github.com/creationix/nvm) and [nvm-windows for Windows](https://github.com/coreybutler/nvm-windows)
2. Install the [Firebase CLI](https://developers.google.com/actions/dialogflow/deploy-fulfillment)
   - We recommend using MAJOR version `7` with `7.1.1` or above, `npm install -g firebase-tools@^7.1.1`
   - Run `firebase login` with your Google account

### Configuration

#### Actions Console

1. From the [Actions on Google Console](https://console.actions.google.com/), add a new project > **Create Project** > under **More options** > **Conversational**
1. Click **Deploy** in the top menu. Then, click **Additional information**.
   1. Under **Category**, select **Games & fun**
   1. Under **Interactive Canvas** _Do your Actions use Interactive Canvas?_, check **Yes**
1. Click **Develop** in the top menu. Then, click **Actions** > **Add Your First Action** > **Play game** > **GET STARTED IN DIALOGFLOW** (this will bring you to the Dialogflow console) > Select language and time zone > **CREATE**.
1. In the Dialogflow console, go to **Settings** ⚙ > **Export and Import** > **Restore from zip** using the `agent.zip` which is available in the directory.

#### Angular Build

1. On your local machine, in the `musical mojo` directory (Not the root directory), run `npm install`
2. Once the installation is completed run the project using the command `ng serve -o`
3. Once the project runs successfully stop the process using `ctrl+c` and build the project
4. Build the Angular project using `ng build --prod`


#### Firebase Deployment

1. On your local machine, in the `functions` directory, run `npm install`
   1. Note that when creating a new project for Interactive Canvas, you must install the `actions-on-google` library **Developer Preview** version using the `@preview` tag with `npm install actions-on-google@preview`.
1. Run `firebase deploy --project {PROJECT_ID}` to deploy the function and hosting
   - To find your **Project ID**: In [Dialogflow console](https://console.dialogflow.com/) under **Settings** ⚙ > **General** tab > **Project ID**.

#### Dialogflow Console

1. Return to the [Dialogflow Console](https://console.dialogflow.com) > select **Fulfillment** > **Enable** Webhook > Set **URL** to the **Function URL** that was returned after the deploy command > **SAVE**.
   ```
   https://${REGION}-${PROJECT_ID}.cloudfunctions.net/dialogflowFirebaseFulfillment
   ```
1. From the left navigation menu, click **Integrations** > **Integration Settings** under Google Assistant > Enable **Auto-preview changes** > **Test** to open the Actions on Google simulator then say or type `Talk to my test app` or by using the invocation name you have set.

## Blog

To do it from scratch follow the below blogs

1. [Google Assistant Interactive Canvas using Angular - Part 1](https://medium.com/@nidhinkumar/google-assistant-interactive-canvas-using-angular-part-1-6ef301b16380?sk=0266f25229dd9a77feb4f1cdad22e7cf)
2. [Google Assistant Interactive Canvas using Angular - Part 2]()