# sad2019-1-team-11

* Chetan Tuli = Vue.js Frontend.
* Gaston Vejar = Node.js Backend; LXD Configuration and Setup; mySQL Database Container Configuration and Setup; nginx w/SSL Load Balancer Container Configuration and Setup; nginx w/SSL Web Server Configuration and Setup.


Local Testing Setup:
===================


* Database setup
  * Create a local mySQL instance.
  * Create database team11cm.
  * Create user 'team11cm' with password 'admin123' and give it full permissions over the created database.
  * Use the scripts in "db-init" to create the tables and populate the initial data in the database.


* Application
  * Check database connection on dummy_database.js
  * Make sure that the url variable in /public/script/main.js is pointing to 'http://localhost:3000' for local testing.
  * Run dummy_app.js. This will run the app only with database (no lxd) for testing porpuses.
  * Run application through browser at 'http://localhost:3000'.


Production Setup:
================


* Local Linux Machine with LXD
  * Install and configure a local instance of LXD.


* Database Container
  * Create a new container ('sys-database') with an instance of mySQL.
  * Create database team11cm.
  * Create user 'team11cm' with password 'admin123' and give it full permissions over the created database.
  * Use the scripts in "db-init" to create the tables and populate the initial data in the database.
  * Container mySQL configuration example file can be found in server_config/database/mysql.cnf


* Load Balancer Container
  * Create a new container ('sys-loadbalancer') with an instance of nginx.
  * Container loadbalancer nginx configuration sample file can be found in server_config/load-balancer/nginx.conf.


* Web Server Containers/Application
  * Create web servers containers ('sys-webserverXX') with an instance of nginx.
  * Container webserver nginx configuration sample file can be found in server_config/web-server/nginx.conf.
  * Check web servers name in the load balancer config file.
  * Copy the application files inside the web server containers.
  * Check database server configuration to database container (from point 1.2) in connections/database.js.
  * Check LXD server configuration to LXD server (from point 1.1) through SSH in connections/lxd.js.
  * Run application through pm2 app.js.


* Final configurations
  * Create a /etc/hosts rule for 'team11cm.com' to go to the load balancer container ip address.
  * Make sure that the url variable in /public/script/main.js is pointing to 'https://team11cm.com' for production.
  * Run the app through browser at 'https://team11cm.com'.
