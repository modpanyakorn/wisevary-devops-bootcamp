
# Docker Run


คำสั่ง `docker run` สำหรับสั่งให้ container running สามารถระบุ tags ของ container ได้เช่น

- `docker run ubuntu:24.04`
- `docker run nginx:alpine`

## Define Container name


ใช้ flag `--name` ในการกำหนดชื่อให้ container เช่น

- `docker run --name=nginx-con1 nginx:latest`

หากใช้ชื่อเดิมไปแล้วจะไม่สามารถส้ราง Container ใหม่ที่มีชื่อเดิมได้!


# Parsing ENV


```javascript
panyakorn@Panyakorn-mod:~$ docker run -e MYVAR1=foo --name ubuntu-env-5 ubuntu:latest env | gr
ep "MYVAR*"
MYVAR1=foo
```

