# Makeshift docs 😬



Make sure you have [Node.js](http://nodejs.org/)  installed.

```sh
git clone git@github.com:ayshptk/pingspeedbot.git # or clone your own fork
cd pingspeedbot
npm install
npm start
```

For getting ping speeds of single URL, send a GET request to 
`/p` with the following parameters
|Parameter| Required | Value|
|--|--|--|--|
|s|yes|hostname of the url|
|p| no | port of the url|
Example: 
```
$curl http://localhost:3000/p?s=google.com
```
or

```
$curl http://localhost:3000/p?s=google.com&p=80
```
will both give:
```
{"address":"142.250.67.206","port":80,"attempts":10,"avg":9.583154099999998,"max":19.91325,"min":5.01225,"results":[{"seq":0,"time":6.966958},{"seq":1,"time":5.01225},{"seq":2,"time":12.272875},{"seq":3,"time":8.698666},{"seq":4,"time":6.75775},{"seq":5,"time":7.880458},{"seq":6,"time":5.171667},{"seq":7,"time":19.91325},{"seq":8,"time":5.151333},{"seq":9,"time":18.006334}],"available":"yes"}
```
<br>

For getting ping speeds of bulk URLs, send a GET request to 
`/bulk`  with the following parameters
|Parameter| Required | Value|
|--|--|--|--|
|q|yes|comma seperated **complete** urls|

Example: 
```
$curl http://localhost:3000/bulk?q=google.com:80,facebook.com:80,twitter.com:80
```
this will return an array with each item being a result similar to the result from individual requests, but each item will also include a key "url" to distinguish the results.




