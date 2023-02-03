import { ShoppingListService } from './shoppingList.service';
import { Ingrediants } from './../shared/ingrediants.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private slService: ShoppingListService) { }

  ingrediants: Ingrediants[] | undefined;
  private ingSub: Subscription | undefined;

  ngOnInit(): void {
    this.ingrediants = this.slService.getIngrediants();
    this.ingSub = this.slService.newIngrediantAdded.subscribe((newIng: Ingrediants[]) => this.ingrediants = newIng);
  }

  ingrediantSelected(i: number): any {
    this.slService.startedEditing.next(i);
  }

  ngOnDestroy(): void {
    this.ingSub?.unsubscribe();
  }
}
