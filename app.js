try{
  // Start server
  require('sails').lift(require('optimist').argv);
}catch(e){
  console.dir(e);
}
