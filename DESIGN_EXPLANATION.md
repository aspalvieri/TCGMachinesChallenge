# Design Decisions and Thoughts

## BACKEND
### Libraries:
axios<br/>
### Dev Libraries (use "npm test" to run the tests):
mocha<br/>
chai<br/>
chai-http

### Route:
GET<br/>
/api/card/search<br/>
**Parameters:**<br/>
**name** - the name of the card to search for<br/>
**dir** - the direction to order by, either "asc" or "desc"

### About:
The backend was designed to be easy for scalability. I made a routes and controllers section so it would be easy in the future to add separate routes and additional functions on existing routes. The tests were just a handful of simple ones to ensure the API was returning the appropriate data.

## FRONTEND
### Libraries:
tailwindcss<br/>
postcss<br/>
autoprefixer<br/>
axios

### Side Info:
The frontend css was all done with tailwind. I added a proxy in the client's `package.json` for it to be able to make requests to the backend API.

### About:
The initial view is an empty page with just the search bar and order direction. The call to action being the search bar, denoted by the text asking you to type a card name to look up. Once you start typing, a message will display if it's trying to load your results or if there was an error looking the specified name up. As for the display of the cards, I chose to show 6 on the desktop view as there wouldn't be a need to scroll to see all the cards on the current page. All of the paging and sorting options being located next to the search bar was for ease of use. For the overall design, I went with a standard simplistic look. Overflow on text is hidden unless hovered.
