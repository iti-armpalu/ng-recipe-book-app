Section 11 - Modules and Optimizations

- Split the app into feature modules
- Create recipes.module.ts inside recipes folder where you add recipes related declarations, imports and exports
- Create recipes-routing.module.ts where you add recipes related routes
- Create shopping-list.module.ts inside shopping-list folder where you add recipes related declarations, imports and exports
- Add the shopping-list routes to the shopping-list.module.ts imports (not needed for a seperate routing file as we only have one route)
- Create shared.module.ts inside shared folder where you add all shared declarations, imports and exports
- Create core.module.ts inside app folder where you add all service relared providers
- Create auth.module.ts inside auth folder where you add authentication related declarations, imports and exports
- Implement lazy loading to the recipes router
- Implement lazy loading to the shopping-list routes
- Implement lazy loading to the authentication routes
- Preload lazy-loaded code by importing { preloadingStrategy: PreloadAllModules } to the app-routing.module.ts


