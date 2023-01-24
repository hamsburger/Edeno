import { createContext, useState, useContext } from 'react';

const NewPlantContext = createContext([{}, () => {}]);

export function AddPlantProvider({ children }) {
  const [Plant, setPlant] = useState({});
  
  return (
      <NewPlantContext.Provider value={[Plant, setPlant]}>        
          {children}
      </NewPlantContext.Provider>
  );
}


export function usePlant() {
  return useContext(NewPlantContext);
}

// { iconId: 0, plantName : "Anthurium" }, // iconId stores the icon image used for the plant
