
# Workshop


## nginx


```bash
docker run -d --rm --name=nginx-container1 nginx:latest
```

- image ที่ดีควรจะรุบุ EXPOSE ใน Docker Registry ว่า image นั้นมี internal port อะไรบ้างเพื่อให้ user ที่จะนำไปใช้ ใช้งานได้ถูกต้องเวลาเขียน script

![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/21f6e7d94a6be4eb83c8a038e06f07db.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=gG2%2F2ygnjikPJfxhfwS9kJNZOWrWyi9OYwT2QPzOEF7B3Fr22Y5nX0RPFLHiheYOo6HTy872kYQb3jLy3q73PPoeY9waYM9wo2W0ewKkEfX1PNVbxin6OfiIyL%2F1dR163Syx2XaqDJm3iiIt%2Fco2Z8MpUakBkM2ouJ2UYePnglnkylNCKa11GBSWgE6YQzdWvfmzJ42z2gk2Hk%2FPVDUA7SmYXTYabtmFrFxJBzRcZIZfGYLj96uRCim1F%2B1rKTG%2FsdC4AUyou0jDWSzMFxLMQiYscEwW2GcWlFIsCN%2FBOn%2F9DO3FmG4iJ4M%2BNxdGIfaAFXQ2Yt%2FRBs4fGqatXp%2FFnA%3D%3D)


## การใช้งาน 2 container ขึ้นไป


สิ่งที่เรา concern จะมีไม่กี่อย่างที่เราต้อง concern

- Port Collision, port ห้ามชนกันหากต้องการทำ Port Mapping กับ Host Machine
- Container Name ห้ามซ้ำกัน
- หากต้องการให้ container คุยกันต้องสร้าง Virtual Network Interface และ join container ให้อยู่ใน Subnetwork เดียวกัน

```bash
# container1
docker run -d --rm --name=nginx-container1 --network bridge1 -p 81:80 nginx:latest

# container2
docker run -d --rm --name=nginx-container2 --network bridge2 -p 82:80 nginx:latest
```

- จาก cmd เราจะได้ Container ที่อยู่คนละ Subnetwork และมีการ mapping port ที่ไม่เหมือนกัน

```bash
# network bridge1
$ docker network inspect bridge1
[
    {
        "Name": "bridge1",
        "Id": "a06e9a2e1f75d761d1f2e70130d900f56f1428170ec50c864860704afa783bde",
        "Created": "2025-11-21T03:32:53.513422175Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv4": true,
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.19.0.0/16",
                    "Gateway": "172.19.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "0ecb5c95a9a3faa6b0408ceb5bf0150c8a36dd7f59ed5413054c8712d78cb6cc": {
                "Name": "nginx-container1",
                "EndpointID": "8f4fd13b485cc70021bb7a0124459410bfed1179c3d3d1338a3df2de702d4c27",
                "MacAddress": "72:9a:b7:c0:1b:a4",
                "IPv4Address": "172.19.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.enable_ipv4": "true",
            "com.docker.network.enable_ipv6": "false"
        },
        "Labels": {}
    }
]

# network bridge2
$ docker network inspect bridge2
[
    {
        "Name": "bridge2",
        "Id": "fe47f5a90dedf1e9586b2c6d5353c0745a641eca23c5848d006b7321bcd600f7",
        "Created": "2025-11-21T03:32:54.971236007Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv4": true,
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.20.0.0/16",
                    "Gateway": "172.20.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "58ba24f346bbd1f8c991914b852072bf752c3861c06a32e3930d75396280474d": {
                "Name": "nginx-container2",
                "EndpointID": "4462d4a2de0c14d10a7ed29cb36cd9db70d340e494d4925d2e0cbe2134829a25",
                "MacAddress": "6a:45:03:b5:45:74",
                "IPv4Address": "172.20.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.enable_ipv4": "true",
            "com.docker.network.enable_ipv6": "false"
        },
        "Labels": {}
    }
]
```


### การทำให้ 2 container นี้สามารถสื่อสารกันได้


เราจะต้องสร้าง Virtual Network แแล้ว join 2 container นี้ให้อยู่ subnetwork เดียวกัน


สร้างโดยใช้ 


`docker network create 2con-commu`


```bash
# container1
docker run -d --rm --name=nginx-container1 --network 2con-commu -p 81:80 nginx:latest

# container2
docker run -d --rm --name=nginx-container2 --network 2con-commu -p 82:80 nginx:latest
```


ทดสอบ curl ไปอีก container


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/5f32774ea84b1db1135ed883ac2ef3a1.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=HZEZQjFHuAf%2Br5l7snRRy3gaU02YrC4dlUpKEdJE2gtzmrtf%2BdfHqcyXLTYUpng1%2F%2FFKAC1TGZxteCVQGBopBsJP2nkLAQGzodfK3i9I0O9%2FxEJ6EctRlzRNWZoooZmoWqv%2FkcbyP%2BhGoaqDAzuuBcppbhxdUEbgwRHv8TLl6oYYa8gmyxra%2FrWaSGy11ICpHQllnd1xpobBc%2Be4%2FkTA1y5BvDr%2FszECM6Iug2Hiy%2FuZ77THFjOHXr1wCKalqn0ZrKz4TJ2QdHQ1KofcVjbD3J9itZyoAwnzbWwOw%2BMTEcE7Jf3NQxaxlBh7A5IJ79BxNjLbgpG6u6kOfbK6AAAu1w%3D%3D)


`docker network inspect 2con-commu`


```bash
[
    {
        "Name": "2con-commu",
        "Id": "cd73b6173e943d2595652766251ee38bc980c3c7aeacaba693e2614ea77feb31",
        "Created": "2025-11-21T03:36:35.594436896Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv4": true,
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.21.0.0/16",
                    "Gateway": "172.21.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "ad0c139e092ead92ae9123800043107c09c596214c2d29f190ba9530552c70ec": {
                "Name": "nginx-container1",
                "EndpointID": "89ba58065ba6e19de62c425486f55a757b1c14c0bb11904e998c232af2e8d9fb",
                "MacAddress": "ce:1d:9b:56:a1:55",
                "IPv4Address": "172.21.0.2/16",
                "IPv6Address": ""
            },
            "db95a5c447a736019d7ad2a38f218145348764ebe6a5bd3b5d1811d1b975d8cd": {
                "Name": "nginx-container2",
                "EndpointID": "6aa78785f07557ae3121fc1d2c9426626a3d459dcc927380a5bc05a6db4dd288",
                "MacAddress": "e6:1c:39:df:ea:2a",
                "IPv4Address": "172.21.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.enable_ipv4": "true",
            "com.docker.network.enable_ipv6": "false"
        },
        "Labels": {}
    }
]
```

- หากเราใช้ Default Bridge Network จะไม่มี DNS ให้ใช้ภายใน ซึ่งเราจะต้องใช้ IP Address ของ Container ในการติดต่อสื่อสารกันแทน

# Docker Volume


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/f5ef1b2bb2b8c6f588cf22a5c8831613.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=dKgZh7D5dWtIEb6IO7b4P3iw4PDl%2BIDN4lNNf5bESWpIhRZNUjhCRjpKEFsp5be4qpr%2Bemtehb0oK%2FRH6AaTmHjHcx7UVTk522DlsziKH%2BHJu8SKKbLhsxCW0eiLuM2YRWx7pRxQYCuQLGPbH%2F%2F8it8fdeNRVY8ksbzyh4hr8hC0FKYSW6%2BKs7n1RXZKD02%2Bv1v3EXZdh2yI1txOlhIlbDp2AluGH2zWVZcSoE5QlABMzjRvk8rrF7QZzNn88HyxSgacPfpI0%2FneCGyUKC4addLMwcVyqVBfUNjjp7om8cTRN8Ca0YYcV4YJUASd5aRwPVgBHaZNJzKDDcktJEc8Ig%3D%3D)


| **ประเภท Volume**   | **คำอธิบาย**                                                                                                 | **การใช้งานหลัก**                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **1. Named Volume** | พื้นที่จัดเก็บที่จัดการโดย Docker Engine เอง ข้อมูลถูกเก็บไว้ใน Directory ภายใน Host File System             | การเก็บข้อมูล Database, การเก็บ Log, และข้อมูลแอปพลิเคชันทั่วไปที่ต้องการความถาวร                  |
| **2. Bind Mount**   | การเชื่อมต่อ (Mount) Directory หรือไฟล์ **จาก Host File System** เข้าไปใน Container โดยตรง                   | การพัฒนา (Development) โดยใช้ Code จาก Host, การ Mount Configuration Files (เช่น Nginx Config)     |
| **3. tmpfs Mount**  | การเก็บข้อมูลไว้ใน **RAM (หน่วยความจำ)** ของ Host Machine เท่านั้น ข้อมูลจะหายไปทันทีที่ Container หยุดทำงาน | การเก็บข้อมูลชั่วคราวที่มีความละเอียดอ่อน (Sensitive Data) หรือการเก็บ Cache ที่ต้องการความเร็วสูง |


### ทดลอง Bind Mount html file กับ Nginx Container

1. สร้างไฟล์ html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      h1 {
        color: blue;
        text-align: center;
        margin-top: 20%;
      }
    </style>
  </head>
  <body>
    <h1>Hello Docker!!</h1>
  </body>
</html>
```

1. Change Working Directory ไปที่ html file สร้างอยู่

	เราจะ mount ไปที่ path `/usr/share/nginx/html/index.html`


	```bash
	docker run -d --rm --name=nginx-bind-mount -v ./index.html:/usr/share/nginx/html/index.html -p 8080:80 nginx:latest
	```


	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/fa7ba55affa78b219377d321dd469ca5.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=SLLpRozmipAxP4qgGrjpvSh8rXS8EfFC%2F5EIGONGQqrviMdKu6F8%2Fq2MQpDHmmZg8nRgGy3oh4PyCWT352CEnKve0h7yWVdVZI6huB%2FWfx165v56rcpTaVON7njpjGHJQHMQhfcsfRR5uGXXL66Lcrb3IFf7I7fgrawjdjMZ2F%2FxqQHegTNdCdcJLuOKNLmfGNoZtuFVbnKKqYTJy0u2y5aE%2BvOfqDfc8%2FZxUWpqT6kalKPZbTiyt5c7NfZs3YrMENkhzTVXAZFYxyGVjVk8D6rzHvoomX9%2B3GOiqWS7cfzrgEpPRzpNuNVUqT2E1ZroKSbOULQWiAei%2B6XdnbSP%2Bg%3D%3D)

- ซึ่งการ Bind Mount จะเป็นการ Mount File จาก Host File System ไปเก็บไว้ใน Container หากเราอัพเดตไฟล์บน Host ไฟล์ใน Container ก็จะอัพเดตตาม
- การทำ Named Volume, Bind Mount จะขึ้นอยู่กับแต่ละ Application ที่เราใช้เช่น
	- mysql สามารถเก็บ Persistent Data ของ DataBase ที่ path `/var/lib/mysql`
		- MySQL —> `/var/lib/mysql` เก็บข้อมูล DB
		- PostgreSQL —> `/var/lib/postgresql/data` เก็บข้อมูล DB
		- MongoDB —> `/data/db` เก็บข้อมูล DB
		- Prometheus —> `/etc/prometheus/prometheus.yml` เก็บ Data Source

---


note: docker volume เก็บไว้อ่าน


[bookmark](https://codinggun.com/docker/volume/)

