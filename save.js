import { auth } from "./firebaseConfig.js";

const BACKEND_URL = "http://localhost:5000";

window.saveGameToServer = async function (data) {
  if (!auth.currentUser) await window.requireLogin();
  const token = await auth.currentUser.getIdToken();

  const res = await fetch(`${BACKEND_URL}/api/save-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

window.loadMyGames = async function () {
  if (!auth.currentUser) await window.requireLogin();
  const token = await auth.currentUser.getIdToken();

  const res = await fetch(`${BACKEND_URL}/api/games`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
};