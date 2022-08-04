Section 10 - Dynamic Components

*ngIf method (preferred method)

- Create Alert Component that will pop up on Login/Signup error - done
- Add the component to the auth.component.html via *ngIf method


Programmatic (dynamic) method

- Import ComponentFactoryResolver to the auh.component.ts and use it inside showErrorAlert function, and pass the type of your component - AlertComponent
- Create helper directive placeholder.directive.ts that will point to a place in DOM where to put the AlertComponent - done
- Add ng-template to the auth.component.html (this is a directive Angular ships with, which will not actually render anything to the DOM but still
is accessible in the Angular templating language)
- Add the appPlaceholder directive into the ng-template - done
- Access that directive from auth.component.ts file wih @ViewChild - done
- Access ViewContainer Reference of our host (PlaceholderDirective) - done
- Clear anything that might have been rendered there before by simply calling clear on this view container reference - done
- Use componentFactoryResolver to create a new alert component in that host ViewContainerRef - done
- Use componentRef instance property to get access to the instances from AlertComponent (message annd close event) - done
- Add ngOnDestroy method to cancel "close" subscription - done

NB! Not working - I get an error message "ERROR TypeError: Cannot read properties of undefined (reading 'viewContainerRef')" and I cannot figure out the solution. Need to retry.

