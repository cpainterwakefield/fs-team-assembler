module.exports = app => {

    app.get('/student', function(requests, response){
        response.sendFile(path.resolve(__dirname,"dist",'index.html'));
      })
      app.get('/admin', function(requests, response){
        response.sendFile(path.resolve(__dirname,"dist",'index.html'));
      })
      app.get('/student/edit', function(requests, response){
        response.sendFile(path.resolve(__dirname,"dist",'index.html'));
      })
      app.get('/admin/projects', function(requests, response){
        response.sendFile(path.resolve(__dirname,"dist",'index.html'));
      })
      app.get('/admin/edit', function(requests, response){
        response.sendFile(path.resolve(__dirname,"dist",'index.html'));
      })
      app.get('/admin/teams', function(requests, response){
        response.sendFile(path.resolve(__dirname,"dist",'index.html'));
      })
  
  };