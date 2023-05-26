"# windication" 


## How to start the server 
Login to the linode server from a terminal and run the below command 

```sh
/app/sensitqube.github.io/start.sh
```

## Troubleshooting guide

1. Login to the linode server from a terminal 
2. Run the below command to check if the app is running 
```sh
ps aux | grep node 
```
> you should see output like below
>
> root@139-162-43-121:/app/sensitqube.github.io# ps aux | grep node
> root      673281  1.3  4.5 629968 45216 pts/1    Sl   16:24   0:00 node server.js
> root      673301  0.0  0.0   6300   720 pts/1    S+   16:25   0:00 grep --color=auto node

3. Run the below command to check if caddy is running
```sh
ps aux | grep caddy
```
> You should see output like below
> root@139-162-43-121:/app/sensitqube.github.io# ps aux | grep caddy
> root      673282  0.1  3.5 752540 35816 pts/1    Sl   16:24   0:00 caddy reverse-proxy --from sensitqube.com --to http://localhost:8080
> root      673299  0.0  0.0   6432   656 pts/1    S+   16:24   0:00 grep --color=auto caddy
