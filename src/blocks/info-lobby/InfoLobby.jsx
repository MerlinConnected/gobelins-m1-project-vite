import React, { useState } from 'react';

import { myPlayer } from 'playroomkit';
import { usePlayerContext } from '../../provider/PlayerProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

function InfoLobby() {
  const { setNameEditing } = usePlayerContext();
  const { setInfoLobby, setLobby } = useGameStateContext();

  const me = myPlayer();

  const [nameInput, setNameInput] = useState(me?.getState('name') || me?.state?.profile?.name);

  const goToLobby = () => {
    setInfoLobby(false);
    setLobby(true);
  };

  console.log(me);
  return (
    <>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            me.setState('name', nameInput);
            setNameEditing(false);
          }
        }}
      />
      <button
        onClick={() => {
          me?.setState('name', nameInput);
          setNameEditing(false);
          goToLobby();
        }}
      >
        continue to lobby
      </button>
    </>
  );
}

export default React.memo(InfoLobby);
