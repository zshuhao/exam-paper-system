#version_2.0
#!/bin/bash

echo "webpack.sh echo test, project name" $1
PROJECT_NAME=$1
#NODE_INSTALL_DIR=/home/deploy/install/$PROJECT_NAME
PROJECT_WORKSPACE=/home/deploy/workspace
PROJECT_DIR=/home/deploy/workspace/$PROJECT_NAME
#STATIC_PATH=$PROJECT_DIR/web/Public/static
ENV=$2

echo "编译环境："$ENV

#mkdir -p $NODE_INSTALL_DIR
#echo "创建目录: "$NODE_INSTALL_DIR

#cp $STATIC_PATH/package.json $NODE_INSTALL_DIR
#echo "拷贝 package.json 到 "$NODE_INSTALL_DIR

cd $PROJECT_DIR

echo  "##############################以下是编译过程#######################"

#echo "intall yarn"
#npm i yarn -g

echo "开始安装依赖"
yarn

if [ $? -eq 0 ]; then
    echo "安装依赖成功"
else
    echo "安装依赖失败"
	exit 1
fi

echo "开始yarn编译"
yarn build:$ENV

if [ $? -eq 0 ]; then
    echo "编译成功"
else
    echo "编译失败"
	exit 1
fi

BEFORE_INSTALL_DATE=`date +%s`

echo "yarn install 完成"

AFTER_INSTALL_DATE=`date +%s`

INSTALL_TIME=`expr $AFTER_INSTALL_DATE - $BEFORE_INSTALL_DATE`

echo 'node 安装时间: '$INSTALL_TIME' 秒'

#tar sourcecode
cd $PROJECT_WORKSPACE
#mkdir $PROJECT_NAME
#mv * .[^.]* $PROJECT_NAME
tar -czf  "$PROJECT_NAME".tar.gz  $PROJECT_NAME/
check $? "tar"
