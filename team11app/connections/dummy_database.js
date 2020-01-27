var mysql = require("mysql");
var lxd = require("./dummy_lxd");

const bcrypt = require("bcrypt");
const saltRounds = 10;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "team11cm",
  password: "admin123",
  database: "team11cm"
});


function userLogin(email, password, callback) {
  connection.query("SELECT * FROM users WHERE email = ? AND deleted_flag = 0", [email], function(err, rows){
    if (err) {
      console.log(err);
      return;
    }
    if(rows.length == 0) {
      callback("Email does not match registered users");
    }
    else {
      bcrypt.compare(password, rows[0].password, function(err, res) {
        if(res){
          callback(rows);
        }
        else{
          callback("Incorrect password")
        }
        // res == true
      });
      
    }            
  })  
}

function userRegister(first_name, last_name, email, password, callback) {
  var securePassword = bcrypt.hashSync(password, saltRounds);
  console.log(securePassword);
  connection.query("SELECT * FROM users WHERE email = ?", email, function(err, rows){
      if (err) {
          console.log(err);
          return;
      }
      if(rows.length != 0) {
          callback("Email already registered");
      }
      else {
          connection.query("INSERT INTO users ( first_name, last_name, email, password, created_date, deleted_date, deleted_flag) VALUES ( ?, ?, ?, ?, ?, NULL, 0)", [first_name, last_name, email, securePassword, new Date()], function(err, rows){
              if (err) {
                  console.log(err);
                  return;
              }
              else{
                  callback(rows);
              }                
          });
      }               
  });
}

function searchImages(callback){
  connection.query("SELECT * FROM images WHERE deleted_flag = 0 ORDER BY name", function(err, rows){
    if (err) {
        console.log(err);
        return;
    }
    callback(rows);                
}); 
}

function searchContainers(user_id, callback){
  connection.query("SELECT * FROM users WHERE id = ? AND deleted_flag = 0", [user_id], function(error, user){
    if(error){
      console.log(error);
      return;
    }
    if(user.length == 0){
      callback("User does not exist");
      return;
    }
    else{
      connection.query("SELECT * FROM containers WHERE user_id = ? AND deleted_flag = 0 ORDER BY name", [user_id], function(err, rows){
        if (err) {
            console.log(err);
            return;
        }
        if(rows.length == 0) {
            callback("User doesn't have containers");
        }
        else {
            callback(rows);
        }               
      }); 
    }
  })
}

function createContainer(container_name, user_id, image_id, image_name, callback){
  connection.query('SELECT * FROM users WHERE id = ? AND deleted_flag = 0', [user_id], function(error, user){
    if(error){
      console.log(error);
      return;
    }
    if(user.length == 0){
      callback("User does not exist")
      return;
    }
    else{
      connection.query("SELECT * FROM containers WHERE name = ? AND deleted_flag = 0", [container_name], function(err, rows){
        if (err) {
            console.log(err);
            return;
        }
        if(rows.length != 0) {
            callback("That container name is taken for the environment, please choose another name");
            return;
        }
        else {
            connection.query("INSERT INTO containers (user_id, image_id, name, status, created_date, deleted_date, deleted_flag) VALUES ( ?, ?, ?,'STOPPED', ?, NULL, 0)", [user_id, image_id, container_name, new Date()], function(err, rows){
                if (err) {
                    console.log(err);
                    return;
                }       
                lxd.createContainer(container_name, image_name);
                callback(rows);
            });
        }               
      });
    }
  })
}

function findImageName(image_id, callback){
  connection.query("SELECT name FROM images WHERE id = ? AND deleted_flag = 0", [image_id], function(error,image_name){
    if (error) {
        console.log(error);
        return;
    }
    else{
        callback(image_name[0].name);
    }
  })
}

function findContainerName(container_id, callback){
  connection.query("SELECT name FROM containers WHERE id = ? AND deleted_flag = 0", [container_id], function(error,container_name){
    if (error) {
        console.log(error);
        return;
    }
    else{
        callback(container_name[0].name);
    }
  })
}

function startContainer(container_name, callback){
  connection.query("UPDATE containers SET status = 'RUNNING' WHERE name = ? AND deleted_flag = 0", [container_name], function(err, rows){
    if (err) {
        console.log(err);
        return;
    }
    callback(container_name + " Started!");    
  });
}

function stopContainer(container_name, callback){
  connection.query("UPDATE containers SET status = 'STOPPED' WHERE name = ? AND deleted_flag = 0", [container_name], function(err, rows){
    if (err) {
        console.log(err);
        return;
    }
    callback(container_name + " Stopped!");    
  });
}

function deleteContainer(container_name, callback){
  connection.query("SELECT status FROM containers WHERE name = ? AND deleted_flag = 0", [container_name], function(error, container){
    if(error){
      console.log(error);
      return;
    }
    if(container[0].status != "STOPPED") {
      callback("You first need to stop the container before deleting it");
      return;
    }
    else{
      connection.query("UPDATE containers SET deleted_flag = 1, deleted_date = ? WHERE name = ? AND deleted_flag = 0", [new Date(), container_name], function(err, rows){
        if (err) {
            console.log(err);
            return;
        }
        lxd.deleteContainer(container_name);
        callback(container_name + " Deleted!");         
      }); 
    }
  })
}

function createSnapshot(snapshot_name, snapshot_description, container_id, callback){
  connection.query("SELECT * FROM snapshots WHERE name = ? AND container_id = ? AND deleted_flag = 0", [snapshot_name, container_id], function(err, rows){
    if (err) {
        console.log(err);
        return;
    }
    if(rows.length != 0) {
        callback("That container already has a snapshot with that name, please choose another name")
    }
    else {
        connection.query("INSERT INTO snapshots (container_id, name, description, created_date, deleted_date, deleted_flag) VALUES ( ?, ?, ?, ?, NULL, 0)", [container_id, snapshot_name, snapshot_description, new Date()], function(err, rows){
            if (err) {
                console.log(err);
                return;
            }
            findContainerName(container_id, function(container_name) {
              lxd.createSnapshot(snapshot_name, container_name);
            })
            callback(rows);
        });
    }               
  });
}

function searchSnapshots(container_id, callback){
  connection.query("SELECT * FROM snapshots WHERE container_id = ? AND deleted_flag = 0", [container_id], function(err, rows){
    if (err) {
        console.log(err);
        return;
    }
    if(rows.length == 0) {
        callback("Container doesn't have snapshots")
    }
    else {
        callback(rows); 
    }               
  }); 
}

function restoreSnapshot(snapshot_name, container_id, callback){
  findContainerName(container_id, function(container_name){
    lxd.restoreSnapshot(snapshot_name, container_name);
    callback(container_name + " has been restored from " + snapshot_name); 
  })  
}

function deleteSnapshot(snapshot_name, container_id, callback){
  connection.query("SELECT * FROM snapshots WHERE name = ? AND container_id = ? AND deleted_flag = 0", [snapshot_name, container_id], function(error, container){
    if(error){
      console.log(error);
      return;
    }
    console.log("SELECT * FROM snapshots WHERE name = ? AND container_id = ? AND deleted_flag = 0", [snapshot_name, container_id]);
    console.log(container);
    if(container.length == 0) {
      callback('Could not find snapshot for container');
    }
    else{
      connection.query("UPDATE snapshots SET deleted_flag = 1, deleted_date = ? WHERE name = ? AND container_id = ? AND deleted_flag = 0", [new Date(), snapshot_name, container_id], function(err, rows){
        if (err) {
            console.log(err);
            return;
        }
        findContainerName(container_id, function(container_name){
          lxd.deleteSnapshot(snapshot_name, container_name);
          callback(snapshot_name + " from " + container_name + " has been deleted"); 
        })        
      }); 
    }
  })
}
  
module.exports = {connection, userLogin, userRegister, searchImages, searchContainers, createContainer, findImageName, findContainerName, startContainer, stopContainer, deleteContainer, createSnapshot, searchSnapshots, deleteSnapshot, restoreSnapshot};
  