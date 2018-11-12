export default {

    fetchFourSquareData: function(endpoint, method, urlParams) {
        const data = {
            method,
            headers: {
                Accept: 'application/json'
            }
        };

        const url = this.urlBuilder(endpoint, urlParams);
        console.log("url: ", url)
        return fetch(
            url,
            data
        )
            .then(this.checkStatus)
            .then(response => response.json()
            )
    },

    urlBuilder: function(endpoint, urlParams){
        const keys = {
            client_id: '1ME2SARSSOWK1FGQC02X1T55ZADLX11VFBCS4VYHQVRFCX51',
            client_secret: '5N54NHAO0LW5OHJATJB4MJX1BXFD20OISUGZEBLD0WWW0VAL',
            v: '20181111'
        };

        return `https://api.foursquare.com/v2` +
            `${endpoint}?` +
            `${this.joinKeys(keys)}&${this.joinKeys(urlParams)}`
    },

    search: function(urlParams){
        const endpoint = '/venues/search';
        const method = 'GET';
       return this.fetchFourSquareData(endpoint, method, urlParams)
    },

    getVenueDetails: function(VENUE_ID) {
        console.log("getVenueDetails got called with ", VENUE_ID)
       return this.fetchFourSquareData(`/venues/${VENUE_ID}`, 'GET')
    },

    getVenuePhotos: function(VENUE_ID){
        return this.fetchFourSquareData(`/venues/${VENUE_ID}/photos`, 'GET')
    },

    checkStatus: function(response) {
        console.log("response in checkstatus", response)
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error = response;
            throw error;
        }
    },
    
    joinKeys: function(obj) {
        if (!obj) {
            return '';
        }
        return Object.keys(obj)
            .map(key => `${key}=${obj[key]}`)
            .join('&');
    }
}