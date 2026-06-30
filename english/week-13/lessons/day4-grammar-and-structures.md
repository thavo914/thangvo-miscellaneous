# Day 4: Grammar & Structures (Navigating Vendor Constraints)

---

## 1. Grammar Focus

### 1. Modal Perfect for Speculation & Deduction
- **Quote**: *"The vendor must have missed our request — it's been two weeks with no reply."*
- **Rule Explanation**: Use Modal Perfect to speculate or make logical deductions about past events. The structure is:
  - `must have + P.P.` → near certainty about a past event (*"They must have forgotten."*)
  - `might/could have + P.P.` → possibility about a past event (*"They might have changed their policy."*)
  - `should have + P.P.` → something that was expected but didn't happen (*"We should have sent the request earlier."*)
- **Common Pitfall Box**:
  > **Incorrect**: We *should sent* the escalation email last week.
  > **Correct**: We *should have sent* the escalation email last week.
  > *(Always use "have + past participle" after the modal, not the base or simple past form.)*

---

### 2. Reporting Verbs (suggest/recommend/propose + that + Subject + base verb)
- **Quote**: *"I'd recommend that we prepare a formal request before the call."*
- **Rule Explanation**: Certain reporting verbs (suggest, recommend, propose, request, insist) are followed by a **"that" clause** where the verb inside is in the **base form** (infinitive without "to"), regardless of the subject. This is called the **subjunctive mood**.
  - `I suggest that + [Subject] + [base verb]`
  - `I recommend that + [Subject] + [base verb]`
  - `I propose that + [Subject] + [base verb]`
- **Common Pitfall Box**:
  > **Incorrect**: I recommend that she *sends* the escalation today.
  > **Correct**: I recommend that she *send* the escalation today.
  > *(After suggest/recommend/propose + that, always use the base verb — no -s, -ed, or -ing.)*

---

### 3. Passive with Modals
- **Quote**: *"CDC must be approved by the vendor first."* / *"The snapshot approach should be seen as temporary."*
- **Rule Explanation**: Combine a modal with the passive to describe actions where the focus is on what needs to happen, not who does it. This is very common in professional and technical English.
  - Structure: `[Subject] + modal + be + Past Participle`
  - Examples: *"The request can be submitted online."* / *"The pipeline should be tested before deployment."*
- **Common Pitfall Box**:
  > **Incorrect**: The change *must approved* by the DBA team.
  > **Correct**: The change *must be approved* by the DBA team.
  > *(Don't forget "be" between the modal and the past participle.)*

---

## 2. Sentence Structure Templates

### Template 1 – Speculating About What Went Wrong
**Communicative Function**: To make a reasonable deduction about a past technical problem.
**Formula**: `[Subject] + must have + [P.P.] + because + [Evidence/Reason]`

**Examples**:
1. *(Everyday)*: She must have left early because her desk was already cleared when I arrived.
2. *(Data/Casino)*: The ETL job must have failed overnight because the dashboard is showing yesterday's data.
3. *(Workplace)*: He must have missed the Slack message because he hasn't updated the ticket yet.

---

### Template 2 – Making a Professional Recommendation
**Communicative Function**: To suggest an action clearly and professionally in a meeting or email.
**Formula**: `I'd recommend that + [Subject] + [base verb] + [Object/Phrase] + before + [Noun/Event]`

**Examples**:
1. *(Everyday)*: I'd recommend that you check the weather before planning an outdoor event.
2. *(Data/Casino)*: I'd recommend that we get sign-off from the vendor before enabling CDC on the production database.
3. *(Workplace)*: I'd recommend that the team run a load test before the system goes live next month.

---

### Template 3 – Describing What Must Be Done (Passive Authority)
**Communicative Function**: To describe a requirement or process without naming who does it.
**Formula**: `[Noun/Task] + must/should + be + [P.P.] + by + [Deadline/Person/Team]`

**Examples**:
1. *(Everyday)*: The form must be submitted by the end of the month.
2. *(Data/Casino)*: The CDC configuration should be tested by the data engineering team before it goes into production.
3. *(Workplace)*: All requests must be approved by the line manager before the budget is released.

---

### Template 4 – Proposing a Temporary Workaround
**Communicative Function**: To suggest a short-term alternative while waiting for a permanent solution.
**Formula**: `In the meantime, I'd suggest that we + [base verb] + [Noun Phrase] + as a temporary [solution/fallback]`

**Examples**:
1. *(Everyday)*: In the meantime, I'd suggest that we use the bus as a temporary solution while the car is being repaired.
2. *(Data/Casino)*: In the meantime, I'd suggest that we set up a 15-minute snapshot as a temporary fallback until CDC is approved.
3. *(Workplace)*: In the meantime, I'd suggest that we use the staging environment as a temporary work-around.

---

### Template 5 – Anticipating Pushback
**Communicative Function**: To prepare for resistance and propose a plan to handle it.
**Formula**: `If they push back on [Noun/Verb-ing], we can work around it by + [Verb-ing]`

**Examples**:
1. *(Everyday)*: If they push back on the price, we can work around it by offering a flexible payment plan.
2. *(Data/Casino)*: If the vendor pushes back on CDC access, we can work around it by using log shipping instead.
3. *(Workplace)*: If the client pushes back on the timeline, we can work around it by reducing the scope for the first release.

---

## 3. Production & Translation Drills

### "Your Turn" Exercises
- The data pipeline ______________________ must have ______________________ because ______________________.
- I'd recommend that we ______________________ before ______________________.
- The migration ______________________ must be ______________________ by ______________________.
- In the meantime, I'd suggest that we ______________________ as a temporary ______________________.
- If they push back on ______________________, we can work around it by ______________________.

### Translation / Transformation Challenge
1. Vendor có lẽ đã bỏ qua yêu cầu của chúng ta vì đã hai tuần mà không có phản hồi.
   *(Translate using Modal Perfect: "must have")*
2. Tôi đề xuất rằng nhóm nên gửi yêu cầu chính thức trước cuộc họp ngày mai.
   *(Translate using "I propose that + subject + base verb")*
3. Tất cả các thay đổi phải được phê duyệt bởi DBA trước khi triển khai lên môi trường production.
   *(Translate using Passive with Modal)*

---

## 4. Spot the Mistake (Error Correction Drill)

1. *Incorrect*: The CDC setup should approved by the vendor before we proceed.
2. *Incorrect*: I recommend that she sends the escalation email to the account manager immediately.
3. *Incorrect*: The job must have fail because no one was monitoring the pipeline last night.

<details>
<summary><b>Show Answer Key</b></summary>
1. <b>Correct</b>: The CDC setup should <i>be approved</i> by the vendor before we proceed. (Don't forget "be" in the Passive with Modal structure.)<br>
2. <b>Correct</b>: I recommend that she <i>send</i> the escalation email to the account manager immediately. (After recommend/suggest/propose + that, use the base verb without -s.)<br>
3. <b>Correct</b>: The job must have <i>failed</i> because no one was monitoring the pipeline last night. (Modal Perfect requires "have + past participle", not base verb.)
</details>
