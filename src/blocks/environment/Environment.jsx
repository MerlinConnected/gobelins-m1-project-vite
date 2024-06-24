import React, { useEffect, useState } from "react";
import { myPlayer } from "playroomkit";
import { usePlayerContext } from "../../provider/PlayerProvider";
const Environment = () => {

    const { playerTurn, players } = usePlayerContext();
    const currentPlayer = players[playerTurn];
    const [intensity, setIntensity] = useState(1);
    const isSelecting = currentPlayer?.getState('isSelecting');
    const me = myPlayer();

    useEffect(() => {
        if (isSelecting && currentPlayer?.id === me?.id) {
            setIntensity(1);
        } else {
            setIntensity(3);
        }
    }, [isSelecting]);

    return (
        <ambientLight intensity={intensity} />
    );
}

export default React.memo(Environment);