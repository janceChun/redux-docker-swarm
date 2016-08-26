# redux-docker-swarm

根据[react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit), 打造获取docker swarm api 的小例子

## 如何启动此工程  
* npm install
* npm start
## docker 安装
* [install docker](https://docs.docker.com/engine/installation/linux/#install-docker-engine-on-linux) (docker version 要超过1.12.0) 
## vagrant 启动多个虚拟机，模拟集群
vagrant 
1.配置两到多条虚拟机
2.启动虚拟机，在虚拟机上安装docker
3.在其中一台 node1机器上docker swarm init 
4.在node1上公开远程访问
在Ubuntu环境下
service docker stop
docker -d -H unix:///var/run/docker.sock -H 0.0.0.0:4243
为了使配置永久生效，修改其配置文件 /etc/default/docker，
加入 DOCKER_OPTS="-H=unix:///var/run/docker.sock -H=0.0.0.0:4232"

