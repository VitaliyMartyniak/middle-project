import { Injectable } from '@angular/core';
import {Article} from "../shared/interfaces";
import {from, Observable} from "rxjs";
import {addDoc, collection, doc, getFirestore, updateDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private db = getFirestore();
  private articlesRef = collection(this.db, 'articles');

  constructor() { }

  addNewArticle(newArticle: Article): Observable<any> {
    return from(addDoc(this.articlesRef, newArticle).then(r => r.id));
  }

  saveDocumentID(id: string): Observable<void> {
    const docRef = doc(this.db, 'articles', id);
    return from(updateDoc(docRef, {
      docID: id
    }).then(() => undefined));
  }
}
