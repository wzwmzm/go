1, 在官网选择下载: https://caddyserver.com/download
2, 选择脚本方式安装: One-step installer script (bash): 
	curl https://getcaddy.com | bash -s personal
3, 脚本执行完成后，执行 which caddy，可以看到 caddy 已被
	安装到了 /usr/local/bin/caddy；
	caddy -version 查看版本号
4, 运行 : caddy -port 44444 -conf  /home/wzw/project/go/src/html/8iris/7proxy-caddy/Caddyfile


