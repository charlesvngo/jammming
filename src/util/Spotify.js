import axios from 'axios';
let accessToken = '';
let expiresIn = '';

let url = "https://accounts.spotify.com/authorize";
url += '?response_type=token';
url += '&client_id=' + process.env.REACT_APP_CLIENT_ID;
url += '&redirect_uri=' + process.env.REACT_APP_REDIRECT_URI;
url += '&scope=playlist-modify-public';


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
  },

  savePlaylist(playlistName, playlistTracks) {
    const token = accessToken
    const header = { Authorization: "Bearer " + token }
    const url = 'https://api.spotify.com'
    let userId = ''
    let playlistId = ''
    axios.get(`${url}/v1/me`, { headers: header })
      .then(result => userId = result.data.id)
      .then(() => axios.post(`${url}/v1/users/{${userId}}/playlists`, { name: playlistName }, { headers: header }))
      .then((result) => console.log(result.data))
      // .then(result => playlistId = result.data.id)
      // .then(() => axios.post(`${url}/v1/users/${userId}/playlists/${playlistId}/tracks`, playlistTracks, { headers: header }))
      .catch(error => console.log(error))
      
  }

}



export { Spotify };