
# Multi Stage Build


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/184b885190f95c0adc3ac077f73ac55b.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=CCIBD5UvkykFdGtG4g%2FNWi9z5egWks8gEldFxMrH0aSLtUt%2Bt5e45H6%2BwJPubyY4GxLNihxIli1Aq1dmRT7v8arndGTShG7c2dq%2BugsdPCqF0JKRiB6amSfIqUlN%2Bts7U6ujnkcn%2FPt%2Br0%2BFCT0n30Q91Pgq8pegDvq366r5b8TxS05mP0g9WnDFRikc4AvgtHO33DfuccfqKn8L1PSgS0%2FmATwKUV6sdES8VPtn4vytbmmepyP%2FkJ%2Bui8DY6eRZQ1Wt0Q1s2ZKvCeQ5bpCD1eaCpHGd8mY4ABIdfm4STW2eFDNNAF6Y5MwsYDE%2FLH6u2mUfnfBqahIvJdNqyttoIA%3D%3D)


## Challenge Build Docker Image

- Install Compiler เพื่อที่จะ Execute Source Code รวมถึง Dependencies ต่างๆ
- จากนั้น Compile และทำ Security Scan เพื่อที่จะดู Pattern ว่ามีความผิดปกติอะไรไหม
- หลังจาก Security Scan แล้จะทำ Unit Test เพื่อดูว่า Functional ทำงานได้ถูกต้องไหม
- Build Package เป็น Artifact ที่เป็น Executable File สำหรับ Application นั้นๆ

### จุดชวนคิด


พอ Container Technology เข้ามา เรานำมาใช้ในกระบวนการ Build ได้ และเรา Expect ไว้ว่าปลายทางจะออกมาเป็น Image ที่มี Container Orchestrator Software ในการควบคุม แต่!

- เราจำเป็นต้อง install Compiler อยู่ไหมเพราะว่า Docker สามารถที่จะ provide compiler ให้เราได้
- Source Code ต้องมีอยู่ใน Docker Image นั้นไหม
- ต้องมี Data ที่มีความผิดปกติ คอยจับ Pattern อยู่ใน Docker Image นั้นไหม
- Unit Test เราต้องนำไปใช้ใน Docker image ไหม

Point ก็คือว่า Container ถูกสร้างมาเพื่ออะไร เช่น Container นี้มันถูกสร้างเพื่อมา Compile, build Artifact, running application (Information อื่นๆ ที่ไม่เกี่ยวกับการรัน ก็ไม่ควรจะมี)


ซึ่งหากขนาด Image ยิ่งเล็กลงมันก็จะทำให้ build ได้เร็วขึ้น จากที่กล่าวมาทั้งหมดก็ไม่ควรจะรวมทุกๆ Operate หลายๆ อย่างไว้ใน Docker Image ตัวเดียว เราสามารถแยก Phase สำหรับ Building, Running ได้ไหม


## Docker for Build and Docker for Run


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/3198f71008df68d749b69ae8df3a4f7c.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=VVMFXU5RC6zOA%2B0wVrbQ7ZK1kvuMb3i1wX9MbvdFYsAtr%2FGAie3DZmfwLVb5wYUIP1%2BSyuoYnIOTIQ%2Fcv%2BLJL39mKTBkeBfpESxdq2%2BFX5bD3eYYoJhjlLxZZhXhWtwbFQwHL5jJ2Hvz2c8QTQw6ShJhcUtwj9aNKZlGHYQVlMkcvYEkKcp4lK%2BkonbXoxyDw5xgAcMzACtPRLdipJ4MFGp0z4UQeVIKYNZ%2BqKRzw0RccHrkt40dt3pddtMaU7W6jTIB6Rn7lL9fBgPmXNQ4aMoL0Ab3suNrgqtookdydzwTkZMyQvujovGBcQ9PaW0sRmnMFahW9l2RZEuCvhn%2FJw%3D%3D)

- Concept ก็คือว่าเราต้องการ Artifact ของ Application เช่น Executable file นำไปใช้ใน phase: run ใน build phase เราต้อง running container แล้วเก็บ Artifact มาใช้ใน phase ต่อไป
- ใน Phase run ก็จะมีแค่ Runtime สำหรับรัน Artifact จะมีไม่ Operation ที่ทำเกี่ยวกับการ Build Application
- ข้อดีที่เราได้คือเรื่องของ Size ขนาดที่ลด, ถ้าเราใช้ Container ที่รวม Building + Running จะใช้ขนาดเยอะมากๆ เพราะว่า Building ต้อง install dependencies, runtime, … เยอะมากๆ แต่ความจริงแล้ว Artifact ที่ใช้รัน Application มีขนาดที่ไม่เยอะ
- ซึ่งการนำไปใช้เราสามารถใช้แค่ Artifact ส่งต่อให้ ทีม นำไปใช้ต่อได้ ก็จะมีหลายๆ เทคนิคที่ใช้แค่ Build Phase ได้เช่น ใช้ Machine Building Application ได้ (npm run build, .\mvnw clean package -U) แล้วนำ Artifact ไปใช้กับ Dockerfile ที่ COPY Artifact เรานั้นมาใช้ Running Application หรือการทำ Docker Multi Stage
	- ตัวอย่าง Multi Stage Build Pattern

		![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/f5631206f5f57c9ba22232ca294c14e2.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=MWBDwSzmQTi1vUR%2BJ5bkAZCMHdSP2Xtw1fkD36QFbpFvbYRBAh%2FD3CpLXt5TVbOECpkWCOwXRaf8lAFmS21guG%2BLwfdidhEEJst8yWK4oLkx%2BHh6gaO1C31bSDvXRviKOB5RtQv%2FyuSc%2BmUzxLg3vMy39FFsnYrZbGySBP2e%2FjfWYUYnwXrCxOcUxHi99LnYJOn9l770u8DuqDr1ENgQjTZGmPhlCl0LCHWzFi8KvfdikoOfeGIzFvdJMD7Wb6oKXt9u4m99x%2Fqdx6zSVPxqQZLSug7gHDxm2YzOoX1JXnBZtJ%2FvUDkaJGb%2FDLLfa32or%2FCqu1NMXTWWm4zGmrJ%2BBg%3D%3D)


		```docker
		# หรือ multi stage build static file (React)
		FROM node:25.2.1-alpine3.22 AS build # <---- Build Stage
		
		WORKDIR /app
		
		COPY package*.json ./
		
		RUN npm install
		
		COPY . .
		
		RUN npm run build
		
		# ===============================================================================
		
		FROM nginx:latest <--- Runtime Stage
		
		COPY --from=build /app/build /usr/share/nginx/html
		
		EXPOSE 80
		
		CMD ["nginx", "-g", "daemon off;"]
		```


# Image Vulnerability DB (WITH CVSS V3 RATING)

- ทดลอง scan image ที่เราได้ Build เองมาก่อนหน้านี้
- `docker scout cves spring-app:0.1`

![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/f2b0930803ee9788d609c203262270de.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=JNfcjaUDZ6%2B%2FGVV9WQnHM1NePwX%2FKD0T%2FNhS7h6bHy7aylFOutVGoUjcI5%2FeKnsdnp6IhYv1WKun%2FgrVjxHZZrQcPTHgbqE904%2BGHWvB9Ouup%2B7p3IuIE0dyfbLxghgP76uQKQjcQIzfnWLLQ3h84MGC5akUSYWVs0ZCYo9w%2FZJJoLBUuXsSinlx4fq4WlPcuTv%2FINBqPh4GaVeFRE0FcHRIKGB8RvcUD9Fr%2BZLVQzwVEOZLD6MqnClBqr0AG%2F2c3f%2F1hVcTNL19OSvNkf0V%2BYjo7m7S7VtppxDiQflFLnCSLdeQiwOJ3pX5Ngxw05%2BGsVN8aVfKDai%2F9ryqr%2BRtzw%3D%3D)


| **ความรุนแรง**   | **จำนวนช่องโหว่** | **ความรุนแรง (จากผลรวม)**                          |
| ---------------- | ----------------- | -------------------------------------------------- |
| **CRITICAL (C)** | **2**             | สูงสุด (ต้องแก้ไขทันที)                            |
| **HIGH (H)**     | **83**            | สูง (ควรแก้ไขเป็นลำดับแรก)                         |
| **MEDIUM (M)**   | **174**           | ปานกลาง (ควรแก้ไขแต่ไม่เร่งด่วนเท่า Critical/High) |
| **LOW (L)**      | **31**            | ต่ำ                                                |
| **รวมทั้งหมด**   | **290 ช่องโหว่**  | ใน **66 Packages**                                 |


# Docker Image Registry


เราสามารถส้ราง Image Registry ของตัวเองได้ โดยที่เราไม่ต้อง ให้เครื่องเข้าเราวิ่งออกนอก Network Environment ไปที่ Public Registry 


หรือ Host เองโดยใช้

- goharbor.io
- JFrog Artifactory

วิธีการ push image ไปเก็บไว้ที่ Docker Hub

1. สร้าง Repository ก่อน

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/8c91ef1a51229ab5de23ad116e7e6434.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=O9PSBC%2BXa%2FZX6nws5OnDRsXGBPH4fTWPL%2FEvtFfD7Yn2Feq%2B317G5eTMlzaYqET%2Bbz93du2EK1%2Fv1YKEFZps1B9H66%2FEUv5s5vmYpYj4oXIgc5Zk1%2BrUvX7j7G6ZmhaLmLiPmbv1my1jQGIilAPC7bdQRQ5MDrZRJCeuXZsiFBSVJMMI2tpv%2Fco1uC29RNCA3282yB7tHgVdAMF0bULxrYv0Xk8yxcz8IADbFNiNPfaObTY0Dvt%2Bn3FZeog%2BedsVL3GeqfYChQt%2F1iBGzhgXXHtAMyRwTzt4PU5jobjfARs%2B1%2BgQ9e4DvG0znksXzwBwuXSJQHCpgy%2FpNqiiyWJLZQ%3D%3D)


2. Push Docker Image ไปที่ Repository ที่เราสร้าง

	- Assign Docker Image ที่จะ push เข้าไปใน Repository ก่อนด้วย  `tag`

```bash
# latest tag
# Assign image
docker tag spring-app:0.1 panyakorn130547/spring-api

# push image
docker push panyakorn130547/spring-api
```


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/782247c994c75274b3f583c22039356a.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=g5xP8lcOIyFd7nF7p%2F4S0lMiEUg4IXVqCL3kO%2BLEfi5x4t2dg07oogwztmoHa3M7HYVxcjx97wWi5lNfLicQnvIpwh5ttQKAk%2B5WgRr4OhEshfyWD%2BbsEtruAKkSZLOgvnRVnhTWoqceJy86rQCT5yYatT1KIA%2Fa6ehvEYJOIoM%2F2p%2BVyQoxb%2F49VWi3A01FgW8xJZprxC1BPee%2F73%2BSitaLo0gToGP7ePklsL%2BHmo0b8fGAAwonM68xtGIL8LOaiJi4XgM9jHSSWOlPAcoMGq2Lm%2FrGW8Y6Y0B11r5zbVLyZ3zXhYK6eEI1D6syjgZXdyfybZZcP67T3qEFAHHiQw%3D%3D)

- ลองกำหนด Tag

```bash
# cart-0.1 tag
# Assign image
docker tag spring-app:0.1 panyakorn130547/spring-api:cart-0.1

# push image
docker push panyakorn130547/spring-api:cart-0.1
```


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/ea4b5b315ac9ba96f84c7c3055d14492.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=bUt9KiTKl8dShebCwLwr6UKZ3mA01Fyx9zR3RHX1Lga66SM7NGlnfjqqjhYqNWIzn%2FtefiIVuNj5P%2BE76DEZvjAwUQevzjFT02yeeDrobwjBJnC7N5CdV41%2FoXxBjLm82XncUh9HtjvokdSQW4ODiEKG1UosVdjvDG9A3UnzrT%2F%2B7BTzBU1zlyAbNli3YGB6BRtF%2Fn0Oz74EbRMsynjPnCC9iUe7jr4Bhs1sCPLBPopFzHheC43ApmkgIXGPQ0XNIn%2Bg%2FjPYwP0Jldeg%2BLax3vnNQZFMO%2By94NY2vIBu64g%2BO%2F4kLTg8db5zXwtOW4TCfo7LP3hUN68qQf2yy%2FBRXg%3D%3D)

