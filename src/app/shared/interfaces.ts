// export interface FirebaseAuthResponse {
//   idToken: string,
//   expiresIn: string
// }

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
  expiresIn: number,
  idToken: string,
}
export interface Article {
  photo: string,
  category: string,
  date: string,
  title: string,
  text: string,
  authorAvatar?: string,
  authorName: string,
}
