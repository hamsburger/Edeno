import { React } from 'react';
import { Box, Slider, Flex } from 'native-base';

let progressStates = {
    1 : [{"width" : "0%", "colorScheme" : "secondary_green"}, 
         {"width" : "33%", "colorScheme" : "faded_green"}, 
         {"width" : "33%", "colorScheme" : "faded_green"},
         {"width" : "33%", "colorScheme" : "faded_green"}], 
    2 : [{"width" : "0%", "colorScheme" : "secondary_green"}, 
         {"width" : "33%", "colorScheme" : "secondary_green"}, 
         {"width" : "33%", "colorScheme" : "faded_green"},
         {"width" : "33%", "colorScheme" : "faded_green"}], 
    3 : [{"width" : "0%", "colorScheme" : "secondary_green"}, 
         {"width" : "33%", "colorScheme" : "secondary_green"}, 
         {"width" : "33%", "colorScheme" : "secondary_green"},
         {"width" : "33%", "colorScheme" : "faded_green"}], 
    4 : [{"width" : "0%", "colorScheme" : "secondary_green"}, 
         {"width" : "33%", "colorScheme" : "secondary_green"}, 
         {"width" : "33%", "colorScheme" : "secondary_green"},
         {"width" : "33%", "colorScheme" : "secondary_green"}], 
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
    //         <Slider.FilledTrack bg="secondary_green"/>
    //     </Slider.Track>
    //     <Slider.Thumb bg="secondary_green"/>
    //  </Slider>

    return (<Flex w="80%" flexDirection="row" justifyContent="center">
    {
        (progress >= 1 && progress <= 4) && progressStates[progress].map((elem, index) => 
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