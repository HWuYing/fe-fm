# docker 部署文件

FROM registry.docker-cn.com/library/node:10.13.0
#FROM fe-base
# 服务端使用
RUN mkdir -p /home/build/node_modules
COPY ./node_modules /home/build/node_modules

# 客户端使用
RUN mkdir -p /home/build
COPY ./build /home/build

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install -g pm2

WORKDIR /home

CMD ["pm2-runtime", "start", "./build/pm2.config.js" ]

#CMD ["node", "./build/server.js" ]
