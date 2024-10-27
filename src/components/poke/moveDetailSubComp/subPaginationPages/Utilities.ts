export const fetchPokemonGenTwoMove = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`An error occured:${response.statusText}`);
    }
    const pokemonData = await response.json();

    const moves = await Promise.all(
      pokemonData.moves.map(async (moveEntry: any) => {
        const moveResponse = await fetch(moveEntry.move.url);
        const moveDetails = await moveResponse.json();

        let tmNumber = "-";
        const machine = moveDetails.machines.find(
          (machine: any) =>
            machine.version_group.name === "red-blue" ||
            machine.version_group.name === "yellow"
        );
        if (machine) {
          const machineResponse = await fetch(machine.machine.url);
          const machineData = await machineResponse.json();
          tmNumber = machineData.item.name.toUpperCase().replace("TM", "");
        }

        const redBlueDetails = moveEntry.version_group_details.find(
          (versionDetails: any) =>
            versionDetails.version_group.name === "red-blue"
        );
        const yellowDetails = moveEntry.version_group_details.find(
          (versionDetails: any) =>
            versionDetails.version_group.name === "yellow"
        );

        // const;

        return {
          moveName: moveEntry.move.name,
          redBlueGeneration: redBlueDetails?.version_group.name || "-",
          redBlueMethod: redBlueDetails?.move_learn_method?.name || "-",
          redBlueLevel: redBlueDetails?.level_learned_at || "-",
          yellowGeneration: yellowDetails?.version_group.name || "-",
          yellowMethod: yellowDetails?.move_learn_method?.name || "-",
          yellowLevel: yellowDetails?.level_learned_at || "-",
          power: moveDetails.power || "-",
          accuracy: moveDetails.accuracy || "-",
          type: moveDetails.type.name,
          tmNumber: tmNumber,
        };
      })
    );

    const redBlueMoves = moves.filter(
      (move) => move.redBlueGeneration === "red-blue"
    );
    const yellowMoves = moves.filter(
      (move) => move.yellowGeneration === "yellow"
    );

    const redBlueLevelUpMove = redBlueMoves
      .filter((move) => move.redBlueMethod === "level-up")
      .sort((a, b) => {
        if (a.redBlueLevel === "-") return 1;
        if (b.redBlueLevel === "-") return -1;
        return a.redBlueLevel - b.redBlueLevel;
      });
    // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
    const redBlueEggMoves = redBlueMoves.filter(
      (move) => move.redBlueMethod === "egg"
    );
    // console.log("Red Blue Egg Moves:", redBlueEggMoves);
    const redBlueTmMoves = redBlueMoves.filter(
      (move) => move.redBlueMethod === "machine"
    );
    // const redBlueHmMoves = redBlueMoves.filter(
    //   (move) => move.redBlueMethod === "hidden-machine"
    // );

    const yellowLevelUpMove = yellowMoves
      .filter((move) => move.yellowMethod === "level-up")
      .sort((a, b) => {
        if (a.yellowLevel === "-") return 1;
        if (b.yellowLevel === "-") return -1;
        return a.yellowLevel - b.yellowLevel;
      });
    const yellowEggMoves = yellowMoves.filter(
      (move) => move.yellowMethod === "egg"
    );
    const yellowTmMoves = yellowMoves.filter(
      (move) => move.yellowMethod === "machine"
    );
    // const yellowHmMoves = yellowMoves.filter(
    //   (move) => move.yellowMethod === "hidden-machine"
    // );
    // console.log("tm yellow move", yellowTmMoves);
    // console.log("Hm yellow move", yellowHmMoves);
    return {
      gold: {
        levelUpMove: redBlueLevelUpMove,
        eggMoves: redBlueEggMoves,
        tmMoves: redBlueTmMoves,
        // hmMoves: redBlueHmMoves,
      },
      yellow: {
        levelUpMove: yellowLevelUpMove,
        eggMoves: yellowEggMoves,
        tmMoves: yellowTmMoves,
        // hmMoves: yellowHmMoves,
      },
    };
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
