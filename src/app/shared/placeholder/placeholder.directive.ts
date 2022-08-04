import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  // ViewContainerRef - Represents a container where one or more views can be attached to a component.
  // Make it public, so that the property is publicly accessible
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {}

}
