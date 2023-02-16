#ssh pw:
z@3nogM0NMI#38
# sengrid pw: 
MLPvNCUC77BzQDqY

ssh -p 7822 richar65@az1-ts106.a2hosting.com

#rsync --delete -rvz -P --partial --ignore-times
#--timeout=0 --protocol=29
#/home/gsus/myfiles/ example@example.com:/home/gsus/myfiles



# upload app.js 
#rsync -ravz -e 'ssh -p7822' --protocol=29 app.js richar65@az1-ts106.a2hosting.com:/home/richar65/www/rhbackend/app.js


# upload index.html 
rsync -ravz -e 'ssh -p7822' --protocol=29 ./index.html  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/index.html
# download index.html 
rsync -ravz -e 'ssh -p7822' --protocol=29 richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/index.html .

# upload contact-page.html
rsync -ravz -e 'ssh -p7822' --protocol=29 ./contact-page.html  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/contact-page.html

# upload main.css and main.css.map
rsync -ravz -e 'ssh -p7822' --protocol=29 ./main.css  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/css/main.css

# upload main.css.map
rsync -ravz -e 'ssh -p7822' --protocol=29 ./main.css.map  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/css/main.css.map

# upload contact-style.css
rsync -ravz -e 'ssh -p7822' --protocol=29 ./contact-style.css  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/css/contact-style.css

# upload popup_style.css
rsync -ravz -e 'ssh -p7822' --protocol=29 ./popup_style.css  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/css/popup_style.css

# upload index.js
rsync -ravz -e 'ssh -p7822' --protocol=29 ./index.js  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/js/index.js

# upload a2-sendmail.js
rsync -ravz -e 'ssh -p7822' --protocol=29 ./a2-sendmail.js  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/js/a2-sendmail.js
# download a2-sendmail.js
rsync -ravz -e 'ssh -p7822' --protocol=29 richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/js/a2-sendmail.js .

# upload animate_element.js
rsync -ravz -e 'ssh -p7822' --protocol=29 ./animate_element.js  richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/dist/js/animate_element.js

#upload /richardhaskell exclude .git
#rsync -ravz -e 'ssh -p7822' --protocol=29 --exclude '.git' . richar65@az1-ts106.a2hosting.com:/home/richar65/public_html/richardhaskell

#download /newledohub.org exclude .git
rsync -ravz -e 'ssh -p7822' --protocol=29 --exclude '.git' richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/* .


# download /rhbackend 
#rsync -ravz -e 'ssh -p7822' --protocol=29 --exclude 'node_modules' richar65@az1-ts106.a2hosting.com:/home/richar65/public_html/rhbackend .
# upload /rhbackend 
#rsync -ravz -e 'ssh -p7822' --protocol=29 --exclude 'node_modules' . richar65@az1-ts106.a2hosting.com:/home/richar65/public_html/rhbackend 


#donload send-mail.js from rh_backend/backend
#rsync -ravz -e 'ssh -p7822' --protocol=29 richar65@az1-ts106.a2hosting.com:/home/richar65/public_html/rhbackend/backend/send-mail.js ./send-mail.js
#upload sendd-mail.js from richardhaskell/rh_backend/backend
#rsync -ravz -e 'ssh -p7822' --protocol=29 ./send-mail.js richar65@az1-ts106.a2hosting.com:/home/richar65/public_html/rhbackend/backend/send-mail.js


#upload contact-form.html 
#rsync -ravz -e 'ssh -p7822' --protocol=29 ./contact-form.html richar65@az1-ts106.a2hosting.com:/home/richar65/newledohub.org/contact-form.html

#backup richardhaskell.dev
#rsync -ravz -e 'ssh -p7822' --protocol=29 --exclude='node_modules' --exclude='.git' --include='index.js' --include='rhbackend' --include='richardhaskell' richar65@az1-ts106.a2hosting.com:/home/richar65/public_html/ . 

#get list of richardhaskell.dev backup
#rsync -ravz -n --exclude-from='excludefiles.txt' --include-from='includefiles.txt' -e 'ssh -p7822' --protocol=29 richar65@az1-ts106.a2hosting.com:/home/richar65/public_html/ . >> files.txt
