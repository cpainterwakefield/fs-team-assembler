
# compile the frontend
start_frontend(){
    exec rm -r backend/dist
    exec rm -r reconnect/dist
    cd reconnect
    exec npm run build
    cp -r dist ../backend/dist
}
start_frontend &
exec echo "restart apache now ^_^"

