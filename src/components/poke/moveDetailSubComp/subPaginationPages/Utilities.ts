// export const fetchPokemonMove = async (name: string) => {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//     if (!response.ok) {
//       throw new Error(`An error occured:${response.statusText}`);
//     }
//     const pokemonData = await response.json();

//     const moves = await Promise.all(
//       pokemonData.moves.map(async (moveEntry: any) => {
//         const moveResponse = await fetch(moveEntry.move.url);
//         const moveDetails = await moveResponse.json();

//         let tmNumber = "-";
//         const machine = moveDetails.machines.find(
//           (machine: any) =>
//             machine.version_group.name === "red-blue" ||
//             machine.version_group.name === "yellow"
//         );
//         if (machine) {
//           const machineResponse = await fetch(machine.machine.url);
//           const machineData = await machineResponse.json();
//           tmNumber = machineData.item.name.toUpperCase().replace("TM", "");
//         }

//         const redBlueDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "red-blue"
//         );
//         const yellowDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "yellow"
//         );

//         const goldSilverDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "gold-silver"
//         );
//         const crystalDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "crystal"
//         );
//         const rubySapphireDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "ruby-sapphire"
//         );
//         const fireRedLeafGreenDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "firered-leafgreen"
//         );
//         const emeraldDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "emerald"
//         );
//         const diamondPearlDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "diamond-pearl"
//         );
//         const platinumDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "platinum"
//         );
//         const heartGoldSoulSilverDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "heartgold-soulsiver"
//         );
//         const blackWhiteDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "black - white"
//         );
//         const black2White2Details = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "black-2-white-2"
//         );

//         const xyDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) => versionDetails.version_group.name === "x-y"
//         );
//         const omegaRubyAlphaSapphireDetails =
//           moveEntry.version_group_details.find(
//             (versionDetails: any) =>
//               versionDetails.version_group.name === "omegaruby-alphasapphire"
//           );
//         const scarletVioletDetails = moveEntry.version_group_details.find(
//           (versionDetails: any) =>
//             versionDetails.version_group.name === "scarlet-violet"
//         );

//         return {
//           moveName: moveEntry.move.name,
//           //gen1
//           redBlueGeneration: redBlueDetails?.version_group.name || "-",
//           redBlueMethod: redBlueDetails?.move_learn_method?.name || "-",
//           redBlueLevel: redBlueDetails?.level_learned_at || "-",
//           yellowGeneration: yellowDetails?.version_group.name || "-",
//           yellowMethod: yellowDetails?.move_learn_method?.name || "-",
//           yellowLevel: yellowDetails?.level_learned_at || "-",
//           //gen2
//           goldSilverGeneration: goldSilverDetails?.version_group.name || "-",
//           goldSilverMethod: goldSilverDetails?.move_learn_method?.name || "-",
//           goldSilverLevel: goldSilverDetails?.level_learned_at || "-",
//           crystalGeneration: crystalDetails?.version_group.name || "-",
//           crystalMethod: crystalDetails?.move_learn_method?.name || "-",
//           crystalLevel: crystalDetails?.level_learned_at || "-",
//           //gen3
//           rubySapphireGeneration:
//             rubySapphireDetails?.version_group.name || "-",
//           rubySapphireMethod:
//             rubySapphireDetails?.move_learn_method?.name || "-",
//           rubySapphireLevel: rubySapphireDetails?.level_learned_at || "-",
//           fireRedLeafGreenGeneration:
//             fireRedLeafGreenDetails?.version_group.name || "-",
//           fireRedLeafGreenMethod:
//             fireRedLeafGreenDetails?.move_learn_method?.name || "-",
//           fireRedLeafGreenLevel:
//             fireRedLeafGreenDetails?.level_learned_at || "-",
//           emeraldGeneration: emeraldDetails?.version_group.name || "-",
//           emeraldMethod: emeraldDetails?.move_learn_method?.name || "-",
//           emeraldLevel: emeraldDetails?.level_learned_at || "-",
//           //gen4
//           diamondPearlGeneration:
//             diamondPearlDetails?.version_group.name || "-",
//           diamondPearlMethod:
//             diamondPearlDetails?.move_learn_method?.name || "-",
//           diamondPearlLevel: diamondPearlDetails?.level_learned_at || "-",
//           platinumGeneration: platinumDetails?.version_group.name || "-",
//           platinumMethod: platinumDetails?.move_learn_method?.name || "-",
//           platinumLevel: platinumDetails?.level_learned_at || "-",
//           heartGoldSoulSilverGeneration:
//             heartGoldSoulSilverDetails?.version_group.name || "-",
//           heartGoldSoulSilverMethod:
//             heartGoldSoulSilverDetails.move_learn_method?.name || "-",
//           heartGoldSoulSilverLevel:
//             heartGoldSoulSilverDetails?.level_learned_at || "-",
//           //gen5
//           blackWhiteGeneration: blackWhiteDetails?.version_group.name || "-",
//           blackWhiteMethod: blackWhiteDetails?.move_learn_method?.name || "-",
//           blackWhiteLevel: blackWhiteDetails?.level_learned_at || "-",
//           black2White2Generation:
//             black2White2Details?.version_group.name || "-",
//           black2White2Method:
//             black2White2Details?.move_learn_method?.name || "-",
//           black2White2Level: black2White2Details?.level_learned_at || "-",
//           //gen6
//           xyGeneration: xyDetails?.version_group.name || "-",
//           xyMethod: xyDetails?.move_learn_method?.name || "-",
//           xyLevel: xyDetails?.level_learned_at || "-",
//           omegaRubyAlphaSapphireGeneration:
//             omegaRubyAlphaSapphireDetails?.version_group.name || "-",
//           omegaRubyAlphaSapphireMethod:
//             omegaRubyAlphaSapphireDetails?.move_learn_method?.name || "-",
//           omegaRubyAlphaSapphireLevel:
//             omegaRubyAlphaSapphireDetails?.level_learned_at || "-",
//           //
//           scarletVioletGeneration:
//             scarletVioletDetails?.version_group.name || "-",
//           scarletVioletMethod:
//             scarletVioletDetails?.move_learn_method?.name || "-",
//           scarletVioletLevel: crystalDetails?.level_learned_at || "-",
//           power: moveDetails.power || "-",
//           accuracy: moveDetails.accuracy || "-",
//           type: moveDetails.type.name,
//           tmNumber: tmNumber,
//         };
//       })
//     );
//     //gen1
//     const redBlueMoves = moves.filter(
//       (move) => move.redBlueGeneration === "red-blue"
//     );
//     const yellowMoves = moves.filter(
//       (move) => move.yellowGeneration === "yellow"
//     );
//     //gen2
//     const goldSilverMove = moves.filter(
//       (move) => move.goldSilverGeneration === "gold-silver"
//     );
//     const crystalMove = moves.filter(
//       (move) => move.crystalGeneration === "crystal"
//     );
//     //gen3
//     const rubySapphireMove = moves.filter(
//       (move) => move.crystalGeneration === "ruby-sapphire"
//     );
//     const fireRedLeafGreenMoves = moves.filter(
//       (move) => move.crystalGeneration === "firered-leafgreen"
//     );
//     const emeraldMoves = moves.filter(
//       (move) => move.crystalGeneration === "emerald"
//     );
//     //gen4
//     const diamondPearlMoves = moves.filter(
//       (move) => move.crystalGeneration === "diamond-pearl"
//     );
//     const platinumMoves = moves.filter(
//       (move) => move.crystalGeneration === "platinum"
//     );
//     const heartGoldSoulSilverMoves = moves.filter(
//       (move) => move.crystalGeneration === "heartgold-soulsilver"
//     );
//     //gen5
//     const blackWhiteMoves = moves.filter(
//       (move) => move.crystalGeneration === "black-white"
//     );
//     const black2White2Moves = moves.filter(
//       (move) => move.crystalGeneration === "black-2-white-2"
//     );
//     //gen6
//     const xyMoves = moves.filter((move) => move.crystalGeneration === "x-y");
//     const omegaRubyAlphaSapphireMoves = moves.filter(
//       (move) => move.crystalGeneration === "omegaruby-alphasapphire"
//     );
//     const scarletVioletMoves = moves.filter(
//       (move) => move.scarletVioletGeneration === "scarlet-violet"
//     );

//     const redBlueLevelUpMove = redBlueMoves //gen1
//       .filter((move) => move.redBlueMethod === "level-up")
//       .sort((a, b) => {
//         if (a.redBlueLevel === "-") return 1;
//         if (b.redBlueLevel === "-") return -1;
//         return a.redBlueLevel - b.redBlueLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const redBlueEggMoves = redBlueMoves.filter(
//       (move) => move.redBlueMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const redBlueTmMoves = redBlueMoves.filter(
//       (move) => move.redBlueMethod === "machine"
//     );

//     const yellowLevelUpMove = yellowMoves
//       .filter((move) => move.yellowMethod === "level-up")
//       .sort((a, b) => {
//         if (a.yellowLevel === "-") return 1;
//         if (b.yellowLevel === "-") return -1;
//         return a.yellowLevel - b.yellowLevel;
//       });
//     const yellowEggMoves = yellowMoves.filter(
//       (move) => move.yellowMethod === "egg"
//     );
//     const yellowTmMoves = yellowMoves.filter(
//       (move) => move.yellowMethod === "machine"
//     );

//     //gen2
//     const goldSilverLevelUpMoves = goldSilverMove
//       .filter((move) => move.goldSilverMethod === "level-up")
//       .sort((a, b) => {
//         if (a.goldSilverLevel === "-") return 1;
//         if (b.goldSilverLevel === "-") return -1;
//         return a.goldSilverLevel - b.goldSilverLevel;
//       });
//     const goldSilverEggMoves = goldSilverMove.filter(
//       (move) => move.goldSilverMethod === "egg"
//     );
//     const goldSilverTmMoves = goldSilverMove.filter(
//       (move) => move.goldSilverMethod === "machine"
//     );
//     const crystalLevelUpMoves = crystalMove
//       .filter((move) => move.crystalMethod === "level-up")
//       .sort((a, b) => {
//         if (a.crystalLevel === "-") return 1;
//         if (b.crystalLevel === "-") return -1;
//         return a.crystalLevel - b.crystalLevel;
//       });
//     const crystalEggMoves = crystalMove.filter(
//       (move) => move.crystalMethod === "egg"
//     );
//     const crystalTmMoves = crystalMove.filter(
//       (move) => move.crystalMethod === "machine"
//     );
//     //3
//     const rubySapphireLevelUpMove = rubySapphireMove
//       .filter((move) => move.rubySapphireMethod === "level-up")
//       .sort((a, b) => {
//         if (a.rubySapphireLevel === "-") return 1;
//         if (b.rubySapphireLevel === "-") return -1;
//         return a.rubySapphireLevel - b.rubySapphireLevel;
//       });
//     const rubySapphireEggMoves = rubySapphireMove.filter(
//       (move) => move.rubySapphireMethod === "egg"
//     );
//     const rubySapphireTmMoves = rubySapphireMove.filter(
//       (move) => move.rubySapphireMethod === "machine"
//     );
//     const fireRedLeafGreenLevelUpMove = fireRedLeafGreenMoves
//       .filter((move) => move.fireRedLeafGreenMethod === "level-up")
//       .sort((a, b) => {
//         if (a.fireRedLeafGreenLevel === "-") return 1;
//         if (b.fireRedLeafGreenLevel === "-") return -1;
//         return a.fireRedLeafGreenLevel - b.fireRedLeafGreenLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const fireRedLeafGreenEggMoves = fireRedLeafGreenMoves.filter(
//       (move) => move.fireRedLeafGreenMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const fireRedLeafGreenTmMoves = fireRedLeafGreenMoves.filter(
//       (move) => move.fireRedLeafGreenMethod === "machine"
//     );
//     const emeraldLevelUpMove = emeraldMoves
//       .filter((move) => move.scarletVioletMethod === "level-up")
//       .sort((a, b) => {
//         if (a.emeraldLevel === "-") return 1;
//         if (b.emeraldLevel === "-") return -1;
//         return a.emeraldLevel - b.emeraldLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const emeraldEggMoves = emeraldMoves.filter(
//       (move) => move.emeraldMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const emeraldTmMoves = emeraldMoves.filter(
//       (move) => move.emeraldMethod === "machine"
//     );

//     //4
//     const diamondPearlLevelUpMove = diamondPearlMoves
//       .filter((move) => move.diamondPearlMethod === "level-up")
//       .sort((a, b) => {
//         if (a.diamondPearlLevel === "-") return 1;
//         if (b.diamondPearlLevel === "-") return -1;
//         return a.diamondPearlLevel - b.diamondPearlLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const diamondPearlEggMoves = diamondPearlMoves.filter(
//       (move) => move.diamondPearlMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const diamondPearlTmMoves = diamondPearlMoves.filter(
//       (move) => move.diamondPearlMethod === "machine"
//     );
//     const platinumLevelUpMove = platinumMoves
//       .filter((move) => move.platinumMethod === "level-up")
//       .sort((a, b) => {
//         if (a.platinumLevel === "-") return 1;
//         if (b.platinumLevel === "-") return -1;
//         return a.platinumLevel - b.platinumLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const platinumEggMoves = platinumMoves.filter(
//       (move) => move.platinumMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const platinumTmMoves = platinumMoves.filter(
//       (move) => move.platinumMethod === "machine"
//     );
//     const heartGoldSoulSilverLevelUpMove = heartGoldSoulSilverMoves
//       .filter((move) => move.heartGoldMethod === "level-up")
//       .sort((a, b) => {
//         if (a.heartGoldLevel === "-") return 1;
//         if (b.heartGoldLevel === "-") return -1;
//         return a.heartGoldLevel - b.heartGoldLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const heartGoldSoulSilverEggMoves = heartGoldSoulSilverMoves.filter(
//       (move) => move.heartGoldSoulSilverMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const heartGoldSoulSilverTmMoves = heartGoldSoulSilverMoves.filter(
//       (move) => move.heartGoldMethod === "machine"
//     );

//     //5
//     const blackWhiteLevelUpMove = blackWhiteMoves
//       .filter((move) => move.blackWhiteMethod === "level-up")
//       .sort((a, b) => {
//         if (a.blackWhiteLevel === "-") return 1;
//         if (b.blackWhiteLevel === "-") return -1;
//         return a.blackWhiteLevel - b.blackWhiteLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const blackWhiteEggMoves = blackWhiteMoves.filter(
//       (move) => move.blackWhiteMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const blackWhiteTmMoves = blackWhiteMoves.filter(
//       (move) => move.blackWhiteMethod === "machine"
//     );
//     const black2White2LevelUpMove = black2White2Moves
//       .filter((move) => move.black2White2Method === "level-up")
//       .sort((a, b) => {
//         if (a.black2White2Level === "-") return 1;
//         if (b.black2White2Level === "-") return -1;
//         return a.black2White2Level - b.black2White2Level;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const black2White2EggMoves = black2White2Moves.filter(
//       (move) => move.black2White2Method === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const black2White2TmMoves = black2White2Moves.filter(
//       (move) => move.black2White2Method === "machine"
//     );

//     //gen6
//     const xyLevelUpMove = xyMoves
//       .filter((move) => move.xyMethod === "level-up")
//       .sort((a, b) => {
//         if (a.xyLevel === "-") return 1;
//         if (b.xyLevel === "-") return -1;
//         return a.xyLevel - b.xyLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const xyEggMoves = xyMoves.filter((move) => move.xyMethod === "egg");
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const xyTmMoves = xyMoves.filter((move) => move.xyMethod === "machine");
//     const omegaRubyAlphaSapphireLevelUpMove = omegaRubyAlphaSapphireMoves
//       .filter((move) => move.omegaRubyAlphaSapphireMethod === "level-up")
//       .sort((a, b) => {
//         if (a.omegaRubyAlphaSapphireLevel === "-") return 1;
//         if (b.omegaRubyAlphaSapphireLevel === "-") return -1;
//         return a.omegaRubyAlphaSapphireLevel - b.omegaRubyAlphaSapphireLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const omegaRubyAlphaSapphireEggMoves = omegaRubyAlphaSapphireMoves.filter(
//       (move) => move.omegaRubyAlphaSapphireMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const omegaRubyAlphaSapphireTmMoves = omegaRubyAlphaSapphireMoves.filter(
//       (move) => move.omegaRubyAlphaSapphireMethod === "machine"
//     );

//     //

//     const scarletVioletLevelUpMove = scarletVioletMoves
//       .filter((move) => move.scarletVioletMethod === "level-up")
//       .sort((a, b) => {
//         if (a.scarletVioletLevel === "-") return 1;
//         if (b.scarletVioletLevel === "-") return -1;
//         return a.scarletVioletLevel - b.scarletVioletLevel;
//       });
//     // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
//     const scarletVioletEggMoves = scarletVioletMoves.filter(
//       (move) => move.scarletVioletMethod === "egg"
//     );
//     // console.log("Red Blue Egg Moves:", redBlueEggMoves);
//     const scarletVioletTmMoves = scarletVioletMoves.filter(
//       (move) => move.scarletVioletMethod === "machine"
//     );

//     return {
//       redBlue: {
//         levelUpMove: redBlueLevelUpMove,
//         eggMoves: redBlueEggMoves,
//         tmMoves: redBlueTmMoves,
//         // hmMoves: redBlueHmMoves,
//       },
//       yellow: {
//         levelUpMove: yellowLevelUpMove,
//         eggMoves: yellowEggMoves,
//         tmMoves: yellowTmMoves,
//         // hmMoves: yellowHmMoves,
//       },
//       goldSilver: {
//         levelUpMove: goldSilverLevelUpMoves,
//         eggMoves: goldSilverEggMoves,
//         tmMoves: goldSilverTmMoves,
//       },
//       crystal: {
//         levelUpMove: crystalLevelUpMoves,
//         eggMoves: crystalEggMoves,
//         tmMoves: crystalTmMoves,
//       },
//       rubySapphire: {
//         levelUpMove: rubySapphireLevelUpMove,
//         eggMoves: rubySapphireEggMoves,
//         tmMoves: rubySapphireTmMoves,
//       },
//       fireRedLeafGreen: {
//         levelUpMove: fireRedLeafGreenLevelUpMove,
//         eggMoves: fireRedLeafGreenEggMoves,
//         tmMoves: fireRedLeafGreenTmMoves,
//       },
//       emerald: {
//         levelUpMove: emeraldLevelUpMove,
//         eggMoves: emeraldEggMoves,
//         tmMoves: emeraldTmMoves,
//       },
//       diamondPearl: {
//         levelUpMove: diamondPearlLevelUpMove,
//         eggMoves: diamondPearlEggMoves,
//         tmMoves: diamondPearlTmMoves,
//       },
//       platinum: {
//         levelUpMove: platinumLevelUpMove,
//         eggMoves: platinumEggMoves,
//         tmMoves: platinumTmMoves,
//       },
//       heartGoldSoulSilver: {
//         levelUpMove: heartGoldSoulSilverLevelUpMove,
//         eggMoves: heartGoldSoulSilverEggMoves,
//         tmMoves: heartGoldSoulSilverTmMoves,
//       },
//       blackWhite: {
//         levelUpMove: blackWhiteLevelUpMove,
//         eggMoves: blackWhiteEggMoves,
//         tmMoves: blackWhiteTmMoves,
//       },
//       black2White2: {
//         levelUpMove: black2White2LevelUpMove,
//         eggMoves: black2White2EggMoves,
//         tmMoves: black2White2TmMoves,
//       },
//       xy: {
//         levelUpMove: xyLevelUpMove,
//         eggMoves: xyEggMoves,
//         tmMoves: xyTmMoves,
//         // hmMoves: redBlueHmMoves,
//       },
//       omegaRubyAlphaSapphire: {
//         levelUpMove: omegaRubyAlphaSapphireLevelUpMove,
//         eggMoves: omegaRubyAlphaSapphireEggMoves,
//         tmMoves: omegaRubyAlphaSapphireTmMoves,
//         // hmMoves: redBlueHmMoves,
//       },
//       scarletViolet: {
//         levelUpMove: scarletVioletLevelUpMove,
//         eggMoves: scarletVioletEggMoves,
//         tmMoves: scarletVioletTmMoves,
//         // hmMoves: redBlueHmMoves,
//       },
//     };
//   } catch (error) {
//     console.error("Error", error);
//     throw error;
//   }
// };
export const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export const fetchPokemonMove = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const pokemonData = await response.json();

    // Function to fetch detailed move data, including TM number if available
    const fetchMoveDetails = async (moveUrl: string) => {
      const moveResponse = await fetch(moveUrl);
      const moveDetails = await moveResponse.json();

      let tmNumber = "-";
      const machine = moveDetails.machines.find((machine: any) =>
        ["red-blue", "yellow"].includes(machine.version_group.name)
      );
      if (machine) {
        const machineResponse = await fetch(machine.machine.url);
        const machineData = await machineResponse.json();
        tmNumber = machineData.item.name.toUpperCase().replace("TM", "");
      }

      return {
        power: moveDetails.power || "-",
        accuracy: moveDetails.accuracy || "-",
        type: moveDetails.type.name,
        tmNumber,
      };
    };

    const moves = await Promise.all(
      pokemonData.moves.map(async (moveEntry: any) => {
        const moveDetails = await fetchMoveDetails(moveEntry.move.url);

        // Define a function to handle generation-specific data retrieval
        const getVersionDetails = (versionName: string) => {
          const details = moveEntry.version_group_details.find(
            (vd: any) => vd.version_group.name === versionName
          );
          return {
            generation: details?.version_group.name || "-",
            method: details?.move_learn_method?.name || "-",
            level: details?.level_learned_at || "-",
          };
        };

        // Fetch details for each generation using the helper function
        return {
          moveName: moveEntry.move.name,
          ...moveDetails,
          // Generation 1
          redBlue: getVersionDetails("red-blue"),
          yellow: getVersionDetails("yellow"),
          // Generation 2
          goldSilver: getVersionDetails("gold-silver"),
          crystal: getVersionDetails("crystal"),
          // Generation 3
          rubySapphire: getVersionDetails("ruby-sapphire"),
          fireRedLeafGreen: getVersionDetails("firered-leafgreen"),
          emerald: getVersionDetails("emerald"),
          // Generation 4
          diamondPearl: getVersionDetails("diamond-pearl"),
          platinum: getVersionDetails("platinum"),
          heartGoldSoulSilver: getVersionDetails("heartgold-soulsilver"),
          // Generation 5
          blackWhite: getVersionDetails("black-white"),
          black2White2: getVersionDetails("black-2-white-2"),
          // Generation 6
          xy: getVersionDetails("x-y"),
          omegaRubyAlphaSapphire: getVersionDetails("omegaruby-alphasapphire"),
          // Generation 9
          scarletViolet: getVersionDetails("scarlet-violet"),
        };
      })
    );

    // Define a function to filter and sort moves by method and level
    const filterAndSortMoves = (
      moves: any[],
      generationKey: string,
      method: string
    ) => {
      return moves
        .filter((move) => move[generationKey].method === method)
        .sort((a, b) => {
          const levelA = a[generationKey].level;
          const levelB = b[generationKey].level;
          return levelA === "-" ? 1 : levelB === "-" ? -1 : levelA - levelB;
        });
    };

    // Organize moves by generation and type (level-up, egg, TM)
    return {
      generation1: {
        redBlue: {
          levelUp: filterAndSortMoves(moves, "redBlue", "level-up"),
          egg: moves.filter((move) => move.redBlue.method === "egg"),
          tm: moves.filter((move) => move.redBlue.method === "machine"),
        },
        yellow: {
          levelUp: filterAndSortMoves(moves, "yellow", "level-up"),
          egg: moves.filter((move) => move.yellow.method === "egg"),
          tm: moves.filter((move) => move.yellow.method === "machine"),
        },
      },
      generation2: {
        goldSilver: {
          levelUp: filterAndSortMoves(moves, "goldSilver", "level-up"),
          egg: moves.filter((move) => move.goldSilver.method === "egg"),
          tm: moves.filter((move) => move.goldSilver.method === "machine"),
        },
        crystal: {
          levelUp: filterAndSortMoves(moves, "crystal", "level-up"),
          egg: moves.filter((move) => move.crystal.method === "egg"),
          tm: moves.filter((move) => move.crystal.method === "machine"),
        },
      },
      // Continue this for each generation as needed...
    };
  } catch (error) {
    console.error("Failed to fetch Pokémon moves:", error);
    throw error;
  }
};
