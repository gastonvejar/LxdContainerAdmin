var SSH = require("simple-ssh");
 
var lxd = new SSH({
    host: "10.147.147.1",
    //host: "192.168.0.39",
    user: "gastonvejar",
    pass: "keykeeper"
});

function run(command) {
    console.log(command);
    lxd.exec(command,{
        out: function(stdout) {
            console.log(stdout);
        }
    }).start();
}

exports.createContainer = function(container_name, image_name){
    run("lxc init " + image_name + " " + container_name);
}

exports.startContainer = function(container_name){
    run("lxc start " + container_name);
}

exports.stopContainer = function(container_name){
    run("lxc stop " + container_name);
}

exports.deleteContainer = function(container_name){
    run("lxc delete " + container_name);
}

exports.getInfoContainer = function(container_name, callback){
    lxd.exec("lxc info " + container_name,{
        out: function(stdout) {
            console.log(stdout);
            callback(stdout);
        }
    }).start();
}

exports.createSnapshot = function(snapshot_name, container_name){
    run("lxc snapshot " + container_name + ' ' + snapshot_name);
}

exports.restoreSnapshot = function(snapshot_name, container_name){
    run("lxc restore " + container_name + " " + snapshot_name);
}

exports.deleteSnapshot = function(snapshot_name, container_name){
    run("lxc delete " + container_name + "/" + snapshot_name);
}

exports.executeContainer = function(container_name, command, callback){
    lxd.exec("lxc exec " + container_name + " " + command,{
        out: function(stdout) {
            console.log(stdout);
            callback(stdout);
        }
    }).start();
}