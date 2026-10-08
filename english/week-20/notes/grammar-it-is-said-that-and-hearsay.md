# 📘 Week 20 Curriculum Note: `It is said that...` & Conversational Hearsay

> **Target Week**: Week 20  
> **Type**: Impersonal Passive Structure vs. Spoken Hearsay Patterns  
> **Core Concept**: Understanding the impersonal reporting structure `It is said that...` (often found in formal texts, proverbs, and tech literature) and mastering its natural native spoken equivalents (`I've heard that`, `Apparently`, `Word is that`) for daily workplace communication. *(Vietnamese: Cấu trúc bị động vô nhân xưng "người ta nói rằng / nghe nói rằng" và các phản xạ giao tiếp tự nhiên của người bản xứ khi thuật lại thông tin/tin đồn).*

---

## 🌟 1. Core Explanation & Mechanics

### Grammatical Structure
$$\mathbf{It\ is\ said\ that} + \mathbf{[Clause\ (Subject\ +\ Verb...)]}$$
$$\mathbf{[Subject]} + \mathbf{is\ /\ are\ said\ to} + \mathbf{[Base\ Verb\ /\ have\ V3]}$$

* **Bản chất của `It is said that`**:
  - Đây là cấu trúc **bị động vô nhân xưng (Impersonal Passive)**.
  - Mục đích: Thuật lại thông tin, quan niệm chung hoặc nhận định mà **không cần (hoặc không muốn) chỉ đích danh ai là người nói**.
  - Sắc thái: Rất trang trọng (formal), mang tính văn chương, báo chí hoặc châm ngôn triết lý.

---

### ⚠️ Khoảng cách giữa Sách giáo khoa vs. Giao tiếp thực tế (Textbook vs. Real Speech)

Trong môi trường kỹ thuật hàng ngày (họp sprint, chat Slack, sync 1-on-1), người bản xứ **rất hiếm khi mở đầu bằng `"It is said that..."`** vì nó nghe quá trịnh trọng và xa cách. Thay vào đó, họ có các phản xạ cực kỳ linh hoạt:

```
                            ┌── 1. Thân mật, khiêm tốn: "I've heard that..." (Mình nghe nói là...)
                            ├── 2. Cực kỳ phổ biến trong Tech: "Apparently, ..." (Nghe đâu là / hình như là...)
    Spoken Hearsay &        │
    Reporting Reflexes      ├── 3. Tin hành lang, sắp xảy ra: "Word is that..." / "Rumor has it that..."
                            └── 4. Giới châm ngôn / Sách kỹ thuật: "It is said that..." (Tương truyền / Người ta bảo...)
```

| Mẫu câu | Ngữ cảnh sử dụng | Ví dụ thực tế |
| :--- | :--- | :--- |
| **`I've heard that...`** | Giao tiếp đồng nghiệp hàng ngày | *"**I've heard that** AWS is reducing egress fees next month."* |
| **`Apparently, ...`** | Cập nhật thông tin gián tiếp, thấy lạ | *"**Apparently**, the vendor changed their API auth flow without notice."* |
| **`Word is that...`** | Tin hành lang trong công ty / dự án | *"**Word is that** we might expand the data team next quarter."* |
| **`They say that...`** | Thói quen, quan niệm đời sống | *"**They say that** taking short breaks improves focus during long coding sessions."* |
| **`It is said that...`** | Châm ngôn kỹ thuật, thuyết trình | *"**It is said that** there are only two hard things in Computer Science: cache invalidation and naming things."* |

---

## 📚 2. Categorized Usages & Real-Life Examples

### Domain A: Tech Lore, Whitepapers & Industry Wisdom
* **Famous Computer Science Adages (Châm ngôn kinh điển)**:
  * *"**It is said that** premature optimization is the root of all evil."*
  * *"In distributed systems, **it is said that** networks are never truly reliable."*
* **Product Reputation & Hearsay (`is said to be`)**:
  * *"DuckDB **is said to be** extraordinarily fast for analytical workloads on local machines."*
  * *"The new Python release **is said to offer** up to 30% performance improvements."*

### Domain B: Workplace Updates & Organization Changes
* **Upcoming Infrastructure Shifts (`I've heard that` / `Word is that`)**:
  * *"**I've heard that** management wants to migrate all on-premise workloads to Google Cloud by Q4."*
  * *"**Word is that** the security team is rolling out mandatory MFA across all staging bastion hosts."*
* **Incident Root Cause Updates (`Apparently`)**:
  * *"**Apparently**, an unindexed query triggered a CPU spike on the replica cluster."*

### Domain C: Daily Life, Sports & Health
* **Running & Recovery (`They say that` / `Supposedly`)**:
  * *"**They say that** staying in Zone 2 heart rate builds the strongest aerobic base for a marathon."*
  * *"**Supposedly**, drinking electrolytes before an early morning run helps prevent muscle cramps."*

---

## ⚠️ 3. Common Pitfalls & Vietlish Traps

| ❌ Common Mistake / Awkward Phrasing | ✅ Natural Native English | Why / Linguistic Reason |
| :--- | :--- | :--- |
| *People say me that AWS is down.* | *“**I've heard that** AWS is down.”* / *“People say that...”* | Động từ `say` không đi trực tiếp với tân ngữ người (`say me` là sai); phải dùng `tell me` hoặc chuyển thành `I've heard that`. |
| *It says that the company is hiring.* (khi nói về tin đồn) | *“**Word is that** the company is hiring.”* | `It says that` chỉ dùng khi chủ ngữ là văn bản, sách báo cụ thể (*The document says that...*); không dùng cho tin đồn truyền miệng. |
| *It is said that you are late today.* (nói chuyện phiếm) | *“**I heard** you got stuck in traffic today.”* | Dùng `It is said that` trong giao tiếp cá nhân nghe trịnh trọng quá mức, gây cảm giác xa cách và châm biếm. |
| *He is said that he is smart.* | *“He **is said to be** smart.”* | Cấu trúc chuyển đổi đúng là `S + is said + to Verb`, không dùng mệnh đề `that` sau danh từ chủ ngữ. |

---

## 🎯 4. Lesson Integration Blueprint (For `/generate-english-lesson`)

### A. Grammar / Template Slot Formulas:
1. **Formal Wisdom / Tech Talk Presentation**:
   $$\mathbf{In\ software\ engineering,\ it\ is\ said\ that} + \mathbf{[Principle\ /\ Rule]}.$$
   * *Engineering Example*: *"In database design, **it is said that** disk I/O is almost always the ultimate bottleneck."*

2. **Conversational Technical Hearsay**:
   $$\mathbf{I've\ heard\ that\ /\ Apparently,} + \mathbf{[Vendor\ /\ Tool]} + \mathbf{is\ planning\ to} + \mathbf{[Action]}.$$
   * *Engineering Example*: *"**Apparently**, the vendor is planning to deprecate their v1 REST endpoints by the end of the year."*

### B. Practice Drill:
* **Drill Prompt**: Trong một buổi thảo luận cà phê với đồng nghiệp, bạn muốn chia sẻ thông tin nghe phong phanh rằng công ty sắp cấp ngân sách cho team học chứng chỉ AWS/Snowflake. Hãy chọn cách nói tự nhiên nhất thay vì dùng cấu trúc cứng nhắc `It is said that`.
* **Suggested Answer**: *"**Word is that** the engineering department is allocating budget for cloud certifications next quarter."* (hoặc: *"**I've heard that** management might cover AWS certs soon."*)

### C. AI Speaking Simulation Prompt:
* *"In ChatGPT Voice Mode, act as a coworker catching up on industry trends. We are discussing new data tooling. Whenever you bring up a new technology, share what people are saying about it using 'I've heard that...', 'Apparently...', or 'It's said to be...'. We will practice exchanging technical hearsay naturally."*
