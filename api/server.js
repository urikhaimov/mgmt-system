const express = require('express');

const path = require('path');
const app = express(),
  bodyParser = require("body-parser");
port = 80;
const employees = [
  {
    id: 1,
    name: 'John',
    status: 'Working',
    img: 'images/face1.png'
  },
  {
    id: 2,
    name: 'Jack',
    status: 'Working',
    img: 'images/face2.png'
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
    img: 'images/wface1.png'
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'Working',
    img: 'images/face3.png'
  },
]
const statusList = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip']

const jsonParser = bodyParser.json();

app.use(jsonParser); // use it globally
// for parsing application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, '../employees-app/build')));
app.use(express.static('public'))


app.get('/api/statusList', (req, res) => {
  res.send(statusList);
})

app.get('/api/users', (req, res) => {
  res.send(employees);
})

app.get('/api/filtered/', (req, res) => {
  let filtered = employees;
  filtered = employees.filter(obj => {
    return (obj.name.toLowerCase().includes(req.query.search.toLocaleLowerCase()) ||
      req.query.search.length == 0) &&
      (obj.status == req.query.status || req.query.status.length == 0)
  });
  res.send(filtered);
})


app.post('/api/users/:id', (req, res) => {
  const index = employees.findIndex((obj => obj.id === +req.params.id));
  employees[index].status = req.body.status
  res.send(employees);

})


app.post('/api/user', (req, res) => {
   employees.push(req.body);
  res.json("user addedd");
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../employees-app/build/index.html'));
});



app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});