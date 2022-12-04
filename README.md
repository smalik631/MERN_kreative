# MERN KREATIVE

# Frontend

1. screens component
2. add screens

# Backend

1. add type module in package.json because
   //we add module because we use import insted of require for importing packages
2. copy data.js in backedn and now we use data.js in server.js in backend

3. install nodemon to update server when have a change in the server code instead to strop servern and run server again after changes

4. then we only write npm start insted of writing node server.js

5. fetch products from backend axios is use to fetch data from backend

# manage complex state using usereduce

1. replace user state with user reducer to manage complex state in homescreen

2. useState is a basic Hook for managing simple state transformation, and useReducer is an additional Hook for managing more complex state logic.
3. use logger if there is an isue in checking the state of the application.

# install useReduce lagger package for lock state changes

1. help to debug and find issue in state

2. loading box and error resolve

# Add react bootstrap

1. install react bootstrap
2. updating app.js

# add footer

1. dispaly to botton because of bootstrap flex

# convert product list

1. product list div to bootstrap card to create box on product components and add rating

# add loading component

1. that show loading spinner
2. show message box if product not found

# add loading component in productscreen

1. return error to the backend making utils file and getError function

# add to cart functionality

1. Redux implementation 2. create react context and store provider to save items in cart in global state and use them in navbar

2. context provides a way to pass data through the components tree without having to pass props down manually at every level.
3. Context is designed to share data that can be considered “global” for a tree of React components

4. imporve cart functionality to not add duplicate to the cart but increase the quantity.
