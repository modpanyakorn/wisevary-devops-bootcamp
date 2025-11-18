
# Manage Container

- `docker rm <container-name>` ลบ Container
- `docker stop <container-name>` หยุดการทำงาน Container
- `docker ps -a` ดู container ทั้งหมดที่มีอยู่ทุกสถานะ
- `docker container prune` ลบ Container ทั้งหมดที่ stop อยู่

# Container


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/14880b22e3e537e5e89d9a5b3e4aabbf.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=OA0xZ9OZBmU%2FCGjurzHbr6KZg%2BphSHFq3vBJD4X3XiOcNCdLtYFey9GMPohirdGRe4KviniiD6bRtC1ewUv1DE3KjasrfqoeZ45lXNEYgCaxYw4KaBiaBnmWjmS9biOAEU%2FiiabCPZCmcLAQ%2FGAnIdzj%2FOYu10Wdx1daREotE2kg83R26mSO1QyyPLHLRaZQt5i4dN0YzUePAixjNz4eXSPkcvuuaCImws5NFDfehddUPesh33EHtPxxnFQ9qO%2FrZT%2B8UP3MCInCaA1axe9pG294YsH1jKDaTZ0JeX3HHaU%2Fgmuj8ExxVvqazEH%2FhE5CeE2sEwdk8PRsh9IPl2VVWQ%3D%3D)

- `CONTAINER_ID` ระบุ id ของ container สามารถใช้อ้างอิงแทนชื่อ container ได้
- `IMAGE` image ที่ container นี้ใช้
- `COMMAND` คำสั่งที่ถูกรันเมื่อ container เริ่มต้น
- `CREATED` ระยะเวลาที่ container ถูกสร้างขึ้น
- `STATUS` สถานะปัจจุบันของ Container
- `PORTS` ข้อมูลการ mapping port จาก host —> container ซึ่งในรูปจะมีแค่ internal port (port ภายใน) ของ container
- `NAMES` ชื่อของ Container

# Execute Linux Command in Container


การเข้าไป execute Linux command ใน container

- `docker run -it ubuntu:latest bash`

หลังจาก container running แล้วสามารถที่จะจัดการ file ด้านใน container ได้โดยใช้ `exec`

- `docker exec ubuntu-con2 touch /home/ubuntu/text1.txt`

หรือ การ remote เข้าไปพิมพ์ CMD ใน shell ของ container เลย

- `docker exec -it ubuntu-con2 bash` ซึ่งตัวของ container `ubuntu-con2` จะต้องทำงานอยู่ด้วย
