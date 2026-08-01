<script setup lang="ts">
useSeoMeta({
  title: 'เข้าสู่ระบบ | AISist',
  description: 'เข้าสู่ระบบเพื่อใช้งานแพลตฟอร์ม AISist วางแผนการเรียนรู้ และติดตามความคืบหน้าของคุณ',
})

const supabase = useSupabaseClient()

const form = ref()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const emailRule = (value: string) => {
  if (!value?.trim()) {
    return 'กรุณากรอกอีเมล'
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(value) || 'รูปแบบอีเมลไม่ถูกต้อง'
}

const passwordRule = (value: string) =>
  Boolean(value) || 'กรุณากรอกรหัสผ่าน'

const login = async () => {
  errorMessage.value = ''
  const validation = await form.value?.validate()
  if (!validation?.valid) {
    return
  }

  loading.value = true

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value,
    })

    if (error) {
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        errorMessage.value = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
      } else {
        errorMessage.value = error.message
      }
      return
    }

    if (data.session) {
      await navigateTo('/student')
    }
  } catch (err) {
    console.error('Login error:', err)
    errorMessage.value = 'ไม่สามารถเข้าสู่ระบบได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <NuxtLink to="/" class="login-logo">
            <span class="logo-icon"><v-icon icon="mdi-school-outline" size="24" /></span>
            <span class="logo-text"><em>AIS</em>ist</span>
          </NuxtLink>
          <h2>ยินดีต้อนรับกลับมา</h2>
          <p>เข้าสู่ระบบเพื่อใช้งานแผนการเรียนและประเมินทักษะ</p>
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

        <v-form
          ref="form"
          class="login-form"
          @submit.prevent="login"
        >
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
              :rules="[emailRule]"
              :disabled="loading"
            />
          </div>

          <div class="field-group">
            <div class="label-row">
              <label class="field-label">รหัสผ่าน</label>
              <NuxtLink to="/forgot-password" class="forgot-link">ลืมรหัสผ่าน?</NuxtLink>
            </div>
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="กรอกรหัสผ่านของคุณ"
              prepend-inner-icon="mdi-lock-outline"
              autocomplete="current-password"
              variant="outlined"
              density="comfortable"
              color="primary"
              :rules="[passwordRule]"
              :disabled="loading"
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

          <div class="remember-row">
            <v-checkbox
              v-model="rememberMe"
              label="จดจำการใช้งาน"
              color="primary"
              density="compact"
              hide-details
            />
          </div>

          <v-btn
            type="submit"
            block
            size="large"
            class="submit-button"
            :loading="loading"
          >
            <v-icon icon="mdi-login" size="19" class="mr-2" />
            เข้าสู่ระบบ
          </v-btn>
        </v-form>

        <div class="register-footer">
          ยังไม่มีบัญชีผู้ใช้?
          <NuxtLink to="/register">สมัครสมาชิกฟรี</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
}

.login-container {
  width: min(440px, 100%);
}

.login-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 20px 60px rgba(27, 66, 45, 0.08);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  text-decoration: none;
}

.login-logo .logo-icon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  background: var(--primary);
  color: #fff;
  display: grid;
  place-items: center;
}

.login-logo .logo-text {
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
}

.login-logo .logo-text em {
  color: var(--primary-dark);
  font-style: normal;
}

.login-header h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 6px;
  letter-spacing: -0.4px;
}

.login-header p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-label {
  font-size: 12px;
  font-weight: 700;
  color: #37463f;
}

.forgot-link {
  font-size: 11px;
  color: var(--primary-dark);
  font-weight: 700;
}

.login-form :deep(.v-field) {
  border-radius: 9px;
  background: #fcfdfe;
}

.remember-row {
  margin-top: -6px;
  margin-bottom: 4px;
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

.register-footer {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  text-align: center;
  font-size: 13px;
  color: var(--muted);
}

.register-footer a {
  color: var(--primary-dark);
  font-weight: 700;
  margin-left: 4px;
}

@media (max-width: 500px) {
  .login-card {
    padding: 30px 20px;
    border-radius: 16px;
  }
}
</style>
