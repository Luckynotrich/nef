#a2-node-instructions.sh

#Create the application with the following command: 
#cloudlinux-selector example
cloudlinux-selector create --interprete=nodejs --json --app-root=<USER_NAME> --app-uri=<APP_NAME> --app-mode=develompent --version=<VERSION> --domain=<DOMAIN>
#a2hosting example
cloudlinux-selector create --json --interpreter nodejs --version 11 --app-root app --domain example.com --app-uri app
# practice setup
cloudlinux-selector create --json --interpreter nodejs --version 16.17.1 --app-mode=develompent --app-root newledohub.org  --domain newledohub.org --app-uri newledo_back

#cd into app
cd rh-backend

#Create a package.json

#Insert the following
{
  "name": "nef",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "scss": "sass --watch dist/scss:dist/css/",
    "dev": "nodemon app.js",
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "nodemailer": "^6.9.1"
  },
  "devDependencies": {
    "fs": "^0.0.1-security",
    "nodemon": "^2.0.20",
    "sass": "^1.57.1"
  }
}




#Edit it to match your app and upload it to app directory

#To install npm, type the following command:
cloudlinux-selector install-modules --json --interpreter nodejs --user richar65 --app-root newledohub.org


###########################################################################################
#                                                                                         #
# To install packages with npm and do other command-line tasks                            #
# related to the application, log in using SSH, and then type the                         #
# following command to enter the virtual environment for the application:                 #
#                                                                                         #
source /home/richar65/nodevenv/newledohub.org/16/bin/activate && cd /home/richar65/newledohub.org
#                                                                                         #
# enter:                                                                                  #
#                                                                                         #
     deactivate # to return from virtual environment                                      #
###########################################################################################

#To control the running state of the application, do the following:

#To stop the application, type the following command:

cloudlinux-selector stop --json --interpreter nodejs --app-root ~/newledohub.org

#To start the application, type the following command:

cloudlinux-selector start --json --interpreter nodejs --app-root ~/newledohub.org

#To restart (stop and start in one step) the application, type the following command:

cloudlinux-selector restart --json --interpreter nodejs --app-root ~/newledohub.org

# Get cPanel Hosting
# Article Details

#     Product: Drive Web Hosting Turbo Web Hosting
#     Level: Intermediate

# Other Articles in This Category

#     Optimize Website feature
#     Creating a Node.js application with cPanel using the Node.js Selector
#     Migrating a Node.js application to Node.js Selector
#     Node.js application error message: "Cannot GET" URL


# Show More
# Related Articles

#     Node.js application error message: “Cannot GET” URL
#     Connecting to MySQL using Node.js

# Show More

#     SUGGEST AN ARTICLE

# Grow Your Web Business

# Subscribe to receive weekly cutting edge tips, strategies, and news you need to grow your web business.

# No charge. Unsubscribe anytime.


cloudlinux-selector read-config --json --interpreter nodejs  --user user1 --app-root app_dir/app1 --config-file package.json

cloudlinux-selector create --interprete=nodejs --json --app-root=<USER_NAME> --app-uri=<APP_NAME> --app-mode=develompent --version=<VERSION> --domain=<DOMAIN>
