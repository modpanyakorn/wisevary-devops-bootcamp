
# Docker CLI

- เป็น Component ที่อยู่ใน dockerd (Docker Daemon) โดย user พิม cli แล้ว rest api จะจัดการสื่อสารให้กับ dockerd

# Docker CLI Management Command


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/457c838b48c0d4a099b081b52f7800b7.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=hRXKqhQG%2BRSXbIIyFGVMN4RjavyEVLwoeymGaO%2FqXnS1yk4x4jfQbet%2Bpei4aG4kBFaSSXRJAbJMOOri7x5rUA%2BR%2BfEqBXtrTkB8oEL5paeSysz%2B2TosqLF5gA8JDrTOxdVYPvSwfpkjsaOypqD5RB3y35Tcp24edCpOuJPAmGtyhJ3OYmloJSuua1ARVJBxJMyabF1vnWrB7zonRqRKjLQmHL7YKGQX8WAl4v5n5ZtIILHh6shjohWDyG%2B1SgDAp6BNy3Ey%2FMhinJ8JNPGxM9Fx6d9rh3WR3OlFozCZp5mR8TH3JMnrZRKFvugECdqa2JFlSNeSI0UTiQTKVQ6LwQ%3D%3D)


docker provide command ที่เป็นอีก 1 layer ในการระบุ object เฉพาะเจาจงเช่น image, container


# Docker Image


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/d89dca79a41f0032f3f0e63d2a2a16da.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=imjfzrrRQxkaWo3PkZHjPqKBXGKI5L9l15k8QMlYv4QwqLuiecWswfYfnBwJHORC7dxcc9r5qLqh4o2ZCNluRn%2Bn9mOGZDH3i%2Bo5EMp2tzUeXd4UNs%2BKUMJmjA0xlxmReAI3LDTqI%2BkyFTbKfN1nIE6NCIcItn2uRiJWFZq57Qo6wf1B4wf66Pmd%2FtabQILESUzWTHAcG%2BGViDy%2F7DKRm1hbVucirmnS6gv5Ar5kRsxQoAZXPy%2FJ9qwmAwbhz8Zk8HNjvGTVnQ8mQud2obCVrgf2X8iRbiMkY2f18uecvkKOCqkzWxgWQwqCa9h%2BXxAn6jg4rSHzMyCbZjlOJpHNxw%3D%3D)

- Image คือ Template สำหรับใช้ในการสร้าง Container, โดย Image สามารถปรับแต่งเพิ่มเติมได้ เช่นใช้ base image เป็น debian แล้วติดตั้ง apache web server, application, configuration จะได้ชุด template ของ application
	- writeable layer: อ่านและเขียนได้ตอน Container Running เช่น การเขียน Log, สร้างไฟล์, Install Packages
	- Image layer: แทนการเปลี่ยนแปลงของ Image หรือตัวของ Application ที่เราต้องการเช่นการรันคำสั่งติดตั้ง Library, Application, Services ภายใน Container
	- Base image: เป็นจุดเริ่มต้นของ Image โดยส่วนใหญ่จะเป็น Linux Distribution เช่น ubuntu, debian, alpine
	- bootfs (boot filesystem): ส่วนของ image ที่มีความจำเป็นต่อการบูตระบบ ซึ่งจะถูกรวมใน Kernel ของ Host อยู่แล้ว
	- Kernel: คือ Linux Kernel ที่เป็น OS Runtime ของ Container นั้นๆ ซึ่งต่างจาก docker daemon ใช้ Linux Kernel ของ Host Machine (เครื่องที่ติดตั้ง Docker) ในการจัดการ Container Environment, แต่ base image จะเป็น OS Runtime ของแต่ละ Container

# Docker Container Lifecycle


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/bfcfcd8a112167d9eca4a81435428fb5.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=E7jDxxyREULHavDE8R71Yvtt9%2BdpaZcXHZVj8roeqIX9q5%2B%2Fiz%2BvY2ZNcOs3XYIBy7G3kFlR%2BZRS1IKSA9umuT3LVSxsku%2Fh9AhAe5RXCD2W%2BtVJ3261DeTzzGuLt0N9WjmltmEDo9RGqLAby26Dd49YE60xGo86yvrld%2BHkBrvsxreFTUTbftEa6L5Bit7g2C6pSiZ9O6l4lSKAdCqi12eTfeLhCUIXs4nXfjnKx%2FoNjIdbAiL%2Frp0ozfdwLMS0MpLBZZMKUQRKYsb%2Bp8MJH2GWyDjwdA%2Be1yw8nxcTvxTlmTi5tNktv0hkSZ7MbW3Snz8JU7zsOsFNHp1WUmNVeQ%3D%3D)

1. docker pull: download image ลงมาในเครื่องเรา
2. docker create: เป็นการเตรียม Writable Layer ให้กับ image และจัดเตรียม resource พื้นฐานแต่ยังไม่รัน process หลักของ ซึ่ง docker create จะสามารถ parsing variable ที่จำเป็น หรือ คำสั่งที่จำเป็นต่างๆ เช่น Linux CLI สามารถที่จะ parsing เข้าไปเก็บไว้ใน
3. docker run: นำ image มาสร้างเป็น container (docker run = docker create + docker start), โดย docker run จะนำ image มาใช้สร้าง container ใหม่ทุกครั้ง
4. container running จะเปลี่ยนสถานะเป็น Exited หากสั่ง docker stop หรือ docker kill
5. หลังจาก Container มีสถาระเป็น Exited สามารถสั่ง docker rm ได้ เพื่อสั่งลบ container

## Try it out!!

1. docker pull mysql:latest → จะได้ image mysql:latest ในเครื่องเรา
2. docker create mysql:latest → จะได้ container ที่มีสถานะ created
	1. โดยทำการ parsing variable ที่จำเป็นของ imageนั้นด้วย

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/654a8e251b7681ba1bfe6c07ece059d1.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=lhrBOa7X7vUE3xmGQnusg95zO0gf83NAo9OYRPr8QWHnL2LKrc5TfsJqTYkfxyLF1N9PmNYpwVYDcgyPkPdCIEehWLQnqKHSvosFzHMWeQichV1pB4Zsatx2y7IVAddwKLc%2BiLPwq5DIOXqv%2BiNA%2BXdNrMmms2%2B9aCjMdiZPfFq8kkFWpMimtNkXufufF%2FtXMYHAGqKnzJ1VQc34nKT6W4itwuxgLot%2BumSUzBCsrJxjCgdKJAIGQvtVuqP3lw9PWuNMd5Z7wWTj%2Bdd14oK4GAIpZ3Ad9dBeQVNh6En%2FV3orCA5R%2F09mMXn8%2FpLp3G0%2FxdV42qkVjdp8vuKCCc48JQ%3D%3D)

3. docker start <container>

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/a3037088862e6eb7ef180978f9a571d9.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=QYU6ho5DvzG1VkmBWZcCRza0u6rW5RUGfV6XaMiPY371eaeWQ%2BC%2Bmy%2BczbAac4J2RR%2FNXTEO%2FWdPlUKpupvSy4gxaRK2U8zbkhWYvnAiA%2BcIwgwKCgNp5McVTweqqyuUWWV9n3VLsEMLd2%2Bhms9No6URjfK3w4Iw8JIb3LYPwrcL3bIwI4LXMpSIi4rwkTJVhAwLaqdLG8I6amuO8aTTepQFsVmfEPLiJwETbOngvlLH2jRgXKtkMpXOMHcYoLEWrjzGgYFBz6EAqFvd%2BS7cRWdMkVLTpVEngtgu1wQz0EOc8XgltpTifpasq%2Fd5EB2NDSGIAC1e7FhWWV4v7lgoCg%3D%3D)

	- จะได้ container ที่มีสถานะเป็น running
4. docker inspect <container> จะสามารถข้อมู,ต่างๆ และสถานะของ container ได้ รวมถึง argument ที่ parsing เข้าไปด้วย

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/f3fcb8907f8b781c69a6df0f5dd1c420.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=CAdKsbcNgl2ELKuFz4YeXrH5qlgjHBWa8S0vLwf3KjYmhJ2wuXVuZuRArWZfhcJOSjYLXfHUJMUtsXF4Zg0g%2F9XsINnqrhFHyd%2BpvVzbjR8dPuH6jXNQgN%2FtdycMY1KagtqHNbhZWMQUFuZ2mXbGbhDRjMHfjQSvOyBqFhZAOGZvjePzjaA0oHIORvvkcU%2Fwrlzx7PpuucwQYoqtaW4msiEBL%2Bmy856Vu3TJVPe1tjJb2kIJR6WTBorFfqJuXOUWDnNyrnotvseRwJxLygpebVbb6nyqF7U3t7NVAsGf3sc9pQPw4i2x50SJIUdmEhz37w5YoE1fIsXZLZOFa8MW5A%3D%3D)


	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/ce4aca3f8b2e75647c5fb9d7479f36ab.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=YMXgMR0aUPmbowuE6q97AzOl0pFW47FSwCwL8nyy4WPnZvt24oIH6qQ9B53mrI%2Fnj83A8coq25oBRxtLfX0mdyHRF31aMNqM5RuofPpFosKKlDvrucJ2lozJdgPhZ0Mb8foX3vVQw0H1hOTPnTjMGq0Fw5ydL5X5BQXpz5ptGndy%2FBFSEejN46T91Wdl%2FSoOUWrASBzmhsgNagd5Izg8cpuFNQkPqZozpvir9nHyytp2mLo%2Fq2oLw6nHtadUNDpo3ES1byfTQZSnoxXn2i8ieXJ2u0XqfOty63%2BQBXM%2BRUPHQCcvqHZG1%2BhDw1nZ0hI99y85BcZ2w0pGHZ7MFkY8RA%3D%3D)

5. docker stop <container>

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/72f540cac5d76041f94e95119b85fb7e.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=qIQ6Zh2n3hv1TlNFVx%2BkMfQgv1pZ%2F2%2F5p2LOBFFw84utf58PZVujnpt4WzESGGZ8ZFU8%2FYSdNH5gAa%2B88RWRPIJh%2FUPTZJb8qBzE8bUzEAE2uyJQWrb7zHfNrdMhk6j8QDERQRwsDvTQR0188B73E47spovpVqqP%2FJP%2BXLn2qB9JEIsVNFlZ0QpGRgIQdVQoU1Lz4CJ0Nss4AXEay%2BXPA91JYraVVOjPHcVZYh6CROUYFxHrWm62WzKHzslf%2BAHRBEancDuBg%2F%2B2EdC16zxGZV%2FfoizgnX0WciVijcnmy9zOwyPgHOoIlkEb%2FOm15%2FnqTVFLLCoqylaMNVsB%2Fynw3g%3D%3D)

6. docker pause <container>
	- จะมีสถานะ container เป็น Paused

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/78dfd41f67419febd21e5eba7657bc29.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=WTbcYyo4AVNzkkqH4UQY9ieebJWSsDpyGJCIAiv3TFqa3mFppGYw6IfvaNNyNx4VXAkd7izNJLp83KwiuqqHIua%2FOorxelkS5gJI1nrC1jWsIUYXGUwobrx%2Bvi48fWpkmfiJ632xM%2Bu9bpKIJh0natouGpooxh9nsWblx%2Fcot0ujRmKIrnN%2Bd%2FW7tV03KwXiBbX6HyjqAvMbebxEUpKfO9woc1HVTXLBXvk5c%2B47KWxAMGOSIaR83JbdJChMM2UmT37Zbwak3QHtCa91uE1FExGCT3nbEbNrmuXcYwRvMPEHpyre%2FPavaKOZ5SbHsp1uR5Qq%2BnuJCVP%2B%2FsDnUoxnYQ%3D%3D)

7. docker unpause

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/5a5c34efb0c065af6213ac53257cf775.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=jhlqkeK9oM1rX6ZDmFI1UPxBdQ%2BvYwvFdIFTdX36kjeH%2F2lb%2B3FPDg9JN22NOlNfgapmYsIXy73%2FC262DAdXlu3pynhxhi9qafEtA%2BRwn2cVI6Y%2BD%2BTEQsML4W4gbQKYuX6VuQwrXmfKJnvT0NG6iPrkpTjxFA8hJ%2Bz5iqoCpvGmpXz%2FuUImc7WFU2NIdrg6n7frjBf9x9uoDOhfPtndAJsw9Z5b4SboK8tFq6YCfDGYJoqjvVLN6IA0jexsDlYwV3ACdp9XvBJxD0HVFA0ZT4PsOHTdorIXm2uoWMMRVbv%2BORDMyYGs9GxpwwzfwI6Hj3p2cJPITPDdORKaRoz72g%3D%3D)


# Docker Command


## Common Commands:


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/04727988c18dbbc3be4c283830fc7e43.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=UJQA2WWPZBYGSKhDJPsGXVXpQlULaVr4%2FnWppYiMUqT5LJI3Sn2dE0ZzTxOj660QRaRxvqI0mAXpRw6PYrjnvSBXeHKQiptbPCGbhuBkpADy2iXExbvIUWtgF0OoPXu6Lx4zovWHnnrhRkCZF5kGvsn%2FVjRKYZH7uEMjICRFP0%2F94Ipk7Y%2BYfjzSJN3fuqzRJ5CUjP%2B8lBll6BLHUNiiE9YXueF4FUWD3NSKF%2BvBHoA3sNLTxOgffioHdSGn8f5LJXKrvSRNQw1k1dr1qaS5NAXhuf6iCIhSxKreES2plPQAtrdgdHkWqAHwIfz85%2BkuIFp0zWZIfE1Xj35m03XLsg%3D%3D)


## Management Commands:


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/9ee4b56b6dcbf8e81267020074f7fce8.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=nzSiHXm5kCVPtyDsUX7oNNx8HIrHPVHfXJNYxIk5HcPD8IcbF0nzyRkbZ7xDK5r7Bjxy8yFoJqSRnwPlRx%2B%2Buh5V7ihOMk2N%2FxVsB6m5BzfVDTFr5%2FThAVYrCdGoJ5dNcvxAHA%2BRgKf3jujLHkZA5989cc6jkecMdLAQxP0WZ2WuzPEiyvDLQcVUUlz7o9tQkzZw9zk7KNtdqAS6CItb9Zpyc4g9gokD7fbHch%2B13bqDgW3mcFoPm5cNB4ldiduhH9vme9BxWOBU7cMxtxbOG53%2FbuS26HqrlDtKFC6NgC%2B%2B6jTGDZFZae2HpEfdqgtEHbvuNM5rx3olEH7A%2F0ZWyg%3D%3D)


## Swarm Commands:

- `swarm`  Mangage Swarm

## Commands:


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/0400012a6bdca8cd7f2a9b3a0919be86.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=Yia6Z3tuq1Ov3IfvHEnPelK8Dwn%2BscX2Eu1OOn8t7u8tUCSjH5JPlzcjcjCwu5Bb8fuGi8d6wzGYwV5WUtH4EWTBAZC%2BTloQmMmA25tXp3VwSa2ncyvvUCa5A6Ukzu5SA8%2Fo5VHpzb3%2BGK37G2RNht62%2FfmxvFtIqNHuo531nsCNdJ1zTeiGB2A1IU%2BvCRPBA%2FC0miTkRcbrVfYFXMqXefc1EP3DKeXjuFllU5zBd8%2F7754PPE7WW0ejStG46qykTcsF6yhjAtrKl51Tks%2BRNLMPDx0cnG7wkM80DrWIupCRPIwe3%2FaD2YCnl0yCVbgMGQQ4CAZ1YD0YLSC%2F4oxRIg%3D%3D)


## Global Options:


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/1a85dd13a0a9b198a81b6f56b8878eb1.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=cwtNP4BX%2FOcaTxdgVRWRRhEZertpK6isOi%2Fk3Z5ccBOPgUKDNtKQVbSpZqUrtcJOHambar%2B4%2BtnIqqte0gG3LFxPHlX3XLsMqTsLZPHmm5eDCoEt8piOTxVE%2BZUQFUIm3y9vJk0QIduUhVPIETLsa5DHane44qSDt5PntsyxmFd42uP%2BNn0d%2BWlsg9WkgGukbykdsTAWkqtlZgCgKHWWTXpTcIu4kzSvo84fV730DjUp4O2gplthBn14Q4D4ps76O990VtlFADKlKYManfNv5aNwCfXt2nCpzXfECYMJmtJA2h5zcmx5tp94DfpLrm6UqNtOJNxVLOqUhFUUjV9bHA%3D%3D)

