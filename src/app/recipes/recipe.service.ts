import { DataStorageService } from './../shared/data-storage.service';
import { Subject, Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shoppingList.service';
import { Injectable } from '@angular/core';
import { Ingrediants } from '../shared/ingrediants.model';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    constructor(private shoppingListService: ShoppingListService,
        private dataStorageService: DataStorageService
    ) { }

    recipe: Recipe[] = [
        // new Recipe('Chicken Fry', 'Chicken tossed in spices and Herbs', 'https://www.licious.in/blog/wp-content/uploads/2022/05/shutterstock_1587847900.jpg', [new Ingrediants('chicken', 1), new Ingrediants('Chillies', 3), new Ingrediants('oil', 1)]),
        // new Recipe('Tandoori Chicken', 'Chicken tossed in spices and Herbs', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg/440px-Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg', [new Ingrediants('GaramMasala', 1)]),
        // new Recipe('Biryani', 'Chicken With Rice', 'https://images.food52.com/7f0yncraWeYUJG_lLbH2ie1xd6g=/2016x1344/d815e816-4664-472e-990b-d880be41499f--chicken-biryani-recipe.jpg', [new Ingrediants('GaramMasala', 1)]),
        // new Recipe('Tandoori Chicken', 'Chicken tossed in spices and Herbs', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg/440px-Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg', [new Ingrediants('GaramMasala', 1)]),
        // new Recipe('Tandoori Chicken', 'Chicken tossed in spices and Herbs', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg/440px-Tandoori_chicken_laccha_piyaz1_%2836886283595%29.jpg', [new Ingrediants('GaramMasala', 1)])
    ];
    recipeChanged = new Subject<Recipe[]>();
    getRecipesSub: Subscription | undefined;
    saveRecipesSub: Subscription | undefined;

    setRecipe() {
        this.getRecipesSub = this.dataStorageService.getRecipes().subscribe((recipe: Recipe[]) => {
            this.recipe = recipe;
            this.recipeChanged.next(this.recipe.slice());
        })
    }

    saveRecipesToDB() {
        this.saveRecipesSub = this.dataStorageService.storeRecipes(this.recipe).subscribe(data => {
            console.log(data)
        })

    }

    getRecipes(): any {
        return this.recipe.slice();
    }

    pushIngrediants(ing: Ingrediants[]): any {
        this.shoppingListService.addIngrediant(ing);
    }

    getRecipe(index: number): any {
        const result = this.recipe.slice()[index];
        return result;
    }

    deleteRecipe(index: number): any {
        this.recipe.splice(index, 1);
        this.recipeChanged.next(this.recipe.slice());
    }

    addRecipe(recipe: any): any {
        this.recipe.push(recipe);
        this.recipeChanged.next(this.recipe.slice());
    }

    updateRecipe(index: number, newRecipe: any): any {
        this.recipe[index] = newRecipe;
        this.recipeChanged.next(this.recipe.slice());
    }

    ngOnDestroy() {
        this.getRecipesSub?.unsubscribe();
        this.saveRecipesSub?.unsubscribe();

    }


}
