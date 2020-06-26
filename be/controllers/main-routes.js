module.exports = function (app) {

    app.get('/TEST', function (req, res) {
        res.send('Hello World! This is a test')
    });

    app.post('/add', (res, req) => {
        res.send("This is where I would add info")
    });


    app.get('/:id', (req, res) => {
        res.send("This is where you should get info by id")
    });

    app.post('/update/:id', (req, res) => {
        res.send("Update id " + req.params.id);
        // TODO: Find task by id
        // TODO: If it exists then we can update, if not, then return a 404
    });
    //other routes..
}