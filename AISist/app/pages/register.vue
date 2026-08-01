<script setup lang="ts">
useSeoMeta({
  title: 'สมัครสมาชิก | AISist',
  description: 'สร้างบัญชีผู้ใช้ AISist เพื่อเริ่มต้นค้นหาเป้าหมาย วางแผนการเรียนรู้ และประเมินทักษะอย่างมีประสิทธิภาพ',
})

const supabase = useSupabaseClient()

const form = ref()
const displayName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const register = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  loading.value = true

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value,
      options: {
        data: {
          display_name: displayName.value.trim(),
          role: 'student',
        },
      },
    })

    if (error) {
      if (error.message.toLowerCase().includes('already registered')) {
        errorMessage.value = 'อีเมลนี้ถูกสมัครสมาชิกไว้แล้ว'
      } else if (error.message.toLowerCase().includes('password')) {
        errorMessage.value = 'รหัสผ่านไม่ตรงตามเงื่อนไขของระบบ'
      } else {
        errorMessage.value = error.message
      }
      return
    }

    if (data.session) {
      successMessage.value = 'สมัครสมาชิกสำเร็จ กำลังนำคุณเข้าสู่ระบบ...'
      await new Promise(resolve => setTimeout(resolve, 1000))
      await navigateTo('/student')
      return
    }

    successMessage.value = 'สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีของคุณ'
  } catch (err) {
    console.error('Register error:', err)
    errorMessage.value = 'ไม่สามารถสมัครสมาชิกได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <!-- Left side showcase -->
      <div class="showcase-section">
        <div class="showcase-badge">
          <v-icon icon="mdi-sparkles" size="14" />
          <span>AI-POWERED LEARNING PLATFORM</span>
        </div>

        <h1 class="showcase-title">
          เริ่มต้นก้าวแรก<br>
          <span>สู่อนาคตที่คุณเลือกเอง</span>
        </h1>

        <p class="showcase-description">
          AISist ทำหน้าที่เป็นผู้ช่วยวางแผนการเรียนรู้ส่วนบุคคล ค้นหาศักยภาพที่ซ่อนอยู่ และพาคุณไปถึงเป้าหมายอย่างมั่นใจ
        </p>

        <div class="benefit-list">
          <div class="benefit-item">
            <div class="benefit-icon">
              <v-icon icon="mdi-map-marker-path" size="20" />
            </div>
            <div>
              <h3>แผนการเรียนรู้เฉพาะคุณ</h3>
              <p>AI ช่วยวาง Roadmap ตามจุดเริ่มต้นและเวลาที่คุณมี</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">
              <v-icon icon="mdi-account-tie" size="20" />
            </div>
            <div>
              <h3>มีพี่เลี้ยงคอยดูแล</h3>
              <p>พูดคุยกับ AI และรับคำแนะนำจากพี่เลี้ยงสายงานจริง</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">
              <v-icon icon="mdi-chart-box-outline" size="20" />
            </div>
            <div>
              <h3>ประเมินทักษะจากโจทย์จริง</h3>
              <p>สะท้อนความสามารถในการคิดและแก้ปัญหาอย่างตรงจุด</p>
            </div>
          </div>
        </div>

        <!-- Floating testimonial card -->
        <div class="floating-testimonial">
          <div class="testimonial-header">
            <v-avatar size="36" color="#e0f8eb" class="testimonial-avatar">
              <span class="avatar-text">ม</span>
            </v-avatar>
            <div>
              <div class="testimonial-name">น้องมินท์ · ม.5</div>
              <div class="testimonial-sub">สายวิทยาศาสตร์-คอมพิวเตอร์</div>
            </div>
          </div>
          <p class="testimonial-text">
            "AISist ช่วยให้จัดเวลาเรียน และมองเห็นก้าวถัดไปได้ชัดเจนขึ้นมาก ไม่รู้สึกสับสนเหมือนเมื่อก่อนแล้วค่ะ"
          </p>
        </div>
      </div>

      <!-- Right side form -->
      <div class="form-section">
        <div class="form-card">
          <div class="form-header">
            <div class="form-logo">
              <span class="logo-icon"><v-icon icon="mdi-school-outline" size="22" /></span>
              <span class="logo-text"><em>AIS</em>ist</span>
            </div>
            <h2>สร้างบัญชีผู้ใช้งาน</h2>
            <p>กรอกข้อมูลสั้น ๆ เพื่อเริ่มวางแผนการเรียนรู้กับเรา</p>
          </div>

          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            density="comfortable"
            closable
            class="mb-4"
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <v-alert
            v-if="successMessage"
            type="success"
            variant="tonal"
            density="comfortable"
            class="mb-4"
          >
            {{ successMessage }}
          </v-alert>

          <v-form
            ref="form"
            class="register-form"
            @submit.prevent="register"
          >
            <div class="field-group">
              <label class="field-label">ชื่อที่ต้องการให้แสดง</label>
              <v-text-field
                v-model="displayName"
                placeholder="เช่น น้องมินท์"
                prepend-inner-icon="mdi-account-outline"
                autocomplete="name"
                variant="outlined"
                density="comfortable"
                color="primary"
                :disabled="loading || Boolean(successMessage)"
              />
            </div>

            <div class="field-group">
              <label class="field-label">อีเมล</label>
              <v-text-field
                v-model="email"
                type="email"
                placeholder="example@email.com"
                prepend-inner-icon="mdi-email-outline"
                autocomplete="email"
                variant="outlined"
                density="comfortable"
                color="primary"
                :disabled="loading || Boolean(successMessage)"
              />
            </div>

            <div class="field-group">
              <label class="field-label">รหัสผ่าน</label>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="ต้องมีอย่างน้อย 6 ตัวอักษร"
                prepend-inner-icon="mdi-lock-outline"
                autocomplete="new-password"
                variant="outlined"
                density="comfortable"
                color="primary"
                :disabled="loading || Boolean(successMessage)"
              >
                <template #append-inner>
                  <v-icon
                    :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    style="cursor: pointer;"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </v-text-field>
            </div>

            <div class="field-group">
              <label class="field-label">ยืนยันรหัสผ่าน</label>
              <v-text-field
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="พิมพ์รหัสผ่านอีกครั้ง"
                prepend-inner-icon="mdi-lock-check-outline"
                autocomplete="new-password"
                variant="outlined"
                density="comfortable"
                color="primary"
                :disabled="loading || Boolean(successMessage)"
              >
                <template #append-inner>
                  <v-icon
                    :icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    style="cursor: pointer;"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </v-text-field>
            </div>

            <v-checkbox
              v-model="acceptTerms"
              color="primary"
              density="compact"
              class="terms-checkbox"
              :disabled="loading || Boolean(successMessage)"
            >
              <template #label>
                <span class="terms-text">
                  ยอมรับ
                  <NuxtLink to="/terms" target="_blank" @click.stop>ข้อตกลงการใช้งาน</NuxtLink>
                  และ
                  <NuxtLink to="/privacy" target="_blank" @click.stop>นโยบายความเป็นส่วนตัว</NuxtLink>
                </span>
              </template>
            </v-checkbox>

            <v-btn
              v-if="!successMessage"
              type="submit"
              block
              size="large"
              class="submit-button"
              :loading="loading"
            >
              <v-icon icon="mdi-account-plus-outline" size="19" class="mr-2" />
              สมัครสมาชิก
            </v-btn>

            <v-btn
              v-else
              to="/student"
              block
              size="large"
              color="primary"
              variant="tonal"
            >
              ไปที่หน้าหลักของฉัน
            </v-btn>
          </v-form>

          <div class="security-badge">
            <v-icon icon="mdi-shield-check-outline" size="16" />
            <span>ข้อมูลของคุณปลอดภัยและใช้สำหรับวางแผนการเรียนรู้เท่านั้น</span>
          </div>

          <div class="login-footer">
            มีบัญชีอยู่แล้ว?
            <NuxtLink to="/login">เข้าสู่ระบบ</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0 64px;
}

.register-container {
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 480px);
  gap: 60px;
  align-items: center;
}

/* Showcase Left */
.showcase-section {
  padding-right: 20px;
}

.showcase-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  background: #e3f7eb;
  color: var(--primary-dark);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  margin-bottom: 20px;
}

.showcase-title {
  font-size: 38px;
  font-weight: 800;
  line-height: 1.25;
  color: var(--ink);
  letter-spacing: -0.8px;
  margin-bottom: 16px;
}

.showcase-title span {
  color: var(--primary-dark);
  background: linear-gradient(135deg, var(--primary-dark) 0%, #1b6343 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.showcase-description {
  font-size: 15px;
  line-height: 1.75;
  color: var(--muted);
  margin-bottom: 36px;
}

.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 40px;
}

.benefit-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.benefit-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #edf8f2;
  color: var(--primary-dark);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(39, 136, 94, 0.08);
}

.benefit-item h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 4px;
}

.benefit-item p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

.floating-testimonial {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 12px 32px rgba(23, 38, 30, 0.06);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.testimonial-avatar {
  font-weight: 700;
  color: var(--primary-dark);

  .avatar-text {
    font-size: 14px;
    font-weight: 800;
  }
}

.testimonial-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}

.testimonial-sub {
  font-size: 11px;
  color: var(--muted);
}

.testimonial-text {
  font-size: 13px;
  line-height: 1.6;
  color: #4b5a52;
  margin: 0;
  font-style: italic;
}

/* Form Right */
.form-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 38px 36px;
  box-shadow: 0 20px 60px rgba(27, 66, 45, 0.08);
}

.form-header {
  text-align: center;
  margin-bottom: 28px;
}

.form-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.form-logo .logo-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  display: grid;
  place-items: center;
}

.form-logo .logo-text {
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
}

.form-logo .logo-text em {
  color: var(--primary-dark);
  font-style: normal;
}

.form-header h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 6px;
  letter-spacing: -0.4px;
}

.form-header p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 12px;
  font-weight: 700;
  color: #37463f;
}

.register-form :deep(.v-field) {
  border-radius: 9px;
  background: #fcfdfe;
}

.terms-checkbox {
  margin-top: -4px;
}

.terms-text {
  font-size: 12px;
  color: var(--muted);
}

.terms-text a {
  color: var(--primary-dark);
  font-weight: 700;
}

.submit-button {
  height: 48px !important;
  border-radius: 9px !important;
  background: var(--primary-dark) !important;
  color: #fff !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  box-shadow: 0 4px 14px rgba(39, 136, 94, 0.25) !important;
  transition: all 0.2s ease !important;
}

.submit-button:hover {
  background: #1f754f !important;
  transform: translateY(-1px);
}

.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 20px;
  color: #7b8881;
  font-size: 11px;
}

.security-badge .v-icon {
  color: var(--primary-dark);
}

.login-footer {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  text-align: center;
  font-size: 13px;
  color: var(--muted);
}

.login-footer a {
  color: var(--primary-dark);
  font-weight: 700;
  margin-left: 4px;
}

/* Responsive */
@media (max-width: 960px) {
  .register-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .showcase-section {
    padding-right: 0;
    text-align: center;
  }

  .showcase-badge {
    margin-inline: auto;
  }

  .benefit-list {
    text-align: left;
    max-width: 500px;
    margin-inline: auto;
  }

  .floating-testimonial {
    max-width: 500px;
    margin-inline: auto;
  }
}

@media (max-width: 540px) {
  .form-card {
    padding: 28px 20px;
    border-radius: 16px;
  }

  .showcase-title {
    font-size: 28px;
  }
}

.required-star {
  color: #e53935;
  margin-left: 2px;
}
</style>
