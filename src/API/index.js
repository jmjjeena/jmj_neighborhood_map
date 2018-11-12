class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }

     //keys for foursquare auth
    //version required-only update after code review
    static auth(){
        const keys = {
            client_id: 'SHG24GNTPQZPXQ5QWTHSC2EPVTMXXQXPKDEU2JTECTD3U3YM',
            client_secret: 'JEZG1NIFPZ222TBQ5U4XTPL3GMA1IGQRJDKX4QJ52RYVE50K',
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
        console.log("response in checkstatus", response)
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
        console.log({ requestData })
        console.log( "endpoint: ", endpoint, "urlparams: ", urlParams)
        return fetch(
            `${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(
                urlParams
            )}`,
            requestData
        )
            .then(Helper.checkStatus)
            .then(response => response.json());
    }
}

export default class FourSquareAPI {
    static search(urlParams) {
        console.log("urlparams", urlParams)
        return Helper.simpleFetch('/venues/search', 'GET', urlParams);
    }
    static getVenueDetails(VENUE_ID) {
        console.log("VENUE ID IN SF: ", VENUE_ID)
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET');
    }
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
    }
}