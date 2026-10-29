import {Box, Column, Host, Row, Shape, Slider, Text, TextButton} from "@expo/ui/jetpack-compose";
import {clickable, fillMaxWidth, padding, size} from "@expo/ui/jetpack-compose/modifiers";
import {View} from "react-native";
import {Appbar} from "react-native-paper";
import {useRouter} from "expo-router";



export default function ChooseBaseFormComponent() {
    const router = useRouter()

    const openCustomization = (shape: "polygon" | "rectangle" | "star") => {

        router.push(`/designShape?baseShape=${shape}`)
    }

    return (
        <View className="h-full w-full">

            <Appbar.Header>
                <Appbar.Content title="Choose Base Shape" />
                <Appbar.BackAction onPress={() => {router.back()}} />
            </Appbar.Header>

            <View className="items-center justify-center">

                <Host matchContents={{ vertical: true }} style={{ width: '100%', paddingTop: 20}}>

                    <Column horizontalAlignment="center">
                        <Text modifiers={[padding(30,30,30,30)]} style={{fontSize: 20, fontWeight: "bold"}}>Choose a Base Shape</Text>
                        <Row verticalAlignment="center" horizontalArrangement={{ spacedBy: 32 }}>

                                <Column horizontalAlignment="center">
                                    <Text>Star</Text>
                                        <Shape.Star
                                            verticesCount={5}
                                            radius={2}
                                            innerRadius={0.5}
                                            cornerRounding={0.18}
                                            color="#FF9800"
                                            modifiers={[size(110, 110), clickable(() => openCustomization("star"))]}
                                        />
                                </Column>


                            <Column horizontalAlignment="center">
                                <Text>Rectangle</Text>
                                        <Shape.RoundedCorner
                                            cornerRadii={{
                                                topStart: 20,
                                                topEnd: 20,
                                                bottomStart: 20,
                                                bottomEnd: 20,
                                            }}
                                            color="#FF9800"
                                            modifiers={[size(110, 110), padding(10,10,10,10), clickable(() => openCustomization("rectangle"))]}
                                        />
                            </Column>
                        </Row>

                        <Row>
                            <Column horizontalAlignment="center">
                                <Text>Polygon</Text>
                                    <Shape.Polygon
                                        verticesCount={6}
                                        cornerRounding={0.1}
                                        color="#FF9800"
                                        modifiers={[size(110, 110), padding(10,10,10,10), clickable(() => openCustomization("polygon")) ]}
                                    />
                            </Column>
                        </Row>


                    </Column>
                </Host>
            </View>
        </View>
    )
}