export const getJson = async () => { // Made the function async, removed unused 'file' parameter
  try {
    const response = await fetch( // Added await
      "https://pos.pspservicesco.com/storage/restaurant-planner/restaurant-planner-13.json"
    );
    if (!response.ok) {
      // Provide more details in the error message
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    const data = await response.json(); // Added await
    console.log("Fetched data via getJson:", data); // Clarified console log
    return data; // It's good practice to return the fetched data
  } catch (error) {
    console.error("Error fetching JSON data in getJson:", error);
    // Optionally re-throw the error or return a specific value like null
    // throw error; 
  }
};
