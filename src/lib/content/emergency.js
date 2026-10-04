const topics = [
  //    {
  //     slug: "altered-consciousness",
  //     title: "اپروچ به کاهش سطح هوشیاری",
  //     category: "emergency",
  //     tags: [
  //       "کاهش سطح هوشیاری",
  //       "Altered mental status",
  //       "کما",
  //       "انسفالیت",
  //       "مننژیت",
  //       "تشنج",
  //       "اورژانس",
  //     ],

  //     summary:
  //       "رویکرد سیستماتیک به کودک با کاهش سطح هوشیاری؛ شامل ABC، علل برگشت‌پذیر، علل نورولوژیک، متابولیک، عفونی و توکسیک، بررسی‌های آزمایشگاهی، تصویربرداری، LP و EEG و اقدامات اولیه درمانی.",

  //     content: `

  // ## کاهش سطح هوشیاری — Altered Mental Status

  // **کاهش سطح هوشیاری در کودک یک اورژانس پزشکی است و ابتدا باید همزمان با ارزیابی علت، وضعیت Airway، Breathing و Circulation بررسی و اصلاح شود.**

  // علل مهم شامل:

  // - هیپوگلیسمی و سایر اختلالات متابولیک
  // - هیپوکسی و هیپرکاپنی
  // - شوک و هیپوپرفیوژن
  // - تشنج و **Non-convulsive status epilepticus**
  // - مسمومیت و مصرف دارو
  // - مننژیت و انسفالیت
  // - تروما و خونریزی داخل جمجمه
  // - افزایش فشار داخل جمجمه
  // - هیدروسفالی
  // - Stroke
  // - اختلالات کبدی و اورمیک
  // - اختلالات الکترولیتی
  // - اختلالات متابولیک ارثی

  // ---
  // ---

  // ## ارزیابی سریع سطح هوشیاری — AVPU

  // در اولین برخورد با کودک، سطح هوشیاری به‌صورت سریع با **AVPU** ارزیابی شود:

  // | وضعیت | تعریف |
  // |---|---|
  // | **A — Alert** | کودک بیدار و هوشیار است و به‌طور مناسب با محیط تعامل دارد. |
  // | **V — Voice** | کودک به‌صورت خودبه‌خودی هوشیار نیست، اما با صدا زدن یا تحریک کلامی پاسخ می‌دهد. |
  // | **P — Pain** | به صدا پاسخ نمی‌دهد، اما به تحریک دردناک پاسخ حرکتی یا واکنش مناسب نشان می‌دهد. |
  // | **U — Unresponsive** | به صدا و تحریک دردناک هیچ پاسخی نمی‌دهد. |

  // ### نکته مهم

  // **AVPU یک ارزیابی سریع اولیه است و در صورت غیرطبیعی بودن یا کاهش سطح هوشیاری، ارزیابی کامل نورولوژیک و GCS انجام شود.**

  // در کودک **P یا U**، همزمان با ارزیابی نورولوژیک، **Airway، Breathing، Circulation و Blood Glucose** فوراً بررسی و در صورت نیاز اصلاح شوند.

  // ### ترتیب ارزیابی

  // **AVPU → GCS → Pupils → Motor response → Focal neurologic signs → بررسی علت**

  // ---

  // ## 1. اقدامات فوری — اولین دقایق

  // ### ABCDE

  // **A — Airway**

  // - بررسی باز بودن راه هوایی
  // - ساکشن در صورت نیاز
  // - قرار دادن در وضعیت مناسب
  // - در کاهش شدید سطح هوشیاری یا عدم توانایی در محافظت از راه هوایی → آماده‌سازی برای Airway definitive

  // **B — Breathing**

  // - SpO₂
  // - تعداد و الگوی تنفس
  // - بررسی آپنه، برادی‌پنه یا تنفس غیرطبیعی
  // - بررسی علائم هیپوکسی
  // - در صورت نیاز O₂ و حمایت تنفسی

  // **C — Circulation**

  // - HR
  // - BP
  // - CRT
  // - Peripheral perfusion
  // - ECG/Cardiac monitoring
  // - گرفتن IV access؛ در صورت عدم موفقیت سریع → IO access

  // **D — Disability**

  // - **Bedside blood glucose فوری**
  // - سطح هوشیاری
  // - Pupils
  // - بررسی تشنج
  // - بررسی focal neurologic deficit

  // **E — Exposure**

  // - Temperature
  // - بررسی شواهد تروما
  // - راش، petechiae/purpura
  // - علائم عفونت
  // - محل تزریق یا patch دارویی
  // - بررسی شواهد مسمومیت

  // ---

  // ## 2. قند خون — اولین تست

  // **BS/POC glucose باید در هر کودک با کاهش سطح هوشیاری، تشنج یا altered mental status فوراً بررسی شود.**

  // ### اگر هیپوگلیسمی وجود دارد:

  // - درمان فوری با IV dextrose
  // - در صورت عدم دسترسی وریدی → IO
  // - قند خون پس از درمان مجدداً بررسی شود.

  // **در کودک با AMS نباید منتظر نتیجه آزمایش‌های دیگر برای اصلاح هیپوگلیسمی ماند.**

  // در صورت هیپوگلیسمی بدون علت مشخص، در صورت امکان قبل از درمان یا همزمان با آن **critical sample** گرفته شود:

  // - Serum glucose
  // - Insulin
  // - C-peptide
  // - Beta-hydroxybutyrate
  // - Cortisol
  // - Growth hormone
  // - Lactate
  // - Ammonia
  // - Free fatty acids
  // - Toxicology در صورت شک به مسمومیت

  // ---

  // ## 3. اگر مسمومیت مطرح است

  // شرح‌حال از والدین درباره:

  // - داروهای منزل
  // - Opioids
  // - Sedatives
  // - Antiepileptic drugs
  // - Antidepressants
  // - Acetaminophen
  // - Salicylates
  // - Alcohol
  // - Clonidine
  // - Insulin
  // - Sulfonylureas
  // - مواد شیمیایی

  // ### بررسی:

  // - ECG
  // - Glucose
  // - Electrolytes
  // - Blood gas
  // - Acetaminophen level
  // - Salicylate level
  // - Ethanol level در صورت شک
  // - Urine toxicology در صورت نیاز
  // - Drug-specific level در صورت وجود اندیکاسیون

  // ### Opioid toxicity

  // اگر کاهش هوشیاری همراه با:

  // - Respiratory depression
  // - Pinpoint pupils
  // - سابقه یا احتمال opioid exposure

  // باشد:

  // **Naloxone + حمایت راه هوایی و تنفسی**

  // را در نظر بگیرید.

  // **Naloxone نباید به‌صورت روتین در تمام کودکان با AMS تجویز شود؛ وجود شک بالینی به opioid toxicity مهم است.**

  // ---

  // ## 4. علل مهم کاهش سطح هوشیاری

  // ### نورولوژیک / CNS

  // - Seizure
  // - Post-ictal state
  // - Non-convulsive status epilepticus
  // - Meningitis
  // - Encephalitis
  // - Intracranial hemorrhage
  // - Traumatic brain injury
  // - Stroke
  // - Brain tumor
  // - Hydrocephalus
  // - Cerebral edema
  // - Increased intracranial pressure
  // - Venous sinus thrombosis

  // ### متابولیک

  // - Hypoglycemia
  // - Hyperglycemia
  // - Hyponatremia
  // - Hypernatremia
  // - Hypocalcemia
  // - Hypercalcemia
  // - Hypomagnesemia
  // - Hypermagnesemia
  // - Metabolic acidosis
  // - Hypercapnia
  // - Hypoxemia
  // - Hyperammonemia
  // - Uremia
  // - Hepatic encephalopathy

  // ### عفونی

  // - Sepsis
  // - Meningitis
  // - Encephalitis
  // - Severe systemic infection

  // ### توکسیک

  // - Opioids
  // - Sedatives
  // - Antiepileptic drugs
  // - Antidepressants
  // - Acetaminophen
  // - Salicylates
  // - Ethanol
  // - Carbon monoxide
  // - سایر مواد و داروها

  // ---

  // ## 5. شرح‌حال هدفمند

  // از والدین یا همراهان:

  // ### Time course

  // - شروع ناگهانی یا تدریجی؟
  // - زمان دقیق آخرین حالت طبیعی؟
  // - روند بدتر شدن یا بهبود؟

  // ### علائم همراه

  // - تب
  // - سردرد
  // - استفراغ
  // - اسهال
  // - درد شکم
  // - علائم تنفسی
  // - سرفه
  // - تشنج
  // - حرکات غیرطبیعی
  // - gaze deviation
  // - ضعف اندام
  // - اختلال تکلم
  // - اختلال راه رفتن
  // - تغییر رفتار

  // ### تشنج

  // - حرکات تونیک یا کلونیک؟
  // - gaze deviation؟
  // - مدت تشنج؟
  // - post-ictal state؟
  // - سابقه تشنج؟
  // - داروی ضدتشنج؟
  // - آخرین دوز دارو؟
  // - احتمال عدم مصرف دارو؟

  // ### Trauma

  // - سقوط
  // - ضربه به سر
  // - تصادف
  // - احتمال Non-accidental trauma

  // ### دارو و مسمومیت

  // - داروهای مصرفی کودک
  // - داروهای موجود در منزل
  // - احتمال ingestion
  // - داروی جدید
  // - تغییر دوز دارو

  // ### سابقه پزشکی

  // - بیماری متابولیک
  // - بیماری کبدی
  // - بیماری کلیوی
  // - صرع
  // - VP shunt
  // - بیماری CNS
  // - بیماری زمینه‌ای
  // - نقص ایمنی

  // ### تغذیه و متابولیک

  // - کاهش دریافت غذایی
  // - fasting
  // - استفراغ طولانی
  // - کاهش وزن
  // - dehydration
  // - اپیزودهای قبلی مشابه

  // ### سابقه خانوادگی

  // - بیماری‌های متابولیک
  // - مرگ ناگهانی
  // - تشنج
  // - بیماری‌های ارثی

  // ---

  // ## 6. معاینه فیزیکی

  // ### Neurologic examination

  // - Level of consciousness
  // - GCS
  // - Pupils
  // - Pupil reactivity
  // - Eye movements
  // - Gaze deviation
  // - Motor examination
  // - Tone
  // - DTR
  // - Plantar response
  // - Focal neurologic deficit
  // - Seizure activity

  // ### علائم افزایش ICP

  // - کاهش پیشرونده هوشیاری
  // - استفراغ
  // - سردرد
  // - Papilledema
  // - Focal neurologic deficit
  // - Abnormal pupillary response
  // - Cushing response در موارد شدید

  // ### علائم مننژیت/انسفالیت

  // - Fever
  // - Neck stiffness
  // - Photophobia
  // - Seizure
  // - Behavioral change
  // - Focal neurologic deficit

  // ### بررسی سیستمیک

  // - HR
  // - BP
  // - CRT
  // - Temperature
  // - SpO₂
  // - Respiratory pattern
  // - Skin rash
  // - Petechiae/purpura
  // - Signs of dehydration
  // - Signs of trauma

  // ---

  // ## 7. آزمایش‌های اولیه

  // بر اساس وضعیت بالینی:

  // - CBC + Diff
  // - Blood glucose
  // - Na
  // - K
  // - Cl
  // - HCO₃
  // - Ca
  // - Mg
  // - Phosphorus
  // - BUN
  // - Creatinine
  // - AST
  // - ALT
  // - Bilirubin
  // - Albumin
  // - Blood gas
  // - Lactate
  // - CRP در صورت شک به عفونت
  // - Blood culture در صورت شک به sepsis/CNS infection
  // - Urinalysis

  // ### در موارد انتخابی:

  // - Ammonia
  // - Serum ketones / Beta-hydroxybutyrate
  // - Toxicology
  // - Acetaminophen level
  // - Salicylate level
  // - Ethanol
  // - Drug-specific levels
  // - Coagulation profile
  // - Thyroid function tests
  // - Metabolic studies

  // ---

  // ## 8. آمونیاک را در موارد مناسب فراموش نکنید

  // در کودک با:

  // - AMS بدون علت مشخص
  // - استفراغ
  // - سابقه اپیزودهای مشابه
  // - بیماری کبدی
  // - مصرف Valproate
  // - شک به metabolic disorder

  // → **Serum ammonia** بررسی شود.

  // در hyperammonemia شدید، نمونه باید طبق پروتکل آزمایشگاه سریعاً منتقل و پردازش شود.

  // ---

  // ## 9. تصویربرداری مغز

  // ### Brain CT

  // CT مغز در مواردی مانند:

  // - Trauma
  // - شک به intracranial hemorrhage
  // - focal neurologic deficit
  // - علائم افزایش ICP
  // - کاهش پیشرونده هوشیاری
  // - شک به mass lesion
  // - Hydrocephalus
  // - شرایطی که MRI فوری در دسترس نیست

  // کاربرد دارد.

  // ### MRI Brain

  // در صورت ثبات بیمار و شک به:

  // - Encephalitis
  // - Stroke
  // - Demyelinating disease
  // - Tumor
  // - Venous thrombosis
  // - سایر ضایعات ساختاری

  // MRI حساسیت بیشتری برای بسیاری از ضایعات CNS دارد.

  // ---

  // ## 10. Lumbar Puncture

  // در صورت شک به:

  // - Meningitis
  // - Encephalitis
  // - CNS infection

  // → LP در صورت ایمن بودن انجام شود.

  // ### CSF studies

  // - Opening pressure در صورت امکان
  // - Cell count + differential
  // - Protein
  // - Glucose
  // - Gram stain
  // - Bacterial culture
  // - PCR بر اساس شک بالینی
  // - HSV PCR در صورت شک به encephalitis
  // - سایر تست‌ها بر اساس اپیدمیولوژی و وضعیت بیمار

  // ### مهم

  // **LP نباید در بیماری که ناپایدار است یا contraindication برای LP دارد انجام شود.**

  // در صورت شک جدی به meningitis/encephalitis:

  // **Antibiotic ± Acyclovir نباید به دلیل انتظار برای LP یا CT به تأخیر بیفتد.**

  // ---

  // ## 11. چه زمانی قبل از LP تصویربرداری لازم است؟

  // در صورت وجود شواهدی مانند:

  // - Focal neurologic deficit
  // - Signs of increased ICP
  // - Papilledema
  // - Significant alteration in consciousness
  // - New focal seizure
  // - Known CNS lesion
  // - Immunocompromised state
  // - سایر مواردی که احتمال mass effect مطرح است

  // ابتدا stabilization و ارزیابی مناسب انجام شود.

  // **تصمیم برای CT قبل از LP باید بر اساس معاینه و احتمال افزایش ICP/mass effect باشد، نه اینکه CT به‌صورت روتین پیش‌نیاز تمام LPها باشد.**

  // ---

  // ## 12. EEG

  // **EEG در کودک با AMS بدون علت مشخص اهمیت زیادی دارد، به‌خصوص اگر:**

  // - تشنج مشاهده شده باشد
  // - سابقه epilepsy وجود داشته باشد
  // - حرکات غیرطبیعی وجود داشته باشد
  // - gaze deviation وجود داشته باشد
  // - سطح هوشیاری بعد از تشنج به‌طور غیرمنتظره‌ای برنگردد
  // - شک به Non-convulsive status epilepticus وجود داشته باشد

  // در شک جدی به **NCSE**، EEG باید سریع انجام شود.

  // ---

  // # اوردر پیشنهادی در کودک با کاهش سطح هوشیاری با علت نامشخص

  // ## Monitoring

  // 1. Continuous cardiopulmonary monitoring
  // 2. Continuous pulse oximetry
  // 3. Frequent vital signs
  // 4. Neurologic assessment / GCS
  // 5. Strict I/O
  // 6. Temperature monitoring

  // ## Immediate

  // 7. **POC Blood glucose STAT**
  // 8. IV access؛ در صورت عدم دسترسی سریع → IO
  // 9. Oxygen if hypoxemia/respiratory compromise
  // 10. ECG
  // 11. NPO until airway protection and swallowing are assessed

  // ## Laboratory

  // 12. CBC + Diff
  // 13. Na, K, Cl, HCO₃
  // 14. BUN, Cr
  // 15. Glucose
  // 16. Ca, Mg, P
  // 17. AST, ALT, Bilirubin
  // 18. Blood gas
  // 19. Lactate when clinically indicated
  // 20. CRP ± Blood culture if infection suspected
  // 21. Ammonia when clinically indicated
  // 22. Urinalysis
  // 23. Urine toxicology when indicated

  // ## Toxicology when indicated

  // 24. Acetaminophen level
  // 25. Salicylate level
  // 26. Ethanol level
  // 27. Specific drug levels according to exposure
  // 28. ECG

  // ## Neurologic evaluation

  // 29. Brain CT when indicated
  // 30. Brain MRI when indicated and patient is stable
  // 31. EEG if seizure/NCSE is suspected
  // 32. Neurology consultation when indicated

  // ## Infection / CNS infection

  // 33. Blood culture before antibiotics when feasible and when this does not delay treatment
  // 34. LP if clinically indicated and safe
  // 35. CSF cell count + differential
  // 36. CSF glucose
  // 37. CSF protein
  // 38. Gram stain + culture
  // 39. CSF PCR according to clinical suspicion

  // ---

  // # در صورت شک به مننگیت / مننگوانسفالیت

  // ### پس از گرفتن Blood culture در صورت امکان:

  // **Empiric antimicrobial therapy باید سریع شروع شود و نباید منتظر LP یا CT بماند اگر این اقدامات باعث تأخیر درمان شوند.**

  // ### گزینه‌های رایج

  // **Ceftriaxone**

  // 50 mg/kg/dose IV q12h

  // یا طبق پروتکل مرکز:

  // 100 mg/kg/day IV

  // **یا**

  // **Cefotaxime**

  // 50 mg/kg/dose IV q6h

  // +

  // **Vancomycin**

  // 15 mg/kg/dose IV q6h

  // با پایش سطح/Exposure طبق پروتکل مرکز.

  // ### اگر Encephalitis مطرح است:

  // **Acyclovir**

  // 20 mg/kg/dose IV q8h

  // با تنظیم دوز بر اساس سن، عملکرد کلیه و پروتکل مرکز.

  // ---

  // # Red Flags

  // وجود هرکدام از موارد زیر نیازمند ارزیابی و اقدام فوری است:

  // - Rapidly decreasing consciousness
  // - GCS پایین یا رو به کاهش
  // - Abnormal pupils
  // - Focal neurologic deficit
  // - Recurrent seizure
  // - Suspected status epilepticus
  // - Signs of increased ICP
  // - Respiratory depression
  // - Hypoxemia
  // - Shock
  // - Severe hypoglycemia
  // - Hyperammonemia
  // - Severe electrolyte abnormality
  // - Suspected intracranial hemorrhage
  // - Suspected meningitis/encephalitis
  // - Severe toxic ingestion

  // ---

  // # نکته کلیدی

  // در کودک با کاهش سطح هوشیاری، ترتیب ذهنی مناسب:

  // **ABC → Glucose → Oxygenation/Perfusion → Seizure → Toxin → Infection → Metabolic → Structural CNS**

  // و نباید صرفاً با مشاهده «کاهش هوشیاری» آن را به **post-ictal state** نسبت داد؛ اگر سطح هوشیاری طبق انتظار برنگردد، **NCSE، CNS infection، metabolic/toxic causes و structural lesion** باید مجدداً بررسی شوند.

  // ### Reference

  // بر اساس رویکردهای **UpToDate** به ارزیابی Altered Mental Status در کودک و ارزیابی/تشخیص encephalitis و status epilepticus، با تطبیق دوزها و اقدامات با پروتکل بیمارستانی و وضعیت بالینی بیمار.
  // `,
  //   },
  {
    slug: "altered-consciousness",
    title: "اپروچ به کاهش هوشیاری",
    category: "emergency",
    tags: ["کاهش هوشیاری", "کما", "اورژانس"],
    summary:
      "علل داخل و خارج CNS کاهش هوشیاری، نکات شرح‌حال/معاینه و اوردر کامل تشخیصی-درمانی.",
    content: `
## علل CNS

انسفالیت، مسمومیت (اپیوئید، داروها)، تشنج (پست‌ایکتال، دارو، non-convulsive status)، استروک، تروما، خونریزی، توده، اختلال پرفیوژن (شوک)، هیپوکسی

## علل خارج CNS

هیپرتانسیون، اورمی، هپاتیک، متابولیک، هیپوگلیسمی، هیپرآمونمی

## شرح‌حال

شروع ناگهانی/تدریجی، توالی زمانی، علائم همراه (تب، گوارشی، تنفسی)، سرگیجه، سردرد، تهوع، استفراغ، دوبینی، حرکات پرشی/تونیک/gaze، تروما، نسبت فامیلی والدین، سابقه قبلی، سابقه مصرف داروی ضدتشنج و نحوه مصرف اخیر.

## معاینه

تعیین سطح هوشیاری، مردمک‌ها، DTR، پلانتار رفلکس، علائم مننژه، آثار تروما، همودینامیک (نبض، CRT، فشارخون).

## آزمایشات درخواستی

- CBC, diff, ESR, CRP, B/C, BUN, Cr, Na, K, Ca, P, Mg, AST, ALT, PT, PTT, INR
- موردی: لاکتات، آمونیاک، سطح خونی متانول/اتانول/داروها
- توکسیکولوژی ادرار
- LP پس از CT اسکن مغز

## اوردر در کاهش هوشیاری با علت نامشخص

1. Check BS stat then q6hr
2. Brain CT scan without contrast
3. LP (در صورت شک به مننگوانسفالیت، پس از استیبل‌شدن و CT مغز)
4. EEG
5. مشاوره نورولوژی
6. تشک مواج و تغییر پوزیشن
7. Cardiopulmonary monitoring and pulse oximetry
8. ECG
9. CXR
10. VBG stat then TDS
11. O2 therapy
12. NPO
13. Amp Pantoprazole 1mg/kg BD IV
14. Serum Maintenance
15. T chart + Apotel (10mg/kg q4hr) if fever
16. Foley fix
17. Chart I/O
18. CBC, Diff, ESR, CRP, Bun, Cr, Na, K, BS, Ca, P, Mg, AST, ALT, VBG
19. U/A – urine toxicology

### در صورت شک به مننگوانسفالیت

20. Amp Cefotaxime 50mg/kg/dose q6hr IV یا Amp Ceftriaxone 50mg/kg/dose BD IV
21. Amp Vancomycin 15mg/kg/dose q6hr IV slow
22. Amp Acyclovir 15mg/kg IV q8hr slow
`,
  },

  {
    slug: "anaphylaxis",
    title: "آنافیلاکسی",
    category: "emergency",
    tags: ["آنافیلاکسی", "اپی‌نفرین", "آلرژی"],
    summary:
      "معیارهای تشخیص آنافیلاکسی، درمان حاد، اپی‌نفرین، اکسیژن، مایع‌درمانی، درمان برونکواسپاسم، آنافیلاکسی مقاوم، پایش و مراقبت پس از ترخیص.",

    content: `

# آنافیلاکسی (Anaphylaxis)

آنافیلاکسی یک واکنش حساسیتی سیستمیک و بالقوه تهدیدکننده حیات است که می‌تواند با درگیری راه هوایی، سیستم تنفسی، قلبی‌عروقی، پوست و دستگاه گوارش همراه باشد.

>  **اپی‌نفرین درمان خط اول و حیاتی آنافیلاکسی است.**
>
> **در صورت شک بالینی به آنافیلاکسی، تجویز اپی‌نفرین IM نباید برای دریافت IV، آنتی‌هیستامین، کورتیکواستروئید یا سایر درمان‌ها به تأخیر بیفتد.**
>
> آنتی‌هیستامین‌ها، کورتیکواستروئیدها و آلبوترول **جایگزین اپی‌نفرین نیستند.**

---

## معیارهای تشخیص

تشخیص آنافیلاکسی عمدتاً بالینی است.

### معیار 1

شروع حاد بیماری همراه با درگیری پوست و/یا مخاط، به‌علاوه حداقل یکی از موارد زیر:

- علائم تنفسی:
  - دیسپنه
  - ویز
  - برونکواسپاسم
  - استریدور
  - کاهش SpO₂

- کاهش فشار خون یا علائم هیپوپرفیوژن:
  - هیپوتانسیون
  - سنکوپ
  - کلاپس

### معیار 2

وجود **دو مورد یا بیشتر** از موارد زیر پس از تماس با یک آلرژن محتمل:

- درگیری پوست یا مخاط
- علائم تنفسی
- کاهش فشار خون
- علائم گوارشی قابل‌توجه:
  - کرامپ
  - درد شکم
  - استفراغ

### معیار 3

کاهش فشار خون پس از تماس با یک آلرژن شناخته‌شده برای بیمار.

---


## مدیریت حاد آنافیلاکسی

> <span class="text-brick-700 font-bold">
> ⚠️ اولین و مهمترین درمان ← اپی نفرین
>
>  شواهد انسداد قریب الوقوع ← اینتوباسیون زود هنگام

</span>

---

##  1. اپی‌نفرین IM — اولویت اول

### Epinephrine 1 mg/mL (1:1000)

دوز:

<span dir="ltr">0.01 mg/kg IM</span>

که معادل:

<span dir="ltr">0.01 mL/kg</span>

از محلول <span dir="ltr">1 mg/mL</span> است.

### حداکثر دوز هر تزریق

- کودکان: <span dir="ltr">0.3 mg (0.3 mL)</span>
- نوجوانان/بزرگسالان: در صورت نیاز تا <span dir="ltr">0.5 mg (0.5 mL)</span>

محل تزریق ترجیحی:

**عضله لترال ران (Mid-anterolateral thigh)**

### تکرار

در صورت تداوم علائم یا پاسخ ناکافی:

<span dir="ltr">Every 5–15 minutes</span>

قابل تکرار است.

>  **اگر بیمار همچنان علائم تنفسی یا شوک دارد، اپی‌نفرین IM را طبق پاسخ بالینی تکرار کنید و منتظر اثر آنتی‌هیستامین یا کورتیکواستروئید نمانید.**

---

## 2. اکسیژن (Oxygen)

در صورت هیپوکسمی، دیسترس تنفسی یا آنافیلاکسی شدید، اکسیژن با غلظت بالا تجویز کنید.

### Nonrebreather mask

<span dir="ltr">Up to 15 L/min</span>

در صورت در دسترس بودن می‌توان از **High-flow oxygen masks** نیز استفاده کرد.

هدف، حفظ اکسیژناسیون مناسب و پایش مداوم:

<span dir="ltr">SpO₂</span>

است.

---

## 3. حذف عامل ایجادکننده (Remove inciting cause)

در صورت امکان عامل ایجادکننده آنافیلاکسی را حذف کنید.

برای مثال:

- در صورت شک به یک دارو، انفوزیون آن را متوقف کنید.
- تماس با عامل آلرژن را قطع کنید.

>  **حذف عامل ایجادکننده نباید باعث تأخیر در تجویز اپی‌نفرین شود.**

---

# 4. دسترسی وریدی / داخل استخوانی

در آنافیلاکسی متوسط تا شدید:

- در سریع‌ترین زمان یک مسیر وریدی مناسب برقرار کنید.
- در بیمار دچار شوک یا پرفیوژن ضعیف، در صورت امکان **دو مسیر وریدی محیطی با کاتتر بزرگ (Large-bore IV)** برقرار کنید.
- اگر دسترسی وریدی سریعاً امکان‌پذیر نیست و بیمار دچار شوک است، **دسترسی داخل استخوانی (IO)** را در نظر بگیرید.

>  **برقراری IV یا IO نباید باعث تأخیر در تجویز اپی‌نفرین IM شود.**

---

# 5. کریستالوئید؛ بولوس سریع (Crystalloid rapid bolus)

از کریستالوئید ایزوتونیک استفاده کنید:

- **Normal saline 0.9%**
- **Ringer's lactate**

در صورت وجود شوک یا پرفیوژن ضعیف:

<span dir="ltr">20 mL/kg IV/IO</span>

به‌صورت سریع تجویز شود.

پس از هر بولوس، بیمار را مجدداً ارزیابی کنید:

- Blood pressure
- Heart rate
- وضعیت پرفیوژن
- Capillary refill
- سطح هوشیاری
- وضعیت تنفسی
- علائم overload مایع یا ادم ریه
- Urine output

در صورت تداوم شوک و نبود شواهد overload مایع، بولوس‌های بعدی:

<span dir="ltr">20 mL/kg</span>

را می‌توان بر اساس وضعیت بالینی تکرار کرد.

در آنافیلاکسی شدید ممکن است به علت افزایش نفوذپذیری عروقی، **Massive fluid shifts** رخ دهد و حجم داخل عروقی به‌شدت کاهش یابد.

---

# 6. آلبوترول (Albuterol)

در صورت وجود **برونکواسپاسم مقاوم به اپی‌نفرین IM**، آلبوترول به‌عنوان درمان کمکی استفاده می‌شود.

### دوز

<span dir="ltr">2.5 mg inhaled via nebulizer</span>

در صورت نیاز می‌توان دوز را تکرار کرد.

اگر از محلول غلیظ آلبوترول با غلظت:

<span dir="ltr">≥0.5%</span>

استفاده می‌شود، آن را با Normal saline رقیق کنید.

>  **آلبوترول جایگزین اپی‌نفرین نیست.**

---

# درمان‌های کمکی (Adjunctive therapies)

این درمان‌ها برای علائم باقی‌مانده پس از پاسخ مناسب به اپی‌نفرین استفاده می‌شوند.

>  **درمان‌های کمکی نباید باعث تأخیر در تجویز یا تکرار اپی‌نفرین شوند.**

---

## آنتی‌هیستامین H1

برای **Residual itching or urticaria** می‌توان از سیتریزین استفاده کرد.

### Cetirizine IV

#### کودکان 6 ماه تا 5 سال

<span dir="ltr">2.5 mg IV</span>

#### کودکان 6 تا 11 سال

<span dir="ltr">5–10 mg IV</span>

دارو طی حداقل:

<span dir="ltr">2 minutes</span>

تجویز شود.

### گزینه جایگزین: Diphenhydramine

<span dir="ltr">1 mg/kg IV</span>

حداکثر:

<span dir="ltr">50 mg IV</span>

طی حداقل:

<span dir="ltr">5 minutes</span>

تجویز شود.

---

# آنتی‌هیستامین H2

برای خارش یا کهیر باقیمانده:

### Famotidine

<span dir="ltr">0.25 mg/kg IV</span>

حداکثر:

<span dir="ltr">20 mg IV</span>

طی حداقل:

<span dir="ltr">2 minutes</span>

تجویز شود.

---

# گلوکوکورتیکوئید (Glucocorticoid)

گلوکوکورتیکوئیدها درمان خط اول آنافیلاکسی نیستند و اثر سریع اپی‌نفرین را ندارند.

در شرایط منتخب، از جمله برخی بیماران با برونکواسپاسم پایدار یا آنافیلاکسی شدید/مقاوم، می‌توان پس از درمان اولیه در نظر گرفت.

### Methylprednisolone

<span dir="ltr">1–2 mg/kg IV</span>

حداکثر:

<span dir="ltr">125 mg IV</span>

### Prednisolone

<span dir="ltr">1–2 mg/kg PO</span>

حداکثر:

<span dir="ltr">60 mg PO</span>

---

# درمان آنافیلاکسی مقاوم (Refractory anaphylaxis)

## انفوزیون اپی‌نفرین (Epinephrine infusion)

در بیمارانی که با وجود:

- اپی‌نفرین IM مناسب
- احیای مایع مناسب

همچنان دچار شوک یا علائم تهدیدکننده حیات هستند، انفوزیون مداوم اپی‌نفرین را در محیط مناسب و تحت مانیتورینگ دقیق شروع کنید.

### دوز

<span dir="ltr">0.1–1 microgram/kg/min</span>

دوز بر اساس پاسخ بالینی بیمار:

**Titrated to effect**

تنظیم شود.

>  انفوزیون وریدی اپی‌نفرین باید با **Infusion pump** و تحت مانیتورینگ مداوم قلبی و فشار خون انجام شود.

---

# وازوپرسورها (Vasopressors)

برخی بیماران ممکن است علی‌رغم دریافت کریستالوئید و اپی‌نفرین همچنان دچار شوک باشند.

در این شرایط ممکن است علاوه بر اپی‌نفرین، به یک وازوپرسور دوم نیاز باشد.

تمام وازوپرسورها باید:

- با **Infusion pump** تجویز شوند.
- تحت **Continuous ECG monitoring** باشند.
- فشار خون به‌طور مداوم یا در فواصل کوتاه پایش شود.
- بر اساس پاسخ همودینامیک بیمار **Titrated to effect** شوند.

---

# پایش مداوم بیمار (Continuous monitoring)

در آنافیلاکسی شدید، به‌خصوص در بیمار دریافت‌کننده انفوزیون اپی‌نفرین یا وازوپرسور، پایش مداوم ضروری است.

### پایش قلبی–تنفسی

- **Continuous ECG / Cardiac monitoring**
- **Heart rate**
- **Blood pressure**
- **SpO₂ / Pulse oximetry**
- **Respiratory rate**
- وضعیت راه هوایی
- شدت ویز، استریدور یا برونکواسپاسم

### پایش همودینامیک

- فشار خون و روند آن
- وضعیت پرفیوژن محیطی
- Capillary refill
- سطح هوشیاری
- دمای اندام‌ها
- در صورت نیاز لاکتات و ارزیابی اسید–باز

### پایش مایع

- مقدار کل کریستالوئید دریافت‌شده
- پاسخ همودینامیک به هر بولوس
- علائم overload مایع
- علائم ادم ریه
- **Urine output**

در بیمار دریافت‌کننده انفوزیون اپی‌نفرین یا وازوپرسور، بیمار باید در محیطی با:

**Continuous ECG + Blood pressure + SpO₂ monitoring**

و امکان احیای پیشرفته تحت نظر باشد.

---

# گلوکاگون (Glucagon)

بیمارانی که **Beta-blocker** مصرف می‌کنند ممکن است پاسخ ناکافی به اپی‌نفرین داشته باشند.

در آنافیلاکسی مقاوم در این بیماران می‌توان گلوکاگون را به‌عنوان درمان کمکی در نظر گرفت.

### دوز

<span dir="ltr">20–30 microgram/kg IV</span>

حداکثر:

<span dir="ltr">1 mg IV</span>

طی حداقل:

<span dir="ltr">5 minutes</span>

تجویز شود.

>  تجویز سریع گلوکاگون می‌تواند موجب تهوع و استفراغ شود؛ راه هوایی بیمار باید به‌دقت تحت نظر باشد.

---

# متیلن بلو (Methylene blue)

در وازوپلژی شدید و مقاوم، پس از درمان‌های استاندارد و با نظر تیم تخصصی، متیلن بلو ممکن است مورد استفاده قرار گیرد.

### دوز

<span dir="ltr">1–2 mg/kg IV</span>

به‌صورت یک **Single bolus** که طی:

<span dir="ltr">20–60 minutes</span>

تجویز شود.

---

# ECMO

در بیمارانی که با وجود انجام اقدامات مناسب احیایی، اپی‌نفرین، مایع‌درمانی و درمان‌های پیشرفته همچنان دچار شوک مقاوم یا نارسایی قلبی–تنفسی هستند:

**در صورت در دسترس بودن ECMO، از مراحل اولیه با تیم ECMO مشورت شود.**

---

# تحت‌نظر گرفتن بیمار

مدت تحت‌نظر بودن باید بر اساس شدت واکنش، پاسخ به درمان و عوامل خطر تعیین شود.

بیمارانی که دارای موارد زیر هستند نیازمند پایش دقیق‌تر و طولانی‌تر هستند:

- علائم تنفسی قابل‌توجه
- هیپوتانسیون یا شوک
- نیاز به دوزهای مکرر اپی‌نفرین
- نیاز به انفوزیون اپی‌نفرین
- واکنش شدید یا مقاوم
- بیماری‌های زمینه‌ای مهم
- احتمال واکنش دو فازی

>  **مدت مشاهده نباید صرفاً بر اساس یک زمان ثابت برای همه بیماران تعیین شود.**

---

# دستورات بعد از ترخیص

پس از پایدار شدن بیمار:

### 1. ارجاع

ارجاع به **فوق‌تخصص آلرژی و ایمونولوژی** برای شناسایی عامل ایجادکننده و برنامه پیشگیری.

### 2. اجتناب از عامل ایجادکننده

بیمار و والدین باید درباره عامل احتمالی ایجادکننده و نحوه اجتناب از آن آموزش ببینند.

### 3. اپی‌نفرین در منزل

در بیماران در معرض خطر آنافیلاکسی مجدد، **Epinephrine auto-injector** تجویز شود و نحوه استفاده از آن به بیمار/والدین آموزش داده شود.

### 4. برنامه اقدام اورژانسی

برای بیمار یک **Anaphylaxis Action Plan** تهیه شود.

### 5. آموزش علائم هشدار

علائم زیر باید به‌عنوان علائم هشدار آموزش داده شوند:

- تنگی نفس
- ویز یا استریدور
- تورم زبان یا گلو
- سرگیجه یا سنکوپ
- افت فشار
- کهیر منتشر همراه با علائم سیستمیک
- استفراغ یا درد شکم شدید همراه با سایر علائم آنافیلاکسی

>  **در صورت بروز مجدد علائم آنافیلاکسی، اپی‌نفرین باید بدون تأخیر استفاده شود و بیمار برای ارزیابی اورژانسی مراجعه کند.**

---

## نکات کلیدی

>  **1. اپی‌نفرین IM = درمان خط اول**
>
> **2. در صورت پاسخ ناکافی، اپی‌نفرین IM را تکرار کنید.**
>
>  **3. اکسیژن، IV/IO access و کریستالوئید در صورت نیاز، هم‌زمان با درمان اصلی انجام شوند.**
>
>  **4. آنتی‌هیستامین و کورتیکواستروئید درمان کمکی هستند، نه جایگزین اپی‌نفرین.**
>
>  **5. در شوک مقاوم، اپی‌نفرین انفوزیون و درمان پیشرفته را در محیط مانیتورشده در نظر بگیرید.**

`,
  },

  {
    slug: "status-epilepticus",
    title: "تشنج استاتوس",
    category: "emergency",
    tags: ["استاتوس", "علت یابی", "کنترل", "درمان"],
    summary:
      "علل، معاینه هدفمند، جدول کامل داروهای ضدتشنج به‌ترتیب زمانی و اوردر کامل.",
    content: `
## علل

تب / مننگوانسفالیت / اختلال الکترولیتی (Mg, Na, Ca, BS) / تروما / مسمومیت / عدم مصرف دارو در صرع تحت درمان.

## شرح‌ حال

تب، ضربه به سر، مصرف دارو (مسمومیت)، علل هیپوکسی (غرق‌شدگی، آسپیراسیون)، سابقه صرع، سرگیجه، دوبینی، تهوع/استفراغ (ICP بالا)، در فرد با سابقه مصرف داروی ضدتشنج (عدم مصرف دارو / عدم تناسب میزان دارو با وزن جدید / بیماری‌های عفونی).

## معاینه

آیا تشنج متوقف شده یا ادامه دارد (gaze، سفتی اندام، حرکات کلونیک، مردمک میدریاز، افزایش ضربان قلب)، سطح هوشیاری، مردمک‌ها (سایز،   پاسخ به نور، آنیزوکوریا)، ردور، کرنیگ/برودزینسکی، فونتانل (بالج/دپرس)، DTR، پلانتار رفلکس، آثار تروما به سر، علائم نوروکوتانئوس، هپاتواسپلنومگالی   .

##  Order تشنج استاتوس در اورژانس

> **تعریف علمی:** تشنج مداوم به مدت **≥ ۵ دقیقه** یا تشنج‌های مکرر بدون برگشت کامل سطح هوشیاری بین حملات، به‌عنوان **Status Epilepticus** در نظر گرفته می‌شود و نیاز به درمان فوری دارد.  
> ارزیابی و درمان **همزمان** انجام شوند؛ منتظر پایان ارزیابی کامل برای شروع اقدامات حیاتی نمانید.

---

##  A — Airway | راه هوایی

- بررسی باز بودن راه هوایی
- قرار دادن کودک در **پوزیشن مناسب به پهلو**
- ساکشن ترشحات در صورت نیاز
- بررسی وجود ترشحات، استفراغ یا جسم خارجی
- گذاشتن **Airway adjunct** در صورت نیاز
- آماده‌سازی تجهیزات **Bag-Valve-Mask**


>  در تشنج طولانی یا پس از دریافت داروهای ضدتشنج، احتمال دپرسیون تنفسی وجود دارد؛ بنابراین تجهیزات تهویه و راه هوایی باید از ابتدا آماده باشند.

---

##  B — Breathing | تنفس

- شروع **O₂ therapy** در صورت نیاز
- **Continuous Pulse Oximetry**
- ارزیابی:
  - تعداد تنفس
  - الگوی تنفس
  - SpO₂
  - وجود آپنه یا هیپوونتیلاسیون


---

## C — Circulation | گردش خون

- گرفتن حداقل یک مسیر **IV**
- در صورت عدم دسترسی سریع به IV → در نظر گرفتن **IO access**
- **Continuous Cardiac Monitoring**

---

## D — Disability | وضعیت نورولوژیک

### قند خون

- **BS  را سریعاً چک کنید.**
- در صورت هیپوگلیسمی → اصلاح فوری طبق پروتکل هیپوگلیسمی کودک.

### ارزیابی نورولوژیک

- سطح هوشیاری(AVPU)
- GCS در صورت امکان
- وضعیت مردمک‌ها (سایز، تقارن ، واکنش به نور)
- بررسی حرکات غیرطبیعی و علائم فوکال
- ردور، کرنیگ/برودزینسکی
- میوز دو طرفه (بررسی مسمومیت با اپیوئید)


### آزمایش‌های اولیه

- CBC Diff,B/C, ESR, CRP, BUN, Cr, Na, K, BS, Ca, P, Mg, AST, ALT, VBG

- U/A – urine toxicology در صورت شک به مسمومیت

- سطح داروهای ضدتشنجی مصرفی قبلی

 


> آزمایش‌های تکمیلی بر اساس شرح‌حال، معاینه و علت احتمالی تشنج درخواست شوند؛ از جمله سطح داروهای ضدتشنج، عملکرد کلیه و کبد، بررسی مسمومیت و سایر بررسی‌های متابولیک.

---

> **اگر از شروع تشنج ≥ ۵ دقیقه گذشته باشد**
>
> **دارودرمانی را شروع کنید.**



##  مرحله اول — Benzodiazepines

##  مرحله دوم — Second-line Antiseizure Medication

##  مرحله سوم —  انتقال /بستری درPICU/ داروهای بیهوشی/Continuous Infusion 

---
> <span class="text-brick-700 font-bold">
> ⚠️ در صورت عدم موفقیت در رگ‌گیری طی ۳ دقیقه ← از سایر روش‌های دسترسی استفاده شود.
>
> دیازپام ← رکتال
>
> میدازولام ← IM
> </span>

---
### جدول داروها

| دارو | مسیر و Dose / Max | سرعت تزریق | عوارض و نکات مهم |
|---|---|---|---|
| **دیازپام** | <span dir="ltr">IV/IO: 0.1–0.2 mg/kg</span><br>**Max: <span dir="ltr">10 mg</span>**<br><span dir="ltr">Rectal: 0.5 mg/kg</span><br>**Max: <span dir="ltr">20 mg</span>** | <span dir="ltr">1 mg/min</span><br>**حداکثر <span dir="ltr">2 min</span>** | **دپرسیون تنفسی، آپنه**؛ <span dir="ltr">IM</span> به‌دلیل جذب نامطمئن توصیه نمی‌شود؛ شروع اثر چند ثانیه تا 1 دقیقه |
| **میدازولام** | <span dir="ltr">IV/IO: 0.1–0.2 mg/kg</span><br><span dir="ltr">IM/IN: 0.2–0.3 mg/kg</span><br><span dir="ltr">Buccal: 0.5 mg/kg</span><br>**Max: <span dir="ltr">10 mg/dose</span>** | <span dir="ltr">1 mg/min</span><br>**حداکثر <span dir="ltr">2 min</span>** | **دپرسیون تنفسی و آپنه**؛ شروع اثر فوری |
| **لورازپام** | <span dir="ltr">IV: 0.1 mg/kg</span><br>**Max: <span dir="ltr">4 mg</span>** | <span dir="ltr">1 mg/min</span><br>**حداکثر <span dir="ltr">2 min</span>** | **دپرسیون تنفسی و آپنه**؛ شروع اثر <span dir="ltr">1–2 min</span> |
| <span class="text-green-600 font-bold">**لووتیراستام**</span> | <span dir="ltr">60 mg/kg</span><br>**Max: <span dir="ltr">4.5 g</span>** | <span dir="ltr">10–15 min</span> | **خواب‌آلودگی**؛ معمولاً تداخل دارویی و عوارض همودینامیک کمتری دارد |
| **فنی‌توئین** | <span dir="ltr">20 mg/kg</span><br>**Max: <span dir="ltr">1.5 g</span>** | <span dir="ltr">1 mg/kg/min</span><br>**حداکثر <span dir="ltr">50 mg/min</span>** | **افت فشارخون، برادی‌کاردی و آریتمی**؛ **مانیتورینگ قلبی ضروری است**؛ با **سرم قندی** داده نشود |
| **فنوباربیتال** | <span dir="ltr">20 mg/kg</span><br>**Max: <span dir="ltr">1 g</span>** | <span dir="ltr">1 mg/kg/min</span><br>**حداکثر <span dir="ltr">60 mg/kg/min</span>** | **دپرسیون تنفسی** |
| **سدیم والپروات** | <span dir="ltr">20 mg/kg</span><br>**Max: <span dir="ltr">3 g</span>** | <span dir="ltr">5 min</span> | **هپاتوتوکسیسیته**؛ در بیماری کبدی، شک به بیماری متابولیک و سن زیر ۲ سال مصرف نشود |
---

## <span class="text-red-600 font-bold"> مرحله اول — Benzodiazepines</span>



###  نکات کابردی

- در صورت دریافت داروی بنزودیازپین قبل از رسیدن به اورژانس، آن دوز نیز باید در تعداد دوزهای دریافتی محاسبه شود.
- مرحله اول تا دو نوبت قابل تکرار می باشد و هر نوبت طی 5 دقیقه ارزیابی که دو دقیقه زمان تزریق و سه دقیقه باقی مانده   ارزیابی و در صورت عدم پاسخ نوبت دوم و بعد از 5 دقیقه مرحله بعد تجویز می شود.
- مجموعاً **حداکثر ۲ دوز مناسب بنزودیازپین**، شامل دوزهای دریافت‌شده قبل از ورود به اورژانس.

>  اثر بنزودیازپین ها هرچه تشنج طول بکشد کمتر می شود .

---

## <span class="text-red-600 font-bold"> مرحله دوم — Second-line Antiseizure Medication</span>

اگر پس از **۲ دوز بنزودیازپین** تشنج ادامه داشت:

### دارو های ضد تشنج

 1. <span class="text-green-600 font-bold">Levetiracetam</span>

 2. **Phenytoin**

 3. **Phenobarbital**

 4. **Sodium Valproate**

> **نکته:** در حال حاضر بین داروهای خط دوم فوق، در بسیاری از گایدلاین‌ها یک دارو به‌عنوان برنده مطلق و قطعی تعیین نشده است و انتخاب دارو به سن کودک، علت احتمالی تشنج، داروهای مصرفی قبلی، بیماری زمینه‌ای و عوارض مورد انتظار بستگی دارد.


---

## <span class="text-red-600 font-bold"> مرحله سوم — Refractory Status Epilepticus<.span>

اگر تشنج پس از درمان خط اول و خط دوم همچنان ادامه داشت:

### انتقال / بستری در PICU

- **PICU admission**
- درخواست فوری مشاوره **Pediatric Neurology**
- **Continuous EEG monitoring**
- آماده‌سازی برای **Advanced Airway Management / Intubation**

### داروهای بیهوشی / Continuous Infusion

بر اساس پروتکل PICU و نظر متخصص:

- **Midazolam infusion**
- **Ketamine**
- **Thiopentone**
- در شرایط منتخب، سایر داروهای بیهوشی طبق پروتکل مرکز



---

> **نکته مهم:** در تشنج استاتوس، همزمان با درمان ضدتشنج باید ABC، اکسیژناسیون، قند خون، دسترسی وریدی/IO و مانیتورینگ قلبی و تنفسی انجام شود.

---

### Order تشنج استاتوس در PICU

1. BS check stat then QID
2. Brain CT scan
3. LP بعد از Stable شدن بیمار و در صورت مناسب بودن شرایط
4. EEG
5. مشاوره نورولوژی
6. Amp Diazepam <span dir="ltr">0.2 mg/kg</span> standby — در صورت تشنج، تزریق آهسته با کنترل آپنه
7. Amp Phenytoin <span dir="ltr">20 mg/kg IV/IO</span> infusion با مانیتورینگ ECG و فشارخون
8. Amp Phenobarbital <span dir="ltr">20 mg/kg IV/IO</span> infusion
9. Amp Sodium Valproate <span dir="ltr">20 mg/kg IV/IO</span> طبق پروتکل
10. Amp Midazolam — Continuous IV infusion طبق پروتکل PICU در Refractory Status
11. Cardiopulmonary monitoring + pulse oximetry
12. ECG
13. CXR در صورت اندیکاسیون
14. O2 nasal or mask بر اساس وضعیت بیمار
15. NPO
16. Serum Maintenance
17. T chart + Apotel <span dir="ltr">10–15 mg/kg/dose</span> q4–6hr if fever
18. CBC, Diff, ESR, CRP, BUN, Cr, Na, K, BS, Ca, P, Mg, AST, ALT, VBG
19. U/A – urine toxicology در صورت شک به مسمومیت
20. سطح داروهای ضدتشنجی مصرفی قبلی

### در صورت شک به مننژیت

- Amp Cefotaxime <span dir="ltr">50 mg/kg/dose q6hr IV</span>
  یا
- Amp Ceftriaxone <span dir="ltr">50 mg/kg/dose q12hr IV</span>
- Amp Vancomycin <span dir="ltr">15 mg/kg/dose q6hr IV</span>
`,
  },
  {
    slug: "opioid-poisoning",
    title: "مسمومیت با اپیوم",
    category: "emergency",
    tags: ["مسمومیت", "اپیوم", "نالوکسان"],
    summary:
      "علائم مسمومیت اپیوئیدی، دوز و تکرار نالوکسان، و اوردر کامل درمانی.",
    content: `
## علائم

سرکوب CNS، سرکوب تنفس، مردمک‌های میوتیک، خارش، استفراغ، ایلئوس، برادی‌کاردی، برادی‌پنه، هیپوتانسیون.

**نوار قلب:** QT طولانی

## درمان: نالوکسان

**دوز:** 0.01–0.1 mg/kg (IV/IM/IO/IT)

- در هر نوبت حداکثر 2mg = ۵ آمپول
- حداکثر مقدار در کل 10mg (۲۵ آمپول) — در این دوز احتمال مسمومیت اپیوم پایین است
- هر آمپول 0.4mg در ۱ سی‌سی؛ نیمه‌عمر ۱ ساعت
- **تکرار:** هر ۱–۳ دقیقه تا برگشت تنفس و هوشیاری قابل‌قبول یا رسیدن به دوز ماکسیمم
- دوز عضلانی: ۳ برابر
- دریپ: ۱۶ برابر پاسخ درمانی در ۲۴ ساعت

## اوردر مسمومیت با اپیوم

1. BS check stat then QID
2. ارزیابی هوشیاری، تعداد تنفس و سچوریشن هر ۱۵ دقیقه تا ۴ نوبت
3. Cardiopulmonary monitoring + pulse oximetry
4. ECG
5. CXR (در صورت شک به آسپیراسیون)
6. VBG
7. NPO
8. Amp Pantoprazole 1mg/kg IV BD
9. Serum Maintenance
10. T chart
11. Control I/O
12. CBC, Diff, ESR, CRP, Bun, Cr, Na, K, BS, Ca, P, Mg, AST, ALT, VBG
13. U/A – urine toxicology
14. Naloxone Amp (معادل ۱۶ برابر دوز پاسخ اولیه طی ۲۴ ساعت)
15. در مصرف اپیوئیدهای جامد (مثل تریاک) می‌توان تا ۱۲ ساعت از شارکول استفاده کرد
16. Activated charcoal 1gr/kg + 1cc/kg MOM بار اول (max=60gr)؛ بار دوم و سوم 0.5gr/kg تا ۳ نوبت به فاصله ۳ ساعت
`,
  },
  {
    slug: "shock",
    title: "شوک",
    category: "emergency",
    tags: ["شوک", "اینوتروپ", "اپی‌نفرین دریپ"],
    summary: "طبقه‌بندی انواع شوک، درمان مرحله‌ای بر اساس زمان و اوردر کامل.",
    content: `
**تعریف:** ناتوانی اکسیژن‌رسانی برای نیازهای متابولیک ارگان‌ها و بافت‌های حیاتی بدن.

## انواع شوک

- **هیپوولمیک:** کاهش پره‌لود، از دست دادن مایع یا خون
- **کاردیوژنیک:** ضعف میوکارد/پمپ قلب، بیماری مادرزادی قلبی، عفونت‌ها، کاردیومیوپاتی، ایسکمی، آریتمی
- **سپتیک:** ترکیب هیپوولمیک، توزیعی و کاردیوژنیک، علت عفونی
- **توزیعی:** اختلال تون وازوموتور، آنافیلاکسی، آسیب نخاعی، داروها
- **انسدادی:** انسداد خروجی قلب، پنوموتوراکس فشارنده، تامپوناد قلبی، آمبولی ریوی، کوارکتاسیون آئورت

## درمان مرحله‌ای

- **۰–۵ دقیقه:** بررسی سطح هوشیاری و پرفیوژن؛ شروع اکسیژن‌تراپی؛ تعبیه IO/IV
- **۵–۱۵ دقیقه:** مایع‌درمانی با سرم ایزوتون 20 cc/kg (به‌شرط نداشتن علائم نارسایی قلبی: هپاتومگالی، رال، گالوپ)؛ تکرار بولوس تا 60 cc/kg؛ اصلاح هیپوگلیسمی/هیپوکلسمی؛ شروع آنتی‌بیوتیک
- **۱۵–۶۰ دقیقه:** در شوک مقاوم به مایع، شروع اینوتروپ وریدی:
  - اپی‌نفرین 0.05-0.3 mcg/kg/min
  - در نبود اپی‌نفرین: دوپامین 5-9 mcg/kg/min
  - نوراپی‌نفرین در شوک گرم: 0.05-0.3 mcg/kg/min
- در شوک مقاوم به اینوتروپ: هیدروکورتیزون جهت نارسایی آدرنال

## طیف علائم بر اساس شدت پرفیوژن

| ارگان | ↓ پرفیوژن | ↓↓ پرفیوژن | ↓↓↓ پرفیوژن |
|---|---|---|---|
| CNS | بی‌قراری، آپاتی | آژیته، کنفیوژن | کما |
| تنفسی | افزایش ونتیلاسیون | — | افزایش بیشتر ونتیلاسیون |
| متابولیسم | اسیدوز متابولیک جبران‌شده | — | اسیدوز متابولیک جبران‌نشده |
| گوارشی | کاهش موتیلیتی | — | ایلئوس |
| کلیوی | کاهش حجم ادرار، افزایش SG | الیگوری | الیگوری/آنوری |
| پوست | افزایش CRT | انتها سرد | ماتلینگ، سیانوز، اندام سرد |
| قلبی‌عروقی | افزایش ضربان قلب | تاکی‌کاردی بیشتر، کاهش نبض محیطی | تاکی‌کاردی + افت فشارخون + فقط نبض مرکزی |

## اوردر شوک

1. Check BS stat then q6hr
2. Cardiopulmonary monitoring and pulse oximetry
3. ECG
4. CXR
5. O2 therapy nasal or mask 3-5 L/min
6. Check BP q5-15min
7. Drip Epinephrine یا Norepinephrine 0.15mg/kg + 50cc DW5% Infusion 1cc/hr (تا 10cc/hr قابل افزایش)
8. NPO
9. Amp Pantoprazole 1mg/kg BD IV
10. Serum Maintenance + Deficit – Bolus
11. T chart + Apotel (10mg/kg q4hr) if fever
12. Foley fix
13. Chart I/O
14. CBC, Diff, ESR, CRP, Bun, Cr, Na, K, BS, Ca, P, Mg, AST, ALT, VBG
15. در شک به مننژیت: Amp Cefotaxime 50mg/kg/dose q6hr IV یا Amp Ceftriaxone 100mg/kg/day BD IV (دوز شک به مننژیت)
16. Amp Vancomycin 10mg/kg/dose q6hr IV slow (در شک به مننژیت 15mg/kg)
`,
  },
  {
    slug: "hypoglycemia",
    title: "هیپوگلیسمی",
    category: "emergency",
    tags: ["هیپوگلیسمی", "DW10%"],
    summary:
      "تعاریف هیپوگلیسمی بر حسب سن و وضعیت دیابت، تریاد ویپل و درمان فوری با دکستروز.",
    content: `
## هیپوگلیسمی

**تعاریف متعدد:** BS زیر ۶۰ در بیماران غیردیابتی / زیر ۷۰ در بیماران دیابتی علامت‌دار / زیر ۱۰۰ نوزاد فول‌ترم بعد از ۳ روزگی BS زیر ۵۵.

**تریاد ویپل:** علائم هیپوگلیسمی + قند پایین + بهبود علائم با مصرف قند.

### علائم
- **نوروژنیک/سمپاتیک:** تعریق، لرزش، تاکی‌کاردی، گرسنگی، هیپوترمی، رنگ‌پریدگی
- **نوروگلیکوپنیک:** لتارژی، تحریک‌پذیری، پورفیدینگ، آپنه، تشنج، تاکی‌پنه، اختلال رفتاری

**درمان:** DW10% 2-5 cc/kg IV stat
`,
  },
  {
    slug: "dka",
    title: "کتواسیدوز دیابتی (DKA)",
    category: "emergency",
    tags: ["DKA", "کتواسیدوز دیابتی", "انسولین دریپ", "سرم میترننس"],
    summary:
      "طبقه‌بندی شدت DKA، پروتکل کامل سرم‌درمانی، اوردر کامل و ابزار محاسبه دریپ ۲۴ ساعته بر اساس وزن بیمار.",
    content: `
## طبقه‌بندی شدت
| شدت | HCO3 | pH  | وضعیت بالینی |
|---|---|---|---|
| نرمال | ۲۰–۲۸ | ۷.۳۵–۷.۴۵ | بدون تغییر |
| خفیف | ۱۶–۲۰ | ۷.۲۵–۷.۳۵ | هوشیار، خسته |
| متوسط | ۱۰–۱۵ | ۷.۱۵–۷.۲۵ | تنفس کاسمال، خواب‌آلود، بیدارشونده |
| شدید | زیر ۱۰ | زیر ۷.۱۵ | کاسمال یا افسرده، خواب‌آلود تا کما |
> هیپرناترمی شدید (Na اصلاح‌شده > ۱۵۰) نیز به‌عنوان DKA شدید طبقه‌بندی می‌شود.

### پروتکل درمانی

| مرحله | اقدام |
|---|---|
| ساعت اول | ۱۰–۲۰ cc/kg نرمال سالین یا رینگرلاکتات وریدی بولوس؛ NPO؛ مانیتور علائم حیاتی/I-O/وضعیت نورولوژیک؛ مانیتول کنار تخت آماده برای ادم مغزی |
| ساعت دوم تا رفع DKA | سالین ۰.۴۵٪ + انسولین دریپ + Kphos 20meq/L؛ اگر BS<250 → گلوکز ۵٪. سرعت IV = ۸۵cc/kg + Maintenance-Bolus طی ۲۳ ساعت. چک BS هر ۱ ساعت؛ VBG و Na,K هر ۲ ساعت؛ پانتوپرازول 1mg/kg BD؛ انسولین دریپ 0.05-0.1 u/kg/hr |
| رفع (Resolution) | عدم استفراغ، HCO3>15، الکترولیت‌های نرمال → شروع خوراکی و انسولین زیرجلدی |

### اوردر DKA

1. Check BS stat then q1hr
2. Serum Mannitol 0.5-1gr/kg standby (در بروز علائم افزایش ICP، طی ۲۰ دقیقه وریدی؛ چک هوشیاری، مردمک، تریاد کوشینگ: HTN، برادی‌کاردی، تغییر الگوی تنفس)
3. Cardiopulmonary monitoring and pulse oximetry
4. ECG
5. CXR
6. O2 therapy nasal or mask 3-5 L/min
7. Check VBG, Na, K q2hr
8. Check Ca, P, Mg q4hr
9. NPO
10. Amp Pantoprazole 1mg/kg BD IV
11. سرم‌تراپی:
   - Batel A: سرم N.S 1000cc + KCl 15% 10cc
   - Batel B: سرم DW12.5% 1000cc + KCl 15% 10cc + NaCl 20% 50cc
   - BS ≥ 350 → کل سرم از باتل A
   - 250<BS<350 → دوسوم از A، یک‌سوم از B
   - 150<BS<250 → دوسوم از B، یک‌سوم از A
   - BS<150 → کل سرم از باتل B و قطع دریپ انسولین طی ۱۵ دقیقه
12. Drip Insulin Regular 50U + 500cc N.S (۳۰ سی‌سی اول از سرم دور ریخته شود)، سرعت 1cc/kg/hr
13. T chart
14. Control I/O
15. Foley fix
16. CBC, CRP, Bun, Cr, Na, K, BS, Ca, P, Mg, AST, ALT, VBG
17. آنتی‌بیوتیک در صورت شواهد عفونت
`,
  },
  {
    slug: "gcs-vitals-cpr",
    title: "GCS، علائم حیاتی نرمال و الگوریتم احیای قلبی-ریوی",
    category: "emergency",
    tags: ["GCS", "علائم حیاتی", "CPR", "احیا", "اینتوباسیون"],
    summary:
      "جدول GCS، محدوده نرمال علائم حیاتی بر حسب سن، الگوریتم PALS و فرمول‌های سایز لوله تراشه/فولی/چست‌تیوب.",
    content: `
## تعیین GCS

| باز کردن چشم‌ها | نمره |
|---|---|
| خودبه‌خود | ۴ |
| با صدا کردن | ۳ |
| با تحریک دردناک | ۲ |
| بدون پاسخ | ۱ |

| پاسخ کلامی | نمره |
|---|---|
| هدفمند و هوشیار | ۵ |
| گیج و مخشوش | ۴ |
| کلمات نامناسب | ۳ |
| کلمات غیرقابل‌فهم | ۲ |
| بدون پاسخ | ۱ |

پاسخ کلامی در شیرخوار: کلمات مناسب/می‌خندد/فیکس و فالو دارد (۵)، گریه تسکین‌پذیر (۴)، تحریک‌پذیری مداوم (۳)، اژیتاسیون/بی‌قراری (۲)، بدون پاسخ (۱)

| پاسخ حرکتی | نمره |
|---|---|
| اجرای دستورات | ۶ |
| لوکالیزه‌کردن | ۵ |
| عقب‌کشیدن در اثر تحریک | ۴ |
| فلکسیون | ۳ |
| اکستانسیون | ۲ |
| بدون پاسخ | ۱ |

> در GCS ≤ 8 اینتوباسیون اندیکاسیون دارد. حداکثر GCS = ۱۵، حداقل GCS = ۳.

## علائم حیاتی نرمال کودکان

| سن | ضربان قلب (bpm) | فشارخون (mmHg) | تعداد تنفس (بازدم/دقیقه) |
|---|---|---|---|
| نارس | ۱۲۰–۱۷۰ | ۵۵–۷۵ / ۳۵–۴۵ | ۴۰–۷۰ |
| ۰–۳ ماه | ۱۰۰–۱۵۰ | ۶۵–۸۵ / ۴۵–۵۵ | ۳۵–۵۵ |
| ۳–۶ ماه | ۹۰–۱۲۰ | ۷۰–۹۰ / ۵۰–۶۵ | ۳۰–۴۵ |
| ۶–۱۲ ماه | ۸۰–۱۲۰ | ۸۰–۱۰۰ / ۵۵–۶۵ | ۲۵–۴۰ |
| ۱–۳ سال | ۷۰–۱۱۰ | ۹۰–۱۰۵ / ۵۵–۷۰ | ۲۰–۳۰ |
| ۳–۶ سال | ۶۵–۱۱۰ | ۹۵–۱۱۰ / ۶۰–۷۵ | ۲۰–۲۵ |
| ۶–۱۲ سال | ۶۰–۹۵ | ۱۰۰–۱۲۰ / ۶۰–۷۵ | ۱۴–۲۲ |
| بالای ۱۲ سال | ۵۵–۸۵ | ۱۱۰–۱۳۵ / ۶۵–۸۵ | ۱۲–۱۸ |

**سقف نرمال تعداد تنفس:** زیر ۲ ماه: ۶۰ / ۲–۱۲ ماه: ۵۰ / ۱–۳ سال: ۴۰ / ۳–۵ سال: ۳۰ / بالای ۵ سال: ۲۰

**کف نرمال فشارخون سیستولیک:** نوزاد: ۶۰ / ۱ ماه تا ۱ سال: ۷۰ / ۱–۱۰ سال: ۷۰ + (۲ × سن) / بالای ۱۰ سال: ۹۰

> **هیپرتانسیون:** فشارخون بالای صدک ۹۵ براساس سن و جنس طبق جداول مرجع.

## الگوریتم احیای قلبی کودکان (خلاصه PALS)

۱. شروع CPR: ماساژ+ماسک-بگ، اتصال مانیتور/دفیبریلاتور
۲. ریتم قابل‌شوک است؟
   - **بله (VF/pVT):** شوک → CPR ۲ دقیقه + دسترسی IV/IO → ارزیابی مجدد ریتم → شوک مجدد → اپی‌نفرین هر ۳–۵ دقیقه + راه هوایی پیشرفته → آمیودارون یا لیدوکائین + علل قابل‌برگشت
   - **خیر (Asystole/PEA):** CPR ۲ دقیقه + IV/IO + اپی‌نفرین هر ۳–۵ دقیقه در اسرع وقت → ارزیابی مجدد ریتم → درمان علل قابل‌برگشت

**کیفیت CPR:** فشار محکم (≥⅓ قطر قدامی-خلفی قفسه) و سریع (۱۰۰–۱۲۰/دقیقه)، اجازه بازگشت کامل قفسه، حداقل وقفه، تعویض فشاردهنده هر ۲ دقیقه، نسبت فشار:تهویه ۱۵:۲ بدون راه هوایی پیشرفته، با راه هوایی پیشرفته فشار پیوسته + یک تنفس هر ۲–۳ ثانیه.

**دوز اپی‌نفرین در احیا:** ۰.۱ cc/kg وریدی از آمپول ۱/۱۰۰۰۰ (ماکسیمم ۱ میلی‌گرم)؛ تکرار هر ۳–۵ دقیقه. در نبود IO/IV می‌توان داخل تراشه تزریق کرد: ۰.۱ cc/kg از آمپول ۱/۱۰۰۰.

**علل قابل‌برگشت (Hs & Ts):** هیپوولمی، هیپوکسی، هیدروژن یون (اسیدوز)، هیپوگلیسمی، هیپو/هیپرکالمی، هیپوترمی، پنوموتوراکس فشارنده، تامپوناد قلبی، توکسین‌ها، ترومبوز ریوی، ترومبوز کرونری.

## فرمول‌های سایز تجهیزات

**G = (سن به سال ÷ ۴) + ۴**

- سایز لوله تراشه بدون کاف = G
- سایز لوله تراشه با کاف = G − 0.5
- عمق لوله تراشه = G × 3
- سایز فولی/NG-OG = G × 2
- سایز چست تیوب = G × 4
`,
  },
];

export default topics;
