import { createContext, useContext, useReducer } from "react";

const PlantsContext = createContext([{}, () => {}]);

export function PlantProvider({ children }) {
  const [Plants, dispatch] = useReducer(PlantsReducer, initialPlants);

  return (
    <PlantsContext.Provider value={[Plants, dispatch]}>
      {children}
    </PlantsContext.Provider>
  );
}

export function usePlants() {
  return useContext(PlantsContext);
}

function PlantsReducer(Plants, action) {
  switch (action.type) {
    case "added": {
      console.log(action.iconId);
      return [
        ...Plants,
        {
          id: Plants.length,
          iconId: action.iconId,
          plantName: action.plantName,
        },
      ];
    }
    case "changed": {
      return Plants.map((t) => {
        if (t.plantName === action.plant.plantName) {
          return action.plant;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return Plants.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialPlants = [
  { id: 0, iconId: 0, plantName: "Anthurium" }, // iconId stores the icon image used for the plant
];

// const initialPlants = [];
