export interface statistics {
    no_users: number | null;
    no_albums: number | null;
    no_songs: number | null;
    no_generes: number | null;
    no_song_in_each_generes: [{genere: string, count: number}] | [];
    no_song_in_each_artist: [ {artist: string, count: number}] | [];
    no_album_in_each_artist: [ {artist: string, count: number}] | [];
    no_song_in_each_album: [ {album: string, count: number}] | [];
    
  }