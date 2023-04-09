import { createContext, useContext, useState, useReducer } from "react";

const PlantsContext = createContext([{}, () => {}]);

export function PlantProvider({ children }) {
  const [Plants, setPlants] = useState([]);

  return (
    <PlantsContext.Provider value={[Plants, setPlants]}>
      {children}
    </PlantsContext.Provider>
  );
}

export function usePlants() {
  return useContext(PlantsContext);
}

// function PlantsReducer(Plants, action) {
//   switch (action.type) {
//     case "added": {
//       return [
//         ...Plants,
//         {
//           id: Plants.length,
//           iconId: action.iconId,
//           plantName: action.plantName,
//         },
//       ];
//     }
//     case "changed": {
//       return Plants.map((t) => {
//         if (t.plantName === action.plant.plantName) {
//           return action.plant;
//         } else {
//           return t;
//         }
//       });
//     }
//     case "deleted": {
//       return Plants.filter((t) => t.id !== action.id);
//     }
//     default: {
//       throw Error("Unknown action: " + action.type);
//     }
//   }
// }

