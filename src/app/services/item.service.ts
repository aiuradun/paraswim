import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';
import { R3InjectableMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  item: Observable<Item>;

  constructor(public afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection('items', ref => ref.limit(20));
    
  }

  getItems() {
//this.afs.collection('items', ref => ref.limit(4))
    this.items = this.itemsCollection.snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item
          data.id = a.payload.doc.id;
          return data;
        })  
      })
    );

    return this.items;
  }

  getItem(item: Item) {
    this.items = this.itemsCollection.snapshotChanges()
    .pipe(
      map(changes => {
          return(changes.map(a=>{
            const data= a.payload.doc.data() as Item
            data.id = a.payload.doc.id;
            return data;

          })
      })
    );

    return this.item

  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemsCollection.doc(item.id).delete();
  }

  editItem(item: Item) {
    this.itemsCollection.doc(item.id).set(item)
  }

}

