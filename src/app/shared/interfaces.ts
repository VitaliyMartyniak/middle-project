// export interface FirebaseAuthResponse {
//   idToken: string,
//   expiresIn: string
// }

export interface UserData {
  name: string,
  lastName?: '',
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
