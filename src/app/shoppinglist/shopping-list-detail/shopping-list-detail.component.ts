import {Component, OnInit} from '@angular/core';
import {ShoppingList} from '../shopping-list';
import {ShoppingListService} from '../../shopping-list.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent implements OnInit {

  private shoppingList: ShoppingList = new ShoppingList('  ',1);
  private id: string;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private location: Location) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.shoppingListService.getShoppingListByID(this.id)
      .subscribe(shoppingList => this.shoppingList = shoppingList);
  }

}
