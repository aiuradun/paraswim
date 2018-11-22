import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  edit: boolean;
  itemToEdit: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    // console.log('ngOnInit Ran');
    this.itemService.getItems().subscribe(items => {
    // console.log(items);
      this.items = items;
      this.edit = false;
    });
  }

  deleteItem (event, item) {
      this.itemService.deleteItem(item);
    }

  editItem(event, item) {
    this.edit = true;
    this.itemToEdit = item;
  }

  updateItem(event, item) {
    this.itemService.updateItem(item);
    this.edit = false;

  }

}
