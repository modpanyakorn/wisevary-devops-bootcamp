
# Development Workflow with Docker


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/dcb3e731848314da13402032a3e0cc0f.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=IMACN7zz45S04gWBRyjJhc7TW7H1oEr4rA6kZyMefkx4zVyNoY6mk4%2F0X7MM3MVIAKB7XRAvxmJzFvA%2FaggYYipCB3xmFI64pFd2nCzW%2BE5PVwfYoiUT01%2B2zk7GQD0srh7BctyCbvaQGK0uygUQiS%2BuD2dzyvkrl5a6mRoxrADPvPKxPZzcHV9YyA8WqI5qE5Hk749GPcr2LOys%2B8nnMB%2FViacIffQ8hovSoOpQszJUt4FnqVgE233fi12GJvxTqTjhLqFPwGuw0g8KpwzR%2FoxgapRcUerhvwbQiYSGbDrWLpUX5V2XUKx32jTP3aBhUHRMDkeG9uLMj2o4sbzw%2Bg%3D%3D)

- การ build Dockerfile ในระดับ production ต้องทำการ scanning imageก่อนว่ามีความปลอดภัยไหม ถึงจะสามารถ push ไปที่ image registry ใดๆ ได้

# Create Docker Image


## 1. Building Docker image with interactive container (BAD)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/d479ebe8006cb2d4ab823c3454259d5f.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=AaD%2FhDTRwhpsxOcAdoP2plZLRrDOzdUgImeyieFl6lceCAAhN1uCeDCQYpvYemmwJ%2FirRHEZlVVmfLGT4WNtZHo18pckWTBaPlxqNF3fqsQDJBj%2BK7iZiWfjuRAY5xGIjj9BqZm7yTLwy22iAu5nZIFC%2F4lfF8lCseva9GGbMVYjLuQpwlle2sF4voxFHFbIFzQdjCPH50grC7ZLE11qEe%2FPF0u03VELZgCOQ4SbqdwlLGciSYf%2FIA3BVoebu6LCMAw3c%2F6swvFNB97SdE4Dn9xVea2xD84TBFWcIDvpK1zMc4UNO4buQZyk7qspNkj8RNzKx4rO1VccuDMhQYnPrg%3D%3D)

- เปลี่ยนแปลงข้อมูลภายใน Container นั้น แล้วใช้ `docker commit` เพื่อสร้าง Image ใหม่
- แต่เป็นวิธีการที่ไม่ได้ เราไม่สามารถ Track ได้ว่าเปลี่ยนอะไรไปบ้าง เช่น ติดตั้ง package อะไร, แก้ configure อะไรไปบ้าง ซึ่งจะไม่มีประวัติให้ตรวจสอบ
- วิธีที่ดีกว่าคือเราเขียนขั้นตอนที่สามารถทำได้ไว้ใน Dockerfile เช่น การติดตั้ง dependencies, การ set permission หากเป็น configure ที่ซับซ้อนให้ไป configure หลังจาก running container แล้ว

## 2. Building Docker image from Dockerfile (Good)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/bf000f0cbe746642dba960ce585bc6bf.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=CIZXYx1gbU48kRPLFsfubdWT3%2BtpW7zR2MyAdLVhdeJKD4%2BGjtZVzHnlg0IdvCT3yi4LAOZYXuhkxMJdWXpEepd5lHJqm7BIYNw8ugvCPAO31c%2FbzwSP8naTXspzoiiMUIQis6u%2BXkpj7AXvYyn%2BuBwQhqd%2FD7X3lFKIFch6FhxJNkjWrim2j9ltDz7%2BjQFad1kcMer82%2B2bhNweLzSh8JNaCEFVSeN%2BfY%2FoKwazOKgIfJZgfyNxmegaVqecULLItxcY05xW1usRPa4UzIjDNB5JSfTDL30r9z75SsWIk0T4%2Fv5H0vZJr29j55j%2BeRQkLcn%2BGa3swKIiPjmvwRMG%2BQ%3D%3D)

- เริ่มจากที่เรามี Base Image เช่น `Ubuntu, Alpine, Node, Python, Go, MySQL` จากนั้นนำมาปรับใช้ให้เหมาะสมกับ Application ของเราที่ต้องการใช้เช่น install dependencies, mount file, execute comman (node server.js, python main.py, …) โดยเขียนในรูปแบบ Dockerfile และสามารถเก็บไว้ใน Registry ต่างๆ ได้ง่าย
- วิธีนี้เป็นวิธีมาตรฐานที่ทำให้สามารถเข้าใจได้ง่าย สามารถ Build ได้เหมือนกันในทุกๆ ครั้ง

# Docker Image Layer


เราสามารถตรวจสอบ Image Activity History ได้ว่ามีขั้นตอนการสร้างอะไรบ้างที่ทำให้ได้ Image แบบนี้ออกมาเช่น `spring-app1` เป็น Spring API ที่ build เป็น docker image


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/c074dbc2a2197e0a551183fd23b1986f.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=HW77SqTlYYXpWdEhJMlZCZ5b9KCjGEteHGCgWcOUM6KVRbGV55hofKmc4lQApRpQEVpedbdFyHkEs2e2EqbSQjFJf9suSqWwDHMMYb1ruZR%2F3NQwJn60LbiCwAefmvvMCxN1POiWD9Q5OcR%2FASt%2FQoyfmY3XshLEhCHrLRQP%2B%2F4sqc4TfgVdeZ4Ud09jLIsTCy667zwRS6sxZJJdBgqPP0RpGdYbX4tfaYoXPWt72DqqmXvAxgVLH6Jn%2BeUEFhmT%2FAsRtg%2B7gz5aqKkEyrXBG%2BUub2qiXXlZmFa2LALAvW5t0ZIbXSMhSrNagUt7Pf383ZhOuV2i6TMnuGXqVC4%2BEQ%3D%3D)

- จะเห็นว่ามีรายการของ Script ใน Dockerfile ที่เป็นของ Base Image และ Configure ที่เราเพิ่มเติมมา มีหน้าตา Dockerfile script ตามนี้

```docker
FROM openjdk:17.0.2-jdk

COPY ./target/ProductManagementBackEndApp-0.0.1-SNAPSHOT.jar app.jar   

EXPOSE 9000

ENTRYPOINT ["java", "-jar", "app.jar"]
```


# Image Layers


ถ้าเรา build Docker image ออกมาใหม่ เราก็จะมี Layer ส่วนของ Base Image ด้วย เลยทำให้การ build ในส่วนของ base image ทำได้เร็วหลังจากที่ pull มาแล้ว และในการ build ครั้งต่อไป ก็จะทำให้ build เร็วกว่าเดิม


### Image A


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/44d428e9d0f4a11b504dbe421aee1021.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=TdBw3xakieT8Ws5kqOSAdT6qFkCTbGXE7uZ%2BYLHHpLi4fzKAyg%2FIJ894X39Bd0F91NPeT8xhRbENZSqx2hN%2Bzpxmh3ung7AsYKOrrT0gGLRokhl0D6WKsXWdugNvv3AwAyRnqyLA3kL7bfB7uHxU8N%2FAiCins%2FTRGxY1OqZTHctIED5F5j7Y2mQ1%2BCLOstYCZ9WW2seA0oSGs%2FVDHQm8htt0uY2LiKZBMvdAUGzH92kwu6yHqLQh3BeNfV40P0p2%2B12gikwHYGcQ4ytg%2BTYoWlvu9F0ZSpCZgg9KV4AKS%2FjCYgfXbBLA8ZA8h1A9%2FOC%2Fq7HkuJu%2FapsZM7v6H%2BkxCQ%3D%3D)

- Layer 1, 2 คือ Base Image สมมุติว่าในครั้งแรกเราไม่มี image นั้น เครื่องก็จะทำการ pulling ลงมาไว้
- Layer 3, 4 คือ Configure ที่ user ทำการเพิ่มเข้ามา

### Image A เพิ่มบรรทัด


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/3712947c719be99d5b336602ce6e0ded.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=OJfwbcYqpLF%2F1OiibMqmcrrvPvousax5aH%2FyAD6oBKx1z%2FdOvIrLj4ENa0Ta5Dtupqni5%2FfXX7yRPkUtM34ODvWeVm3burlD8sM6ZEoKkHI1Sx5oX3kPbbbXqPXd20mU8eItjuPsyvTILBEZ1Wqbv1EnQqTceBPnBtIo9eQih1rY%2FIt7wcWmNvcSn8Ces1JrIQPhN0VwYlFqQqaHGNYiQSZ4ZNv1FIhYxubO%2BX%2FgumWLy9pilgaIfcO9O8ieWNsRatQ4lFoZ%2FTBSbQNUjeNO57mTI0wJiyL3Dgu3LRN0Lo9xc4NA9nMLezo8E3GDtRU8wqWLLkfMSuGrQNvdSTeYpA%3D%3D)

- ใน Image นี้ใช้ Base Image ใน Layer 1, 2 เป็นตัวเดียวกับก่อนหน้าทำให้ docker ไม่ต้อง pulling image ใหม่ แค่ทำตาม Configure Layer อื่น
- Layer 3, 4 เป็นคำสั่งเดียวกันกับ Image ก่อนหน้ามันก็จะใช้ Layer ก่อนหน้าแทนการ build ใหม่
- Layer 5 จะ build ใหม่เนื่องจากยังไม่เคยถูก build

### Image A แก้ไข index.html


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/082b0e72220cc1465c8d2215e9402d51.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=B4pUQs56rK2jvG5P02%2B%2BfCU8szUL8ThsfX0DCGHCM9VqRSkoWDYHFB2Sxkpg24THQTCg5NNToS11gP3mHv%2BGQUF8m8bKpIfgDdZ4X72RjRP2S1Y6m2f1opEBxGQM%2BNyohnfbyf7U5g67f0X80cyDVHt0Ed8PU3%2FSYiqPyo8rmIo9HMTdVYPrQ44Ix67RqbyU7mSWPxlXIjAhFd5QMXlRh17g77TNTvpktCUsVlj%2BzNFsPQXdoSKf9rAWKtH1lKn0XUA0JyGMCI%2B4Wt0AkdiBW0Xh%2BzG8eBBJj%2BI%2FG1Jpy1fYsXyG5nlzM%2Fkox65qU5XUjyQT%2BYzUPR05AHvo4I9zag%3D%3D)

- ถ้า Docker เช็คแล้วว่าไฟล์ index.html มี diff มันจะสร้าง Layer มาใหม่คือ Layer6 และใช้ Layer 1 - 4 เหมือนเดิมไม่มีการ build ใหม่ยกเว้น Layer 6

### Image A แทรกคำสั่ง


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/e2b3fce055a60c8e4f8c3a007b6e21e9.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=ClejUnCHK3FP8fowXrvpvqnj2hLdYbumdqNwzxOOmmN%2B%2FqRV6dSLtsf6cavr4mxq8gRt8tCAFTA4ol1kuOxegrmkz%2F%2B3NP%2BzX24DONelifgZDBwxJ8Z2ALhVbzz%2FoWt59pXieTOezgKUlRrHM%2BWkZc95aTV%2B%2BJ9bWlPmncUUwP5%2Fn8QjzGsI8kjcZ2rBbOiIvFZOtytpSN9zjXeaSIqI4CeK3AovmwFbTJUVg9qiuTEIisGq5lkjZn4u3dVPxPRJRrdHAJqKZIronSbFyaosg290U6Td7OH8V80IMGiv%2FVKsVv82%2BN1DxCZ15fTdzsr8lq%2Ba4k91eTJKUWinZMkbbg%3D%3D)

- RUN rm -fr /tmp ถูกแทรกเข้าไปก่อนหน้าทำให้ Docker มองว่าเป็น Layer ใหม่รวมถึง RUN apt install - curl ถึงจะเคยมีอยู่ก่อนหน้าแต่ไม่ได้อยู่ในตำแหน่งเดิมก็จะถือว่าเป็น Layer ใหม่

# Build Image

- `docker build .` จะทำการ build จาก Dockerfile ที่อยู่ใน root directory เดียวกันกับ wokring directory ณ ตอนนั้น แต่จะไม่มี Repository, Tag
- `-t, --tag` จะทำให้ Image มีชื่อ และ version ตัวอย่าง
	- `docker build -t spring-api:0.1`
- ถ้าหากเรามี Dockerfile ที่มีชื่อแตกต่างกันไปให้ใช้ flag `-f, --file` ในการระบุ file นั้น ตัวอย่าง
	- `docker build -t spring-api:0.1 -f Dockerfile.spring <path-Dockerfile.spring>`
