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
    title: '',
    description: ''
  }
  edit;


  constructor(private itemService : ItemService,
              private route: ActivatedRoute,
              private router: Router) {

   }

  ngOnInit() {

    this.edit = false;
    //this.route.params.subscribe(params => id = params['id']);
    this.item.id = this.route.snapshot.paramMap.get('id');
    if (this.item.id != null) {
      this.edit = true
      this.itemService.getItem(this.item.id).subscribe(item => {
        //console.log(items);
          this.item = item;
        });
      //this.item = this.itemService.getItem(this.item.id);
    }
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
