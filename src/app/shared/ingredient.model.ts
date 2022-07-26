// Define how an ingredient looks like
// We can get rid of the declaration of our properties and get rid of the content in the body of this constructor and simply add an accessor in front of the property names "public"

export class Ingredient {
  constructor(public name: string, public amount: number) {}
}