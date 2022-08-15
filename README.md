Section 13 - Angular Universal

A normal Angular application executes in the browser, rendering pages in the DOM in response to user actions. Angular Universal executes on the server, generating static application pages that later get bootstrapped on the client. This means that the application generally renders more quickly, giving users a chance to view the application layout before it becomes fully interactive.

Method 1: @nguniversal

- Follow https://angular.io/guide/universal to add Angular Universal
- Update app.component.ts file to check if you are running on a server or not


Method 2: @nestjs/ng-universal

- Follow https://github.com/nestjs/ng-universal to add @nestjs/ng-universal
- Note: Error with Angular 13:
With Angular 13, "ng add @nestjs/ng-universal" creates error. Because it uses the latest verison of library, that is 6th version. Intstead you can use "ng add @nestjs/ng-universal@5" and it works perfectly fine.
