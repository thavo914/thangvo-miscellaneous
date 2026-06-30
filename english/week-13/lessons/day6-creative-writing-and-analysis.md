# Day 6: Creative Writing & Analysis (Navigating Vendor Constraints)

---

## 1. Creative Dialogue Writing
**Instructions**: Write a new, original 10-turn conversation between you and your team lead. You are discussing the CDC blocker from your vendor and brainstorming workarounds.
**Requirement**: You must naturally include at least 2 of the target grammar rules (Modal Perfect for Speculation, Reporting Verbs + that + base verb, Passive with Modals) and 3 of the target collocations (*reach out to, work around, push back on, get sign-off, in the meantime*).
**Dialogue**:

## 2. Band 6.5-7.0 Cue Card Sample Answer

**Prompt**: Describe a time when you had to find a creative solution to a problem at work.

**Sample Answer**:
"I'd like to talk about a situation we faced recently on my data engineering team. The business wanted near-real-time data from our main OLTP database, and the cleanest solution was to enable CDC — Change Data Capture. The problem was that CDC **must be approved** by the database vendor first, and we hadn't yet **got sign-off** from them.

So instead of just waiting, I suggested that we **reach out to** the vendor's account manager directly, rather than going through the standard support queue. I also recommended that the team **set up** a 15-minute scheduled snapshot **in the meantime** as a short-term fallback. I knew the vendor **might push back on** the request if it involved changes to their managed service agreement, so we prepared a detailed technical justification document.

Looking back, I think the vendor **must have appreciated** the structured approach because they approved our request within ten days — much faster than we expected. **In the end**, the real-time feed was live within a month.

It taught me that when you hit a wall at work, there's almost always a way to **work around** it. You just need to communicate clearly and stay proactive."

### Conversational Words Highlighted:
- **get sign-off**: to receive formal approval (Vietnamese: được phê duyệt / chấp thuận)
- **reach out to**: to contact someone, especially proactively (Vietnamese: liên hệ / tiếp cận)
- **in the meantime**: while waiting for something else to happen (Vietnamese: trong thời gian chờ đợi)
- **push back on**: to resist or object to something (Vietnamese: phản đối / từ chối)
- **work around**: to find a way to deal with a problem or obstacle (Vietnamese: tìm cách giải quyết)

---

## 3. Self-Evaluation Checklist
- [ ] Did I use Modal Perfect (must/might/should have + P.P.) correctly?
- [ ] Did I use Reporting Verbs + that + base verb (recommend/suggest/propose)?
- [ ] Did I use Passive with Modals (must/should + be + P.P.)?
- [ ] Did I naturally include 3+ target collocations?

---

## 4. Casino & Data Operations Situational Responses

**Scenario 1:**
Your morning report shows the casino's live gaming dashboard is displaying data from 6 hours ago. You need to tell your team lead what likely happened and what should be done.
*(Use: must have, should be, Passive with Modal)*

<details>
<summary><b>Model Answer</b></summary>
The CDC feed must have dropped overnight — probably during the maintenance window. The pipeline should be restarted and the lag should be monitored for at least an hour to confirm it's stable. The root cause must be investigated before we sign off on this being a one-off event.
</details>

**Scenario 2:**
Your vendor has told you verbally that they approve CDC, but nothing is in writing yet. Your manager wants to start the implementation today.
*(Use: get sign-off, should be, I'd recommend that)*

<details>
<summary><b>Model Answer</b></summary>
I'd recommend that we wait until we get sign-off in writing before we start. Verbal approval is a good sign, but the configuration should be locked in only after the formal document is received. In the meantime, I can prepare the implementation plan so we're ready to move immediately once it's confirmed.
</details>
