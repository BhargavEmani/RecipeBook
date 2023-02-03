import { DataStorageService } from './../shared/data-storage.service';
import { Ingrediants } from './../shared/ingrediants.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ShoppingListService {

    ingrediants: Ingrediants[] = [new Ingrediants('Chicken', 1),
    new Ingrediants('Tomato', 5)];

    newIngrediantAdded = new Subject<Ingrediants[]>();
    startedEditing = new Subject<number>();
    getIngrediantsSub: Subscription | undefined;
    saveRecipesSub: Subscription | undefined;

    constructor(private dataStorageService: DataStorageService){}

    getIngFromDB() {
        this.getIngrediantsSub = this.dataStorageService.getIngrediants().subscribe((ingrediant: Ingrediants[]) => {
            this.ingrediants = ingrediant;
            this.newIngrediantAdded.next(this.ingrediants.slice());
        })
    }

    saveIngToDB() {
        this.saveRecipesSub = this.dataStorageService.storeIngrediants(this.ingrediants).subscribe(data => {
            console.log(data)
        })

    }


    getIngrediants(): any {
        return this.ingrediants.slice();
    }

    getIngrediant(index: number): any {
        return this.ingrediants[index];
    }

    ingrediantAdded(ing: Ingrediants): any {
        this.ingrediants.push(ing);
        this.newIngrediantAdded.next(this.ingrediants.slice());
    }

    addIngrediant(ingrediants: Ingrediants[]): any {
        this.ingrediants.push(...ingrediants);
        this.newIngrediantAdded.next(this.ingrediants.slice());
    }

    updateIngrediant(index: number, ing: Ingrediants): any{
        this.ingrediants[index] = ing;
        this.newIngrediantAdded.next(this.ingrediants.slice());
    }

    deleteIngrediant(index: number): any{
        this.ingrediants.splice(index, 1);
        this.newIngrediantAdded.next(this.ingrediants.slice());
    }

}

