const express = require("express");
const app = express();
const database = require('./connections/dummy_database');
const lxd = require('./connections/dummy_lxd');

//******************Functions for the Login Page***************************

app.get("/login/:email/:password", (req, res) => {
    var data = req.params;
    database.userLogin(data.email, data.password, function(login){
        res.send(login);
    });
})

app.get("/register/:first_name/:last_name/:email/:password", (req, res) => {
    var data = req.params;
    database.userRegister(data.first_name, data.last_name, data.email, data.password, function(register){
        res.send(register);
    });
})

//***********************Functions for the Main Page*******************************

app.get("/search/images", (req, res) => {
    database.searchImages(function(images){
        res.send(images);
    })
})

app.get("/search/containers/:user_id", (req, res) => {
    var data = req.params;
    database.searchContainers(data.user_id, function(containers){
        res.send(containers);
    })
})

app.get("/containers/create/:container_name/:user_id/:image_id", (req, res) => {
    var data = req.params;
    database.findImageName(data.image_id, function(image_name){
        database.createContainer(data.container_name, data.user_id, data.image_id, image_name, function(container){
            res.send(container);
        })
    }) 
})

app.get("/containers/:container_name/start", (req, res) => {
    var data = req.params;
    database.startContainer(data.container_name, function(start_container){
        res.send(start_container);
    });
    lxd.startContainer(data.container_name);
})

app.get("/containers/:container_name/stop", (req, res) => {
    var data = req.params;
    database.stopContainer(data.container_name, function(stop_container){
        res.send(stop_container);
    });
    lxd.stopContainer(data.container_name);
})

app.get("/containers/:container_name/delete", (req, res) => {
    var data = req.params;
    database.deleteContainer(data.container_name, function(delete_container){
        res.send(delete_container);
    });
})

//*************************Functions for the Container Details Page ****************************************

app.get("/containers/:container_name/info", (req, res) => {
    var data = req.params;
    lxd.getInfoContainer(data.container_name, function(info){
        res.send(info);
    });  
})

app.get("/containers/snapshots/create/:snapshot_name/:snapshot_description/:container_id", (req, res) => {
    var data = req.params;
    database.createSnapshot(data.snapshot_name, data.snapshot_description, data.container_id, function(snap){
        res.send(snap);
    })    
})

app.get("/search/containers/snapshots/:container_id", (req, res) => {
    var data = req.params;
    database.searchSnapshots(data.container_id, function(snaps){
        res.send(snaps);
    })
})


app.get("/containers/snapshots/restore/:snapshot_name/:container_id", (req, res) => {
    var data = req.params;
    database.restoreSnapshot(data.snapshot_name, data.container_id, function(snap){
        res.send(snap);
    })
})

app.get("/containers/snapshots/delete/:snapshot_name/:container_id", (req, res) => {
    var data = req.params;
    database.deleteSnapshot(data.snapshot_name, data.container_id, function(snap){
        res.send(snap);
    })
})

app.get("/containers/:container_name/:command/execute", (req, res) => {
    var data = req.params;
    lxd.executeContainer(data.container_name, data.command, function(info){
        res.send(info);
    })
})

app.listen(3000, listening);

function listening() {
    console.log("Running Team11 Container Manager API on localhost:3000");
}

app.use(express.static("public"));