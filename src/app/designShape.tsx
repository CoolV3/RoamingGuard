import { useState } from 'react';
import {Host, Slider, Shape, Box, Text, Column} from '@expo/ui/jetpack-compose';
import {fillMaxWidth, padding, size,} from "@expo/ui/jetpack-compose/modifiers";
import {View} from "react-native";
import {Appbar, FAB, useTheme} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Save} from "lucide-react-native"


export default function DesignNewShapeScreen() {
    const [corners, setCorners] = useState(4)
    const [cornerRadius, setCornerRadius] = useState(0.2)
    const [radius, setRadius] = useState(1)
    const [innerRadius, setInnerRadius] = useState(0.5)

    const [topStart, setTopStart] = useState(20)
    const [topEnd, setTopEnd] = useState(20)
    const [bottomStart, setBottomStart] = useState(20)
    const [bottomEnd, setBottomEnd] = useState(20)
    const [width, setWidth] = useState(150)
    const [height, setHeight] = useState(150)


    const theme = useTheme()
    const router = useRouter()
    const { baseShape } = useLocalSearchParams<{baseShape?: string}>()

    if ((baseShape != "star") && (baseShape != "polygon") && (baseShape != "rectangle")) {
        router.replace("/chooseBaseFormPage")
    }


        const configOptions = (baseShape == "star" ? [
            {
                label: "Radius",
                min: 1,
                max: 2,
                value: radius,
                setValue: setRadius
            },
            {
                label: "Inner Radius",
                min: 0.1,
                max: 0.7,
                value: innerRadius,
                setValue: setInnerRadius
            },
            {
                label: "Corner Rounding",
                min: 0.01,
                max: 0.2,
                value: cornerRadius,
                setValue: setCornerRadius
            },
            {
                label: "Vertices",
                min: 3,
                max: 20,
                value: corners,
                setValue: setCorners
            },
            {
                label: "Size",
                min: 150,
                max: 300,
                value: width,
                setValue: setWidth
            },
        ] : (baseShape == "polygon" ? [

            {
                label: "Vertices",
                min: 3,
                max: 20,
                value: corners,
                setValue: setCorners
            },
            {
                label: "Corner Rounding",
                min: 0.01,
                max: 0.2,
                value: cornerRadius,
                setValue: setCornerRadius
            },
            {
                label: "Size",
                min: 150,
                max: 300,
                value: width,
                setValue: setWidth
            },
        ] : [

            {
                label: "Top Left Corner Rounding",
                min: 0,
                max: 100,
                value: topStart,
                setValue: setTopStart
            },
            {
                label: "Top Right Corner Rounding",
                min: 0,
                max: 100,
                value: topEnd,
                setValue: setTopEnd
            },
            {
                label: "Bottom Left Corner Rounding",
                min: 0,
                max: 100,
                value: bottomStart,
                setValue: setBottomStart
            },
            {
                label: "Bottom Right Corner Rounding",
                min: 0,
                max: 100,
                value: bottomEnd,
                setValue: setBottomEnd
            },
            {
                label: "Width",
                min: 150,
                max: 200,
                value: width,
                setValue: setWidth
            },
            {
                label: "Height",
                min: 150,
                max: 200,
                value: height,
                setValue: setHeight
            },
        ]))


        return(
            <View>


                <View className="h-full w-full">

                    <Appbar.Header>
                        <Appbar.Content title="Customize Shape"/>
                        <Appbar.BackAction onPress={() => {
                            router.back()
                        }}/>
                    </Appbar.Header>

                    <View className="absolute bottom-0 right-0 p-5 flex items-center justify-center">
                         <FAB size="medium"  icon={({size}) => <Save color={theme.colors.primary} size={size}/>} onPress={() => console.log('Pressed')} className="flex items-center justify-center"/>
                    </View>

                    <View className="items-center justify-center">
                        <Host matchContents={{vertical: true}} style={{width: '100%', paddingTop: 20}}>

                            <Column horizontalAlignment={"center"}>

                                {baseShape == "star" && (
                                    <Shape.Star
                                        verticesCount={corners}
                                        radius={radius}
                                        innerRadius={innerRadius}
                                        cornerRounding={cornerRadius}
                                        color="#FF9800"
                                        modifiers={[size(width, width)]}

                                    />
                                )}
                                {baseShape == "polygon" && (
                                    <Shape.Polygon
                                        verticesCount={corners}
                                        cornerRounding={cornerRadius}
                                        color="#00BCD4"
                                        modifiers={[size(width, width)]}
                                    />
                                )}

                                {baseShape == "rectangle" && (
                                    <Shape.RoundedCorner
                                        cornerRadii={{
                                            topStart: topStart,
                                            topEnd: topEnd,
                                            bottomStart: bottomStart,
                                            bottomEnd: bottomEnd,
                                        }}
                                        color="#FF5722"
                                        modifiers={[size(width, height), padding(0, 10, 0, 10)]}

                                    />
                                )}

                                {configOptions.map((option, index) => (
                                    <Column horizontalAlignment="center" key={index} modifiers={[padding(0, 5, 0, 0)]}>
                                        <Text>{option.label}</Text>
                                        <Box contentAlignment="center" modifiers={[fillMaxWidth()]}>
                                            <Slider modifiers={[size(250, 50)]} min={option.min} max={option.max}
                                                    value={option.value} onValueChange={e => option.setValue(e)}/>
                                        </Box>
                                    </Column>
                                ))}


                            </Column>
                        </Host>
                    </View>
                </View>
            </View>
    )
}