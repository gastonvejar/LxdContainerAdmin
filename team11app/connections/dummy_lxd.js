var SSH = require('simple-ssh');
 
var lxd = new SSH({
    //host: '10.147.147.1',
    host: '192.168.0.39',
    user: 'gastonvejar',
    pass: 'keykeeper'
});

function run(command) {
    console.log(command);
}

exports.createContainer = function(container_name, image_name){
    run('lxc init ' + image_name + ' ' + container_name);
}

exports.startContainer = function(container_name){
    run('lxc start ' + container_name);
}

exports.stopContainer = function(container_name){
    run('lxc stop ' + container_name);
}

exports.deleteContainer = function(container_name){
    run('lxc delete ' + container_name);
}

exports.getInfoContainer = function(container_name, callback){
    callback('Name: dummy-example\nLocation: none\nRemote: unix://\nArchitecture: x86_64\nCreated: 2019/02/02 18:03 UTC\nStatus: Running\nType: persistent\nProfiles: default\nPid: 20184\nIps:\n   eth0:	inet	10.147.147.79	vethU3QPM2\n   eth0:	inet6	fe80::216:3eff:fef4:9513	vethU3QPM2\n   lo:	inet	127.0.0.1\n   lo:	inet6	::1\nResources:\n   Processes: 11\n   CPU usage:\n     CPU usage (in seconds): 0\n   Memory usage:\n     Memory (current): 48.28MB\n     Memory (peak): 61.52MB\n   Network usage:\n     eth0:\n       Bytes received: 20.47kB\n       Bytes sent: 2.12kB\n       Packets received: 414\n       Packets sent: 24\n     lo:\n       Bytes received: 0B\n       Bytes sent: 0B\n       Packets received: 0\n       Packets sent: 0');
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
    /*lxd.exec("lxc exec " + container_name + " " + command,{
        out: function(stdout) {
            console.log(stdout);
            callback(stdout);
        }
    }).start();*/
}