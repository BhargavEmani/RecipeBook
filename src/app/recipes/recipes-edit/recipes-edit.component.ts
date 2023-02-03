import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  recipe!: Recipe;
  id!: number;
  editMode = false;
  items!: FormArray;
  editForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
    desc: ['', Validators.required],
    imagePath: [''],
    ingrediants: this.fb.array([])
  });
  submitButtonClicked = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private recipService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const idconst = 'id';
      this.id = +params[idconst];
      this.editMode = params[idconst] != null;
    });
    if (this.editMode) {
      this.updateRecipe();
    }

  }

  updateRecipe(): any {
    const recipe = this.recipService.getRecipe(this.id);
    this.editForm.get('name')?.patchValue(recipe.name);
    this.editForm.get('desc')?.patchValue(recipe.desc);
    this.editForm.get('imagePath')?.patchValue(recipe.imagePath);
    this.items = this.editForm.get('ingrediants') as FormArray;
    for (const ing of recipe.ingrediants) {
      this.items.push(this.fb.group({
        name: [ing.name, Validators.required],
        amount: [ing.amount,[ Validators.required,Validators.pattern('[0-9]*') ] ]
      }));

    }

  }

  OnSubmit(): any {
    this.submitButtonClicked = true;
    if(this.editForm.valid){
      if (this.editMode){
        console.log(this.id, this.editForm.value);
        this.recipService.updateRecipe(this.id, this.editForm.value);
        }
        else{
          this.recipService.addRecipe(this.editForm.value);
        }
      this.router.navigate(['recipes']);
  }
    }    

  addIng(): any {
    this.items = (this.editForm.get('ingrediants') as FormArray);
    this.items.push(this.fb.group({
      name: [''],
      amount: ['']
    }));
  }

  get controls(): any {
    return this.editForm.get('ingrediants') as FormArray;
  }


  onDeleteIng(i: number): any{
   const deleteIng =  this.editForm.get('ingrediants') as FormArray;
   deleteIng.removeAt(i);
  }

}


