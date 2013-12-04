#!/usr/bin/env bash
 
# update ubuntu package repo
apt-get update > /dev/null
 
# install nodejs requirements (say yes to all)
# via https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint-elementary-os
# freetype and fontconfig for phantomjs
apt-get install -y python-software-properties python g++ make git libfreetype6 libfontconfig1
add-apt-repository -y ppa:chris-lea/node.js
apt-get update > /dev/null
apt-get -y install nodejs

# install phantomjs 1.9.2
cd /usr/local/share
wget http://phantomjs.googlecode.com/files/phantomjs-1.9.2-linux-i686.tar.bz2
tar xjf phantomjs-1.9.2-linux-i686.tar.bz2
sudo ln -s /usr/local/share/phantomjs-1.9.2-linux-i686/bin/phantomjs /usr/local/share/phantomjs
sudo ln -s /usr/local/share/phantomjs-1.9.2-linux-i686/bin/phantomjs /usr/local/bin/phantomjs
sudo ln -s /usr/local/share/phantomjs-1.9.2-linux-i686/bin/phantomjs /usr/bin/phantomjs
 
# clone globe
cd /vagrant/
 
# install app dependencies
npm install
 
# install grunt cli
npm install -g grunt-cli

echo "bootstrapping done"