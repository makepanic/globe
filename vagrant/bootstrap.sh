#!/usr/bin/env bash
 
# update ubuntu package repo
apt-get update > /dev/null
 
# install nodejs requirements (say yes to all)
# via https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint-elementary-os
apt-get install -y python-software-properties python g++ make git
add-apt-repository -y ppa:chris-lea/node.js
apt-get update > /dev/null
apt-get -y install nodejs
 
# clone globe
cd /vagrant/
 
# install app dependencies
npm install
 
# install grunt cli
npm install -g grunt-cli

echo "bootstrapping done"