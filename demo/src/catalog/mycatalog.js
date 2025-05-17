import {Catalog} from 'react-planner';

// Create a new catalog instance
let catalog = new Catalog();

// Instead of using glob patterns which webpack can't resolve,
// we'll create a basic catalog for now

// For now, let's create some placeholder categories
catalog.registerCategory("windows", "Windows", []);
catalog.registerCategory("doors", "Doors", []);
catalog.registerCategory("furniture", "Furniture", []);

// Only export the catalog once at the end of the file
export default catalog;