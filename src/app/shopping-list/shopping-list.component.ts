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
  private ingSub$: Subscription | undefined;
  errorMessage = '';

  ngOnInit(): void {
    this.ingrediants = this.slService.getIngrediants();
    this.ingSub$ = this.slService.newIngrediantAdded.subscribe({
      next:(newIng: Ingrediants[]) =>
      {
        this.ingrediants = newIng;
      },
      error:(error) =>{
        this.errorMessage = error;
        console.log(error);
      }
    
    }
     
      );
  }

  ingrediantSelected(i: number): any {
    this.slService.startedEditing.next(i);
  }

  ngOnDestroy(): void {
    this.ingSub$?.unsubscribe();
  }
}
