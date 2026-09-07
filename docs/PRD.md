

| ORIN MANDARIN Learning Center  ·  欧林中文 Website — Product Requirements Document |
| :---- |

**Phase 2 of 2  (Branding → PRD)  ·  Build tool: Cursor**

Goal: a lead-generation website — turn visitors into booked inquiries via WhatsApp.

Languages: Bahasa Indonesia (default) · English toggle · 中文 accent

*Prepared July 2026*

# **Contents**

# **1\. Overview**

Orin Mandarin Learning Center is an Indonesia-based education brand with two connected service lines: Mandarin learning (courses toward YCT / HSK / TOCFL, speaking-first) and higher-education consulting (university placement for study abroad in China and Taiwan). The brand promise — “From first character to acceptance letter” — is that one trusted partner takes a family from their first Mandarin lesson through to a university offer.

**What this website is:** a lead-generation machine. Its single job is to turn visitors into booked inquiries — a free consultation or trial class — primarily through WhatsApp. Every page and component is judged against that goal.

## **1.1 Primary Objective (first 6 months)**

**Generate qualified leads/inquiries.** The north-star metric is consultations / trial classes booked per week.

## **1.2 Success Metrics**

| Metric | Target signal |
| :---- | :---- |
| North-star | Qualified consultations / trial classes booked per week (trending up) |
| Lead conversion | Visit → lead-magnet opt-in → inquiry → enrollment (track each step) |
| CTA performance | WhatsApp click-to-chat rate on key pages |
| Cost & source | Cost per lead; channel each lead came from |
| Performance | Lighthouse mobile ≥ 90 (Performance, SEO, Accessibility) |

## **1.3 Non-Goals for v1 (out of scope)**

* Online payments / checkout — inquiries close via WhatsApp for now.

* Student login / LMS / scheduling portal.

* A full standalone 中文 version — 中文 stays a brand accent in v1.

* Comments, forums, or user accounts.

# **2\. Target Users**

Four segments, differing in who decides, what they fear, and what convinces them. The site speaks to each distinctly while laddering up to one brand.

| Segment | Decision & driver | Key worry | What converts |
| :---- | :---- | :---- | :---- |
| K–12 students & parents | Parents decide; head-start \+ discipline | “Will my child stay motivated & safe?” | Trial class, visible progress, teacher quality |
| University applicants | Student \+ parents; a place abroad | “Will I get in — and afford it?” | Track record, scholarships, clear timeline |
| Adult professionals | Self-deciding; career/business ROI | “I'm busy — will this work?” | Flexible/online, business-relevant, trial |
| Study-abroad families | Parents \+ student; China / Taiwan | “Can we trust this agent?” | Credibility, past placements, end-to-end support |

**Unifying insight:** every segment is buying confidence about the future; the two service lines cross-sell naturally. The homepage leads with the “one journey” bridge (Mandarin → study abroad) and a single core CTA: book a free consultation / trial.

# **3\. Scope**

## **3.1 v1 (MVP) — ship first**

* Multilingual: Bahasa Indonesia (default) \+ English toggle.

* Pages: Home, Mandarin Programs, Study-Abroad Consulting, About, Results/Testimonials, Blog/Resources, Contact/Book.

* WhatsApp click-to-chat as primary conversion path (floating button \+ inline CTAs).

* Lead-capture form (name, WhatsApp, interest, message) → email \+ optional Google Sheet/CRM.

* Lead-magnet quiz (“Which Orin path fits you?” / level self-check) capturing WhatsApp/email.

* Blog via MDX; Results/testimonials content; SEO baseline; GA4 \+ Meta Pixel.

* Fully mobile-first, fast, accessible.

## **3.2 Phase 2 (months 4–6)**

* Paid-ads landing pages \+ retargeting; email/WhatsApp nurture automation.

* Full 中文 locale; online payments for deposits; simple booking calendar.

* Headless CMS if non-devs need to edit content.

# **4\. Information Architecture (Sitemap)**

/ (Home)

/programs (Mandarin Programs)

    /programs/kids            — YCT / young learners

    /programs/exam-prep       — HSK / TOCFL

    /programs/speaking-booster

    /programs/business        — adult professionals

/consulting (Study-Abroad Consulting — China & Taiwan)

/results (Testimonials & placements)

/about (Story, team, method)

/blog (Resources / SEO)  →  /blog/\[slug\]

/contact (Book a consultation / trial)

— global —  Floating WhatsApp · Language toggle ID/EN · Quiz modal

*Program sub-pages may be sections within /programs for v1 if simpler; keep URLs stable for SEO either way.*

# **5\. Page-by-Page Requirements**

## **5.1 Home  /**

* **Hero:** brand promise \+ tagline “From first character to acceptance letter” (ID: “Dari karakter pertama sampai surat penerimaan”). Yellow hero, maroon headline. Primary CTA: Book a free consultation (WhatsApp). Secondary: Take the quiz.

* **Dual value blocks:** Mandarin learning | Study-abroad consulting — each links deeper.

* **Why Orin:** one journey/one partner · real fluency (YCT/HSK/TOCFL) · placement to China & Taiwan · bilingual & bicultural.

* **Social proof:** destination-university logos, testimonial snippets, quick stats.

* **How it works:** 3 steps — Consult → Plan → Start. Featured programs \+ recent posts. Closing maroon CTA band.

## **5.2 Mandarin Programs  /programs**

Overview \+ program cards: Kids/YCT, Exam Prep (HSK/TOCFL), Speaking Booster, Business Mandarin. Each card states who it's for, format (online/offline, group/1-on-1), and target outcome (level), with a trial CTA. Include an FAQ (levels, placement test, transparent pricing) and tutor-quality trust elements.

## **5.3 Study-Abroad Consulting  /consulting**

China and Taiwan placement, end-to-end from language to offer. Services: university selection, applications/essays, interview prep, scholarship guidance, visa basics. Show a process timeline by application season, past placements/results, and a “free assessment” CTA.

## **5.4 About  /about**

Origin story (the “bridge” gap), mission, method (speaking-first, small classes), team/tutors, values, bicultural credibility. 中文 accent appears here (name 欧林中文).

## **5.5 Results  /results**

Testimonials (students & parents), placement outcomes, before/after fluency, exam results. Filterable by segment if easy to build.

## **5.6 Blog / Resources  /blog**

MDX-powered SEO articles (e.g., “Kuliah ke China vs Taiwan”, “YCT/HSK/TOCFL levels explained”, “Beasiswa 2026”). Each post: metadata, share buttons, inline consultation CTA, related posts.

## **5.7 Contact / Book  /contact**

Primary: WhatsApp click-to-chat with a pre-filled message. Secondary: short form (name, WhatsApp, interest dropdown, message). Location/hours, Instagram link, optional map. Clear success state with a WhatsApp fallback.

# **6\. Core User Flows**

1. **Book a consultation (primary):** any page → CTA → WhatsApp opens pre-filled, or short form → on submit, link to WhatsApp \+ confirmation \+ lead saved (email/Sheet). Fire lead\_booked.

2. **Lead-magnet quiz:** CTA → 4–6 questions (goal, level, destination) → recommends a path → capture WhatsApp/email to send full result → nurture. Fire quiz\_completed, lead\_captured.

3. **Language toggle:** header ID/EN switch persists across navigation (locale in URL, e.g. /en/...), remembers choice.

4. **Blog → lead:** organic reader → inline \+ end-of-post consultation CTA → flow 1\.

# **7\. Functional Requirements**

* **i18n:** next-intl, locale-prefixed routes (/ \= id default, /en \= English). All copy externalized to message files; content authored ID-first.

* **WhatsApp:** wa.me/\<number\>?text=\<prefilled\> links; floating button; per-page pre-filled context (e.g., program name).

* **Forms & lead capture:** Next.js Route Handler (app/api/lead/route.ts) → email (Resend) \+ append to Google Sheet/Airtable. Zod validation; honeypot \+ rate limit.

* **Quiz:** client component; capture step posts to /api/lead.

* **Blog/CMS:** MDX in-repo (content/blog/\*.mdx) with frontmatter (title, description, date, cover, locale, tags). Generate index \+ \[slug\].

* **SEO:** per-page metadata (title/description/OG), sitemap.xml, robots.txt, JSON-LD (Organization, Course, FAQ, Article), canonicals \+ hreflang.

* **Analytics:** GA4 \+ Meta Pixel; event layer (§11); simple PDPL-aware consent notice.

* **Accessibility:** WCAG 2.1 AA — semantic HTML, alt text, focus states, contrast (never yellow text on white).

# **8\. Design System**

Derived from the brand. Use exact hex codes.

| Token | Value | Use |
| :---- | :---- | :---- |
| \--color-yellow | \#FEB100 | Primary hero fill, highlights |
| \--color-maroon | \#8B0100 | Headlines, buttons, badges, links-on-yellow |
| \--color-blue | \#334B89 | Links, accents, occasional sections |
| \--color-cream | \#EDE6CA | Backgrounds, cards |
| \--color-ink | \#2A211A | Body text |

**Palette:**

| Yellow (main) \#FEB100 | Maroon (main) \#8B0100 | Blue \#334B89 | Cream \#EDE6CA | Ink \#2A211A |
| :---: | :---: | :---: | :---: | :---: |

* **Type:** display \= bold friendly rounded (Poppins/Fredoka vibe); body \= Plus Jakarta Sans (Indonesian-made, on-brand); 中文 \= Noto Sans SC.

* **Components (shadcn/ui \+ Tailwind):** Button (primary=maroon, secondary=outline, cta=yellow bg \+ maroon text), Card, Badge (maroon pill like IG posts), Accordion (FAQ), Tabs (programs), Navbar w/ language toggle, Footer, FloatingWhatsApp, CTASection band, TestimonialCard, ProgramCard, QuizModal.

* **Feel:** friendly, youthful, bold color blocks, rounded corners (rounded-2xl), generous spacing — mirror the Instagram poster energy.

* **Logo:** yellow roundel \+ maroon “ORIN” wordmark \+ thin blue ring. Provide transparent \+ reversed variants in /public.

# **9\. Technical Requirements (build in Cursor)**

* **Framework:** Next.js (App Router) \+ TypeScript.

* **Styling:** Tailwind CSS \+ shadcn/ui; brand tokens in tailwind.config \+ CSS variables.

* **i18n:** next-intl.

* **Content:** MDX for blog (Contentlayer / next-mdx-remote).

* **Forms/email:** Zod \+ Route Handler; Resend for email; Google Sheets/Airtable for lead log.

* **Analytics:** GA4 \+ Meta Pixel (@next/third-parties).

* **Hosting:** Vercel (preview deploys per branch).

* **Images/Fonts:** next/image (WebP/AVIF); next/font self-hosting Plus Jakarta Sans \+ display \+ Noto Sans SC.

* **Quality:** ESLint \+ Prettier \+ TS strict; Playwright smoke test for the lead flow.

## **9.1 Suggested Project Structure**

app/\[locale\]/page.tsx            \# Home

app/\[locale\]/programs/page.tsx

app/\[locale\]/consulting/page.tsx

app/\[locale\]/results/page.tsx

app/\[locale\]/about/page.tsx

app/\[locale\]/blog/page.tsx

app/\[locale\]/blog/\[slug\]/page.tsx

app/\[locale\]/contact/page.tsx

app/api/lead/route.ts

components/    \# Button, FloatingWhatsApp, QuizModal, ...

content/blog/\*.mdx

messages/{id,en}.json            \# i18n copy

lib/           \# analytics, whatsapp, zod validation

public/        \# logo variants, images

docs/PRD.md    tailwind.config.ts

# **10\. Non-Functional Requirements**

* **Mobile-first:** Indonesia is mobile \+ WhatsApp-native. Test on mid-range Android.

* **Performance:** Lighthouse mobile ≥ 90; LCP \< 2.5s; minimal JS on marketing pages (RSC where possible).

* **SEO:** indexable, fast, structured data, clean URLs, hreflang.

* **Accessibility:** WCAG 2.1 AA.

* **Privacy:** Indonesian PDP Law (UU PDP) — consent notice, don't over-collect, store leads securely, privacy-policy page.

* **Reliability:** static/ISR where possible; forms degrade gracefully to a WhatsApp link if the API fails.

# **11\. Analytics & Event Tracking Plan**

| Event | Fires when | Key props |
| :---- | :---- | :---- |
| page\_view | Every route | path, locale |
| whatsapp\_click | Any WhatsApp CTA clicked | source\_page, context |
| lead\_form\_submit | Contact form submitted | interest, locale |
| lead\_booked | Consultation/trial confirmed | segment, source |
| quiz\_start / quiz\_completed | Quiz opened / finished | result\_path |
| lead\_captured | Email/WhatsApp captured | source |
| blog\_cta\_click | CTA inside a post | slug |

**North-star \=** lead\_booked volume per week. Attribute source via UTM \+ referrer.

# **12\. Milestones (aligned to the 6-month roadmap)**

| Milestone | Deliverable |
| :---- | :---- |
| M1 · Setup | Repo \+ Next.js scaffold, design tokens, component skeleton, WhatsApp number \+ analytics accounts |
| M2 · Core pages | Home, Programs, Consulting, Contact/Book \+ WhatsApp flow \+ lead API live |
| M3 · Content engine | Blog (MDX), Results, About, quiz lead-magnet, SEO baseline → launch v1 |
| M4 · Optimize | A/B test CTAs/taglines, improve top SEO pages, email nurture |
| M5 · Amplify | Paid retargeting \+ partnership landing pages |
| M6 · Scale | Case studies; plan Phase 2 (payments, full 中文, CMS) |

# **13\. Open Questions / Assumptions**

* WhatsApp Business number to wire into wa.me links — needed before M2.

* Confirm default locale \= Bahasa Indonesia (assumed).

* Lead destination: email \+ Google Sheet assumed; confirm if a CRM (e.g., HubSpot) is preferred.

* Cities/branches & offline class locations for Contact page \+ local SEO.

* Real assets: logo files, photos, testimonials, tutor bios, past placement list.

* Domain name \+ who owns DNS (for Vercel).

# **14\. First Tasks for Cursor (starter prompt)**

Paste this into Cursor to scaffold the project:

*Scaffold a Next.js (App Router, TypeScript) marketing site with Tailwind \+ shadcn/ui and next-intl (locales: id default, en). Set brand tokens: yellow \#FEB100, maroon \#8B0100, blue \#334B89, cream \#EDE6CA, ink \#2A211A. Build a Navbar with language toggle, a FloatingWhatsApp button (wa.me link), and a Home page with a yellow hero, maroon headline “Dari karakter pertama sampai surat penerimaan”, and a primary “Book a free consultation” CTA. Create /programs, /consulting, /about, /results, /blog, /contact route stubs and an app/api/lead/route.ts handler validating with Zod. Mobile-first, accessible, Lighthouse-friendly.*

**Next step:** answer the open questions in §13 (especially the WhatsApp number and domain), then start with Milestone M1 in Cursor. A companion PRD.md is provided to drop into docs/ of your repo.