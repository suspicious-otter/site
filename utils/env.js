export default (typeof window !== "undefined"
  ? JSON.parse(document.getElementById("env").innerHTML)
  : process.env);
