import { Injectable } from '@angular/core';
import {Article} from "../../shared/interfaces";
import {from, Observable} from "rxjs";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private db = getFirestore();
  private articlesRef = collection(this.db, 'articles');

  constructor() { }

  addNewArticle(newArticle: DocumentData): Observable<string> {
    return from(addDoc(this.articlesRef, newArticle).then(r => r.id));
  }

  saveDocumentID(id: string): Observable<void> {
    const docRef = doc(this.db, 'articles', id);
    // @ts-ignore
    return from(updateDoc(docRef, {
      docID: id
    }).then(() => undefined));
  }

  getArticles(): Observable<Article[]> {
    return from(getDocs(this.articlesRef).then(r => {
      const articles: Article[] = [];
      r.docs.forEach((article: any) => {
        articles.push({...article.data()});
      })
      return articles;
    }));
  }

  updateArticle(articleData: DocumentData, id: string): Observable<void> {
    const docRef = doc(this.db, 'articles', id);
    return from(updateDoc(docRef, articleData).then(() => undefined));
  }

  deleteArticle(id: string): Observable<void> {
    const docRef = doc(this.db, 'articles', id);
    return from(deleteDoc(docRef).then(() => undefined));
  }
}
