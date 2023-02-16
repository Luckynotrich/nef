Use Chrome DevTools
#-------------------
#Setup Node.js app for debugging
node --inspect ./server.js

#Use Chorme DevTools open
chrome://inspect/#devices

#By default DevTools will try to discover targets on "127.0.0.1:9229"
#You can change the host and port. Make sure that youor Node.js process
# is listening to it. You can point Node.js to a specific ip and port by
# running:
node --inspect=127.0.0.1:8080 ./dist/app.js

To run on remote machine #richardhaskell.com,
 # run it with the inspect flag in your remote machine . node --inspect <filename>

#Setup an SSH tunnel to connect to your remote machine. On your local machine,
# by running:
ssh -L 9221:localhost:9229 user@remote.machine.com

Open Chrome DevTools

#Open your browser and open the 
richardhaskell.dev: chrome://inspect 

If you are debugging a remote app,
# after setting up an SSH tunnel, you need to add your local port to discoverable targets.
# To do this, make sure the Discover network targets checkbox is checked. Click the
# Configure… button and add your IP address and port.

#To open DevTools dedicated to Node.js debugging, click Open dedicated DevTools for Node.

Set Breakpoints

To debug your app, # navigate to the Sources tab. This is where you will be editing the version of
# stored in the browser.
# Expand the file tree on the left and click the file you want to debug. The selected file opens
# in the central part of the sources tab. You can open multiple files for debugging.

##########################################################################
##########################################################################

Use CLI Debugger
#---------------
# to run debugging entirely in the CLI, you can start you app with:
node inspect ./dist/app.js #(note the missing hyphens!)

Be aware #that the Node.js inspector supports breakpoints but is not
# a full-featured debugger. If you want to continue from a breakpoint 
#(set with the debugger statement), you have to enter cont (continue)
# within the CLI.

Pause Debugging
#When your app has a heavy initialization, you may want to pause your
# app until the debugger is attached. This can be done by using the flag
 --inspect-brk #, which sets a break before running your code. You can use
 # your remote debugger (i.e. Chrome DevTools) to unpause the debugging process.

 