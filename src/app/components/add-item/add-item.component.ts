import { Component, OnInit } from '@angular/core';
import { ItemService } from './../../services/item.service';
import { Item } from './../../models/item';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  //@import() item : Item;
  item:Item = {
    title: '',
    description: ''

  }


  constructor(private itemService : ItemService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params));
    //this.route.params.subscribe(params => this.itemService.getItem(params['id']));
    //this.route.params.subscribe(params => this.itemService.getItem(params['id']));
    this.route.params.subscribe(params => console.log(params['id']);
    let a:any
    this.route.params.subscribe(params => a = params['id'];
    console.log(a);
    this.route.params.subscribe(params => this.itemService.getItem(params['id']).subscribe(item => {
      this.item = item;
    }));
    //    this.route.params.subscribe(params => this.itemService.getItem(params['id']));
    //this item = this.itemService.getItem(this.route.params.pipe)
   }

  ngOnInit() {

  }

  onSubmit(){
    if(this.item.title != '' && this.item.description != '') {
      this.itemService.addItem(this.item);
      this.item.title = '';
      this.item.description = '';
    }
   

  }

}
