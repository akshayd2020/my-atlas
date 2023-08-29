# My Atlas

## Steps to run application ##
1. Run ``` git clone https://github.com/GenerateNU/my-atlas.git ``` to clone the repository
2. Have the following app/services download: Node.js, MongoDB, Docker
### To run backend
1. Add .env to backend directory, ask team-member for file
2. In backend directory, run ``` npm install```
3. In root directory, run ``` docker-compose up -d ```
4. In backend directory, run ``` npm run start ```
5. If the server runs properly, the server should message that it has booted up
### To run frontend
1. Install XCode at https://developer.apple.com/xcode/. XCode provides the ios simulator that we'll test the app through.
2. Sign up for an Expo account at https://expo.dev/signup/. Expo is the mobile development framework that lets us build and test our app. Message Ivan your email associated with your Expo account to be added to the My Atlas organization.
3. In any directory, run ``` npm install -g eas-cli ```
4. In the frontend directory, run ``` npm install ```
5. In the frontend directory, run ``` expo start --ios ``` This should start a development server, pull up your simulator, and install the Expo app onto it. Stop the development server in your terminal but keep the simulator open.
6. Download & unzip the .tar.gz file from the My Atlas organization
7. Drag and drop the build into your simulator.
8. Run ``` npx expo start —-dev-client ``` to start the development server
9. Open the Expo Go app in the simulator and go to your project. The my-atlas-frontend app should open and you should be able to edit code and hot reload.
