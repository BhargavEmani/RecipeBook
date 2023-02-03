import { Ingrediants } from './../shared/ingrediants.model';
export class Recipe {
    constructor(public name: string, public desc: string, public imagePath: string, public ingrediants: Ingrediants[] ){
    }
}
