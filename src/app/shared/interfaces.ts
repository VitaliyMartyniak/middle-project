export interface OAuthResponse {
  token: Token,
  user: UserData
}

export interface Token {
  idToken: string,
  expiresIn: number
}

export interface UserData {
  name: string,
  lastName?: string,
  age?: string,
  photoUrl?: string,
  uid: string,
  registrationType: string,
  docID?: string
}

export interface AuthResponse {
  uid: string,
  token: Token,
}

export interface Article {
  photo: string,
  category: string,
  date: number | string,
  title: string,
  text: string,
  authorAvatar?: string | null,
  docID?: string,
  authorName: string,
  authorUID: string,
}

export interface ArticleUpdatableData {
  photo: string,
  category: string,
  title: string,
  text: string,
}

export interface Snackbar {
  text: string,
  snackbarType: string,
}

export interface LocationCoordinates {
  lat: number,
  lon: number,
  id?: string,
}

export interface Location {
  city: string,
  country: string,
}
