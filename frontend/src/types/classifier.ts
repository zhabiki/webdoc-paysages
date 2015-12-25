export interface InferenceResults {
    buildings: number,
    forests: number,
    mountains: number,
    glacier: number,
    street: number,
    sea: number,
}

export interface ImageData {
    id: number,
    uploaded: string, // ISO-8601
    image: string, // хэш
    classes: [
        InferenceResults,
    ],
}

export interface ResultsPage {
    total_pages: number,
    total_items: number,
    current_page: number,
    data: ImageData[],
}
