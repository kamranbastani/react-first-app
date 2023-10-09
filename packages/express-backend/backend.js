import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
   users_list : [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserByNameJob = (name, job) => {
    return users['users_list']
        .filter( (user) => user['job'] === job && user['name'] === name);
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

function deleteUser(user) {
    users['users_list'].splice(user, 1);
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if(name != undefined && job != undefined){
        let result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
   
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.status(200).send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd['id'] = Math.floor(Math.random() * 1000);
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete('/users/:id', (req, res) => {
    const userIDToDelete = req.params['id'];
    const userIndex = users['users_list'].findIndex((user) => user.id === userIDToDelete);
    if(userIndex === -1) {
        return res.status(404).json({message: "user not found"});
    }
    deleteUser(userIndex);
    res.status(204).send(users[userIndex]);
});
