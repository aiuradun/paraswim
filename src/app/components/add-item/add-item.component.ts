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
  item:Item = {
    title: '',
    description: ''

  }


  constructor(private itemService : ItemService,
              private route: ActivatedRoute) {
    // this.route.params.subscribe(params => console.log(params));


    // this.route.params.subscribe(params => a = params['id']);
 
    
    //    this.route.params.subscribe(params => this.itemService.getItem(params['id']));
    //this item = this.itemService.getItem(this.route.params.pipe)
   }

  ngOnInit() {
/*    let id : string
    this.route.params.subscribe(params => id = params['id']);
    this.itemService.getItem(id).subscribe(item => {
      this.item = item;
      */
    this.route.params.subscribe(params =>
      this.itemService.getItem(params['id']).subscribe(item => {
        this.item = item;
        console.log(this.item.title)
      })
    );
//      console.log(this.item.title, this.item.description)
    

    //this.route.params.subscribe(params => this.itemService.getItem(params['id']));

    //this.itemService.getItem(this.item.id).subscribe(item => {
      //console.log(items);
        //this.item = item;
      //});
  }

  onSubmit(){
    if(this.item.title != '' && this.item.description != '') {
      this.itemService.addItem(this.item);
      this.item.title = '';
      this.item.description = '';
    }
   

  }

}
