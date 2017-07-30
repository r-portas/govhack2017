npm run build
ssh root@aproximity.space "rm -rfv /var/www/client"
scp -r build root@aproximity.space:/var/www/client
