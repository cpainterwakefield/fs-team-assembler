dropdb somedb
createdb somedb

killall node
npm run start &

sleep 5

for i in {1..10} 
do
  curl -d 'name=project'$i'&min_students=2&max_students=5&client_name=client'$i'&client_company=company'$i'&client_email=client'$i'@email.com&projPref=true' localhost:8080/api/projects
  curl -d 'name=student'$i'&username=user'$i'&gpa='$i'&minor=minor'$i'&experience=experience'$i'&email=student'$i'@email.com&projectId='$i'' localhost:8080/api/students
done
  curl -d 'name=student'$i'&username=user'$i'&gpa='$i'&minor=minor'$i'&experience=experience'$i'&email=student'$i'@email.com' localhost:8080/api/students

killall node && npm run start
