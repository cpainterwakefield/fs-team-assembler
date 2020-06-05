var students = [{"id":2,"name":"pluto dog","username":null,"selection_preference":null,"gpa":null,"minor":null,"experience":null,"email":"dog@gmail.com","project_id":null,"first_project":null,"second_project":null,"third_project":null},{"id":1,"name":"ducky","username":"ducky","selection_preference":null,"gpa":"3.231","minor":"quacking","experience":"i quack a lot","email":"duck@gmail.com","project_id":null,"first_project":null,"second_project":null,"third_project":null},{"id":3,"name":"1","username":null,"selection_preference":null,"gpa":null,"minor":null,"experience":null,"email":"2","project_id":null,"first_project":null,"second_project":null,"third_project":null}]

       console.log(students.find(function(id) {if (id.id === 2) return id}).name)

