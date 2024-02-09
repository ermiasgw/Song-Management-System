export interface song {
    _id: string | null;
    user: string;
    title: string;
    album: string;
    genere:  string;
  }

export interface songwithuser {
    _id: string;
    user: string;
    title: string;
    album: string;
    genere:  string;
    username: string;
    album_title: string;
}