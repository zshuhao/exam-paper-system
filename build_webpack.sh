#version_2.0
#!/bin/bash
source /etc/profile

if [ ! $1 ];then
    echo "Usage: $0 enviroment"
    exit 1
fi

DIR=`pwd`
ENV=$1
echo "$ENV"

sed -i "s/xxx/$ENV/g" service*.sh

#if [ -d ./$BUILD_NAME ];then
#    sed -i "s/xxx/$ENV/g" service*.sh
#    mkdir $PROJECT_NAME
#    mv * $PROJECT_NAME
#    # mv /opt/auto/webresource/${PROJECT_NAME}_packageInfo.json $PROJECT_NAME/web/packageInfo.json
#    # mv /opt/auto/webresource//${PROJECT_NAME}_webResourceVersion.txt $PROJECT_NAME/web/webResourceVersion.txt
#    tar -czvf  "$PROJECT_NAME".tar.gz  $PROJECT_NAME/
#    check $?
#    echo "MW_SUCCESS"
#fi

#项目名称
PROJECT_NAME="info_system_setup_$ENV"

cd $DIR

USER=deploy
HOST=10.1.35.88
BUILD_WORKSPACE_PACHAGE=/home/deploy/workspace/$PROJECT_NAME.tar.gz
BUILD_DIR=/home/deploy/workspace/$PROJECT_NAME
REMOTE_BASH=$BUILD_DIR/webpack.sh
#TAR_PACKAGE_PATH=$BUILD_DIR/$PROJECT_NAME.tar.gz

echo "tar包地址: "$TAR_PACKAGE_PATH

ssh $USER@$HOST "rm -rf "$BUILD_DIR*
echo "删除: "$BUILD_DIR

ssh $USER@$HOST "mkdir -p "$BUILD_DIR
echo "新建文件夹: "$BUILD_DIR

scp -r ./ $USER@$HOST:$BUILD_DIR
echo "copy 文件完成"

ssh $USER@$HOST "chmod 755 "$REMOTE_BASH
echo "修改远程执行脚本权限"

echo "远程bash脚本位置 :"$REMOTE_BASH
ssh $USER@$HOST "$REMOTE_BASH $PROJECT_NAME $ENV"

cd $DIR
scp $USER@$HOST:$BUILD_WORKSPACE_PACHAGE ./

echo "MW_SUCCESS"

