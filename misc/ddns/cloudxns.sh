#!/bin/sh
#for i in `seq 1 1`; do dd if=/dev/zero of=/dev/null & done; pid=$!;sleep 1;echo "开核($(date +%H:%M:%S)) pid=$pid";
IDSTR="(ID=$(date +%H:%M:%S))"
#echo "$IDSTR"

CONFIG=$1

if [ ! -f "$CONFIG" ];then
    echo "ERROR, CONFIG NOT EXIST."
#    kill $pid
#    echo "关核1($(date +%H:%M:%S)) pid=$pid"
    exit 1
fi 

#echo "-2---$IDSTR $(date +%H:%M:%S)"
# shellcheck source=/dev/null
. "$CONFIG"

#echo "-1---$IDSTR $(date +%H:%M:%S)"
if [ -f "$LAST_IP_FILE" ];then
    # shellcheck source=/dev/null
    . "$LAST_IP_FILE"
fi

IP=""
#echo "0.1---$IDSTR $(date +%H:%M:%S)"
RETRY="0"
#echo "0.2---$IDSTR $(date +%H:%M:%S)"

#echo "0.3---$IDSTR $(date +%H:%M:%S)"
while [ $RETRY -lt 5 ]; do
#    echo "$IDSTR $(date +%H:%M:%S)----before curl"
    IP=$(curl -s ip.xdty.org)
#    echo "$IDSTR $(date +%H:%M:%S)----after  curl"
    RETRY=$((RETRY+1))
#   echo "0.6---$IDSTR $(date +%H:%M:%S)"
    echo "$IP"|grep "^[0-9]\{1,3\}\.\([0-9]\{1,3\}\.\)\{2\}[0-9]\{1,3\}$" > /dev/null;
    if [ $? -ne 0 ]
    then
        echo "$IDSTR $(date +%H:%M:%S) RETRY $RETRY TIME........."
	sleep 15
    else
        break
    fi
done


#IP地址合法性检测
#echo "1---$IDSTR $(date +%H:%M:%S)"
echo "$IP"|grep "^[0-9]\{1,3\}\.\([0-9]\{1,3\}\.\)\{2\}[0-9]\{1,3\}$" > /dev/null;
if [ $? -ne 0 ]
then
	echo "进入IP地址合法性检测第一段++++++++++++++++++++++++++++++++++++++++++++"
	echo "$IDSTR $(date +%H:%M:%S)  --- IP地址非法" 
        echo "前次地址: $LAST_IP   "
	echo "本次地址: $IP"
        echo "重启WIFI连接....sudo ip link set wlan0 down...."
        sudo ip link set wlan0 down
        sleep 10
        echo "$IDSTR $(date +%H:%M:%S) --- 重启WIFI后IP=$(curl -s ip.xdty.org) "
#	echo "关核2($(date +%H:%M:%S)) pid=$pid"
        echo ""
	echo ""
#        kill $pid
        return 1
fi
#因为有了上面一段代码,所以本段代码可以省略. 但因为不影响结果,所以本段代码暂且保留.
#echo "2---$IDSTR $(date +%H:%M:%S)"
if [ -z "$IP" ];then
	echo "进入IP地址合法性检测第二段++++++++++++++++++++++++++++++++++++++++++++"
	echo "$(date) --- 无法获得外网地址.***  前次地址: $LAST_IP   ***"
	echo "重启WIFI连接....sudo ip link set wlan0 down...."
	sudo ip link set wlan0 down
        sleep 10
	echo "$(date) --- 重启WIFI后IP=$(curl -s ip.xdty.org) "
#	echo "关核3($(date +%H:%M:%S)) pid=$pid"
	echo ""
#	kill $pid
	exit 1
fi

#echo "3---$IDSTR $(date +%H:%M:%S)"
if [ "$IP" = "$LAST_IP" ];then
    echo "$IDSTR $(date +%H:%M:%S) --- Already updated.($IP)"
#    echo "关核4($(date +%H:%M:%S)) pid=$pid"
#    kill $pid
    exit 0
fi

echo "当前IP($IP)   上次IP($LAST_IP)   $(date) -- 需要更新域名IP."

#更新DNS
dnsupdate(){
	URL_D="https://www.cloudxns.net/api2/domain"
	DATE=$(date)
	HMAC_D=$(printf "%s" "$API_KEY$URL_D$DATE$SECRET_KEY"|md5sum|cut -d" " -f1)
	DOMAIN_ID=$(curl -k -s $URL_D -H "API-KEY: $API_KEY" -H "API-REQUEST-DATE: $DATE" -H "API-HMAC: $HMAC_D"|grep -o "id\":\"[0-9]*\",\"domain\":\"$DOMAIN"|grep -o "[0-9]*"|head -n1)

	echo "DOMAIN ID: $DOMAIN_ID"
	URL_R="https://www.cloudxns.net/api2/record/$DOMAIN_ID?host_id=0&row_num=500"
	HMAC_R=$(printf "%s" "$API_KEY$URL_R$DATE$SECRET_KEY"|md5sum|cut -d" " -f1)
	RECORD_ID=$(curl -k -s "$URL_R" -H "API-KEY: $API_KEY" -H "API-REQUEST-DATE: $DATE" -H "API-HMAC: $HMAC_R"|grep -o "record_id\":\"[0-9]*\",\"host_id\":\"[0-9]*\",\"host\":\"$HOST\""|grep -o "record_id\":\"[0-9]*"|grep -o "[0-9]*"|head -1)

	echo "RECORD ID: $RECORD_ID"
	URL_U="https://www.cloudxns.net/api2/record/$RECORD_ID"
	PARAM_BODY="{\"domain_id\":\"$DOMAIN_ID\",\"host\":\"$HOST\",\"value\":\"$IP\"}"
	HMAC_U=$(printf "%s" "$API_KEY$URL_U$PARAM_BODY$DATE$SECRET_KEY"|md5sum|cut -d" " -f1)

	RESULT=$(curl -k -s "$URL_U" -X PUT -d "$PARAM_BODY" -H "API-KEY: $API_KEY" -H "API-REQUEST-DATE: $DATE" -H "API-HMAC: $HMAC_U" -H 'Content-Type: application/json')

	echo "RESULT=$RESULT"

	if [ "$(printf "%s" "$RESULT"|grep -c -o "message\":\"success\"")" = 1 ];then
	    echo "$(date) -- Update success"
	    echo "LAST_IP=\"$IP\"" > "$LAST_IP_FILE"
	else
	    echo "$(date) -- Update failed"
	fi

	echo ""
}

echo "$(date)---www.gofans.ga  HOST=WWW"
HOST="www"
dnsupdate

echo "$(date)---gofans.ga  HOST=@"
HOST="@"
dnsupdate

#由于按 * 来取RECORD_ID会得到多个结果,所以对返回结果取第一行. 但这在逻辑上是不严谨的,可能造成结果的错误
#由此推测, 如果相同域名不同主机如果都是相同的外网地址,可以用 * 对应所有主机
echo "$(date)---*.gofans.ga  HOST=*"
HOST="*"
dnsupdate

#echo "关核5($(date +%H:%M:%S)) pid=$pid"
#kill $pid

