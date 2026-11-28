# 📘 Week 26 Curriculum Note: Scheduled Action & Prep Buffer — `We will begin loading the bus at 8:30 A.M., so you have 15 minutes to prepare.`

> **Target Week**: Week 26  
> **Type**: Operational Announcement Pattern (**`will begin + V-ing + at [Time], so you have [Duration] to prepare`**), Verb Pattern (**`begin + V-ing`** vs **`begin + to V0`**), Key Vocabulary (**`will begin loading`**), & Sound-Block Chunking Drills  
> **Core Concept**: Announcing the exact start of a scheduled process using `will begin [V-ing]` (highlighting the process as a whole) and giving listeners a clear countdown buffer with `so you have [Time] to prepare`. *(Vietnamese: Phân tích mẫu câu thông báo giờ khởi động quy trình & thời gian chuẩn bị `We will begin loading the bus at 8:30 A.M., so you have 15 minutes to prepare.`, giải mã cấu trúc `begin + V-ing` và ứng dụng trực tiếp trong Data Engineering ETL.)*

---

## 🧠 Linearthinking Dissection & Sound-Block Chunking

* **Source Sentence**: *"We will begin loading the bus at 8:30 A.M., so you have 15 minutes to prepare."*
* **Noise Stripped (Modifiers)**: `at 8:30 A.M.` (start time), `to prepare` (purpose infinitive).
* **Core Skeleton (`Cause ➔ Effect`)**: `We / will begin loading / the bus` $\xrightarrow{\text{so}}$ `you / have / 15 minutes.`
* **Logical Connection**: `Scheduled Start (8:30 A.M.) ➔ Causal Link (so) ➔ Actionable Prep Window (15 minutes to prepare)`.
* **Sound-Block Chunking (`/`)**:
  ```text
  [We will begin loading]   /   [the bus]   /   [at 8:30 A.M.,]   /   [so you have]   /   [15 minutes to prepare.]
            └─                    └─                └─                    └─                      └─
    Process Starter          Target Object      Exact Time            Result Link            Prep Window
  ```

---

## 🌟 1. Core Explanation & Vocabulary Breakdown

### 1. Cụm động từ **`will begin loading`** (`begin + V-ing` vs. `begin + to V0`)
* **`load` (Verb)**: Chất hàng hóa/hành lý lên xe (`load the bus`) hoặc nạp dữ liệu vào hệ thống (`load data into the warehouse`).
* **Tại sao dùng `begin loading` (`V-ing`) thay vì `begin to load` (`to V0`)?**
  * Cả hai đều đúng ngữ pháp, nhưng trong thông báo vận hành hoặc quy trình kỹ thuật, **`begin + V-ing`** nhấn mạnh vào **cả một quá trình hành động diễn ra liên tục** (*chất đồ và cho khách lên xe*).
  * *(Lưu ý tránh trùng 2 `-ing`: nếu động từ chính đang chia tiếp diễn `is beginning`, BẮT BUỘC dùng `to V0`: "The bus is **beginning to load**", không nói *beginning loading* ❌).*
* **Plain English (`english/AGENTS.md`)**:
  * Trong thông báo chính thức, loa sân bay/bến xe dùng **`will begin loading`**.
  * Trong giao tiếp đồng nghiệp hàng ngày, người bản xứ thường dùng **`we'll start loading`** cho tự nhiên, thân thiện hơn.

### 2. Tại sao dùng `the bus` ở đây, trong khi câu trước lại dùng `bus 208` (không có `the`)?
* Câu trước: **`bus 208`** *(có mã số định danh đi kèm ➔ không dùng `the`)*.
* Câu này: **`the bus`** *(chỉ chiếc xe cụ thể đã nhắc ở câu trước, không lặp lại số hiệu ➔ bắt buộc dùng `the`)*.

### 3. Khung thời gian chuẩn bị: `so you have [Duration] to prepare`
* Nối trực tiếp mốc bắt đầu với khoảng thời gian còn lại giúp người nghe tự tính toán hành động mà không bị cập rập.

---

## 📚 2. Categorized Usages & Real-Life Examples

### Domain A: Transit, Events & Workshop Operations
* *"We **will begin loading the bus at 8:30 A.M.**, **so you have 15 minutes to prepare**."*  
  *(Chúng tôi sẽ bắt đầu xếp hành lý và đón khách lên xe lúc 8 giờ 30 sáng, nên quý vị có 15 phút để chuẩn bị.)*
* *"The keynote speaker **will begin presenting** at 2:00 P.M., **so everyone has 10 minutes to grab coffee**."*  
  *(Diễn giả chính sẽ bắt đầu trình bày lúc 2 giờ chiều, nên mọi người có 10 phút đi lấy cà phê.)*

### Domain B: Data Engineering (ETL Pipelines & Deployments)
* **Trong kỹ thuật dữ liệu (ETL = Extract, Transform, *Load*)**:
  * *"We **will begin loading the production tables** at midnight, **so please finish any ad-hoc queries before then**."*  
    *(Chúng tôi sẽ bắt đầu nạp dữ liệu vào các bảng production lúc nửa đêm, nên vui lòng hoàn tất các truy vấn đột xuất trước giờ đó.)*
  * *"The script **will start ingesting** the historical logs in five minutes, **so you have a short window to verify the schema**."*  
    *(Script sẽ bắt đầu nạp log lịch sử trong 5 phút nữa, nên bạn có một khoảng thời gian ngắn để kiểm tra lại schema.)*

---

## 💡 3. Proactive Native Alternatives & Variations

| Style / Register | Expression / Sentence | Practical Nuance / When to Use |
| :--- | :--- | :--- |
| **Formal Announcement (Original)** | *"We **will begin loading** the bus at 8:30 A.M., **so you have 15 minutes to prepare**."* | Chuẩn mực thông báo nhà ga, sân bay, sự kiện có tổ chức. |
| **Casual / Spoken Workplace** | *"We'll **start loading** the bus at 8:30, **so you've got 15 minutes to get ready**."* | ⚡ Gần gũi, nhanh gọn khi nhắc đồng nghiệp đi team building (`start` + `get ready`). |
| **Tech / Slack Alert** | *"We'll **kick off the data load** at 8:30 A.M., **giving everyone a 15-minute heads-up**."* | Tự nhiên khi thông báo lịch chạy job hoặc deployment trên Slack. |

---

## ⚠️ 4. Common Pitfalls & Vietlish Traps

| ❌ Common Mistake / Awkward Phrasing | ✅ Natural Native English | Why / Linguistic Reason |
| :--- | :--- | :--- |
| *We will begin **load** the bus...* | *We will begin **loading** (or **to load**) the bus...* | Sau `begin` bắt buộc là `V-ing` hoặc `to V0`, cấm dùng động từ nguyên mẫu không `to`. |
| *...so you have 15 minutes **for prepare**.* | *...so you have 15 minutes **to prepare**.* | Chỉ mục đích với khoảng thời gian dùng `to + V0` (`have 15 minutes to prepare`), không dùng *for + V0*. |
| *We are **beginning loading** the data.* | *We are **beginning to load** the data.* | Tránh 2 đuôi `-ing` đứng sát nhau (`beginning` + `to V0`). |

---

## 🧱 5. 5-Minute Chunking Drill (Keith Method)

* **Starter Chunks**: `We-will-begin-loading` | `We'll-start-loading` | `The-job-will-begin-ingesting`
* **Time & Prep Chunks**: `the-bus-at-8:30-A.M.,` | `so-you-have-15-minutes` | `to-prepare.`
* **15s Mini-Story (Connecting Transit Notes 6 + 7)**:
  > *"As a reminder, / bus-208 from Richmond to Burnaby / is running on time, / with a scheduled departure at 9 A.M. / We-will-begin-loading / the-bus-at-8:30-A.M., / so-you-have-15-minutes / to-prepare!"*

---

## 🎯 6. Lesson Integration Blueprint (For `/generate-english-lesson`)

* **Slot-Filling Formula**:
  * `We will begin + [V-ing] + [Object] + at [Time], so you have [Duration] to [V0].`
  * *Engineering Example*: *"We will begin deploying the database patch at 11:00 P.M., so you have 30 minutes to wrap up your tests."*
* **Practice Drill**:
  * **Prompt**: *"Chúng tôi sẽ bắt đầu nạp dữ liệu mới vào kho lúc 9 giờ tối, nên đội phân tích có 20 phút để lưu lại các báo cáo hiện tại."*
  * **Suggested Answer**: *"We will begin loading the new data into the warehouse at 9 P.M., so the analytics team has 20 minutes to save their current reports."*
* **AI Speaking Simulation Prompt**:
  * *"In ChatGPT Voice Mode, ask me to deliver a 2-sentence morning announcement combining 'running on time, with a scheduled departure at 9 A.M.' and 'will begin loading... so you have 15 minutes to prepare'."*
