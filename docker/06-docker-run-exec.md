
# Command


## Docker run command


การสร้าง Container จาก image, การสร้าง Container จะต้องระบุ Image Version อะไร

- mysql:latest
- alpine:0.256

ด้านหลัง `:` คือ tag (version) ของ images


## Container Name

- `--name` ใช้ flag นี้
- `docker run --name nginx-con1 nginx:latest`

## Environment Variable

- `-e, --env`  จะใช้ได้แค่กับ variable 1 ตัว
	- `docker run -e API_HOST=127.0.0.1:3000 frontend:0.1`
- `--env-file` สามารถใช้ได้กับ .env file
	- `docker run --enf-file ./.env backend:0.2`

## Run with STDIN and Interactive mode (IT)

- `docker run -it ubuntu bash`

## Remove when Exits (- -RM)


ถ้าหาก container เปลี่ยนสถานะเป็น exist, platform จะลบ container นั้นออก

- `docker run -d --rm --name=nginx-con2 nginx:latest`

## Background Process

- `-d, --detach`

## Restart Policy


ใส่ flag `--restart` ก่อน

- `no` ห้าม Restart Container โดยอัติโนมัติแม้ว่าจะ exist (Default)
- `on-failure[:max-retries]` 
Container จะถูกรีสตาร์ทโดยอัตโนมัติ เฉพาะเมื่อ Exit Status เป็นค่าที่ไม่ใช่ 0 กำหนดจำนวนครั้งในการ restart ได้ เช่น `on-failure:5`
- `unless-stopped`  (Restart ทุกกรณียกเว้น user สั่ง stop, kill) Container จะถูกรีสตาร์ทเสมอเมื่อมันหยุดทำงาน ยกเว้น ในกรณีที่สั่งหยุด Container ด้วย **`docker stop`** หรือ **`docker kill`** เอง หรือเมื่อ Docker Daemon หยุดทำงาน หาก Daemon กลับมาเริ่มทำงานใหม่ Container ก็จะเริ่มทำงานใหม่
- `always` ไม่ว่า container exist ด้วยสถานะไหน ก็จะ restart (ไม่คำนึงถึง Exit Status) โดยไม่หยุด Restart แม้ว่า user สั่ง stop, kill

# Docker Exec Command


คือการทำงานภายใน shell ของ Container


`exec` ใช้เมื่อเราต้องการ execute command ที่จะใช้กับ container ที่ running อยู่

- `docker exec ubuntu-container-is-running ls -la /home`

`-it` เป็นการรวมกันของสอง flags โดยที่ i คือ interactive ทำให้ Container เปิด Standard input ตลอดเวลา ทำให้ container รอรับ input จาก keyboard ได้ และ t คือ pseudo-terminal เพื่อให้ shell ของ container แสดงผลได้อย่างถุกต้อง ซึ่งสามารถนำมาใช้กับ container ที่ running อยู่หากต้องการเข้าไปทำงานภายใน shell ของ container นั้น

- `docker exec -it ubuntu-container-is-running bash`
