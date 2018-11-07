class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }

     //keys for foursquare auth
    //version required-only update after code review
    static auth(){
        const keys = {
            client_id: 'E5UCHG55OHFZ2LIQ55W3XTLPVC1411IT1SKV33LG2GN1QX5R',
            client_secret: 'IAOLSWF02K2G1F01TYPTMMFUGONS0IMLHMTHH1E3RQ3BFM0U',
            v:'20181101'
        };

        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join('&');
    }

    static urlBuilder(urlParams) {
        if (!urlParams) {
            return '';
        }
        return Object.keys(urlParams)
            .map(key => `${key}=${urlParams[key]}`)
            .join('&');
    }

    static headers() {
        return {
            Accept: 'application/json'
        };
    }

    static checkStatus(response) {
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error = response;
            throw error;
        }
    }
    static simpleFetch(endpoint, method, urlParams) {
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(
                urlParams
            )}`,
            requestData
        )
            .then(Helper.checkStatus)
            .then(response => response.json()
            );
    }
}

export default class SquareAPI {
    static search(urlParams) {
        return Helper.simpleFetch('/venues/search', 'GET', urlParams);
    }
    static getVenueDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET');
    }
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
    }
}