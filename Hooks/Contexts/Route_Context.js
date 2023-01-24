import { createContext, useContext } from 'react';

const RouteContext = createContext(null);

export function RouteProvider({ route, navigation, children }) {
  return <RouteContext.Provider value={{navigation, route}}>   
          {children}
    </RouteContext.Provider>;
}

export function useRouteContext(){
  return useContext(RouteContext);
}

// { iconId: 0, plantName : "Anthurium" }, // iconId stores the icon image used for the plant
