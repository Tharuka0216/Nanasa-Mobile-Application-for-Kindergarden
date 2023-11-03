import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { request, PERMISSIONS } from "react-native-permissions";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
  if (result === "granted") {
    console.log("Camera permission granted");
  }
});

request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
  if (result === "granted") {
    console.log("Microphone permission granted");
  }
});

AppRegistry.registerComponent(appName, () => App);
