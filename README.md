# ecommerce_BE

## Description

An e-commerce platform web application built with MERN stack. This is the codebase for the MongoDB NodeJS and Express RESTful backend API.

## Features

This include all common features of an E-commerce Platform.

### CRUD User authentication and managing account (UserFlow)

1. User can create account with email and password ✅
2. User can login with email and password ✅
3. Owner can update own account profile ✅
4. Owner can see own account profile ✅
5. Current user can see list of orders
6. Users can change password ✅
7. Users can top-up balance ✅
8. Users can checkout and pay for cart ✅

### CRUD product with admin access (ProductFlow)

1. Admin can add product ✅
2. Admin can update product ✅
3. Admin can delete product ✅
4. Can see details of product ✅
5. Users can see All products, filter by brand, search by keywords ✅

### CRUD cart managing order process (OrderFlow)

1. Author can create order ✅
2. Get detail of an order by its ID ✅
3. Admin can see all order ✅
4. Users can Edit Cart, Delete Cart ✅

### CRUD review product & reaction reviews (InteractionFlow)

1. Author can create review ✅
2. Get detail of an review by its ID ✅
3. Users can see all review of product ✅
4. Users can Edit Review, Delete Review ✅
5. User can make a reaction (like, dislike) to each other review ✅
6. User see all reaction (like, dislike) each review ✅

## Project setup

1. Generate express boiler plate

   ```console
   npx express-generator --no-view
   npm install
   touch .gitignore .env
   ```

2. Install project dependencies

   ```console
   npm i nodemon cors bcryptjs dotenv
   npm i jsonwebtoken mongoose
   npm install express-validator
   ```

3. Add dev script

   ```json
   {
       "scripts":{
           ...
           "dev":"nodemon ./bin/www"
       }
   }
   ```

4. Environment variable config (JSK, MURI)
   In `.env`

   ```txt
    JWT_SECRET_KEY=someKey
    MONGO_DEV_URI=mongodb://localhost:27017/
    MONGO_PRO_URI=mongodb_srv://atlas.com/
   ```

   In `.gitignore`

   ```txt
    node_modules
   .env
   ```

## The end

@copyright by QuanPhan
