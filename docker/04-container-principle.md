
ถ้าหากจะใช้ Container จะมีหลักการ และวิธีปฏิบัติอย่างไรบ้าง


# Image Immutability Principle


## 1. Single Concern Principle (SCP)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/ae909e46a7304f8175649dd60dbc79de.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=X7MG7wlI%2B9e5sg2JpRQs9eJQFKPVlo9RkvbAR0H%2BLEFgJL3ZdzvQXGnuIulPxGuAHVy7n1ZZEVyVVOs1lUaTK6p52zd7KAGVaxiLIe8KXt4ObeBBuVSysKiq2uyx%2BWfgwJIAUMkpngqbXktBzb6GXv9r0SBGc%2BpADZ2nfj7%2BH8P9Y5nRWSY8E4YpDCG01Aedt9qokdiPVlSrX2kEyF%2Bdsvfi5jO58Tmfi0uB5XWft2zcY18G%2B1lk7vjjK%2B5OMOp6bpKVKDDcafaaIDGc6WVnTU5qHHwUTF6TZf%2BI%2Ftz4OToXhSbH909kwAKtU4EeVEDFaWbUSW2ikK4bfN8AUY9lIg%3D%3D)

- เป็นหลักปฎิบัติที่หยิบมาจาก Single Responsibility Principle ของ SOLID เป็นหนึ่งในหลักของการพัฒนา Software Object Oriented Design เราบอกว่า Class ควรทำหน้าที่อย่างใดอย่างนึง เพื่อที่จะแก้ไขได้ง่ายแค่จุดๆ เดียว, ถ้าจะเป็นต้องแก้ หรือ เพิ่มฟีเจอร์อะไรเข้าไปบ้างอย่าง ควรจะแก้แค่จุดใดจุดหนึ่งเพื่อลดความซ้ำซ้อนของ Application และความเข้าใจได้อยากของ Source Code
- การเปรียบเทียบง่ายๆ คือ 1 Container เราสามารถนำไป Running ได้หลายๆ เครื่องคอมพิวเตอร์ เช่น Pod มีได้หลาย Container

## 2. High Observability Principle (HOP)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/3376fd25a718a660d7871e7e8393cd31.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=iIYq3xNvipxKiUMAEASJynyHEuwejd2RcgEcyPvIkCSrO%2BSWtxaE2VVXJgqMlduTP%2BgSoPozP2T6N%2BQghzGnTs2MNvczppviTfki%2FYDrqsYpHF1WLtDrdjRFOuY4b52M%2BVjVD2f%2BjBPRF7odIhrqUlY%2BM%2BmaLuuVCCPWYLpzPF41%2B9IbyB6q%2Bcb2IfmiUEy8tlCS5N%2F0%2FN8dPA1J1MjjvNis2X2onELcxTOpkCEiRJG%2BlgYsqVnwhyycoxsGz6Kg%2BOCuJLdztExXydkkGYappctnPLeRwtzZXRtZazk54XVAC4aBbPt4VkSj3bUvafLHNY%2FVfjPcaCc0Fh3GSrixvg%3D%3D)

- Containers ทำหน้าที่ห่อหุ้ม (Package) แอปพลิเคชันทั้งหมดไว้ ไม่ว่าจะเป็นโค้ด, Runtime, System Tools, Library และ Configuration ต่างๆ
- HOP → Container ทุกตัวจะต้องเปิดช่องทางให้ตรวจสอบได้ว่า Container ตัวนั้นมันยังทำงานได้ดีอยู่หรือป่าว (Health Check) ดังรูป
	- Process health คือการตรวจสอบว่า Container นั้นกำลังทำงานอยู่หรือไม่ (Health Check)
		- Readiness (ความพร้อม) ตรวจสอบว่า Container พร้อมที่จะรับ Traffic หรือยัง เช่น Container Start แต่ Application กำลังเชื่อมต่อ DataBase หรือ โหลด Configuration อยู่, ระบบจะไม่ส่ง Traffic ของผู้ใช้เข้ามาใน Container
		- Liveness (มีชีวิตอยู่) ถ้าระบบรายงานว่าไม่ **Live** ระบบจะสั่งลบ Container แล้ว Start ใหม่เพื่อให้พร้อมทำงาน
	- Metrics
		- Tracing ตัวของ Container ที่เราพัฒนาควรจะมีช่องทางเพื่อให้เราเก็บเส้นทางคำขอต่างๆ เช่น API เพื่อที่จะทำให้เรารู้ว่าตอนนี้ Workload เป็นยังไงบ้างของ Container ตัวนั้น, ทำ Tracing ดูว่า Request จาก Client มี Workload ที่ Container ไหนบ้าง มากที่ที่สุด (ช่วยในการระบุ Bottleneck และหาปัญหาที่ทำให้เกิด Latency ได้)
		- Logs (บันทึกเหตุการณ์) ใช้เพื่อ Debug เมื่อเกิดข้อผิดพลาดที่ต้องการแก้ไข

## 3. Life Cycle Conformance Principle (LCP)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/68bcf959463c25612220c46dc6ee97c6.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=OhrXuWcxf72mJqN82GkeZDjaxpzDc%2BM6Fvr3C5Ne162o9KGyB9Lwgc%2F0kUDO3R7ONsENVBv95jiK0DA%2FzdO5tKuY%2FRIXNCgNe3Gwo7UfyacowcdkN%2BltS4EYzMTPLQX66r3UTKlFtnRtJDyvbJ7yrp91oCEEEWPnXHFFiGJPwPnSoMbUmJ4q2wN7FvgudNvIo4RwX%2BqFo2XYbuyHj2zgl4IQI6MCHctZKxJsZSBY9RThzRPnMFC%2Bym4XEXbSocWhnPSQmihDKGxzlbXSZ5oVL0ViC%2F4%2BVid1FZ8CFx50J6C9fTPn%2BuCVuPxAN8V2WZ3tAI5XN%2Fa7C68j2LKMjy32Pw%3D%3D)

- LCP คือการควบคุมเหตุการณ์ที่ส่งมาจาก platform (Host) เช่น Docker, K8s เข้าสู่ container เพื่อจัดการ Application Lifecycle คือ Container ต้องเปิดเผยช่องทาง (APIs) เพื่อให้ Platform สามารถ อ่านข้อมูล (Read) จาก Container ได้ เช่นการอัพเกรด version ของ Container เพื่อเพิ่มฟีเจอร์ใน Application จะต้องสั่งให้ application หยุดก่อนจึงค่อยอัพเกรด
	- SIGTERM (Terminate Signal) เป็นสัญญาณที่บอก Application ว่าถึงเวลาต้องปิดตัวแล้ว แต่ให้เวลา Application ในการ Cleanup เช่น DB Close Connection, Process Request ที่ค้างอยู่
	- SIGKILL (Kill Signal) เป็นสัญญาณที่สั่ง Force Kill Process ทันทีโดยไม่แจ้งเตือนล่วงหน้า, Container จะหยุดทันที
	- PreStop คำสั่งหรือ HTTP Request ที่ถูกเรียกใช้ก่อนที่สัญญาณ SIGTERM จะถูกส่งไปที่ Container ใช้สำหรับการ Cleanup ที่จำเป็น
		- ก่อนที่จะส่งสัญญาณเพื่อ Kill Process , Container จะเปิดช่องทางเพื่อให้ทาง Platform ส่งสัญยาณมาบอกก่อนว่าจะ Kill Process (Stop Container) เมื่อ Container ได้รับสัญญาณแล่วจะไป Clear Process นั้น
		- ช่วงเวลาที่เกิด PreStop, Platform จะไม่ส่ง request ใหม่ๆ ไปยัง Container เพื่อทำการ Clear Request ที่ค้างไว้อยู่
	- PostStart เป็นคำสั่งหรือ HTTP Request ที่ถุกเรียกใช้ทันทีหลังจากที่ Container ถูกสร้าง และ Process หลักของ Application เริ่มทำงาน ใช้สำหรับการตั้าค่าเริ่มต้น Initialize
		- หลังจากที่ Container Started แล้วสามารถตั้ง instruction ได้ว่าอยากให้ Container ทำงานอะไรเป็นกระบวนการแบบ sequence ได้ พอกระบวนการนี้เสร็จก็จะไปใช้ readiness เพื่อบอกว่า Container พร้อมใช้งานแล้ว

	# 4. Image Immutability Principle (IIP)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/d2d3f4483fc810a3905b8c0adabb3f53.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=SI5V7e3FWs22Ff4l6MBUZL9bg6cSOckW0toTgb9NM%2B0gqwul0BYU%2Brj7OiaPBGCv1pDEgjnMLznbhVbmgezwXIOuKARyGCnd2t%2FyF4dzpNL%2BMhj5ypDOA1AaEd79UdeYYLQs%2FUBc37U45b%2BMweFZSdekzNAA2YnIQkiBVAH1d%2Frkkrnbgmej2jErh1zmhlRL4FLu5%2BNbf%2FNz25Yb1Z%2FVjbMuYHZqjLaE8GQ1Pnje0xTf0MFQWQfuLJsdwzOrl6qhNXJToRJFBnLvzKIN6WUj%2FjNNA%2BWup%2BHsouHcVNNCWr4QdCHVcpyvtYFpdXMcnL91shmrS%2BfVewB0B0qGenVMSg%3D%3D)

- Container ถูกออกแบบมาไม่ให้เปลี่ยนแปลง และเมื่อทำการ built แล้วจะไม่ถูกเปลี่ยนแปลงระหว่าง Environment ที่แตกต่างกัน ต้องใช้วิธีการภายนอกในการเก็บข้อมูล Runtime และอาศัยการกำหนดค่าต่างๆ ในแต่ละ Environment แทนที่เราจะสร้างหรือแก้ไข Container ตามสภาพแวดล้อม
	- เช่น การ parsing variable หรือ เพิ่ม Linux Command เข้าไปใน container ที่ exited จะไม่สามารถทำได้ เนื่องจาก metadata จะถูกบันทึกใน container ตอนแรกที่เราสั่ง build → (create, run)
	- ซึ่งจะตรงตาม principle ที่ Configuration จะคงที่ไม่เปลี่ยนแปลง เมื่อ Container ถูกสร้างขึ้น และทำให้สามารถสร้างซ้ำได้
- ทุกคน Container ที่ทำงานแต่ละ Environment, Container เหล่านั้นจะถูก build จาก Image แค่ครั้งเดียว โดยทำการ Configuration ภายนอก และไม่อยู่ใน Container เช่นใน Dev Environment อยากใช้ DataBase สำหรับ Dev ENV ทำ External Configure โดยใช้ .env file แล้วทำการ parsing เข้าไปด้วยในขั้นตอนที่สั่งรัน Containerโดยสามารถกำหนด .env file สำหรับแต่ละ Environment ได้เช่น
	- .env.dev
	- .env.test
	- .env.prod

## 5. Process Disposability Principle (PDP)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/6b863ada566dcacdbe4bf790aec5625c.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=m%2Fp%2BMyWoPIhcIvrgV7O%2B0bmK3%2BMyq9OEABl1zJHnetaEIAwK%2BY%2BIOUUIOA0Gh%2FO0uLBJix6%2BrjcR0gANvNkpEeKYys1Z2OXA3w6b8zupIRvy49Fmx0ukL5ORMTD4KaZDsFEhyJ9cwoEyegwvXrse%2BrtNjSSUnEiu8QYMHYEun5eOJ1OHQSdEfaRMoDnZ0QyjVp2ecKnl7clAXkh%2FQJxJMd%2FLInpudbWTCnheFtR%2FSX9vX9bw%2FFtBMnHyMc3CZ3AWVzZI44YQN7LXW2HsK2Rnda7Yr3194i%2Fp%2FwRVUaXtGyQFiXd2JX83wH2BjpFTZhtH9qCSnmnHfPz%2FN1Db9xPYpg%3D%3D)

- การย้ายไปใช้ Containerized Applications, ตัว Container เองจะต้องมีความเป็น Ephermal หรือ พร้อมที่จะถูกแทนที่ด้วย Instance อื่นๆ ได้ตลอดเวลา
- Container ที่รันไปใน Environment ของเรา จะต้องพร้อมที่จะถูก Replace โดย Container อื่นๆ เสมอ เช่น การสร้าง Container ตัวใหม่มาแทนที่ตัวเก่าที่ค้างอยู่ (คือตัวเก่าจะถูก Stop โดย Platform แล้วถูกแทนที่ใหม่ได้)
- การ Update Application จะต้องสามารถ Stop Container version เดิมได้ และ Start Container version ใหม่ขึ้นมาได้

## 6. Self-Containment Principle (S-CP)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/befc70b3d255fb8edbc2f8d45bc829dc.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=lNYSoYuMKF8yJsxv511SIomH92%2Bf%2FvfpJy%2BsbTyAB7CaPfx3mh3L%2BuRtIoKq01f3BQPpWkj7BxV5kCwNAhlEZb%2B0bgEzF%2FDvYrTZfvNySxyWsBylY3i4i89EdFOeW87dRn5jEl8Vp0qiaMHNWBPxnT1MYSJ9vOYSHyBkwxGqMYyKIMmr36oDy54YR57Z3JFQzv%2BVCzruPA4jRNJE53vmpJbM5IywFaHqWtV2%2FnmJLt5fUxuWbBeHqoN51mzF9mzLWtTKU1Hw2voVgbo8hkPoMWVgJnlitk7kgEpvZI%2BR3P7uT3NyouxP4b2vwseciIxW93UqNrFDq4ApIh8YISF%2BQQ%3D%3D)

- S-CP กำหนดว่า Container ควรบรรจุทุกสิ่งที่จำเป็นในขณะ Building, Container ควรอาศัย Linux Kernal ที่มีอยู่ และควรใช้ Library เพิ่มเติม ที่จำเป็น, Language Runtime, Application Platform ถ้าจำเป็น และ Dependencies ต่างๆ เพื่อใช้ในการ build containerized application
	- Build Time → ช่วงเวลาที่กำลังสร้าง Container Image เช่นการรวม Source Code, Dependencies โดย Container Image จะต้องมีทุกอย่างที่จำเป็นในการรัน Application ด้วยตัวมันเอง โดยไม่ขึ้นอยู่กับ Host OS ที่จะไปรัน
	- Run Time → ช่วงเวลาการทำงานของ Container ตัวอย่าง event ที่เกืดขึ้นในช่วงมี่ Container ทำงาน เช่น
		- Inject Configuration เข้ามา เช่น API KEY, DB Configure เป็นต้น หรือ Persistent Data เช่น Docker Volume เก็บข้อมูลของ Application ไว้ใน Volume ที่ Docker จัดการให้บน Host Machine (เครื่องที่ติดตั้ง Docker) หรือ การ Mount Path เช่น Nginx Web Server การ shared html file เพื่อทำการ mount กับ path บน container เพื่อให้ file บน host machine เข้าไปที่ path บน container ได้
		- เวลาที่ dev ก็ใช้ configure ของ dev แยกตาม Environment สังเกตจาก Build Time และ Runtime
- Container ต้องพึ่งพา Linux Kernel ในการ running container, เปรียบเสมือนเรามี VM เราต้องเตรียมเครื่องมือต่างๆ ที่ Application ของเราต้องการใช้เช่น สมมุติเป็น Backend API lang=python, dependencies=fastapi, … และอื่นๆ ที่ Application ต้องการ
- บางครั้งเราจำเป็นต้องเก็บข้อมูลบางอย่างที่เกิดจาก Container ประมวลผลซึ่งจะเกิดหลัง build time

## 7. Runtime Confinement Principle (RCP)


![image.png](https://storage.googleapis.com/dashboard-51ba6.appspot.com/fb6d63f2fede11f7e3de505a4e252fb4.png?GoogleAccessId=firebase-adminsdk-jd298%40dashboard-51ba6.iam.gserviceaccount.com&Expires=16725225600&Signature=Ov%2FN5YbDZF8FRJmNvtYZ0Ptrn%2B%2FDqpfVXcqg8dZZszN5U1BI%2BsuGFjiozbVlMRpVNX6RVGcHq2PgMRseuI7TvjUQS%2FIHqAmgIwAHeIWbIdDxr%2BuwdGOYEvB8EZEgU4rFYw7LNjQx3ngPob8S91hdFTcaJxclE4%2BzLOABDyGFoR0EM6nrsTpuRyE2o9o%2BtKHc%2BPljwZwbuaVHzGBJDCV6OKzaSsAblT%2FI5eqfxQj2ijiOXZJMd8jkANWP%2FpKoeh%2F7miroudJzpqx2iAiIywMkmtn%2BKeAHYAHsjpxFlnMQm8RmwI82kImcoVdz%2BCGJfb%2B2jyxDNCRmGOZeDeqnctVB6w%3D%3D)

- RCP คือ ทุก Containers ต้องรถบุความต้องการ Resource และส่งข้อมูลนั้นไปยัง Platform ด้วย (Dockerd), Container ควรแบ่งข้อมูลต่างๆ เช่น CPU, Memory, Networking, Disk ให้ Platform ซึ่งจะส่งผลต่อการทำงานของ Platform ด้วยในการปรับเปลี่ยน หรือ ควบคุม Environment ของ Container อยู่เช่น Scheduling, Auto Scaling, Capacity Management, SLA ของ Container
- ทุกๆ การรัน Container ใน Environment จำเป็นต้องระบุว่า Container เรานั้นจะใช้ Resource ของ Platform หรือ Infrastructure เท่าไร?
	- Python - 1 Container → ใช้ cpu, memory, networking เท่าไร? ซึ่งสามารถกำหนดได้
	- เพื่อทำให้ Platform รู้ว่าการจะ running Container จะต้องใช้ Resource ประมาณไหน แล้ว Platform จะไปตามหา Machine ที่เพียงพอมัน running Container
	- เช่นการทำ Auto Scaling ต้องทราบว่าแต่ละ Container จะใช้ resouce (cpu, memory, ..) อีกเท่าไร เพื่อที่จะให้ Platform provide และจัดการให้

---


หลักการสำคัญขอบ Container คือ

- Container พร้อมจะ down หรือ died เสมอ
- Platform ต้องทราบเสมอว่า Container down, died, slowly รึป่าว? โดยส่วนใหญ่จะสร้าง Container ใหม่แล้วถ้าใช้ได้ ก็จะลบตัวเก่าออก
- ซึ่งการถ้ามี container ตัวที่ died อยู่แล้วสร้าง Container ใหม่ขึ้นมาก็จะมี gap time หรือ เวลาที่ระบบต้องรอ หรือ application ต้องรอ container นั้นในการสร้างขึ้นมาใหม่ ซึ่งจะเกี่ยวข้องกับ Principle: Single Concern Principle ในแนวคิดที่ว่าสร้าง Container ขึ้นมามากว่า 1 instances แล้วเราเรียกกลุ่มนั้นว่า Pod หากมี instances ใน down container ที่เหลือก็จะทำงานได้

หลักการสร้าง Container ที่สำคัญคือ

- เราแยก Application ออกจาก Configuration และ Storage
	- เราจะรู้ว่า Application จะใช้อะไรบ้าง และจะแยก Configuration ออกมาได้
	- ทำให้การ build container จาก image ในแต่ละครั้งสามารถนำไปใช้ในหลายๆ Environment ได้
