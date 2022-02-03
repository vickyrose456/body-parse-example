// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response, body) => {
  //assume body is info sent by the usr


  //assume they didnt send the info you asked for
  const responseJSON = {
    messgae: 'Name and age are both required'
  };

  if(!body.name || !body.age)
  {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }else{}

  //the user doesnt exist.. or they need to be updated
  //not exist
  let responseCode = 201;

  //you would want to use a username irl
  if(users[body.name]){
    //user already exist 
    responseCode = 204;
  }else{
    //there is no object 
    users[body.name ] = {};

  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  //send appropriate responses
  if(responseCode === 201)
  {
    responseJSON.messgae = 'Created Successfully';
    return respondJSON(request, resposnse, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);

};

module.exports = {
  getUsers,
  addUser,
};
