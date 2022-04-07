# Run bellow command

git clone git@github.com:jahidhiron/meldCX-technical-test.git

## backend server

cd server\
yarn\
yarn dev

## frontend

cd client\
yarn\
yarn start

## backend .env file setup
PORT = 8080
CONNECTION_URL=Please_setup_you_own_mongoDB_connection_string_before_install_this_project___make_sure_that_your_connection_string_is_online_virsion___otherwise_you_may_miss_some_features

PASSWORD_SALT=12\
TOKEN_SECRET_KEY=5585921B461068B67FFFF7170E9364548FA0A6EF

ALLOWED_ORIGIN_1=http://127.0.0.1:3000 \
ALLOWED_ORIGIN_2=https://127.0.0.1:3000 
