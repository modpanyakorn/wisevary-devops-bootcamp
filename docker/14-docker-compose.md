
# Docker Compose


เราลองนึกว่าถ้า Container เราต้องจัดการ Environment เยอะมากๆ, มีหลาย Container, Configure เยอะ, หรือ การควบคุม Network, Volume การสั่งงานผ่าน CMD จะทำให้เราลำบาก และอาจเกิดข้อผิดพลาดได้ ทำให้เราควบคุมยาก


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/27e4a954616051c5ab5d341dcf369bc6.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=ZqiOWtdY0lIzGgjUsNzwe75%2B45jTNeLtc4xsHCRU%2BqGyyM6lJ123TqnXHOsjLRMnAwS%2FCjmCxoYWqGhhrSjyPBas29Ag94p5VaqmvzhNqtzhuWj47wzWH6bFZMLCRCE2DJlf0kRQW%2FjyHwRsbSkYsL3IlH382C%2BQ5e6VHcNKko7fUBuJ5eOLXXo6fPdoaEOtN8z1uoh%2By2ovgMpZ94w%2Boi9NeJoQRpjOCLBnG0B0FI614TVqNh5eLecJFRI1oFkNDeowA88Y3crSYDfOcJ3%2BMZPGKb0Ir%2B6DC6sFIbX%2B1Rj1lImVPuvNhi9hX91yPhT5rTJbh%2Fl2He1LI8Tpg82HvA%3D%3D)

- ลองนึกภาพว่าเราต้องรัน CMD ทีละคำสั่งแบบนี้มันจะยุ่งยากมากๆ หรือ เขียน Bash Script มันก็ยังไม่เป็น Native และต้องเข้าไปแก้ใน Script File เหมือนจะสะดวกแต่ว่สมมุติเราแก้ configure อย่าง named volume, mount binding แล้วรัน Bash Script มันก็จะไม่สามารถรันได้หากเราเขียน Script แบบ `docker start, docker run` ซึ่งชื่อ Container มันก็จะซ้ำ และปัญหาอื่นๆ เราจึงต้องเขียน `docker-compose.yml` file เป็น YAML file และเป็น Docker Native สามารถที่จะแก้ configure ได้ง่าย โดยไม่ต้องกังวลเรื่อง Start/Stop Container

## Command


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/a2392c20cfae978d3f1168f8927a53d2.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=MQTl%2Bw2N2wHBdHde0voC2Y5eZw9fjtOLS84BuIvAAkKcQOC%2Fz%2FUAhqgssh0L9uY5M1KujkCkg9K30hhpSyNXBy62O%2BP6ZZ%2BbeblyhcP3qD4v9rfGHlZFlFyhX8Wxj4xcERyzdttwXrgl1tbHw4H5BeTFkvn%2B5jGkJbvy8X%2FMdU5tj8zpmnHXtG4eGGtZuQbSJ4bNIwB9sV0xj5Wi%2F9Y9SHNOyg6Qs0t3JZ9bq%2FqFwWF8%2FoRfRr7FxK%2Fvp2WFRu8c5u4Y9FxJ%2FXVFq3H8v5CapK%2FqMJ9L%2Fua2uRPpSSZDRMeqc4y0q%2Bp6nPlySEpNc13PBDL3x5YLJRJo5zaoKI%2Bwxg%3D%3D)


# Specify Docker Compose File


```bash
docker-compose -f docker-compose.deploy.yml <command>

# example
docker-compose -f docker-compose.deploy.yml up -d
```


# Docker Compose - Building Service


```bash
docker-compose build 
```


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/8434babc6ae4c1ce65697e7fdbae8571.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=k4G4l4tYiu%2FtqImTEsRW2hmdNgxz%2FCIWoMdCyG8ytZvZLXCa2DKsPCeSEnTRiHBBjSKZVSbwLspQs1Qx8RAmqbQnsC8wgECfcDIIVeRM%2F5KpYWHGT7OhGt3cT6P3tb9rEqUxuahf9diHBNRVHgN2dZLW16x4dybswRIdLa%2Ft0DP%2Fw9PR4S25BCet2lZ6BlwOSCbknJTdSYdx0LoULsrj%2BF8hz9eed0kpaXG6d4lLvV%2FdNXfnQ2UIYh4ibFWbBdZ0AM1SyO7SJQ5MKPnobsATI8qHCnaSU4zfNvi7RAcM1eQ7TppSYlZOBYGb21Vjw9wfB2VslLgCYNAjGFuJZpLXCg%3D%3D)

- เราสามารถที่จะ build ด้วย docker compose ได้ โดยมีการ configure ดังรูป

# ทดลองเขียน docker compose file!


```yaml
services:
  frontend:
    container_name: spring-app-frontend
    # image: spring-frontend:0.1
    build:
      context: ./product-management-frontend-app
      dockerfile: Dockerfile.compose
    environment:
      - REACT_APP_BASE_API=/api
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    ports:
      - "80:80"
    networks:
      - spring-bridge
    depends_on:
      - api

  api:
    container_name: spring-app-api
    build: ./ProductManagementBackEndApp
    env_file: ./app.env
    networks:
      - spring-bridge
    depends_on:
      mysql:
        condition: service_healthy

  mysql:
    container_name: spring-app-mysql
    image: mysql:latest
    env_file: ./mysql.env
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - spring-bridge
    healthcheck:
      test:
        [
          "CMD",
          "mysqladmin",
          "ping",
          "-h",
          "localhost",
          "-u",
          "root",
          "-p$$MYSQL_ROOT_PASSWORD",
        ]
      interval: 5s
      timeout: 3s
      retries: 10

  phpmyadmin:
    container_name: spring-app-phpmyadmin
    image: phpmyadmin:latest
    env_file: ./phpmyadmin.env
    ports:
      - "8080:80"
    networks:
      - spring-bridge
    depends_on:
      - mysql

networks:
  spring-bridge:
    driver: bridge

volumes:
  mysql-data:
```


# การประยุกต์ใช้


เราสามารถที่จะนำ docker compose มาทดสอบการทำงานได้ เช่น CI/CD โดยการจำลอง Environment ทั้งหมดไว้ และสั่งรัน Test ต่างๆ ได้

- ข้อดีคือไม่ว่าเราจะรันกี่ครั้งจะได้เหมือนเดิม
- เนื่องจาก docker จะสร้าง container ใหม่ทุกครั้ง
