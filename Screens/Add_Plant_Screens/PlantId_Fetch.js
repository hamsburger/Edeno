import { React, useEffect, useState, useContext } from 'react';
import { Text, Center } from 'native-base';
import { RouteContext } from './AddPlantLandingPage';

export function PlantId_Fetch(props) {
   // useEffect to fetch from plant.id
   const { setFetched } = props;
   const { route } = useContext(RouteContext);
   useEffect( () => {
      setTimeout(() => { setFetched(true) }, 1000)
   }, [route.params.resetFetch]);

   return <Center>
    <Text>Fetch Input</Text>
   </Center>
};