const removeAccents = require('remove-accents')

const GmidGenerator = {
  generalizeString (string) {
    if (!string) return string
    return removeAccents(string)
      .toLowerCase()
      .replace(/\$/g, 's')
      .replace(/€/g, 'e')
      .replace(/¥/g, 'y')
      .replace(/[^a-zA-Z0-9]+/g, '')
  },
  generateArtistGmid (artistName) {
    return GmidGenerator.generalizeString(artistName)
  },
  generateAlbumGmid (albumTitle, artistName) {
    const artistGmid = GmidGenerator.generateArtistGmid(artistName)
    const albumInfo = GmidGenerator.generalizeString(albumTitle)
    return albumInfo + artistGmid
  },
  generateTrackGmid (trackTitle, trackNumber, albumTitle, artistName) {
    if (!artistName) {
      artistName = albumTitle
      albumTitle = trackNumber
      trackNumber = null
    }
    const albumGmid = GmidGenerator.generateAlbumGmid(albumTitle, artistName)
    const trackInfo = GmidGenerator.generalizeString(trackTitle)

    if (trackNumber) {
      trackNumber = trackNumber + ''
      trackNumber = trackNumber.padStart(2, '0')
      return trackNumber + trackInfo + albumGmid
    } else {
      return '00' + trackInfo + albumGmid
    }
  }
}

module.exports = GmidGenerator