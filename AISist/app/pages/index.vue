<script setup lang="ts">
const scrollProgress = ref(0)
let revealObserver: IntersectionObserver | null = null

const features = [
    {
        icon: 'mdi-account-voice',
        number: '01',
        title: 'มีพี่เลี้ยงคอยให้คำปรึกษา',
        description: 'พูดคุยกับ AI ได้ทุกเวลา และขอคำแนะนำจากพี่เลี้ยงที่เข้าใจเส้นทางการเรียนของคุณ',
    },
    {
        icon: 'mdi-map-marker-path',
        number: '02',
        title: 'แผนการเรียนรู้เฉพาะคุณ',
        description: 'AI ช่วยจัดลำดับสิ่งที่ควรเรียนตามเป้าหมาย จุดเริ่มต้น และเวลาที่คุณมี',
    },
    {
        icon: 'mdi-chart-box-outline',
        number: '03',
        title: 'ประเมินจากทักษะจริง',
        description: 'เห็นความสามารถด้านการคิด วิเคราะห์ และแก้ปัญหาผ่านสถานการณ์ที่ใกล้ชีวิตจริง',
    },
]

const learningSteps = [
    { number: '01', title: 'เล่าเป้าหมายของคุณ', detail: 'บอกคณะที่สนใจ สิ่งที่ชอบ และพื้นฐานที่มีในวันนี้', icon: 'mdi-compass-outline' },
    { number: '02', title: 'รับแผนที่ออกแบบเพื่อคุณ', detail: 'AI สร้าง Roadmap ที่มองเห็นก้าวถัดไปอย่างชัดเจน', icon: 'mdi-map-outline' },
    { number: '03', title: 'เรียนรู้และเติบโตต่อเนื่อง', detail: 'ฝึกทักษะ รับคำแนะนำ และปรับแผนได้ตลอดทาง', icon: 'mdi-trending-up' },
]

const skills = [
    { label: 'การคิดวิเคราะห์', value: 92 },
    { label: 'การแก้ปัญหา', value: 88 },
    { label: 'การทำงานเป็นระบบ', value: 90 },
]

useSeoMeta({
    title: 'AISist | เริ่มต้นเส้นทางการเรียนรู้ของคุณ',
    description: 'แพลตฟอร์ม AI สำหรับวางแผนการเรียนรู้และประเมินทักษะของนักเรียน',
})

const updateScrollProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
}

onMounted(() => {
    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })

    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    revealObserver?.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.14 },
    )

    document.querySelectorAll('.reveal').forEach((element) => revealObserver?.observe(element))
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScrollProgress)
    revealObserver?.disconnect()
})
</script>

<template>
    <div id="top" class="home-page">
        <div class="scroll-indicator" aria-hidden="true"><i :style="{ width: `${scrollProgress}%` }" /></div>

        <section class="hero-section">
            <div class="hero-copy">
                <p class="eyebrow"><v-icon icon="mdi-sparkles" size="15" /> AI-POWERED LEARNING PLATFORM</p>
                <h1>ทุกความฝัน<br>เริ่มต้นด้วย<span>เส้นทางที่ชัดเจน</span></h1>
                <p class="hero-description">AISist ช่วยให้ผู้เรียนค้นพบเป้าหมาย วางแผนการเรียนรู้
                    และประเมินทักษะที่แท้จริง เพื่อก้าวสู่อนาคตอย่างมั่นใจ</p>
                <div class="hero-actions">
                    <v-btn href="#features" class="primary-action" size="large" append-icon="mdi-arrow-right">รู้จัก
                        AISist</v-btn>
                    <v-btn href="#journey" class="secondary-action" variant="outlined" size="large"
                        prepend-icon="mdi-play-circle-outline">ดูการทำงาน</v-btn>
                </div>
                <div class="hero-note"><v-icon icon="mdi-shield-check-outline" size="18" />
                    สร้างขึ้นเพื่อผู้เรียนระดับมัธยมศึกษา ม.4–ม.6</div>
            </div>

            <div class="hero-visual" aria-label="ตัวอย่างแผนการเรียนรู้ของผู้ใช้">
                <div class="visual-caption">LEARNING JOURNEY <span>●</span></div>
                <div class="dashboard-card">
                    <div class="dashboard-header"><span class="dashboard-logo"><v-icon icon="mdi-school-outline"
                                size="17" /> AISist</span><v-icon icon="mdi-dots-horizontal" color="#7c8982"
                            size="21" /></div>
                    <div class="dashboard-greeting">
                        <div><small>สวัสดี น้องมินท์</small><strong>วันนี้เราเริ่มจาก<br>ก้าวเล็ก ๆ กันนะ</strong></div>
                        <v-avatar size="47" class="dashboard-avatar">น</v-avatar>
                    </div>
                    <div class="today-plan"><span><v-icon icon="mdi-code-tags" size="20" /></span>
                        <div><small>แผนของวันนี้</small><b>ฝึกพื้นฐาน Python</b><em>บทเรียนที่ 2 จาก 4</em></div><v-icon
                            icon="mdi-arrow-right" size="18" />
                    </div>
                    <div class="weekly-progress">
                        <div><span>ความคืบหน้าสัปดาห์นี้</span><b>65%</b></div><v-progress-linear model-value="65"
                            color="#176b4b" bg-color="#e5eee9" height="7" rounded />
                    </div>
                </div>
                <div class="floating-card mentor-float"><v-avatar size="31" class="mentor-avatar"><v-icon
                            icon="mdi-account-tie" size="19" /></v-avatar>
                    <div><small>พี่เลี้ยงของคุณ</small><b>พี่ฟ้า · วิศวะคอมฯ</b></div><i>●</i>
                </div>
                <div class="floating-card score-float"><span class="score-icon"><v-icon icon="mdi-chart-line"
                            size="18" /></span>
                    <div><small>Skill score</small><b>92 <em>/ 100</em></b></div>
                </div>
                <span class="orbit orbit-one" /><span class="orbit orbit-two" />
            </div>
        </section>

        <section class="trust-row reveal">
            <div><strong>1 platform</strong><span>เริ่มต้นได้จากทุกที่</span></div>
            <div><strong>3 core tools</strong><span>ปรึกษา · วางแผน · ประเมิน</span></div>
            <div><strong>1 clear goal</strong><span>ให้คุณไปถึงอนาคตที่เลือกเอง</span></div>
        </section>

        <section id="features" class="problem-section">
            <div class="section-heading reveal">
                <p class="section-label">WHY AISIST</p>
                <h2>เปลี่ยนความไม่แน่ใจ<br>ให้กลายเป็นก้าวที่มั่นใจ</h2>
                <p>เราออกแบบเครื่องมือที่ช่วยให้ผู้เรียนมองเห็นศักยภาพและเส้นทางของตัวเองได้ชัดเจนขึ้น</p>
            </div>
            <div class="feature-grid">
                <article v-for="(feature, index) in features" :key="feature.number" class="feature-card reveal"
                    :style="{ '--delay': `${index * 110}ms` }">
                    <div class="feature-top"><span class="feature-icon"><v-icon :icon="feature.icon"
                                size="23" /></span><b>{{ feature.number }}</b></div>
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.description }}</p>
                    <span class="card-line" />
                </article>
            </div>
        </section>

        <section id="journey" class="journey-section">
            <div class="journey-intro reveal">
                <p class="section-label">HOW IT WORKS</p>
                <h2>ทางที่เหมาะกับคุณ<br>ไม่จำเป็นต้องเหมือนใคร</h2>
                <p>AISist ทำหน้าที่เป็นผู้ช่วยที่รับฟัง วางลำดับ และคอยพาคุณกลับมามองเป้าหมายที่ตั้งใจไว้เสมอ</p>
                <v-btn href="#assessment" class="text-action" variant="text"
                    append-icon="mdi-arrow-down">ดูการประเมินทักษะ</v-btn>
            </div>

            <div class="journey-steps">
                <article v-for="(step, index) in learningSteps" :key="step.number" class="journey-step reveal"
                    :style="{ '--delay': `${index * 120}ms` }">
                    <div class="step-marker"><span>{{ step.number }}</span><i /></div>
                    <div class="step-icon"><v-icon :icon="step.icon" size="22" /></div>
                    <div>
                        <h3>{{ step.title }}</h3>
                        <p>{{ step.detail }}</p>
                    </div>
                </article>
            </div>
        </section>

        <section id="assessment" class="assessment-section reveal">
            <div class="assessment-copy">
                <p class="section-label dark-label">SKILL-BASED ASSESSMENT</p>
                <h2>มองเห็นความสามารถ<br>มากกว่าแค่ผลการเรียน</h2>
                <p>แบบประเมินสถานการณ์จำลองช่วยสะท้อนการคิด การแก้ปัญหา และความถนัดของผู้เรียนอย่างเป็นธรรม</p>
                <div class="assessment-points"><span><v-icon icon="mdi-check" size="16" />
                        โจทย์ใกล้เคียงชีวิตจริง</span><span><v-icon icon="mdi-check" size="16" />
                        เห็นจุดแข็งที่นำไปต่อยอดได้</span></div>
            </div>
            <div class="report-card">
                <div class="report-header">
                    <div><small>SKILL ASSESSMENT REPORT</small><b>ผลการประเมินล่าสุด</b></div>
                    <span>A<small>level</small></span>
                </div>
                <div class="scenario"><v-icon icon="mdi-puzzle-outline" size="22" />
                    <div><small>สถานการณ์จำลอง</small><b>วางแผนระบบจองบัตรงานโรงเรียน</b></div>
                </div>
                <div class="skill-list">
                    <div v-for="skill in skills" :key="skill.label"><span>{{ skill.label }}</span><v-progress-linear
                            :model-value="skill.value" color="#2baf70" bg-color="#273a30" height="6" rounded /><b>{{
                                skill.value }}</b></div>
                </div>
            </div>
        </section>

        <section class="cta-section reveal">
            <div>
                <p class="section-label">START WITH YOURSELF</p>
                <h2>อนาคตที่อยากไป<br>เริ่มวางแผนได้แล้ววันนี้</h2>
            </div>
            <v-btn to="/register" class="cta-button" size="large" append-icon="mdi-arrow-up-right">เริ่มต้นกับ
                AISist</v-btn>
        </section>
    </div>
</template>

<style scoped>
.home-page {
    padding-bottom: 4px;
}

.scroll-indicator {
    position: fixed;
    z-index: 20;
    top: 0;
    right: 0;
    left: 0;
    height: 3px;
    background: transparent;
}

.scroll-indicator i {
    display: block;
    height: 100%;
    background: var(--primary);
    transition: width .08s linear;
}

.hero-section {
    display: grid;
    grid-template-columns: minmax(0, .88fr) minmax(430px, 1.12fr);
    min-height: 550px;
    align-items: center;
    gap: 70px;
    padding: 58px 42px 72px;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: linear-gradient(112deg, #fff 0%, #fff 45%, #f0f7f3 100%);
}

.hero-copy {
    position: relative;
    z-index: 1;
    max-width: 515px;
}

.eyebrow,
.section-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    color: var(--primary);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.05px;
}

.eyebrow {
    border-radius: 4px;
    padding: 6px 8px;
    background: #edf7f1;
}

h1,
h2,
h3,
p {
    margin: 0;
}

h1,
h2,
h3 {
    letter-spacing: -.8px;
}

h1 {
    margin-top: 18px;
    color: #17221c;
    font-size: clamp(42px, 4.4vw, 62px);
    line-height: 1.17;
}

.hero-copy h1 span {
    color: var(--primary);
}

.hero-description {
    max-width: 460px;
    margin-top: 19px;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 11px;
    margin-top: 29px;
}

.primary-action {
    border-radius: 6px !important;
    background: var(--primary) !important;
    color: white !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    text-transform: none !important;
    box-shadow: none !important;
}

.primary-action:hover {
    background: var(--primary-dark) !important;
}

.secondary-action {
    border-color: #cddbd3 !important;
    border-radius: 6px !important;
    color: var(--primary-dark) !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    text-transform: none !important;
}

.hero-note {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 27px;
    color: #7b8881;
    font-size: 11px;
}

.hero-note .v-icon {
    color: var(--primary);
}

.hero-visual {
    position: relative;
    min-height: 378px;
}

.visual-caption {
    position: absolute;
    top: 0;
    left: 8px;
    color: #759186;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1.2px;
}

.visual-caption span {
    color: var(--primary);
}

.dashboard-card {
    position: absolute;
    z-index: 2;
    top: 27px;
    right: 13px;
    width: min(100%, 415px);
    border: 1px solid #deebe3;
    border-radius: 12px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 19px 37px rgb(23 107 75 / 10%);
    animation: lift-in .8s ease-out both;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #edf2ef;
    padding-bottom: 14px;
}

.dashboard-logo {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--primary-dark);
    font-size: 11px;
    font-weight: 800;
}

.dashboard-greeting {
    display: flex;
    justify-content: space-between;
    margin-top: 18px;
    align-items: center;
}

.dashboard-greeting div {
    display: grid;
    gap: 4px;
}

.dashboard-greeting small,
.today-plan small,
.floating-card small {
    color: #7c8982;
    font-size: 9px;
}

.dashboard-greeting strong {
    font-size: 17px;
    line-height: 1.35;
}

.dashboard-avatar {
    border: 1px solid #d9e9df;
    background: #edf7f0;
    color: var(--primary-dark);
    font-weight: 800;
}

.today-plan {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    border: 1px solid #dcece2;
    border-radius: 8px;
    padding: 11px;
    background: #f7fbf8;
}

.today-plan>span {
    display: grid;
    width: 35px;
    height: 35px;
    place-items: center;
    border-radius: 6px;
    background: #dff4e7;
    color: var(--primary);
}

.today-plan div {
    display: grid;
    flex: 1;
    gap: 1px;
}

.today-plan b {
    color: #24342c;
    font-size: 11px;
}

.today-plan em {
    color: var(--primary);
    font-size: 9px;
    font-style: normal;
    font-weight: 700;
}

.today-plan>.v-icon {
    color: #6b7c73;
}

.weekly-progress {
    margin-top: 19px;
}

.weekly-progress>div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
    color: #58685f;
    font-size: 10px;
}

.weekly-progress b {
    color: var(--primary);
}

.floating-card {
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #dfe9e3;
    border-radius: 8px;
    padding: 9px 10px;
    background: rgb(255 255 255 / 95%);
    box-shadow: 0 13px 22px rgb(24 66 42 / 9%);
    animation: float 4s ease-in-out infinite;
}

.floating-card div {
    display: grid;
    gap: 1px;
}

.floating-card b {
    color: #314138;
    font-size: 10px;
}

.mentor-float {
    bottom: 3px;
    left: 0;
}

.mentor-float>i {
    margin-left: 2px;
    color: #2bae70;
    font-size: 8px;
    font-style: normal;
}

.mentor-avatar {
    background: #e8f3ec;
    color: var(--primary-dark);
}

.score-float {
    top: 94px;
    right: -20px;
    animation-delay: -1.5s;
}

.score-icon {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border-radius: 6px;
    background: #e5f4eb;
    color: var(--primary);
}

.score-float b {
    font-size: 17px;
}

.score-float em {
    color: #839087;
    font-size: 9px;
    font-style: normal;
    font-weight: 600;
}

.orbit {
    position: absolute;
    border: 1px solid #cce5d6;
    border-radius: 50%;
}

.orbit-one {
    z-index: 0;
    top: 18px;
    left: 43px;
    width: 290px;
    height: 290px;
}

.orbit-two {
    z-index: 0;
    right: -91px;
    bottom: -70px;
    width: 260px;
    height: 260px;
    border-color: #b8dbc6;
}

.trust-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 24px 0 104px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #fff;
}

.trust-row div {
    display: grid;
    gap: 3px;
    padding: 19px 27px;
    border-right: 1px solid var(--line);
}

.trust-row div:last-child {
    border: 0;
}

.trust-row strong {
    color: #25342c;
    font-size: 12px;
}

.trust-row span {
    color: #7b8780;
    font-size: 10px;
}

.problem-section {
    padding: 5px 0 106px;
}

.section-heading {
    max-width: 540px;
}

.section-heading h2,
.journey-intro h2,
.assessment-copy h2,
.cta-section h2 {
    margin-top: 12px;
    color: #17231c;
    font-size: clamp(30px, 3.4vw, 42px);
    line-height: 1.3;
}

.section-heading>p:last-child,
.journey-intro>p:not(.section-label),
.assessment-copy>p:not(.section-label) {
    margin-top: 14px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.8;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 17px;
    margin-top: 37px;
}

.feature-card {
    position: relative;
    min-height: 238px;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 22px;
    background: #fff;
    transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: #bbd9c6;
    box-shadow: 0 13px 24px rgb(27 80 50 / 7%);
}

.feature-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.feature-icon {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 7px;
    background: #eaf5ee;
    color: var(--primary);
}

.feature-top b {
    color: #9aa59f;
    font-size: 11px;
}

.feature-card h3 {
    margin-top: 19px;
    color: #233129;
    font-size: 17px;
}

.feature-card p {
    margin-top: 8px;
    color: #718078;
    font-size: 12px;
    line-height: 1.75;
}

.card-line {
    position: absolute;
    right: 22px;
    bottom: 21px;
    left: 22px;
    height: 2px;
    background: #e7f0eb;
}

.card-line::before {
    display: block;
    width: 36%;
    height: 100%;
    background: var(--primary);
    content: '';
}

.journey-section {
    display: grid;
    grid-template-columns: .88fr 1.12fr;
    gap: 88px;
    align-items: center;
    border-top: 1px solid var(--line);
    padding: 100px 0;
}

.journey-intro {
    max-width: 420px;
}

.text-action {
    margin-top: 24px;
    padding-inline: 0 !important;
    color: var(--primary) !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    text-transform: none !important;
}

.journey-steps {
    position: relative;
    display: grid;
    gap: 0;
}

.journey-steps::before {
    position: absolute;
    top: 40px;
    bottom: 40px;
    left: 19px;
    border-left: 1px solid #cfe0d6;
    content: '';
}

.journey-step {
    position: relative;
    display: grid;
    grid-template-columns: 39px 44px 1fr;
    align-items: center;
    gap: 15px;
    min-height: 104px;
}

.step-marker {
    z-index: 1;
    display: grid;
    width: 39px;
    height: 39px;
    place-items: center;
    border: 1px solid #b9d5c4;
    border-radius: 50%;
    background: #fff;
    color: var(--primary);
    font-size: 10px;
    font-weight: 800;
}

.step-icon {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 7px;
    background: #edf6f0;
    color: var(--primary);
}

.journey-step h3 {
    color: #26342c;
    font-size: 16px;
}

.journey-step p {
    max-width: 330px;
    margin-top: 4px;
    color: #748179;
    font-size: 12px;
    line-height: 1.65;
}

.assessment-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 65px;
    align-items: center;
    border-radius: 10px;
    padding: 59px;
    background: #183a29;
}

.assessment-copy h2 {
    color: #fff;
}

.assessment-copy>p:not(.section-label) {
    color: #b5cabe;
}

.dark-label {
    color: #78d6a0;
}

.assessment-points {
    display: grid;
    gap: 9px;
    margin-top: 23px;
    color: #d3e4da;
    font-size: 12px;
}

.assessment-points span {
    display: flex;
    align-items: center;
    gap: 6px;
}

.assessment-points .v-icon {
    color: #68d394;
}

.report-card {
    border-radius: 8px;
    padding: 21px;
    background: #fff;
}

.report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.report-header div {
    display: grid;
    gap: 3px;
}

.report-header small,
.scenario small {
    color: #78847d;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: .5px;
}

.report-header b {
    color: #27372e;
    font-size: 13px;
}

.report-header>span {
    display: grid;
    width: 39px;
    height: 39px;
    place-content: center;
    border-radius: 7px;
    background: #e5f4eb;
    color: var(--primary);
    font-size: 18px;
    font-weight: 800;
    text-align: center;
}

.report-header>span small {
    font-size: 7px;
    font-weight: 600;
    letter-spacing: 0;
}

.scenario {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 19px;
    border-radius: 6px;
    padding: 10px;
    background: #f2f8f4;
    color: var(--primary);
}

.scenario div {
    display: grid;
    gap: 2px;
}

.scenario b {
    color: #3d4d43;
    font-size: 10px;
}

.skill-list {
    display: grid;
    gap: 11px;
    margin-top: 19px;
}

.skill-list>div {
    display: grid;
    grid-template-columns: 100px 1fr 24px;
    align-items: center;
    gap: 8px;
    color: #64726a;
    font-size: 9px;
}

.skill-list b {
    color: var(--primary);
    font-size: 9px;
}

.cta-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    padding: 96px 0 24px;
}

.cta-section h2 {
    font-size: clamp(30px, 3.4vw, 40px);
}

.cta-button {
    border-radius: 6px !important;
    background: var(--primary) !important;
    color: #fff !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    text-transform: none !important;
}

.reveal {
    opacity: 1;
    transform: translateY(25px);
    transition: opacity .65s ease var(--delay, 0ms), transform .65s ease var(--delay, 0ms);
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
}

@keyframes lift-in {
    from {
        opacity: 0;
        transform: translateY(20px) rotate(1deg);
    }

    to {
        opacity: 1;
        transform: translateY(0) rotate(0);
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }
}

@media (max-width: 900px) {
    .hero-section {
        grid-template-columns: 1fr;
        gap: 36px;
    }

    .hero-visual {
        width: min(550px, 100%);
        margin: auto;
    }

    .feature-grid {
        grid-template-columns: 1fr;
    }

    .feature-card {
        min-height: 210px;
    }

    .journey-section {
        grid-template-columns: 1fr;
        gap: 43px;
    }

    .assessment-section {
        grid-template-columns: 1fr;
        gap: 38px;
        padding: 40px;
    }
}

@media (max-width: 600px) {
    .hero-section {
        min-height: auto;
        padding: 34px 21px 42px;
        border-radius: 8px;
    }

    .hero-description {
        font-size: 13px;
    }

    .hero-actions {
        margin-top: 23px;
    }

    .hero-visual {
        min-height: 333px;
    }

    .dashboard-card {
        right: 0;
        width: calc(100% - 10px);
        padding: 16px;
    }

    .score-float {
        right: -10px;
        top: 76px;
        transform: scale(.86);
        transform-origin: top right;
    }

    .mentor-float {
        bottom: -3px;
        transform: scale(.87);
        transform-origin: bottom left;
    }

    .orbit-one {
        top: 8px;
        left: 0;
        width: 230px;
        height: 230px;
    }

    .trust-row {
        grid-template-columns: 1fr;
        margin-bottom: 65px;
    }

    .trust-row div {
        padding: 15px 18px;
        border-right: 0;
        border-bottom: 1px solid var(--line);
    }

    .trust-row div:last-child {
        border-bottom: 0;
    }

    .problem-section {
        padding-bottom: 65px;
    }

    .feature-grid {
        margin-top: 26px;
    }

    .journey-section {
        padding: 65px 0;
    }

    .assessment-section {
        border-radius: 8px;
        padding: 26px 20px;
    }

    .skill-list>div {
        grid-template-columns: 91px 1fr 21px;
        gap: 6px;
    }

    .cta-section {
        display: grid;
        padding: 68px 0 4px;
    }

    .cta-button {
        justify-self: start;
    }
}

@media (prefers-reduced-motion: reduce) {
    .reveal {
        opacity: 1;
        transform: none;
        transition: none;
    }

    .dashboard-card,
    .floating-card {
        animation: none;
    }

    .scroll-indicator {
        display: none;
    }
}
</style>
