document.getElementById('welcome-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('player-name').value.trim();
    if (!name) return;

    document.getElementById('player-name-display').textContent = name;
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
});

document.getElementById('back-to-welcome').addEventListener('click', () => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
});