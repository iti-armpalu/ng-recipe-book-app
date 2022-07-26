import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // Handle user event
  // @HostListener('click') toggleOpen() {

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;
    const dropdownMenu = this.el.nativeElement.querySelector('.dropdown-menu');
    if (this.isOpen) this.renderer.addClass(dropdownMenu, 'show');
    else this.renderer.removeClass(dropdownMenu, 'show');
  }
}


// Dropdown closes from the same element as it opens
// @HostListener('click') toggleOpen(event: Event) {}

// Dropdown closes from aywhere on the document
// @HostListener('document:click', ['$event']) toggleOpen(event: Event) {}