# What is Docker?

Docker คือ Platform ที่สามารถทำให้เรา Develop, Shipping, Running → Docker ทำให้เราสามารถที่จะแยก Application จาก Infrastructure ของเราได้ เพราะจะ Manage ให้สามารถที่จะ Deliver Software ได้อย่างรวดเร็ว

# Docker Objects

- Containers
- Docker Images
- Services

## Docker Image - Containers

Docker Images เราสามารถสร้าง Template ของเราได้ หรือ สามารถใช้ของที่มีคนอื่นสร้างไว้แล้วได้เช่น mysql image, postgresql image ซึ่งจะมีวิธีการในการ Build Container ที่แตกต่างกัน

เมื่อเรา

Docker image —> (Running) —> จะได้เป็น Container ออกมา

![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/17d0a6c268f08506a10661149e445ccd.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=DwQ6iALY6%2FpcZFsxzx7loBMIQjz13S%2Bd7UDsC%2FQzzSgYyw4CDKLDcpONUFT4W1mEpDvO5lBdASFqR%2FIrwMLc%2BvygWngxqd5BKiGr6Pemr5XNF4GYzk7258MPgUAmFsTpCYH170DNXD3Wfv34gG%2BvRgVAj95SgRBekb5mNUgv2FDrIgSgZVFGywV%2FQe87zbqh6vhiRRSW0iqrWlwUon0rWUJ0oJmipNeORFNgVirZBVJ%2F%2Bh6KZzXyukEI7h1F8w7U2a8ZCerH9jFBozOTTVZICC0tHMYyoonM9WwBotzAhyjJM9W37nFxk%2BEqzIYjWE4bVsE1dOHq4F12dZ9Tc%2FkX4Q%3D%3D)

Example: ถ้าเราอยากได้ Web Application (Web Server + Backend + DataBase) ก็จะมีอยู่ด้วยกัน 3 containers ที่ทำงาน deliver service ของตัวเองอยู่

## Docker Engine

![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/2d95abb89525f339deef7846da1f8b1d.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=hDhldYKSkWI3LkOQfbPAUw8%2BYGCs4u3t5%2Bw72xnHAaXsehNLUopeqQqS2BsuEloMowRY0T3Z1%2F07lyzBQcAOoX9YFBhPFOkWjod0cJu0%2F45q4%2B8AsWIKggnKciNMpePu8%2F8vgCcjhIZQId4Ow7DgoJW5ktEWazwMqGbNHVEh97JEtEc42cYAjMOK8eADBfYXlVjuE4IB6d7v4vKkBS7yL5lj8daNZS0K1Z4C2RwsmNgJyw61iOEEs%2FC4UhRa4Zf9x0EZsizibLliA5NmZvA5goUkhHcXo1Kulfel7V7fgaB9OM41aJX9KRZhhknO81QnKZcBOTf0YAsoq%2FMCWPkAgg%3D%3D)

Docker Engine คือ client-server application ของ docker

- Server ของ Docker คือ Docker Daemon สามารถใช้คำสั่ง docked ได้
- REST API ทำให้เราสามารถที่จะสื่อสารกับ Docker Daemon ได้โดยสื่อสารผ่าน Docker CLI

# Docker Architecture

![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/934075c06b07904660e0d640366bffa9.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=AIvQNTSRQEwv%2BeLigkoXxl0xAuYSipcAj8VSD6z5JxRMt6uJ4xfMCHQE%2B3GiMO4PnDYvzJdIe%2FTRApxL%2FtQn4P1Bk4jCinQeqg%2Fz9AUfjZ%2FKmnPxrHGisOGQQk8qlrZo5XbrR9YCfaYNo6vCxq0JSV7O72efDml2ob5BMBcbvlzHdqMtn6YHPgy5MJDlY2%2BmanJObvQgXIsc9EKt3zs4U9%2BEkr733ddBJ93ziahRVg4S4pNvXlzKGCB%2BtKz5q4p5eUxh1WYUWLtATPT7BzN7IJe467MG%2FS79H3W%2BPEPJ06%2FRv6BjZJ1l5LKBBlDDzbiJ3%2Fil1XwbkS1hx6B6wdGGfA%3D%3D)

ประกอบด้วย

- Docker Daemon: จะคอบรับคำขอจาก Docker API request และจะ manage → images, containers, networks and volumes
- Docker Client: Docker client คือเส้นทางแรกที่ให้ผู้ใช้ Docker สามารถที่จะสื่อสาร ทำงานกับ Docker ได้ เช่นการใช้คำสั่ง docker run คำสั่งนี้จะถูกส่งไปที่ Docker Daemon, Docker command ใช้ Docker API โดย client สามารถคุยกับ Daemon ได้มากกว่า 1 ตัว
- Docker Registries: จะเก็บ Docker images โดยมี Docker Hub, Docker Cloud จะเป็น public registries ทุกๆ คนสามารถที่จะเข้าถึง ปรับใช้ได้ โดยที่ Docker จะตั้ง configure ให้ดึง image จาก Docker Hub โดย Default, เราสามารถสร้าง Private Registry ได้ถ้าใช้ Docker Datacenter ที่จะประกิบด้วย Docker Trusted Registry

ตัวอย่างถ้าอยากสร้าง Image เราจะใช้ `docker build` แล้วจะวิ่งไปหา docker daemon เพื่อสั่งให้สร้าง image

ถ้าเราอยากใช้ nginx image เราสั่ง `docker pull` ตัวของ docker daemon ก็จะไปหา image ในก docker hub แล้วดึงมาเก็บไว้ในเครื่องของเรา

`docker run` คือการสั่งรัน Container ้าหากในเครื่องเราไม่มี image มันก็จะไป pull มาก่อน แล้วสั่งรัน container

---

# Docker Desktop

![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/b1a0686499bc3da32e5f1c41097bd553.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=coFwZj%2FMxCD85bAHgqdJmSVej03WJ3gfcHZyaY9URgtDaz7r%2FAdF2o3%2FGR8Pg6wpaZ2PgJKJ6f6oyVOD2nPBjoa1wNs5u09%2FHzm0IeL5Zjd3%2FyGXH7aJ%2BcXAd8nXRlThcNg2Y678T7xxaC%2FUKF6bw4hgJlL7iR%2FlV%2FwSV%2BJPpwH%2FKqzwCOK0FkTOHeA3x8aeJ2iETSkGmPCpoGQKfPtSQ%2FkIsdYn1bkcEELtPeyW3KgeiSpzymwv4C9TFhqRPJXHXyV5mQl%2BsPyzXvs1Y2w2TQgdfnrImnD8B55d1RyiB30J3bS%2BvmPcelilX7LCoODC2yG%2FCZBuSmk%2BW35WszuHuw%3D%3D)

- Docker with VM: จะรันอยู๋บน VM โดยที่จะเหมือนกับเราใช้ Docker ที่มี OS เป็น Linux ซึ่งการจัดการ Container ต่างๆ ก็จะมี OS เป็น Linux
  - ต้องใช้ Virtual Machine (VM) หรือ Hypervisor เป็นตัวกลางในการรัน Linux Kernel
  - เนื่องจาก Windows และ Mac ไม่ใช่ Linux และไม่มีคุณสมบัติเหล่านี้โดยตรง ต้องสร้าง VM หรือใช้เทคโนโลยีเสมือนจริงอื่น ๆ (เช่น WSL 2 หรือ Hyper-V) เพื่อจำลองสภาพแวดล้อม **Linux Kernel** ขึ้นมาก่อน จากนั้น Container จึงจะสามารถรันอยู่ภายใน Kernel ที่ถูกจำลองนี้ได้
- Native Docker: แต่ถ้าเครื่องที่เป็น Linux อยู่แล้วเราสามารถที่จะใช้ Docker ได้แบบ seamless เลย
