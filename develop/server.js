// node modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid')

// give json file a variable
let db = require('./db/db.json')

// port for local host
const PORT = 6999;

// turn app into a function
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gain access to public folder
app.use(express.static('public'));

///////////////////////////////////////////////// 
////////////// GET ROUTES ///////////////////////
/////////////////////////////////////////////////

// GET route for index html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

// GET route for notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// GET route for api/notes to read json file in db folder
app.get('/api/notes', (req, res) => {
    res.json(db)
})

//////////////////////////////////////////////////
////////////// POST ROUTES ///////////////////////
//////////////////////////////////////////////////

app.post('/api/notes', (req, res) => {
    // allows the developer to know the request was sent
    console.info(`${req.method} request received to add a note`);

    // destructure the req.body
    const { title, text } = req.body

    if(title && text) {
        const newNote = {
            title,
            text,
            id: uniqid()
        };

        // get existing notes
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.log(err)
            } else {
                // convert string to json obj
                const parsedNotes = JSON.parse(data)

                // add new note
                parsedNotes.push(newNote)

                // push new notes to db
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), null, (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('write file success!')
                    }
                })
            }
        })

        const response = {
            status: 'success',
            body: newNote
        }

        console.log(response);
        res.status(201).json(response);
      } else {
        res.status(500).json('Error in posting review');
      }
    }
)

////////////////////////////////////////////////////
////////////// DELETE ROUTES ///////////////////////
////////////////////////////////////////////////////

// app.delete('/api/notes/:id', (req, res) => {
//     // deconstruct params
//     const { id } = req.params;

    
// })

// alert for server start
app.listen(PORT, () => {
    console.log(`Server is live on ${PORT} 🥶`)
})