# 📘 Week 20 Curriculum Note: `has raised its prices`

> **Target Week**: Week 20  
> **Type**: Workplace & Vendor Collocation / Business Operations Expression  
> **Core Concept**: To describe a supplier, cloud provider, or SaaS company increasing the cost of its services, licenses, or products. *(Vietnamese: [Nhà cung cấp / đối tác / dịch vụ] đã tăng giá / nâng biểu phí dịch vụ).*

---

## 🌟 1. Core Explanation & Mechanics

### Grammatical Structure & Pattern
$$\mathbf{[Company\ /\ Vendor\ /\ Provider]} + \mathbf{has\ raised\ its\ prices\ (by\ [X\%]\ /\ on\ [Service])}$$

* **Quy tắc vàng phân biệt `raise` vs. `rise` (Bẫy kinh điển)**:
  - **`raise` (Ngoại động từ - Transitive Verb)**: Bắt buộc phải có tân ngữ đi liền sau (`raise + something`). Chủ thể tác động làm tăng cái gì đó lên.
    - ✅ *"The vendor **has raised its prices**."*
    - ❌ *The vendor has risen its prices.* (Sai ngữ pháp hoàn toàn).
  - **`rise` (Nội động từ - Intransitive Verb)**: Tự tăng lên, không có tân ngữ phía sau.
    - ✅ *"Cloud storage costs **have risen** significantly."*
    - ❌ *Cloud storage costs have raised.* (Sai ngữ pháp).
* **Tính từ sở hữu chuẩn xác (`its` vs. `their`)**:
  - Khi nói về một công ty/nhà cung cấp cụ thể (AWS, Snowflake, Datadog, nhà mạng): dùng đại từ sở hữu số ít **`its prices`** (hoặc `its rates / subscription fees`).
  - Khi nói về nhà thầu hoặc các bên tư vấn độc lập (contractors, consultants): dùng **`their rates / prices`**.
* **Các biến thể kết hợp tự nhiên**:
  - `has recently raised its prices`: Vừa mới tăng giá gần đây.
  - `has raised its prices by [X]%`: Tăng giá thêm bao nhiêu phần trăm.
  - `is planning to raise its prices`: Dự định tăng giá trong kỳ tới.

---

## 📚 2. Categorized Usages & Real-Life Examples

### Domain A: Cloud Providers, SaaS Tools & Data Engineering
* **SaaS License Inflation (Phần mềm tăng giá dịch vụ)**:
  * *"Our logging platform **has raised its prices** by 25%, so we're evaluating open-source self-hosted options like Graylog."*
* **Cloud Infrastructure & Data Warehouses (Đám mây tăng biểu phí)**:
  * *"The cloud vendor **has raised its network egress prices**, which explains why our cross-region replication bill spiked this month."*
  * *"Snowflake **has raised its compute credit prices**, so we need to strictly configure our cluster auto-suspend timeouts."*
* **Third-Party API Providers (Đối tác API tăng phí trích xuất)**:
  * *"The financial data vendor **has raised its API subscription prices**, forcing us to optimize our daily ingestion requests."*

### Domain B: Contractors, Vendors & Procurement
* **Consulting & Outsourcing Rates (Tư vấn / Thầu phụ tăng giá)**:
  * *"The external security auditing firm **has raised its rates**, so procurement is negotiating a multi-year cap."*
* **Hardware & Data Center Suppliers (Nhà cung cấp phần cứng)**:
  * *"Our server rack colocation provider **has raised its electricity and cooling prices**."*

### Domain C: Daily Life, Food & Personal Services
* **Local Coffee & Dining (Quán ăn, cà phê tăng giá)**:
  * *"The coffee shop downstairs **has raised its prices** twice since January."*
* **Gym & Entertainment Subscriptions (Dịch vụ giải trí)**:
  * *"The streaming service **has raised its family plan prices**, so I decided to cancel my subscription."*

---

## ⚠️ 3. Common Pitfalls & Vietlish Traps

| ❌ Common Mistake / Awkward Phrasing | ✅ Natural Native English | Why / Linguistic Reason |
| :--- | :--- | :--- |
| *The vendor has risen its price.* | *“The vendor **has raised its prices**.”* | `Rise` là nội động từ, không bao giờ nhận tân ngữ; làm tăng giá phải dùng ngoại động từ `raise`. |
| *The company increased price.* | *“The company **has raised its prices**.”* | Thiếu mạo từ / tính từ sở hữu; trong kinh doanh, "giá cả" của một dịch vụ/dòng sản phẩm thường dùng số nhiều `prices`. |
| *The price has raised.* | *“Prices **have risen**.”* / *“The price **went up**.”* | Nếu đưa `Price` lên làm chủ ngữ, phải dùng `rise` hoặc `go up`. |
| *They grew the cost.* | *“They **raised their prices**.”* | "Grow" dùng cho tăng trưởng kinh doanh/cây cối; không dùng "grow cost" để nói về hành động tăng giá. |

---

## 🎯 4. Lesson Integration Blueprint (For `/generate-english-lesson`)

### A. Grammar / Template Slot Formula:
$$\mathbf{[Vendor\ /\ Tool]} + \mathbf{has\ raised\ its\ prices\ by\ [Percentage]\ (recently),\ so\ we\ need\ to} + \mathbf{[Cost\ Optimization\ Action]}.$$
* *Engineering Example*: *"Datadog **has raised its prices by 20% recently**, so we need to filter out high-cardinality metrics before sending logs."*

### B. Practice Drill:
* **Drill Prompt**: Trong cuộc họp xem xét ngân sách hạ tầng quý tới, bạn cần giải thích vì sao chi phí lưu trữ S3 và database tăng vọt. Hãy dùng cụm `has raised its prices` và nêu giải pháp nén dữ liệu.
* **Suggested Answer*: *"Our cloud storage provider **has raised its prices**, so we should immediately enable gzip compression on all cold archival buckets."*

### C. AI Speaking Simulation Prompt:
* *"In ChatGPT Voice Mode, act as an engineering manager reviewing our monthly vendor spending. Point out that a critical observability tool has become too expensive. I will explain that the vendor has raised its prices significantly, and propose a concrete cost-cutting mitigation."*
