import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  recipe: Recipe | undefined;
  id!: number;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id1 = 'id';
      this.id = +params[id1];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  toShoppingList(): any {
    if (this.recipe) {

      this.recipeService.pushIngrediants(this.recipe.ingrediants);
    }
  }

  onEdit(): any {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe(): any {
    this.recipeService.deleteRecipe(this.id);
  }


}
