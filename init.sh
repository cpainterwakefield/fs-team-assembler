
# compile the frontend
start_frontend(){
    exec rm -r backend/dist
    exec rm -r reconnect/dist
    cd reconnect
    exec npm run build
}
start_frontend &
cp -r reconnect/dist backend/dist
exec echo "restart apache now ^_^"

