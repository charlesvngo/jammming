import axios from 'axios';
let accessToken = '';
let expiresIn = '';

let url = "https://accounts.spotify.com/authorize"
url += '?response_type=token'
url += '&client_id=' + process.env.REACT_APP_CLIENT_ID;
url += '&redirect_uri=' + process.env.REACT_APP_REDIRECT_URI


const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken
    } else if (!accessToken && window.location.href.search("access_token") !== -1) {
      this.setAccessToken();
    } else {
      window.location.replace(url)
    }
  },

  setAccessToken() {
    accessToken = window.location.href.match(/access_token=([^&]*)/)
    accessToken = accessToken[1];
    expiresIn = window.location.href.match(/expires_in=([^&]*)/)
    expiresIn = expiresIn[1];
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
  },

  search(term) {
    return axios.get(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: "Bearer " + accessToken } })
      .then((result) => {
        const searchResults = result.data.tracks.items.map(song => {
          const artists = song.artists.map(artist => artist.name)
          return {
            name: song.name,
            artist: artists.join(', '),
            album: song.album.name,
            id: song.id
          }
        })
        return searchResults;
      })
      .catch((error) => {
        console.log(error)
      })
  }

}



export { Spotify };