a=`ps -ef|grep dev|grep app`;
if [ "$a" ] ;
then 
#	echo "被杀进程 : $a";
	echo `date` ---发现了app_process进程, 开始查杀! ;
        echo "被杀进程 : $a";
	ps -ef|grep dev|grep app|awk '{print $2}'|xargs sudo kill -9;
	sudo rm /dev/app_process;
else 
        echo -n "没发现有app_process进程	";

fi

    echo "$IDSTR $(date +%H:%M:%S)  ip neigh show|wc -l = `ip neigh show|wc -l` ";

