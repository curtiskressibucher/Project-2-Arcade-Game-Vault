# Arcade Game Vault

![Logo](./public/images/readme-Images/gaming%20Arcade.png)

# About my Project

For this project I created a Gaming Library App designed to simplify game collection management. This app not only allows users to organize their games efficiently but also facilitates community interaction through reviews and a tips and tricks section for gameplay assistance.

Arcade Game Vault boasts a sleek design and is committed to continuous improvement. Future updates will focus on enhancing user experience and expanding features.

## Launch The app

To launch the app, simply click the link below.

https://arcade-game-vault.onrender.com

## Screen shots of progress

After taking the week off during the course, I dedicated time to design. Here is the beginning of the project.

![Home page](./public/images/readme-Images/Home%20page%20Arcade%20game%20vault.png)

I used AI-generated images for the project to achieve the exact look I wanted.

![Login page](./public/images/readme-Images/Login%20page%20Game%20Vault.png)

# Getting started:

As mentioned earlier, I began the design work during our week break to set the right frame of mind for building out the functionality. I started with the logo, keeping it simple and to the point. From the name alone, you can easily understand what the web app is about. From there, I expanded on it, dedicating time to work on the initial animation of the logo. It took some effort to individually extract each part of the logo and animate them effectively.

After that, the wireframe and ERD diagram began to take shape.

![ERD Diagram](./public/images/readme-Images/Updated%20ERD%20Diagram.png)

![Wireframe](./public/images/readme-Images/Updated%20WireFrame%20.png)

### Trello Board: Initial Wireframe and ERD Diagram

Here is the link to the Trello board that I used to work on my user stories.

https://trello.com/b/BwytAGYN/project-2-arcade-game-vault-app

## Technologies Used

This web app incorporates full CRUD data operations and utilizes various technologies to bring it all together.

## Technologies Used

-   **MongoDB**
-   **Node.js**
-   **Express**

## NPM Packages

-   **Passport:** Used for OAuth.
-   **Mongoose:** Handles MongoDB data.
-   **connect-mongodb-session and express-session:** Manage sessions.
-   **HTTP Request Logger Middleware for Node.js:** Logs HTTP requests.
-   **EJS:** Generates HTML markup with plain JavaScript.

## Possible bugs

There are often potential bugs in any web app, especially new ones. After additional testing and more users interacting with the page, I'll have a better understanding of potential issues that may surface.

If you encounter any bugs, please feel free to message me at any time. Your feedback is valuable!

## Next Steps:

Here is where my Ice box lands. What is next for this app.

-   The first major thing I want to address is that I didn't use an already existing game library API, which I probably could have. However, for this project, I wanted to curate my own. I can foresee that once this is in production, it's up to the users, which could be a hassle. Thus, using an already existing API could make life much easier.

-   Adding in personal profiles that the user can edit and add to if they wanted to!

-   Adding the ablity to chat to other users, as well as more/better comment sections to feel more interative.

## Learning along the way

I think learning along the way is almost inevitable when creating something. Here are just some of the things I learned.

-   Building and curating a search bar was something I hadn't done before, but after a bit of research, I created this.

-   Learned how to find patterns using this syntax.
    https://expressjs.com/en/4x/api.html#req.query
    https://www.mongodb.com/docs/manual/reference/operator/query/regex/

```
async function search(req, res, next) {
    try {

        const query = req.query.query;
        let searchResults = [];

        if (query) {

            searchResults = await Game.find({
                user: req.user._id,
                title: { $regex: new RegExp(query, 'i') },
            });
        }

        res.render('games/index.ejs', {
            games: searchResults,
            title: 'Searh Results',
        });
    } catch (error) {
        next(error);
    }
}
```

-   When attempting to display only the user who created a review, comparing objectIds with '===' may not work as expected. Using the 'equals' method ensures equality if that's the desired outcome.https://www.codemzy.com/blog/compare-mongodb-objectid

```
<% if (user && user._id.equals(review.user)) { %>
```

-   Finding and using MongoDB operators to manipulate the data when needed. https://www.mongodb.com/docs/manual/reference/operator/query/
