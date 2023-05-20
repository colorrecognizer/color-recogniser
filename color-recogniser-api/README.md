ssh root@66.175.233.233
BS2p@_h609
cd /root/swp490_g2/SpringBootAPI/HRMS_SWP490_G2/
git reset --hard
git pull
./mvnw spring-boot:run
./mvnw package -DskipTests
sudo systemctl restart hrms
sudo systemctl restart nginx
https://66.175.233.233/v3/api-docs
