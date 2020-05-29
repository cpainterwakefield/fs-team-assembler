# start the backend
start_backend(){
    cd backend
    exec npm start
}

# start the frontend
start_frontend(){
    cd reconnect
    exec npm run serve
}

start_backend &
start_frontend &
