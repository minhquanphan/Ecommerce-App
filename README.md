# ecommerce_BE

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
