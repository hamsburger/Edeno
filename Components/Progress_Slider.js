import { React } from 'react';
import { Box, Slider, Flex } from 'native-base';

const numSteps = 3;

let progressStates = {
    1 : [{"width" : "0%", "colorScheme" : "secondary.green"}, 
         {"width" : "50%", "colorScheme" : "secondary.fadedGreen"}, 
         {"width" : "50%", "colorScheme" : "secondary.fadedGreen"}], 
    2 : [{"width" : "0%", "colorScheme" : "secondary.green"}, 
         {"width" : "50%", "colorScheme" : "secondary.green"}, 
         {"width" : "50%", "colorScheme" : "secondary.fadedGreen"}], 
    3 : [{"width" : "0%", "colorScheme" : "secondary.green"}, 
         {"width" : "50%", "colorScheme" : "secondary.green"}, 
         {"width" : "50%", "colorScheme" : "secondary.green"}], 
}

export function ProgressSlider(props){
    let { progress=1 } = props; // Can be 0, 1, 2.
    // console.log(progressStates[progress]);??
    /**
     * State 0: Gather Classification Data from plant.id
     * 
     * State 1: Choose Icon
     * 
     * State 2: Confirm
     */
    //  return <Slider w="90%" maxW="300" defaultValue={100} minValue={0} maxValue={100} step={10} _disabled={{
    //     opacity: 1
    //  }}>
    //     <Slider.Track>
    //         <Slider.FilledTrack bg="secondary.green"/>
    //     </Slider.Track>
    //     <Slider.Thumb bg="secondary.green"/>
    //  </Slider>

    return (<Flex w="80%" flexDirection="row" justifyContent="center">
    {
        (progress >= 1 && progress <= 3) && progressStates[progress].map((elem, index) => 
            <Slider w={elem["width"]} defaultValue={100} colorScheme={elem["colorScheme"]} 
                    _disabled={{ opacity: 1 }} isDisabled>
                <Slider.Track>
                    <Slider.FilledTrack bg={elem["colorScheme"]}/>
                </Slider.Track>
                <Slider.Thumb bg={elem["colorScheme"]}/>
            </Slider>
        )
    }  
    </Flex>);
}