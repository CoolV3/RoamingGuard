import {View} from "react-native";
import {useTheme} from "react-native-paper"
import {Column, Host, Row, FlowRow, ContainedLoadingIndicator, Box, Text, Shape} from "@expo/ui/jetpack-compose";
import {useFocusEffect} from "expo-router";
import {getAllSavedShapes, type SavedShapeType} from "@/lib/useShapeStorage";
import {useCallback, useState} from "react";
import {padding, paddingAll, size} from "@expo/ui/jetpack-compose/modifiers";

export default function seeAllShapesPage() {
    const [savedShapes, setSavedShapes] = useState<SavedShapeType[]>([])
    const [loading, setLoading] = useState(true)
    const theme = useTheme()

    useFocusEffect(
        useCallback(() => {
            const loadShapes = async () => {
                const savedShapes: SavedShapeType[] = await getAllSavedShapes()
                setSavedShapes(savedShapes)
                setLoading(false)
                console.log(savedShapes)
            }
            void loadShapes()
        }, [])
    )


    return (
        <View className="h-full w-full flex items-center justify-center">
            <Host matchContents >
                {loading ? (<ContainedLoadingIndicator modifiers={[size(60, 60)]} containerColor={theme.colors.primaryContainer} color={theme.colors.primary}/> ) : (

                    <FlowRow horizontalArrangement={{ spacedBy: 8 }} verticalArrangement={{ spacedBy: 8 }} modifiers={[paddingAll(16)]}>
                        {savedShapes.length > 0 ? (

                            savedShapes.map((shape, index) => (
                                <Box key={index}>
                                    {shape.baseShape == "star" && (
                                        <Shape.Star
                                            verticesCount={shape.corners}
                                            radius={shape.radius}
                                            innerRadius={shape.innerRadius}
                                            cornerRounding={shape.cornerRounding}
                                            color="#FF9800"
                                            modifiers={[size(100, 100)]}

                                        />
                                    )}
                                    {shape.baseShape == "polygon" && (
                                        <Shape.Polygon
                                            verticesCount={shape.corners}
                                            cornerRounding={shape.cornerRounding}
                                            color="#00BCD4"
                                            modifiers={[size(100, 100)]}
                                        />
                                    )}

                                    {shape.baseShape == "rectangle" && (
                                        <Shape.RoundedCorner
                                            cornerRadii={{
                                                topStart: shape.cornerTopLeft,
                                                topEnd: shape.cornerTopRight,
                                                bottomStart: shape.cornerBottomLeft,
                                                bottomEnd: shape.cornerBottomRight,
                                            }}
                                            color="#FF5722"
                                            modifiers={[size(100, 100)]}
                                        />
                                    )}
                                </Box>
                            ))
                        ) : (<Box>
                            <Text>Nothing there yet</Text>
                        </Box>)}
                    </FlowRow>

                )}
            </Host>
        </View>
    )
}