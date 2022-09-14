const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//data store

const students = [{
    name: "Jerald Lashy Jeffery",
    rollNo: 199802,
    dataOFBirth: "29/09/2000",
    city: "Harare",
    number: +26375632443,
    fatherNumber: +263775632443,
    roomNo: 12,
    hostelName: "MSU-1"
}]

//Post the data from form in home.ebs
app.post("/", (req, res) => {
    const name = req.body.name
    const rollNo = req.body.rollNo
    const dateOfBirth = req.body.dateOfBirth
    const city = req.body.city
    const number = req.body.number
    const fatherNumber = req.body.fatherNumber
    const roomNo = req.body.roomNo
    const hostelName = req.body.hostelName

    students.push({
        name: name,
        rollNo: rollNo,
        dateOfBirth: dateOfBirth,
        city: city,
        number: number,
        fatherNumber: fatherNumber,
        roomNo: roomNo,
        hostelName: hostelName
    })

    res.render("home", {
        data: students
    })
 });

 //more information
 app.post('/information', (req, res) => {
    var requestedRollNo = req.body.rollNo;

    students.forEach(student => {
        if (student.rollNo == requestedRollNo) {
            res.json(student)
        }
    })
})

//update record
app.post('/update', (req, res) => {
    var requestedRollNo = req.body.rollNo;
    var newRoomNo = req.body.newroomno;

    students.forEach(student => {
        if (student.rollNo == requestedRollNo) {
            student.roomNo = newRoomNo;
        }
    })

    res.render("home", {
        data: students
    })
})


//Delete
app.post('/delete', (req, res) => {
    var requestedRollNo = req.body.rollNo;
    var j = 0;

    students.forEach(student => {
        j = j + 1;
        if (student.rollNo === requestedRollNo) {
            console.log(student);
            console.log(delete student);
        }
    })
    res.render("home", {
        data: students
    })
 })

//send variable to ejs
app.get('/', (req, res) => {
    res.render('home', {data: students})
});

//start app
app.listen(3000, (req, res) => {
    console.log("App is running on Port 3000");
});