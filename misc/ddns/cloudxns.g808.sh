#!/bin/sh
#for i in `seq 1 1`; do dd if=/dev/zero of=/dev/null & done; pid=$!;sleep 1;echo "开核($(date +%H:%M:%S)) pid=$pid";
/usr/sbin/arp -s 192.168.2.2 ac:38:70:53:03:d6
/usr/sbin/arp -s 192.168.2.1 cc:81:da:4e:2e:a1
#/usr/sbin/arp -n
echo -n "arp -n   返回码=$?******"



IDSTR="(ID=$(date +%H:%M:%S))"

CONFIG=$1

if [ ! -f "$CONFIG" ];then
    echo "ERROR, CONFIG NOT EXIST."
    exit 1
fi 

. "$CONFIG"

if [ -f "$LAST_IP_FILE" ];then
    . "$LAST_IP_FILE"
fi

IP=""
RETRY="0"
while [ $RETRY -lt 3 ]; do
    IP=$(curl -s ip.xdty.org)
    echo -n "$(date +%H:%M:%S)[$RETRY]---"
    RETRY=$((RETRY+1))
    echo "$IP"|grep "^[0-9]\{1,3\}\.\([0-9]\{1,3\}\.\)\{2\}[0-9]\{1,3\}$" > /dev/null;
    if [ $? -ne 0 ]
    then
        sleep 15
    else
        break
    fi
done

#IP地址合法性检测
echo "$IP"|grep "^[0-9]\{1,3\}\.\([0-9]\{1,3\}\.\)\{2\}[0-9]\{1,3\}$" > /dev/null;
if [ $? -ne 0 ]
then
	echo ""
	echo "进入IP地址合法性检测第一段++++++++++++++++++++++++++++++++++++++++++++"
        echo "前次地址: $LAST_IP   "
	echo "本次地址: $IP"
	/usr/sbin/arp -n

	ping -c2  $DOMAIN  > /dev/null
	echo "$DOMAIN		返回码=$?******"
	ping -c2 192.168.2.1 > /dev/null
	echo "192.168.2.1	返回码=$?******"
        ping -c2 192.168.2.2 > /dev/null
        echo "192.168.2.2	返回码=$?******"
        ping -c2 192.168.2.3 > /dev/null
        echo "192.168.2.3	返回码=$?******"
        ping -c2  $DOMAIN  > /dev/null
        echo "$DOMAIN		返回码=$?******"
        ping -c2 192.168.2.1 > /dev/null
        echo "192.168.2.1	返回码=$?******"
        ping -c2 192.168.2.2 > /dev/null
        echo "192.168.2.2	返回码=$?******"
        ping -c2 192.168.2.3 > /dev/null
        echo "192.168.2.3	返回码=$?******"

        sudo ip link set wlan0 down
        sleep 10

        echo "$IDSTR $(date +%H:%M:%S) --- 重启WIFI后IP=$(curl -s ip.xdty.org) "
        echo ""
	echo ""
        return 1
fi


if [ "$IP" = "$LAST_IP" ];then
    echo "$IDSTR $(date +%H:%M:%S) ---$RETRY--- Already updated.($IP) ip neigh show|wc -l = `ip neigh show|wc -l` "
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


echo "$(date)---$DOMAIN  HOST=@"
HOST="@"
dnsupdate

#由于按 * 来取RECORD_ID会得到多个结果,所以对返回结果取第一行. 但这在逻辑上是不严谨的,可能造成结果的错误
#由此推测, 如果相同域名不同主机如果都是相同的外网地址,可以用 * 对应所有主机
echo "$(date)---*.$DOMAIN  HOST=*"
HOST="*"
dnsupdate
