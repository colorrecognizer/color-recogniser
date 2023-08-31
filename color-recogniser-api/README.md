ssh root@66.175.233.233
BS2p@_h609
cd /root/color-recogniser/color-recogniser-api/
git reset --hard
git pull
gradle bootRun
gradle build
sudo systemctl restart python-services
sudo systemctl restart hrms
sudo systemctl restart nginx
https://66.175.233.233/v3/api-docs
