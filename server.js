const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
app.use(express.urlencoded({extended: true}))

const Event = require('./models/events.js')

app.use( express.static( "public" ) );
app.use(methodOverride('_method'))
// ----------------------------------------------------------- //

// GET Requests

app.get('/event', (req, res) => {
  Event.find({}, (error, allEvents) => {
    res.render('index.ejs', {
      event: allEvents
    })
  })
})

app.get('/event/new', (req, res) => {
    res.render('new.ejs');
});


app.get('/event/:id', (req, res) => {
    Event.findById(req.params.id, (error, foundEvent) => {
        res.render(
            'show.ejs',
            {
                event:foundEvent
            }
        );
    })
})

// edit

app.get('/event/:id/edit', (req, res) => {
  Event.findById(req.params.id, (err, foundEvent) => {
    res.render(
      'edit.ejs',
      {
        oneEvent: foundEvent
      }
    )
  })
})



// POST Requests

app.post('/event', (req, res) => {
        Event.create(req.body, (error, createdEvent) => {
            res.redirect('/event')
    })
})

// DELETE Requests
// destroy
app.delete('/event/:id', (req, res)=>{
    Event.findByIdAndRemove(req.params.id, (err, event)=>{
        res.redirect('/event')
    });
});

// PUT Requests

app.put('/event/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body, {new:true},(err, updatedModel) => {
    res.redirect('/event')
  })
})




// --------------------- Connection Setup --------------------- //
app.listen(3000, () => {
  console.log('listening...');
})

mongoose.connect('mongodb://localhost:27017/events', () => {
  console.log('connection with mongod is established');
})