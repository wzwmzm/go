#!/bin/sh
CONFIG=$1

if [ ! -f "$CONFIG" ];then
    echo "ERROR, CONFIG NOT EXIST."
    exit 1
fi 

# shellcheck source=/dev/null
. "$CONFIG"

if [ -f "$LAST_IP_FILE" ];then
    # shellcheck source=/dev/null
    . "$LAST_IP_FILE"
fi

IP=""
RETRY="0"
IDSTR="(ID=$(date +%H:%M:%S))"
while [ $RETRY -lt 3 ]; do
    IP=$(curl -s ip.xdty.org)
    RETRY=$((RETRY+1))
    echo "$IP"|grep "^[0-9]\{1,3\}\.\([0-9]\{1,3\}\.\)\{2\}[0-9]\{1,3\}$" > /dev/null;
    if [ $? -ne 0 ]
    then
        echo "$IDSTR $(date +%H:%M:%S) RETRY $RETRY TIME..."
	sleep 6
    else
        break
    fi
done

#IP地址合法性检测
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
        echo ""
	echo ""
        return 1
fi
#因为有了上面一段代码,所以本段代码可以省略. 但因为不影响结果,所以本段代码暂且保留.
if [ -z "$IP" ];then
	echo "进入IP地址合法性检测第二段++++++++++++++++++++++++++++++++++++++++++++"
	echo "$(date) --- 无法获得外网地址.***  前次地址: $LAST_IP   ***"
	echo "重启WIFI连接....sudo ip link set wlan0 down...."
	sudo ip link set wlan0 down
        sleep 10
	echo "$(date) --- 重启WIFI后IP=$(curl -s ip.xdty.org) "
	echo ""
	exit 1
fi

if [ "$IP" = "$LAST_IP" ];then
    echo "$(date) --- Already updated.($IP)"
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
	RECORD_ID=$(curl -k -s "$URL_R" -H "API-KEY: $API_KEY" -H "API-REQUEST-DATE: $DATE" -H "API-HMAC: $HMAC_R"|grep -o "record_id\":\"[0-9]*\",\"host_id\":\"[0-9]*\",\"host\":\"$HOST\""|grep -o "record_id\":\"[0-9]*"|grep -o "[0-9]*")

	echo "RECORD ID: $RECORD_ID"
	URL_U="https://www.cloudxns.net/api2/record/$RECORD_ID"
	PARAM_BODY="{\"domain_id\":\"$DOMAIN_ID\",\"host\":\"$HOST\",\"value\":\"$IP\"}"
	HMAC_U=$(printf "%s" "$API_KEY$URL_U$PARAM_BODY$DATE$SECRET_KEY"|md5sum|cut -d" " -f1)

	RESULT=$(curl -k -s "$URL_U" -X PUT -d "$PARAM_BODY" -H "API-KEY: $API_KEY" -H "API-REQUEST-DATE: $DATE" -H "API-HMAC: $HMAC_U" -H 'Content-Type: application/json')

	echo "$RESULT"

	if [ "$(printf "%s" "$RESULT"|grep -c -o "message\":\"success\"")" = 1 ];then
	    echo "$(date) -- Update success"
	    echo "LAST_IP=\"$IP\"" > "$LAST_IP_FILE"
	else
	    echo "$(date) -- Update failed"
	fi
}

echo "$(date)---www.gofans.ga  HOST=WWW"
HOST="www"
dnsupdate

echo "$(date)---gofans.ga  HOST=@"
HOST="@"
dnsupdate

echo "$(date)---*.gofans.ga  HOST=*"
HOST="*"
dnsupdate
