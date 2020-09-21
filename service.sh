#!/bin/bash
source /etc/profile

# nginx配置文件
confdir="/etc/nginx/conf.d"
ENV="xxx"
app_flag="info_system_setup_$ENV"
location=""

if [ $ENV == 'aliyun_prod' ];then
    servername='kt.mwee.com'
else
    servername='crm_admin.infp.test.cn'
fi

function help() {
    echo "Usage: $0 start|reload"
}

function conf_check() {
    basepath="/data/application/$app_flag"
    lastdir=`find /data/appbak/$app_flag* -maxdepth 0 -type d | tail -2|head -1`
    # 是否为常规文件，是为真
    if [ ! -f $name.conf ];then
        # 修改文件时间属性为当前系统时间
        touch $name.conf
    else
        echo "$name.conf exists"
        cp -Rp $lastdir/dist/* $basepath/
        if [ $? -eq 0 ];then
            echo "copy old static dir"
            ls -1 $basepath/
        else
            exit 0
        fi
        echo "project updated"
        echo "MW_SUCCESS"
        exit 0
    fi
}

function start() {
    port=8085
    cd $confdir

    if [[ "$location" == "" ]];then
        name=$app_flag
        conf_check
    else
        name=${app_flag}_${location}
        conf_check
    fi

    echo "server {
        listen  $port;
        server_name   $servername;
        access_log  /var/log/nginx/$name.access.log main;
        error_log  /var/log/nginx/$name.error.log;
        root   /data/application/$name/dist;
        index  index.php index.html index.htm;
        location / {
                if (!-e \$request_filename) {
                        rewrite ^(.*)$ /index.php?s=\$1 last;
                        break;
                }
        }


        location ~ \.php$ {
                try_files \$uri /index.php;
                fastcgi_pass   unix:/var/run/php-fpm5.sock;
                fastcgi_index  index.php;
                fastcgi_param  SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
                include        fastcgi_params;
        }

        location ~* ^.+\.(gif|jpg|jpeg|png|bmp|swf)$
        {
                access_log  off;
                expires     1d;
        }

        location ~* ^.+\.(js|css)?$
        {
                access_log  off;
                expires     1h;
        }


        location ~* .(eot|otf|svg|ttf|woff|woff2)$
        {
                add_header Access-Control-Allow-Origin *;
        }

    }" >> $name.conf
    echo "$name.conf created , port $port open!"
    
    # 判断nginx配置是否正确
    /usr/sbin/nginx -t

    if [ $? != 0 ];then
        echo "$name.conf test error"
        exit 1
    else
        reload
    fi
}

function reload() {
    pid=`pgrep nginx`
    # pid长度不为0
    if [ -n $pid ];then
        nginx
        if [ $? != 0 ];then
            echo "nginx first start error"
        else
            echo "nginx first started"
            ls -1 /data/application/$name/ | tail -1
            echo "MW_SUCCESS"
        fi
    else
        # 重启命令
        nginx -s reload
        if [ $? != 0 ];then
            echo "nginx reload error"
        else
            echo "nginx reloaded"
            ls -1 /data/application/$name/ | tail -1
            echo "MW_SUCCESS"
        fi
    fi
}

function stop() {
    # nginx -s stop
    echo "nginx stopped"
    echo "MW_SUCCESS"
}

if [ "$1" == "" ];then
    help
elif [ "$1" == "start" ];then
    start
elif [ "$1" == "reload" ];then
    reload
elif [ "$1" == "stop" ];then
    stop
else
    help
fi