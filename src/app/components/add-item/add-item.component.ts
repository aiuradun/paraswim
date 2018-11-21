import { Component, OnInit } from '@angular/core';
import { ItemService } from './../../services/item.service';
import { Item } from './../../models/item';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item:Item = {
    id: '',
    title: '',
    description: ''
  }
  edit;
 
  constructor(private itemService : ItemService,
              private route: ActivatedRoute,
              private router: Router) {

   }

  ngOnInit() {

  }
    

  onSubmit(){
    if(this.item.title != '' && this.item.description != '') {
      if (this.edit) {
        this.itemService.updateItem(this.item);
      } else {
        this.itemService.addItem(this.item);
      }
      this.item.title = '';
      this.item.description = '';
      this.router.navigate(['items']);

    }
   

  }

}
