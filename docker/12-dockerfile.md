
# Dockerfile

- `INSTRUCTION arguments` คำสั่งที่ Docker เตรีมไว้ให้สำหรับสร้าง Docker Image ใช้เป็น Upper Case ในส่วนของ Instruction และ arguments ใช้เป็นแบบไหนก็ได้ เพื่อให้เข้าใจได้ง่าย
- Instruction ที่อยู่ใน Dockerfile จะเริ่มต้นด้วย FROM เพราะจะเป็น Base Image ที่เราจะใช้ใน Container นั้นๆ เช่น `FROM ubuntu:24.04`
	- `FROM` → instruction
	- `ubuntu:24.04` → base image (arguments)
- Environment Replacement

	![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/43be50c8e3297447f09ec00a67f7aaeb.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=WWG9vuLnUpLRZZKz%2B3%2BESi6LI7Ur%2F8xhFwoo4ttOYowLXlqp68ruI16Yo7lYc%2BGF%2Fnrn3vP6GUAWflD8UAPpBQ1ZddhnUflu%2BU5JUo5KzqPek2yq7MMaM%2B1t8%2FCxHy5c7QHZxP7PVooIAnsTls94yqgYBG3PRYgYNnSxZ6dYtRQjPgWQDaisdfiVhy66qpWl%2By64BX3%2Fho2pCKxZ3NefGz%2F2QCVvBAvMmsVDQrtr9fQjZnF45woWY3s%2B5ivmoFxJuJ%2B3QdOzGlVxAG2YdZZ%2F29yxOz8ujcjLdFVSvgD%2Fl%2Bhp8hxdW%2B3%2F9ESKm6fqOZukyxgFn3PmDgqnCaUoHexlIA%3D%3D)

	- เราสามารถใส่ค่าต่างๆ จาก `ENV` ตัวแปร `FOO` เข้าไปได้แบบนี้เช่น ${FOO} หรือใช้ $FOO ได้เหมือนกัน
	- Instruction ที่รองรับ ENV Replacement
		- `ADD, COPY, ENV, EXPOSE, FROM, LABEL, STOPSIGNAL, USER, VOLUME, WORKDIR, ONBUILD`

# Instruction

- `FROM` ใช้กำหนดว่า Base Image ที่เราจะใช้จะเป็น Image อะไร
	- `FROM ubuntu:24.04`
- `COPY` สร้างไฟล์ใหม่ สร้าง Directory ใหม่
	- `COPY ./build /usr/share/nginx/html`
	- หากเราไม่ได้กำหนด Change Owner ตัวของ user ที่ใช้ในการรัน Application จะเป็น root user โดย default

		![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/926caff132b1f87e7cc168c0d9a1af1b.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=POpxhhXOl5Nu9wDbb5N2%2FGnbqI29rn9XL6JvmTMBEalgDddYW86EMe29zW4PbnBVzVkLCqLpa1P1Hvgspztm3YM8Fc8AIAgkv7%2FgvUSetpXRYWOv0VCd2qjAQ423f9PVl9pY7deP4ubr9sggQ9qtrC%2FlVn7OMsCLlNcxCZjSr3M19%2F2ErZ9Y7cYnx5iouAcOhGcOaOa1BNtJoFKAYvrBjg9lkQhbAlVzJv85%2F04%2FB%2B%2FSkowIKCI5u2nNI9zwwYuUuTPMGBBTlz96kEJ6qHH7EGyw8j12Qff%2Bd0pQZhicv3pY3%2Fk8CBykAalsbSsQ%2FDWfTNgnLsOwmUYxn12aM%2BYTCA%3D%3D)

	- ในส่วนของ argument แรกจะเป็น relative path อิงตามที่ตำแหน่ง Dockerfile อยู่ใน Directory นั้นๆ และส่วนของ argument สองจะเป็น absolute path or relative path ตามที่กำหนดใน WORKDIR instruction หรือ จะ COPY ไปที่ directory ใน container ที่มีจริงหลังจากที่ Start ขึ้นมา

		![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/6e9472e13f6d3ab734b67e58bdd0af52.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=nuj3LnEO8e%2FaVNO7rikFbSKYMlVfRAkZQQMk2oqkU%2BkKTSD8UuvdIb%2BhoY6Zn9vdyG4ZCHRrZt2jKijhSEMlqYRF8uSJAWNP%2FpYQM4ovLIsABjStUGIlYl1HRcoVkBO%2F0XXlMvem6Fv%2B9bedHBL3HgqfKl7jAF4E3pad42YIC3ekOphUhmhOMl6nbudnCitnuW89zS6FaFaFFiuxrcJiq3lM0m82fd6QQ6K2aelagIcuzTkItvff41J8Sbm4dF94cwZ5Ecv0KtrdkNbMkRInWyZVYVqTUkFEgqd6jczWIgUJ%2BoW10bvCBmdxhAgoAT1vkeNSYKImq6FKO%2Bh7ZwoR2g%3D%3D)

- `ADD` สามารถที่จะใส่ remote file URLs ได้ ซึ่งจะมีการทำงานเหมือนกับ `COPY`
	- ADD สามารถใส่ URL แทน local file หรือ directory ได้
	- ADD สามารถที่จะ extract tar file ได้ (zip ไม่ได้) จาก source ไป destination
	- ซึ่งส่วนใหญ่จะใช้ COPY มากที่สุด
- `RUN` กำหนดว่าเราจะใช้ Execute อะไร และจะสร้างเป็น Layer on-top ขึ้นมาใหม่
	- `RUN` จะถูกทำงานในช่วง Build Time และสร้าง Layer ใหม่
	- `RUN ["uv", "run", "main.py"]` , `RUN ["uv", "run", "adk", "web", "--env-file", ".env"]`
	- `RUN npm i`
	- เราสามารถเขียนได้ในหลายๆ form ตาม Shell Form, JSON Array

		![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/dd4bf12628f2459dbdfa8d70b3607c79.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=LajH2%2BHu2qilfllDYl9%2B9JEgK2Ieiv1yjRRTIWsBlh02Ok6JeLMRkODIwT5n7v%2BjKwldZzDXT0Yk2SFjzjiH5oUpgxNSBY9l98VN9firjghuPKZWdJcCyslEvjpsZmlOZC1ToOHIoP3w5%2FcTeV3s6GpU1P8fgD0eyxxbUJU26WUruNb8oDKeb2ntO71UcvVcgB7DbVsV7kQ5XjMSZf5jz4bkYp4FRLBGNu1m7EfTdQXirpji6bz%2FA0qMdhLE1Mu%2FLfINdy%2FVVEEM%2FcXTPHmZJ8t0rJxJl7liOrs%2FQC%2FWDRRhyPGgDpTQomuLncV9D3vKYiAfdycgF7QkBp20WNP2ZA%3D%3D)

- `CMD` เป็น instruction ที่บอกว่า docker image ตัวนั้น จะรัน command อะไร
	- `CMD` จะทำงานในช่วง Runtime และจะไม่สร้าง Layer ใหม่เพราะจะทำงานใน Container Environment แล้ว
	- ใน 1 Dockerfile จะมี `CMD` instruction ได้ 1 instruction ถ้ามีมากกว่า 1 จะทำงาน instruction ตัวล่าสุด

		![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/758d7373a6108fe2bc1acf6626b9d779.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=bSzD19C%2BMMA%2BSr%2BEO8ZNcGoie44yvs3pTo0gzBoapjTZJC8uUTwScTZ9Np8NpcOuqkEpWTYt2bQp9wr7l2Emfm5k%2BXO8dZdboJzOhtGGr3Ie6Kwo1UdJzv76%2BTCMMRO8LpzX2Mt5R2%2F6JISWYq2NIQJ3KIXvEtB4bw3hWnMza6P9HLEHS2QnK2bdSmXq4XZdBtu5yGpW8wgZUVXW8NXUZEwwCEBNvFs1%2FV4zFJpRMBgFImwWsYxvtwakCApC5F9g0ob%2F%2FGiUKIIfm6aqTBEY30zOlGREm%2Be6scKkLazpbCbNPwV1CATU1v5jSEE5C2xpYb15c08IxQWfym%2BKiyliRw%3D%3D)

- `ENTRYPOINT` กำหนด Executable ที่จะใช้ใน Container นั้นๆ ว่าเราจะใช้ Binary อะไรในการ Execute Command
- ตัวอย่าง กำหนด Executable File เป็น `/usr/bin/python3` เวลา container ทำงานจะใช้ Executable File ที่เรากำหนดไว้ หากเราไม่กำหนด ENTRYPOINT แล้วใช้แค่ CMD, container ก็จะให้ shell ในการรันคำสั่งแทนที่เรากำหนดใน arguments
- ใน 1 Dockerfile จะมีได้ 1 instruction หากมีมากกว่า 1 จะใช้อันล่าสุด

	```docker
	ENTRYPOINT ["/usr/bin/python3"]
	CMD ["app.py", "--port=8080"]
	```


### How ENTRYPOINT and CMD Interaction


เราจะใช้ `RUN` ในช่วง Build Time และ `ENTRYPOINT, CMD` จะใช้ในช่วง Run Time


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/b8ffbff48a554c986f17ec2b8e095e9c.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=fzU5TL6OeKomLMXLg%2BuM1Q9qNYWJlaqpATBWlVu5lrkx4KxUbnDkBEC8j49H3FsoHalUfPbpyyWIZdBPecQaZEToZrA7fNYNND3%2FtnpoiutKw%2B%2FCRPMShYH8IXkRh0ntQPc1ouXhXoTlPtqlvmJ5miZZEULE%2FDYrWHvgJLo2zInFKo%2BIDqnTbO6vOBG05lwphzah8Zq%2FL8Z2Ll%2BikUFUxmqCDZLs45%2Foih0bqGZjJbWGMAen9qEOMsXO5scLqqGqUPW4jHcpfGe9yGT26jKg4JCe0zm2WmVVPeOyJqSa6sLJvDSoTvrquLtd1VuJqREPeEC0%2BOL9NR1whcwU6tLZrA%3D%3D)

- `WORKDIR` สร้าง Working Directory ใน Container
	- `WORKDIR /app`
	- `WORKDIR /backend`
- `EXPOSE` คือการบอกว่า Container จะ Expose Port อะไรไว้บ้าง
	- สามารถที่จะกำหนดไว้ได้มากกว่า 1 instruction
- `ENV` กำหนด Environment Variable
	- `ENV var1=John`
- `VOLUME ["/data"]` เป็นการประกาศ (Declaration) หรือทำ Docs ไว้ และ Docker จะทำ Anonymous Volume ไว้ให้ Directory นั้นที่ถูก assign ไม่ได้มีการจำกัด Mount ว่า User จะ mount ไปที่ Directory อื่นๆ ของ Container ไม่ได้
	- VOLUME จะหมายถึงว่าข้อมูลใน directory ที่ทำ Named Volume หรือ Anonymous Volume เช่น `[”var/www”]` ไว้จะถูกเก็บไว้บน Host Machine ด้วย

		![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/56641a415ffe026f43689419d10a1c71.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=W6ifLHi7QnveCRBqhsjmGwcz8eiX7q0MCDfbsjwla3vjwHOfSEdcDNvsYlCMRHmxxwuRc%2BbXucQnxmHmiTTFKr1bp5W1uppM%2FIQrt77mdCGQC5JHBk7n5CTnFNIiQVY9mr1RjQfrK77Vom779phWg6EUM7Y3k%2FBPxBEq6Scgyd62XxIlkpq%2FfYvyr4bQS%2BHNIDlptvCTjLyIDfMxbgxnZ%2BLFuVTZe69HzVFGk0Xk8ByKxB2LdJrZpZxIcq%2B4XUxgtr1B%2F%2FcLY0eAswuG0gz%2FpKYb4R1XFlU7cfmpaGh33dY8BSF3Xi%2Fe%2F7QTqpjcJxLc2aBUQUFaqafeKduI3mCiEA%3D%3D)

	- ข้อมูลจะถูกเก็บไว้ใน Host Machine เสมอ (เครื่องที่ Host Docker)
