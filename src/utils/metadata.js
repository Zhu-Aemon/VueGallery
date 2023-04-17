import * as mm from 'music-metadata-browser'
import store from '@/store'

async function readMetadataAndSetCover(filePath) {
  try {
    const url = `file://${filePath}`
    const metadata = await mm.fetchFromUrl(url)
    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const picture = metadata.common.picture[0]
      const base64String = picture.data.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
      const coverUrl = `data:${picture.format};base64,${window.btoa(
        base64String
      )}`

      const coverImg = document.getElementById('cover')
      coverImg.src = coverUrl

      const title = metadata.common.title
      const artist = metadata.common.artist
      // console.log('! artist', artist)
      const album = metadata.common.album
      const lyrics = metadata.common?.unsynchronisedLyrics;

      if (lyrics) {
        console.log(lyrics);
      } else {
        console.log('该歌曲没有歌词');
      }
      store.commit('setCurrentMetadata', {
        name: title,
        album: album,
        artist: artist,
      })
    } else {
      console.log('No cover image found in the MP3 file.')
    }
  } catch (error) {
    console.error('Error in readMetadataAndSetCover:', error)
  }
}

export async function getMetadata(filePath) {
  const url = `file://${filePath}`
  // console.log(url)
  try {
    const metadata = await mm.fetchFromUrl(url)
    // console.log(metadata)
    const title = metadata.common.title
    const artist = metadata.common.artist
    // console.log('! artist', artist)
    const album = metadata.common.album
    const duration = metadata.format.duration
    return { title, artist, album, duration }
  } catch (error) {
    console.error(error)
  }
}

export default readMetadataAndSetCover
