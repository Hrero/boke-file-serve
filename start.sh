#scp -r /Users/app/code/boke-file-serve root@121.196.178.118:/home/node-service

npm i && npm run build

pm2 start npm --name boke-file-serve -- run start

pm2 logs -f boke-file-serve
