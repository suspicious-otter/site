import { IS_BROWSER } from "utils/constants";

export default (IS_BROWSER
  ? JSON.parse(document.getElementById("env").innerHTML)
  : process.env);
