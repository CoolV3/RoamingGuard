import { useState } from 'react';
import {Host, Slider, Shape, Box, Text, Column} from '@expo/ui/jetpack-compose';
import {fillMaxWidth, padding, size,} from "@expo/ui/jetpack-compose/modifiers";
import {View} from "react-native";
import {useTheme} from "react-native-paper";


export default function DesignNewShapeScreen() {
    const [corners, setCorners] = useState(4)
    const [cornerRadius, setCornerRadius] = useState(0.2)
    const [starRadius, setStarRadius] = useState(0.2)
    const [innerRadius, setInnerRadius] = useState(1)
    const theme = useTheme()

    return(
        <View className="items-center justify-center w-full h-full">
            <Host matchContents={{ vertical: true }} style={{ width: '100%', paddingTop: 20}}>

                <Column horizontalAlignment={"center"}>


                    <Shape.Star
                        verticesCount={corners}
                        radius={starRadius}
                        innerRadius={innerRadius}
                        cornerRounding={cornerRadius}
                        color="#FF9800"
                        modifiers={[size(80, 120)]}
                    />

                    <Column horizontalAlignment="center">
                        <Text>Corners</Text>
                        <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
                            <Slider modifiers={[size(250, 50)]} min={3} max={14} onValueChange={e => setCorners(e)} />
                        </Box>
                    </Column>
                    <Column horizontalAlignment="center">
                        <Text>Corner Radius</Text>
                        <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
                            <Slider modifiers={[size(250, 50)]} min={0.01} max={0.5} onValueChange={e => setCornerRadius(e)} />
                        </Box>
                    </Column>
                    <Column horizontalAlignment="center">
                        <Text>Inner Radius</Text>
                        <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
                            <Slider modifiers={[size(250, 50)]} min={1} max={5} onValueChange={e => setInnerRadius(e)} />
                        </Box>
                    </Column>
                    <Column horizontalAlignment="center">
                        <Text>Star Radius</Text>
                        <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
                            <Slider modifiers={[size(250, 50)]} min={1} max={5} onValueChange={e => setStarRadius(e)} />
                        </Box>
                    </Column>

                </Column>
            </Host>
        </View>
    )
}