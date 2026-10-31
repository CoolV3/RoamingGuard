import AsyncStorage from "@react-native-async-storage/async-storage"


const shape_key = "savedShapes"

export type SavedShapeType = {
    baseShape: "polygon" | "star" | "rectangle",
    radius? : number,
    innerRadius?: number,
    cornerRounding?: number,
    corners?: number,
    width?: number,
    height?: number,

    cornerTopLeft?: number,
    cornerTopRight?: number,
    cornerBottomLeft?: number,
    cornerBottomRight?: number
}


export async function getAllSavedShapes() {
    const savedShapes = await AsyncStorage.getItem(shape_key)

    return savedShapes == null ? [] : JSON.parse(savedShapes)
}

export async function addNewShape(newShape: SavedShapeType) {
    const oldShapes: SavedShapeType[] | null = await getAllSavedShapes()
    const updated = [...oldShapes, newShape]
    await AsyncStorage.setItem(shape_key, JSON.stringify(updated))
}

export async function deleteShape(index: number) {
    const oldShapes: SavedShapeType[] = await getAllSavedShapes()
    oldShapes.splice(index, 1)
    await AsyncStorage.setItem(shape_key, JSON.stringify(oldShapes))

}