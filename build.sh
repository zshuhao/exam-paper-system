#!/bin/bash
source /etc/profile

if [ ! $1 ];then
    echo "Usage: $0 enviroment"
    exit 1
fi

ENV=$1
echo "$ENV"

PROJECT_NAME="info_system_setup_$ENV"
BUILD_NAME="node_modules"

function check() {
    if [ $1 != 0 ];then
        echo "exec fail"
        exit 1
    fi
}


echo "install yarn"
npm i yarn -g

echo "execute yarn install"
yarn

echo "execute yarn build"
yarn build:$ENV

echo "build success"

# 如果存在 node_modules 目录
if [ -d ./$BUILD_NAME ];then
    # 将 service*.sh文件中的 xxx 替换为 $ENV
    sed -i "s/xxx/$ENV/g" service*.sh

    mkdir $PROJECT_NAME

    mv * .[^.]* $PROJECT_NAME
    # mv * $PROJECT_NAME

    tar -czvf "$PROJECT_NAME".tar.gz $PROJECT_NAME/

    check $?

    echo "MW_SUCCESS"
fi