Section 8 - HTTP requests

- Backend(Firebase) setup - done
- Set up data-storage.service.ts to handle HTTP requests - done
- Set up HttpClientModule in app.component.ts - done
- In data-storage.service.ts add a PUT request to store recipes data in Firebase database, and add a click event to "Save Data" - done
- In data-storage.service.ts add a GET request to fetch recipes data in Firebase database, and add a click event to "Fetch Data" - done
- Add pipe to the FETCH request to transform data to an empty array if no ingredients are added to the recipe - done
- Resolve recipes data before loading, by setting up a recipes-resolver.service.ts resolver (A resolver is essentially some code that runs before a route is loaded to ensure that certain data the route depends on is there) - done
- Add if/else statement to the recipes-resolver.service.ts to first check 
check whether we do have recipes and only fetch new ones if we don't. With this, we can check if recipes length is equal to zero, then this means we have no recipes and we should fetch them, otherwise if this is not zero, we can just return these recipes because then, we do have recipes so no need to fetch them again - done