import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  recipes: Recipe[] | undefined;
  recipeSub!: Subscription;

  ngOnInit(): void {

   this.recipeSub = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

   this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(): any {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void{
    this.recipeSub.unsubscribe();
  }
}
