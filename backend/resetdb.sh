dropdb somedb
createdb somedb

killall node
npm run start &

sleep 3

for i in {1..10} 
do
  curl -d 'name=project'$i'&min_students=2&max_students=5&client_name=client'$i'&client_company=company'$i'&client_email=client'$i'@email.com' localhost:8080/api/projects
done
