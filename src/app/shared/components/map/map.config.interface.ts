export interface IMapConfig {
    selector?: string, 
    latitude: number,
    longitude: number, 
    zoom?: number,
    customStyle?: boolean,
    api_key?: string,
    lang?: string,
    markers?: any[]
}
