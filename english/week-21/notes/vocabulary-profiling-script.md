# 📘 Week 21 Curriculum Note: `a profiling script` & `data profiling`

> **Target Week**: Week 21  
> **Type**: Technical Engineering Collocation & Data Quality Vocabulary  
> **Core Concept**: 1) Defining `a profiling script` (a dedicated script that inspects data distributions, null counts, schema consistency, and anomalies directly from raw sources like Kafka or tables). 2) Mastering verbs and collocations around data profiling in production engineering (`inspect`, `profile the stream`, `catch schema drift`). *(Vietnamese: Kịch bản / Script khảo sát đặc tính dữ liệu; Đo đạc hồ sơ dữ liệu trực tiếp từ nguồn).*

---

## 🌟 1. Core Explanation & Mechanics

Trong kỹ thuật dữ liệu (Data Engineering) và kiến trúc dòng dữ liệu (Streaming Ingestion), **`a profiling script`** là một thuật ngữ nghiệp vụ cốt lõi:

### 1. Bản chất của `profiling` trong Kỹ thuật dữ liệu
* **Nguồn gốc từ vựng**:
  * Động từ **`profile [something]`**: Khảo sát, phác thảo hồ sơ đặc tính chi tiết của một đối tượng.
  * Trong phần mềm, có 2 nhánh `profiling`:
    1. **Performance Profiling**: Đo đạc hiệu năng CPU, bộ nhớ của mã nguồn (CPU profiler).
    2. **Data Profiling**: **Khảo sát chất lượng, cấu trúc và phân phối của tập dữ liệu**.
* **Định nghĩa `a profiling script`**:
  * Là một đoạn mã (thường viết bằng Python, PySpark, Polars hoặc SQL) được viết ra nhằm mục đích **kiểm tra nhanh cấu trúc dữ liệu, tỷ lệ null, số lượng giá trị duy nhất (cardinality), giá trị min/max, và phát hiện schema drift** từ nguồn dữ liệu thô (như Kafka topic, S3 bucket, hoặc Staging table).
* **Các Power Collocations**:
  * **`write / run a profiling script`**: Viết / chạy script khảo sát dữ liệu.
  * **`inspect table data directly from [source]`**: Kiểm tra dữ liệu bảng trực tiếp từ nguồn.
  * **`data profiling metrics`**: Các chỉ số đo đạc hồ sơ dữ liệu (null percentage, distinct counts, data types).
  * **`automated profiling job`**: Tác vụ khảo sát dữ liệu tự động định kỳ.

---

### 2. Phân biệt `profiling` vs. `testing` vs. `monitoring`

| Thuật ngữ | Trọng tâm bản chất | Ví dụ cụ thể |
| :--- | :--- | :--- |
| **Data Profiling** | **Khám phá và mô tả** đặc tính phân phối của dữ liệu thô (Summary & Distribution) | *Tỷ lệ null là 12%, max value là 9999.* |
| **Data Testing** | **Kiểm định pass/fail** dựa trên các quy tắc xác định trước (Assertion) | *Cột `player_id` không được phép null (`dbt test`).* |
| **Data Monitoring** | **Theo dõi biến thiên** liên tục theo thời gian thực (Time-series alerts) | *Đột biến lưu lượng 500% trên Kafka topic.* |

---

## 📚 2. Categorized Usages & Real-Life Examples

### Domain A: Kafka Streaming & CDC Ingestion (The User's Context)
* **Khảo sát dữ liệu CDC từ Kafka trước khi ghi vào Delta Lake**:
  * *"**We should write a profiling script to inspect table data directly from Kafka** before configuring the streaming ingestion DAG."*
* **Phát hiện dị biệt trong cấu trúc JSON payload**:
  * *"The **profiling script** revealed that several Kafka event messages contained unexpected nested schema structures."*
* **Kiểm tra độ trễ và khối lượng message**:
  * *"I ran a **lightweight profiling script** against the Kafka partition to measure serialization latency."*

### Domain B: Data Quality, Governance & Staging Tables (dbt / Databricks)
* **Khảo sát bảng trước khi viết logic mô hình hóa (Staging Model)**:
  * *"Before writing the silver dbt transformation, the analytics engineer executed a **profiling script** to inspect primary key uniqueness."*
* **Tự động hóa phát hiện Schema Drift**:
  * *"We integrated an open-source **profiling tool** into CI/CD to detect upstream schema modifications automatically."*
* **Đo đạc độ lệch phân phối (Data Distribution Skew)**:
  * *"Our weekly **data profiling script** alerted us that 40% of transaction amounts were concentrated in a single location."*

### Domain C: Incident Post-Mortems & Troubleshooting
* **Điều tra nguyên nhân sập job (Worker Node OOM)**:
  * *"To debug the Spark OOM crash, we executed a **profiling script** to check whether a skewed key caused shuffle spill to disk."*
* **Xác thực dữ liệu sau khi chạy Backfill**:
  * *"After backfilling 30 days of patron comp balance, I ran a **quick profiling script** to ensure no historical balances were zeroed out."*

---

## 💡 3. Proactive Native Alternatives & Variations

| Phong cách / Ngữ cảnh | Mẫu câu đề xuất | Sắc thái sử dụng |
| :--- | :--- | :--- |
| **Gốc của bạn (Accurate & Standard)** | *We should write a profiling script to inspect table data directly from Kafka.* | 🌟 Rất rõ ràng, tự nhiên, câu cửa miệng chuẩn mực của Data Engineer. |
| **Chính xác hơn về mặt Kafka (Technical Polish)** | *We should write a script to profile the event payloads directly from Kafka.* | Rất chuẩn kỹ thuật vì Kafka lưu trữ *messages/payloads* thay vì *tables*. |
| **Văn nói nhanh gọn (Standup Reflex)** | *Let's write a quick script to probe the Kafka stream.* | ⚡ Dùng `probe the stream` (thăm dò luồng dữ liệu) cực kỳ ngắn gọn và sinh động. |
| **Nhấn mạnh chất lượng dữ liệu** | *Let's run a data quality audit on the raw Kafka topic.* | Dùng khi muốn báo cáo với Lead/Product Manager về kiểm toán chất lượng. |

---

## ⚠️ 4. Common Pitfalls & Vietlish Traps

| ❌ Common Mistake / Awkward Phrasing | ✅ Natural Native English | Why / Linguistic Reason |
| :--- | :--- | :--- |
| *a script to check data profile* | *a **profiling script*** / *a **data profiling script*** | Trong tiếng Anh kỹ thuật, danh động từ `profiling` đứng làm danh từ bổ nghĩa (*noun adjunct*) trước `script`. |
| *write a script to test data profile* | *write a script to **profile data*** | Động từ chuẩn xác cho hành động khảo sát phân phối dữ liệu là `to profile`. |
| *read table directly in Kafka* | *inspect data directly **from** Kafka* | Nguồn phát dữ liệu đi với giới từ **`from`**, không dùng *in*. |
| *profile code* (khi muốn nói khảo sát dữ liệu) | *profile **data*** vs. *profile **code*** | Cần nói rõ: *profile data* (khảo sát dữ liệu) khác với *profile code* (đo thời gian chạy hàm, đo CPU/RAM). |

---

## 🎯 5. Lesson Integration Blueprint (For `/generate-english-lesson`)

### A. Grammar / Template Slot Formulas:
* **Formula 1 (Technical Proposal for Data Quality)**:
  * `We should write a profiling script to inspect + [Dataset / Stream] + directly from + [Source / Broker].`
  * *Engineering Example*: *"We should write a profiling script to inspect the Debezium CDC stream directly from the Kafka consumer."*
* **Formula 2 (Investigative Action in Incident Response)**:
  * `Before we trigger [Backfill / Migration], let's run a quick profiling script to verify [Key Constraint / Row Counts].`
  * *Workplace Example*: *"Before we trigger the 30-day comp balance reload, let's run a quick profiling script to verify patron anchor balances."*

### B. Practice Drills:
* **Drill 1 (Technical Standup Proposal)**:
  * **Drill Prompt**: In daily standup, propose to your team that before building the new silver Delta table, you should write a profiling script to examine null values in the incoming Kafka topic.
  * **Suggested Answer**: *"I suggest we write a profiling script to inspect the raw Kafka messages and check null rates before materializing the silver table."*
* **Drill 2 (Explaining an Anomaly to a Stakeholder)**:
  * **Drill Prompt**: Tell a product analyst that your profiling script detected a 10% schema mismatch in the player rating daily events.
  * **Suggested Answer**: *"Our automated profiling script caught a 10% schema mismatch on the player rating daily stream coming from the accounting database."*

### C. Translation Prompt (Vietnamese to English):
* **Prompt**: *"Chúng ta nên viết một script khảo sát dữ liệu để kiểm tra trực tiếp dữ liệu từ Kafka trước khi nạp vào kho dữ liệu."*
* **Suggested Native Answer**: *"We should write a profiling script to inspect the data directly from Kafka before ingesting it into the warehouse."*

### D. AI Speaking Simulation Prompt:
* *"In ChatGPT Voice Mode, act as a senior data platform architect. Ask me: 'How do you plan to validate the raw event stream from Kafka before feeding it into downstream dbt models?' I will reply using 'We should write a profiling script to inspect...' and explain the checks for nulls, duplicates, and schema drift. Give feedback on engineering precision."*
