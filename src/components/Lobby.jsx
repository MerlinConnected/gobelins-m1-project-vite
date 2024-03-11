import { usePlayersList } from 'playroomkit';

export default function Lobby() {
  const players = usePlayersList(true);
  console.log(players);
  return (
    <>
      <div className="lobby">
        <h1>Game Lobby</h1>
        <p>Waiting for players to join...</p>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.state.profile.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
