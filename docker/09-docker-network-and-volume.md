
# Docker Networking?


Docker Engine จะสร้าง Virtual Networks เพื่อทำให้ Container สามารถสื่อสารกันได้ โดยมี Policy ที่แตกต่างกันโดย Container สามารถสื่อสารกับ Host Machine และระหว่าง Container ได้

- Isolation แยก Container ออกจากกันโดยสมบูรณ์ทำให้ Container ที่อยู่คนละ Network Environment ไม่สามารถสื่อสารกันได้
- มี DNS ทำให้ Container สามารถระบุชื่อของ Service Container ได้เลยแทนการระบุ IP

| **Network Type**        | **คำอธิบาย**                                                                                                                                                           | **การใช้งานหลัก**                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **`bridge`**            | **Default Network** Container จะอยู่บนเครือข่ายภายใน (Private Network) ที่แยกออกจาก Host Network โดยมี Bridge Interface (เช่น `docker0`) ทำหน้าที่เชื่อมต่อและ Routing | Container ที่อยู่บน Host เดียวกันและต้องการสื่อสารกัน (เช่น Web App และ API Server)                     |
| **`host`**              | **ไม่ใช้ Virtualization** Container จะแชร์ **Network Stack** เดียวกันกับ Host Machine โดยตรง                                                                           | ใช้เมื่อต้องการประสิทธิภาพสูงสุด และไม่ต้องการ Port Mapping (Container เข้าถึง Port ของ Host ได้โดยตรง) |
| **`null`** / **`none`** | **ไม่มี Networking** Container ถูกรันโดยไม่มีการเชื่อมต่อเครือข่าย (ไม่มี Interface Network ภายใน)                                                                     | ใช้สำหรับ Image ที่ต้องการ Isolation สมบูรณ์ หรือใช้สำหรับการทดสอบ                                      |
| **`overlay`**           | **Multi-Host Networking** (ใช้ใน Docker Swarm) สร้างเครือข่ายเดียวที่ขยายข้าม Host หลายตัว                                                                             | Container ที่รันบน Server ที่แตกต่างกันหลายเครื่องและต้องสื่อสารกัน                                     |
| **`macvlan`**           | กำหนด **MAC Address** ให้กับ Container โดยเฉพาะ ทำให้ Container ปรากฏเป็นอุปกรณ์จริงบนเครือข่ายภายนอก                                                                  | ใช้เมื่อ Container ต้องมี IP Address ที่อยู่ใน Subnet เดียวกับเครือข่ายภายนอก                           |


## ก่อนที่เราจะใช้ Image ใดๆ ต้องดูก่อนว่า Image นั้นมีการเปิด Allow Internal Port อะไรไว้บ้าง

- Jenkins image

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/157e55b782e0e24d7abace48dea9861e.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=CM1L9u5SA6YEfMRChUmgn7uhhc%2FIBcJai8rZZhCj%2BgSNT5%2FYlYbtXE4adRJEm1dl1iCSa%2FNjpvW5TuynH9Vma11l1IIRl7ea0o%2FaR7tWv8tjyIK0xWQl%2BagaXbdgJz2RxghlYTMkaHDXygPpldA%2FVcx3xayv4iEVTm1jzpYeZ4pTCxHQCUJ0rJ%2BTbtCf1a3bbwhpHtHVPQZ4pIxkWlyVfJRdPVWs%2BCeu2lRCF5%2FuVH2IbMMhMF1m3ObVUKwJKmd1m%2F%2FDqiloq3BV%2FJyyUSAarrctu6vENy4QcsF3TtqjcjOjwagdo4CsSwB7syYilGTG1eVFbaQPjJ6rexHEdkC%2Bug%3D%3D)

- SonarQube

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/ab23d838042271a4a52dab6ac629f476.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=O9BuQ6aqmV3bHDXmwUOZnjAXZ1byxUXLkcth1%2BX56M%2BtfheSSohJsjoT8JNBapaQt4qmXn4lwQCq8nvsZjQecoDBDlIoZ5E%2BvEge9yc9Lk3sNZHSIqQd3KrwrJR5kudRJTHsnh9OQ9bERIMJ822d7H%2FOPs2iWtlGK%2FNFt%2FK2z%2FNDbntLY2a2hXrTi1CnatraHGh0UPEaIxLoiGwKumoZPMko%2FnoM4FpP%2BBk9tbSYO3ORuYi1Uvo%2FN7qZdVADDbOVQg4i2ke%2ByA1IE5TnuxBO8iIvDTK4abYFRye1V0TFN3N9q2bR%2FpcnQqvw2wYPKUDDbsfxkOs%2F0e4QKLkBCDkmZA%3D%3D)


## Port Mapping

- `docker run -p 80:80 nginx:latest` หรือ `docker run -publish 80:80 nginx:latest` เครื่อง Host บน Machine ไปยัง Container

# `bridge` Network


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/ca87793a4f24662cdaa053bc4bdc68a0.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=PNkjB%2FuhDSbkH4VMkQOX99SaIN7xJ9qN4fUHpV%2BSN4UPfJxMk26jtnu4aeE%2F694rBe5tarhzTLkEbOL%2FJL5dZzWB9H90GVEBF0dxmnh6nSHOJVwtsoEEQTEKGv1eBixTLCo7fu91df4Ip60L2s6pbvYLWT%2BTVpgqktSgspVFCHGxQCQKPKakTYrKmxLq6yLFlk3l5cHvwiKmYpFWWzZ9iCX4EExrqiY7%2BF1zUCr%2FjfFGAg7On0IaeSj4V31E%2BJF4urck66qDY2bOk6HmMmMGjKWadoi%2FXLyDi%2BWJwiZYuVmUh73VJckd26bMdq29dLTCXnLPIloouzciGbuUPq9eeQ%3D%3D)

- แยก Network ระหว่าง Container กับ Host และทำหน้าที่เป็นสะพานเชื่อมโดยทำ Port Mapping จาก Host ไป Container

ตัวอย่าง Container ที่ใช้ Network type แบบ `bridge` ซึ่ง IPv4 ก็จะถูกแบ่งจาก Subnet Address ของ Network และใช้ Gateway ของ Bridge NIC


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/facdcff17ca537408868f008fc5313e5.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=S15lH477SQHDX2CJ67gm9H9ZqbGMHho%2FxZfuyjd2MYrNG2yhYnKmHAfJfGFIcAj%2BbKVKBnJ6%2FQUL%2BK6j4xRr%2BzhRpGA6LaXQ52XYfFbwR5ixxiW%2FYWTZC8XrS0MTmKGVjkNHz%2B60usInXGGBG%2Fda5PlbOuNhjMKnPPvJq6eJfksGlOP%2FARxRLQFLKz46jGdaOLbu79gDBoet6u65oNoDQaDpiTzvWwCTfjPUk%2BFXYqMcNdJRCnEOh9DnyhydHJkDY1jowmjIaaWePzENTQazS%2BDXVuqXQ4s8xnLYO3iBvVhtuZZawLptlUf5wLvity60dBlRnvzKOpGpoH0tTPTiGQ%3D%3D)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/7423a0c45bd26f30a22d8614c4b0e534.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=iQPdZBRY6gTnNvAwylA58KXlZWvSqct0rvBY1B5a6CGs%2B8kWYk4QmaYhTo8GXb6%2FVygs8Oj7Z%2FvWxfz2MNbgr0bSdMOz7%2FTWSMhj0suHRVmyA6utEAti%2B3lKy62SD01K%2F0LQ%2FFjKu3uhdggVtg%2B7jAfG784wLBqsXcu1KMtSfZoWq0MwoxcW7sxEhhjw1aPTKuhttqSlqt11bzTlwoTgauZudbgxL5WoaQiWfNUPoFTK9efklQoyUFwTAv9Pw%2BSHewleljXLJCRB%2FJXVj9nPW3J%2BT%2Bkx9bRXKX2ir77Z1DsgRDa0C26eSS6bJv9GhcmB2GMkPSonNVhXs0fwKuJPXQ%3D%3D)


จะเห็นว่า IPv4 ทั้ง 2 Container จะถูกแบ่งออกจาก CIDR ของ bridge


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/5c655f4963d10a2a886fd2b68df1beff.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=eovVg0bK%2BvSWu071Q01u1tm5QuDHhbKiy8tdtm06pTmr%2BPSXEfbEnpPc%2Be%2BdJdvbx4sG9x60VkjKorBAbq%2BGsMPHHNssqfkCVUWLjXeWnPQBdnewpJ5aKhCGK6cpA%2ByGpVrUmZ2yhgSK1awjrxTyXZgMA1i0Uwy855ZcexYCg3W8zrhyAoztpcc3qn0MAyKeRg2XJ6VpoAJnW8ALWTgPkiHW9PtuE%2FQRpZXrELZ8JRMHIBTCDF63O2FshokaH2b%2BfS1KSah8uIyT7h1nV2kA58BZO1lHtMZPX8lTuq4IAukdBf0QkX3f9CpCxfWSNEMF91tPlzmihRDInVwaYHKD2A%3D%3D)

- Docker จะสร้าง Network Environment ไว้โดยจะมีการแบ่ง IP ให้แต่ละ Container ที่ใช้ Network Bridge เพราะฉะนั้นเวลา Client ต้องการเข้าถึง Application, Traffic จะเข้าผ่าน Host ไปที่ Container และ Application ตามแต่ละ port  ที่กำหนดไว้

### Container มีมากว่า 1


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/06aa26a13ace4ac61b83ce09e0a27876.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=XzSel0XVCZkkN2CMzHJIl27jNgspDMONDKOeDLsf%2FWVrzMOp%2BPr68B1ma%2BucNJovMxYSKtYxkdW5sWzSEDEQq6DIbXGXwsSbh2WNdU%2B3cll1lAizHBvarn2dBx3MYk7Orj7Eos0EJzBs3OtwGVFV5X%2FXBbrTOnWg8bMwbyLHtbTq7berhFhMkVoxR0b77FbPSXABIesakyj2nh5k%2Fqowh1WJ0NCrB6LgxgEAFO1JYZIQtGQKNyrWrAPBaehCJMB27PP6fmQJ%2B%2BWY7E6Yqmt7u4rrhBhh7ConnL6yr91xrum0IrY11BspR6UqeNZYHwREdBDkyXkqRt17HZ7YXhAyyw%3D%3D)

- เวลาที่มี Container มากกว่า 1 Container ใน Network เดียวกันจะไม่สามารถคุยกันเองระหว่าง container-to-container ได้ เช่นจาก hello-nginx —> curl —> hello-nginx-2, ซึ่งตัวของ Bridge Network ไม่ได้มี DNS ให้ทำให้ไม่รู้จักที่อยู่ของ hello-nginx-2
- ซึ่งต้องคุยกันผ่าน IP Address ของอีก Container โดยเราสามารถดูได้ผ่าน inspect information ของอีก Container
- ถ้าหากเราอยากใช้ DNS อยากสื่อสารกันผ่านชื่อ Service ของ Container จะต้องกำหนด Network Bridge ของตัวเอง โดยไม่ใช้ Default Network Bridge

### สร้าง Network Bridge ของตัวเอง

- หากลอง `docker network ls` ก่อน จะเห็นว่าเราจะมี network ที่เป็น default และยังไม่ได้สร้างของตัวเอง

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/ab1c511b3f1558cd2be51c660d70388b.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=Qdb%2FNDkPktpOga3qPU8opN5Vj%2FYu9Ppafl%2BNNbEB38EgY47vLJblTJ3Vl62jY9aTma5kA7Pp5iEzMfJgZEZs4wvpqFSVTzsLnq0fWLsc5C5w45WEIJKxT9Co9PqvQchuDXfl5FFyW8xBxde97u5zxeQ7MT1yORAlsvLJBAf5%2BImR0lmr%2FC2uPrIrvH7eX%2FLyU2zBJpfJH4ipUMjsBNEDkcGAaGoqjjSTjYztdq3ZKKwR39vqrq3KXfxVepuQC1FpQbiJDBqsFbZtfub7HJCJtLUTyN4Uev1EZ4VYMHb%2F9%2BL4kfsXS5sWj7Cf2tkAbldniILjZ82rnshvdLfQ5w4p7g%3D%3D)

1. ลองสร้าง Network Bridge ด้วย `docker network create test-bridge1`

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/ca879fd637f5788d7bb48e4b33fba9d1.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=a2KfPj5NU1BErRo%2FCiFPu%2BXeg2eiurN7ImKShjfveXhcmjoXKk0CQocdo3%2FLjlCFZMuGFkd%2Bavw5U1ktq0ThXfePdm2W23GWPLC%2BJcKIxrL7hv4%2BmjyGsrJoZAgA4Oo9AkACwReV%2F5xGbhdmyWy4J0XJEGRkIpPJkcYZYZ588sSqL0SV0Vv4S8dzEqLEndLv8oHmwBfiNUVsOPWK0kSEbrxpA6xJUvyHVqh8ags3mbuTBs%2B8rfPLnJ02kF0T9uArPaUP3E68FS7DGjSi2JPOusUJ%2BloquKcW2eIDMO7uhsWeW0Oy5aExZQ4DM69sd5u3MXC%2BJWwmrzH6iySSmM9bSQ%3D%3D)

2. สร้าง Container ขึ้นมา 2 container ที่ใช้ Network Bridge Environment เดียวกัน

```bash
$ docker run -d -p 81:80 --network test-bridge1 --name nginx-bridge-con1 nginx:latest
bf6a02d200f98cc39fef32c826e0812a126bea51d0fc6c468ec28ffff16dcc86

$ docker run -d -p 82:80 --network test-bridge1 --name nginx-bridge-con2 nginx:latest
f412356ea68f6f9f8c41b6f3f2519e43f20b04dccb5fb47fc0301b77fc70f077
```


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/7a9621db2642dc182188025b821037a0.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=TKZyCcJrqKO%2F3davKPIqgbt%2BqdHJEF6iNvbIaVLeobkukUkUF%2FqEl18EIZYhOIXFZ3NfMOKbPbw%2BJM3gvLUN7%2FZrywLOsPRPfybBKKbauRWC7x0vdyCLutSb6OBBkfwuwOTkPqJON9JJhoA0285tVvMA2FrvzC5tGQr9cRAXd59qeBeH4tlwcTHEL2R01lxLp0F%2BbA7hPycDradpY2caYusm657YOg%2B5kn1p2%2Bs7wsLkWCD94AfgRBexyVzQCY5xHdPKAhnTyigZz5tCVHfFyUxAzdykFExm%2FP1VQdK86WSRfDYWQ0XUVuIIwNdk10JcSE%2F6XstWRbWr6ghww%2FlkSQ%3D%3D)

1. ซึ่งแต่ละครั้งที่เราสร้าง Network Environment ก็จะได้ Subnetwork ที่แตกต่างกันไป หรือ คนละ Subnet กัน ซึ่งเราสามารถที่จะทดลอง curl ไปหาอีก container ได้โดยในที่นี้ทดลอง curl ไปที่ nginx-bridge-con2, port 80 จะสามารถรับ traffic ได้ เนื่องจากอยู่ใน

![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/afdc079df829f26900ca766d2d4a9059.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=MO0JhZg81bUrbHGqY8oKZ2MF1swh2EteFV0IEte0325au%2BiPRAWhj33uqdnDe4ejOmK1D%2FRDYW9Jj1PdSu1UZLLn729Gw%2FRycg%2BC8w53KtWFSp6Mrf4izIO%2BwtyrM2Q9y166SEBozYOhUfVBcYIObfyaoIryhsbbK44p%2FlWvOYDAG2CwaqFfO%2BpSSnXQLBeJlqVF8KMypMzZB6bpp1lbTuIfx41Sewqgc1pAYoZGHEMdrjdKCGDomI8L1OA169E3VAorYeKp3V1Hj%2ByZh59q%2By6VpeHhfO4pNbxsBSNtwECq7D1%2BQoFvqyBQ1RwZB%2FKSwdusxjIoKMkaGHmd%2FSIzZg%3D%3D)


หรือทำการทดลอง solve DNS โดยการสร้าง container ใหม่ดังนี้


```bash
 docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                                 NAMES
f412356ea68f   nginx:latest   "/docker-entrypoint.…"   3 hours ago      Up 12 minutes   0.0.0.0:82->80/tcp, [::]:82->80/tcp   nginx-bridge-con2
bf6a02d200f9   nginx:latest   "/docker-entrypoint.…"   3 hours ago      Up 3 hours      0.0.0.0:81->80/tcp, [::]:81->80/tcp   nginx-bridge-con1
```


```bash
$ docker run --rm --network test-bridge1 alpine nslookup nginx-b
ridge-con1
Server:         127.0.0.11
Address:        127.0.0.11:53

Non-authoritative answer:
Name:   nginx-bridge-con1
Address: 172.18.0.2

Non-authoritative answer:
```


จะเห็นว่า DNS ของ container ที่เรา join network ชื่อเดียวกันเข้าไปจะสามารถ solve container name ได้


# `host` Network


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/99106d21c7ed1f2846a382762ccaaa25.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=b1zY%2BD96DkhBXf87PmryCvl25vs09HgPEUg9riKewwiMybnIEgUIf2xjxQfLhkNOCt84fok1p1n3LTtIFp5jN6sud5bzqAy3rQdl0Eo17sP5GAc%2FTws%2BHJcLiqTAS6GbnSihsuVymWhyh6fq7iE8qhG%2BkNP40EmTK%2BrIG9rjuEyd5gJVqGNKZL012MhgNd3KQKkw02PpB963e0AUs74Zdjme7eT5RCKYfe6yVAVZUME30GVkC8DUxi0BMjTyeOF%2ByB9I%2FYYpaFYjyrUVE2MdBp3yrPzyhbpLQj02B%2FLOjem5YZ9K5yMPkWPDinTtfqVzV9jNy8So6uW7TS6Y64dxNA%3D%3D)

- Network ของ container กับ host ใช้ network เดียวกัน

# `overlay` Network


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/4da9caa92511f3b7a64710c6b96c0df1.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=jIu39kXGWARg2FLSbAlwnBeUulNh0FiLBXdJBjNjccKHmMKt7T1DAT%2Bun88FWoUmg%2FC4Y33%2BQ048V6K2b7uF48uhR4JkCaSZOevrlpqkqbugZCjPhLIwq0utg3cznk6mTk%2Fj0tAVUOSq9Z53Fs6ONbWFoV4Ei5pS04lBOm0TGcp8dHzV3qDBMQQ5jv9tGdt8YT01IqEP%2BU7ZKCO1YvkKB%2FZls04elZROUoJEf81brn86y%2BD%2BqcyehvXKatHZmJz6nLQvnoYwrtFSUhmxZwvMb65fwjwUfiIWxYk%2B6UTa25ONPblHRSgVI3ZS1cehikk%2BSpZs%2F2aXGVsIcAQJiLCCAg%3D%3D)


bridge network จะทำงานได้ภายใต้ host เดียวกันเท่านั้น แต่ในมุมของ production เราสามารถรัน docker container ได้ในหลายๆ host โดยใช้ Docker Swarm, overlay ทำการเชื่อมต่อม Docker daemon หลายๆ ตัวและทำหน้าที่เ้ป็นเครือข่ายแบบกระจายไปยัง Daemon อื่นๆ ภายการควบคุมเพียงตัวเดียว


# `macvlan` Network


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/0f5e36736f66d59615bc881ae0c2fa77.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=HOkGgo870cwH5xPxqW0vYvkPFSBJokFmCK1WTDocE94pSMmhpqi4qFDRWfCrYYqW6V1qCsgk28vVVnfybvBvsq%2FrqfDAe6kQOfwHEXcV33krh5E9%2BSiVxPKjwOS2oSVVJlfDNhclUhh8usvEpCeGELSuM3ArZnJGAhfsjmtb8x2XfppdnrqJ6ashOBdciPrx4VaiJ%2BtYCckZG4ioGfPH%2FsHcIKQA83JJmM3Wua%2FoHn9E3UVUNywdKUO5WfQu5pPiOircwkpSqBVvH43fFPg%2FerUzQapvqOqm9xX8%2BF2nP2dwxpyhXZ%2BUJV%2BDrrgHZ6ekKBkP3t9B9u%2F5VxLJ8LsThg%3D%3D)

- Container จะมี MAC Address เป็นของตัวเองที่ไม่ซ้ำกับ Virtual Network Interface
- Network Driver `macvlan` จะ Bind Virtual NIC ของ Container เข้ากับ Physical Network Interface ของ Host Machine จริง, Container จะปรกากฏต่อ External Network เหมือนอุปกรณ์จริงอีกหนึ่งตัว

---


# Exercise


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/7ce373d0d30f672c6fde7434e31f6ab8.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=PQf0f7w6uInBFX2Q3ddS0iuGlFlxSD0ng4iSvCaeWQ1Yf2rItrtQlZBeKs36d0rFVW3SdSMtBQbe1AMXQdCmAG8i8J%2BksP84ZRav1DsPrCUNxpXUD2R9mXvBlxGxOu0scqwdJwrN5I%2BT5pTQpGa7sdIsZwiQpDc2PzZnbQkUlz9bjH5dCnzsHJe8CjBqp8bwLGF88feY%2BDguLg8QUFSXmJomkkwJ3EUcQKEU5N7%2BTyht%2B4LiVXArTgMN0WD9r33lxRlCa1cSTVGwkQpN%2FjNrEQHKeulg4aNQY%2BFqvx9l5zGfzNE%2FAvFh0vX%2F1rQHxResC5v9VUkdsfVCuvr%2FvsYdnQ%3D%3D)

1. Client Access ได้ผ่านแค่ port 80 เท่านั้น
2. Container อยู่ใน Host เดียวกัน
3. โดยเราจะ research หา application ตัวอย่างมาลอง deploy ในที่นี้จะใช้

	Frontend: [https://github.com/EnggAdda/product-management-frontend-app/blob/master/README.md](https://github.com/EnggAdda/product-management-frontend-app/blob/master/README.md)


	Backend: [https://github.com/EnggAdda/ProductManagementBackEndApp](https://github.com/EnggAdda/ProductManagementBackEndApp)

4. Setup Environment Variable File

```bash
# mysql.env
MYSQL_ROOT_PASSWORD=1234
MYSQL_DATABASE=productmanagementdb
```


```bash
# app.env
SPRING_DATASOURCE_URL=jdbc:mysql://spring-mysql-con1:3306/productmanagementdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=1234
```


```bash
# phpmyadmin.env
PMA_HOSTS=spring-mysql-con1
PMA_PORT=3306
MYSQL_ROOT_PASSWORD=1234
```

1. สร้าง `Dockerfile` ของ Spring API

```docker
FROM openjdk:17.0.2-jdk

COPY ./target/ProductManagementBackEndApp-0.0.1-SNAPSHOT.jar app.jar   

EXPOSE 9000

ENTRYPOINT ["java", "-jar", "app.jar"]
```

1. สร้าง `Dockerfile` ของ Frontend

```docker
FROM node:25.2.1-trixie-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

- ถ้าตาม Dockerfile ของ Frontend พอเวลา build แล้วจะค่อนข้างช้าสามารถทำให้เร็วได้ โดยข้ามส่วนของการ build ตอน install dependencies `npm install` เราสั่ง build ด้วย node package manager ก่อนด้วย `npm run build` จากนั้นเราค่อย copy static file เข้ามาใน container ให้ nginx serve contents นั้นได้

```docker
FROM nginx:latest

COPY ./build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

1. Docker run script

```bash
# 1. run mysql container
docker run -d --name=spring-mysql-con1 --network spring-bridge1  -p 3306:3306 --env-file ./mysql.env mysql:latest

# 2. run phpmyadmin container
docker run -d --name=spring-phpmyadmin-con1 --network spring-bridge1 -p 8080:80 --env-file ./phpmyadmin.env phpmyadmin:latest

# 3. build and run spring container
docker build -t spring-app:0.1 .
docker run -d --name=spring-api-con1 --network spring-bridge1 -p 9000:9000 --env-file ./app.env spring-app:0.1

# 4. build and run frontend container
docker build -t spring-frontend:0.1 .
docker run -d --name=spring-frontend-con1 --network spring-bridge1 -p 80:80 -e REACT_APP_BASE_API=http://spring-api-con1:9000/api/products spring-frontend:0.1
```

1. User Interface

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/d55927a470e7388eca492e5764b08db9.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=HjJqAJWqtFeQ5vXBzVMMAMXXeqAQBLEUBQ0KdVggg3hCmc5cxq%2FvIYzxh4K080sD4Fum%2BqTuAD5n%2B2wG33YdnffpdHF2gBY%2BvjyUS0OZEHSX2%2FAGrExgZZ%2BCwEYNvVz5YquVnRg0xjUBB4hMoCr20A%2Bo0z8kSPSDBvvLd7XupCnLJgFYhMFLhv5HpmiR4V53sVh5sW17L4ZmjqxwtBoT%2FkUQHOaHXHIZcMB1W8eTkbaJktWLX6Agvzf6mMQyWl6u7WslrFgfSjLEt86Med3Of4TGNDqnoFBweHV7yqk5eSblllx%2F4xTPUY2G04OnS%2FOzblYtKwd9o8mdKWN%2BTfqSPw%3D%3D)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/e2227c0ca629aedbca8540ba2b571ec2.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=dt5c4nEEmbgAmuNWU0kocdDCuEBfHSUfZcpHtdWeJOrVjSP8H0a8SUnfXJzvuynapIvIvbauc8xwdg3pCtwDjqGwWLSog%2FqOIv9s9dD0qnXyEZJc5OXkT2F%2FAamdUjnWf9s1P4MsOGVlIPQU43vbTcHMZjdpP3EW1GhDMTOmW0KDg%2BgtDdcWyaHQzLLKrEx%2FVaJCjSHPXtFM%2FOh2ej6cVyYcaBg25ybWo8aQp26YWgsa0O0vLVSoJf%2B7iKGfNQFpISBdN%2FTAi6eRUC5V9gkASXhZ43J32DCpxKsPhCoUfn32ATvlsmCIlj1d04eCI7UOJ7QDCpdvMkYVyHGQ6rFxXQ%3D%3D)


```json
// Docker network inspect
[
    {
        "Name": "spring-bridge1",
        "Id": "a8952779dace810593dbd4f56fee07faf45d3cd394fe680b3104bec3f82a44d5",
        "Created": "2025-11-21T02:25:01.195595734Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv4": true,
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
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
            "3f8614d2764920809b5467a928523c365099ad06d75d28c517cdf552fe785b10": {
                "Name": "spring-mysql-con1",
                "EndpointID": "383401404e8da686f8c96724a7986d5738b4c4b5b0f1befe5966bc0ada84d9f5",
                "MacAddress": "c6:79:9d:81:c7:82",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "831586faeca2af5234fef784e535751ed188aa0bc21d2889d7a6fbf9269409fe": {
                "Name": "spring-api-con1",
                "EndpointID": "afbe069d35cce575ccd8af6f59f4309e38fa3e8114e738bd0c792402a2c3bc35",
                "MacAddress": "62:1e:49:4f:85:d6",
                "IPv4Address": "172.18.0.4/16",
                "IPv6Address": ""
            },
            "b228c84cdab5e29ee47e5f2e037265a157fac0290215a0a39e0488241abdaab2": {
                "Name": "spring-phpmyadmin-con1",
                "EndpointID": "98133dbdf6f0fa25f224a9c74262a48716699a4461fe1989cc7bbda29817a818",
                "MacAddress": "2a:a0:8c:cb:78:54",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            },
            "bfab1c90e6f6631410b5b7c91d2ee7e22b0fc8136cd4930a156aec1b78819d9d": {
                "Name": "spring-frontend-con1",
                "EndpointID": "050057c0aa7df026249e2825c61b468a970a70e6d03d2ccffa18319848527a38",
                "MacAddress": "2e:44:92:f6:8e:9d",
                "IPv4Address": "172.18.0.5/16",
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

