
rm -r backend/dist
rm -r reconnect/dist
cd reconnect
npm run build

cd ..
cp -r reconnect/dist backend/dist
cd backend
npm run start
