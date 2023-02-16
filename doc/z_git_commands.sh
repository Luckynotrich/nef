## git_commands.md

##…or create a new repository on the command line
echo "# richhaskell" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Luckynotrich/richardhaskell.git
git push -u origin main

##…or push an existing repository from the command line
git remote add origin https://github.com/Luckynotrich/richardhaskell.git
git branch -M main
git push -u origin main

git pull .
git add .
git commit -m "sync with web"
git push

git push --delete