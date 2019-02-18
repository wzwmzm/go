https://github.com/xdtianyu/scripts/tree/master/ddns

执行方式:
./cloudxns.sh   ./cloudxns1.conf
./cloudxns.sh   ./cloudxns2.conf
//两个配置文件设置了不同的 HOST , 即域名头部分.
//两个配置文件设置不同的 LAST_IP_FILE, 以保证得到执行.

//    service cron status         //查看服务状态 
//    sudo service crond start    //启动服务
//    crontab DS.cron             //装载定时任务
 

