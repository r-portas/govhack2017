npm build
ssh root@aproximity.space "rm -rfv /var/www/html"
scp -r build root@aproximity.space:/var/www/html
