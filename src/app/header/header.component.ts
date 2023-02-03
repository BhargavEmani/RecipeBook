import { ShoppingListService } from './../shopping-list/shoppingList.service';
import { RecipeService } from './../recipes/recipe.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor( private recipeService: RecipeService, 
               private shoppingListService: ShoppingListService) { }
 
  ngOnInit(): void {
    this.fetchData()
  }

  saveData(): any {
    this.recipeService.saveRecipesToDB();
   this.shoppingListService.saveIngToDB();
  }

  fetchData(): any {
   this.recipeService.setRecipe();
   this.shoppingListService.getIngFromDB();
  }

}
