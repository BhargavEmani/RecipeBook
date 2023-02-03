import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shoppingList.service';
import { Ingrediants } from './../../shared/ingrediants.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editIngSub: Subscription | undefined;
  editMode = false;
  editItemIndex!: number;
  editItem: Ingrediants | undefined;

  constructor(private fb: UntypedFormBuilder,
              private slService: ShoppingListService) { }

  ingrediant = this.fb.group({
    name: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  });

  ngOnInit(): void {

    this.editIngSub = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editItem =  this.slService.getIngrediant(index);
        this.ingrediant.get('name')?.setValue(this.editItem?.name);
        this.ingrediant.get('amount')?.setValue(this.editItem?.amount);
      }
    );

  }
  onSubmit(): any {
    const name = this.ingrediant.get('name')?.value;
    const amount = this.ingrediant.get('amount')?.value;
    const ing = new Ingrediants(name, amount);
    if (this.editItem){
      this.slService.updateIngrediant(this.editItemIndex, ing);
    } else {
    this.slService.ingrediantAdded(ing);
    }
    this.ingrediant.reset();
    this.editMode = false;
  }

  deleteIng(): any{
    this.slService.deleteIngrediant(this.editItemIndex);
    this.ingrediant.reset();
    this.editMode = false;

  }

  onReset(): any {
    this.ingrediant.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.editIngSub?.unsubscribe();
  }

}
