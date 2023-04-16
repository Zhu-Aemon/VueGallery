import * as mm from 'music-metadata-browser'
import store from '@/store'

async function readMetadataAndSetCover(filePath) {
  try {
    const metadata = await mm.fetchFromUrl(filePath);
    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const picture = metadata.common.picture[0];
      const base64String = picture.data.reduce((data, byte) => data + String.fromCharCode(byte), '');
      const coverUrl = `data:${picture.format};base64,${window.btoa(base64String)}`;

      const coverImg = document.getElementById('cover');
      coverImg.src = coverUrl;

      const title = metadata.common.title
      const artist = metadata.common.artist
      // console.log('! artist', artist)
      const album = metadata.common.album
      store.commit('setCurrentMetadata', { name: title, album: album, artist: artist })
    } else {
      console.log('No cover image found in the MP3 file.');
    }
  } catch (error) {
    console.error('Error in readMetadataAndSetCover:', error);
  }
}

export default readMetadataAndSetCover