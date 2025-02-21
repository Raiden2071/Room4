// getTracks

export interface RootObject {
    tracks: Tracks;
}

export interface Tracks {
    track: Track[];
}

export interface Attr {
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
}

export interface Track {
    name: string;
    url: string;
    artist: string;
    image: string;
}


export interface UpdateTrack {
    name: string;
    url: string;
    artist: any;
    image: any;
}

// filterTrack
export interface RootObject1 {
    results: Results;
}

export interface Results {
    trackmatches: Trackmatches;
}

export interface Trackmatches {
    track: Track[];
}







export interface SearchValue {
    searchTrack: string;
    page: number;
}






