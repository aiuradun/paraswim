import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  itemDocument: AngularFirestoreDocument<Item>
  items: Observable<Item[]>;
  item: Observable<Item>;

  constructor(private afs: AngularFirestore) { }

  getItems(sortOrder?: string) {
    if (sortOrder === undefined) {
      sortOrder = "title";
    }
    this.itemsCollection = this.afs.collection('items', ref => ref.limit(20).orderBy(sortOrder));
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

  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemsCollection.doc(item.id).delete();
  }

  updateItem(item: Item) {
    this.itemsCollection.doc(item.id).update(item);
  }

}

