<script setup lang="ts">
import axios from 'axios'
import {api} from '../API/base'

const emit = defineEmits<{
  success: []
}>()

const { isOpen: dialog, close: closeModalState } = useRegisterModal()

const supabase = useSupabaseClient()

const form = ref()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)

// error message
const error = ref<Record<string,string>>({})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const confirmPasswordRule = (value: string) => {
  if (!value) {
    return 'กรุณายืนยันรหัสผ่าน'
  }

  return value === password.value || 'รหัสผ่านไม่ตรงกัน'
}

const termsRule = (value: boolean | null) =>
  value === true || 'กรุณายอมรับข้อตกลงก่อนสมัครสมาชิก'

const resetForm = () => {
  name.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  acceptTerms.value = false

  showPassword.value = false
  showConfirmPassword.value = false
  errorMessage.value = ''
  successMessage.value = ''

  form.value?.resetValidation()
}

const closeModal = () => {
  if (loading.value) {
    return
  }

  closeModalState()
}

// ValidateForm
const emailReget = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i

function validateForm () {
  error.value = {}
  const f = form.value
  if(!f.name.trim()) error.value.name = 'กรุณากรอกชื่อ'
  if(!f.email.trim()) error.value.email = 'กรุณากรอกอีเมล'
  else if(!emailReget.test(f.email.trim())) error.value.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  if(!f.password.trim()) error.value.password = 'กรุณากรอกรหัสผ่าน'
  else if(f.password.trim().length < 6)error.value.password='ต้องมีอย่างน้อย 6 ตัวอักษร'
  if(!f.confirmPassword.value.trim()) error.value.confirmPassword = 'กรุณายืนยันรหัสผ่าน'
  else if(!f.confirmPassword.value.trim() != f.password.trim()) error.value.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
  return Object.keys(error.value).length === 0
}

const registerSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if(!validateForm()) return

  try{
    await axios.post(`${api}/auth/register`)
    alert("สมัครสมาชิกสำเร็จ")
    navigateTo('/',{replace:true})
  }catch{
    console.error("Error , Regisrer Member!")
  }

}

onMounted(() => {
  errorMessage.value = ''
  successMessage.value = ''
})
</script>

<template>
  <v-dialog v-model="dialog" max-width="540" :persistent="loading" scrollable attach="body">
    <v-card class="register-modal" elevation="0">
      <v-btn icon="mdi-close" variant="text" size="small" class="close-button" aria-label="ปิดหน้าต่างสมัครสมาชิก"
        :disabled="loading" @click="closeModal" />

      <div class="modal-decoration decoration-one" />
      <div class="modal-decoration decoration-two" />

      <div class="modal-content">
        <header class="modal-header">
          <span class="register-icon" aria-hidden="true">
            <v-icon icon="mdi-account-plus-outline" size="25" />
          </span>

          <p>START YOUR JOURNEY</p>
          <h2>สมัครสมาชิก AISist</h2>

          <span>
            เริ่มค้นหาเป้าหมายและสร้างแผนการเรียนรู้ที่เหมาะกับคุณ
          </span>
        </header>

        <v-alert v-if="errorMessage" type="error" variant="tonal" density="compact" closable class="message-alert"
          @click:close="errorMessage = ''">
          {{ errorMessage }}
        </v-alert>

        <v-alert v-if="successMessage" type="success" variant="tonal" density="compact" class="message-alert">
          {{ successMessage }}
        </v-alert>

        <v-form ref="form" class="register-form" @submit.prevent="registerSubmit">
          <v-text-field v-model="name" label="ชื่อที่ต้องการให้แสดง" placeholder="เช่น น้องมินท์"
            prepend-inner-icon="mdi-account-outline" autocomplete="name" variant="outlined" density="comfortable"
            color="primary" />

          <v-text-field v-model="email" type="email" label="อีเมล" placeholder="example@email.com"
            prepend-inner-icon="mdi-email-outline" autocomplete="email" variant="outlined" density="comfortable"
            color="primary" />

          <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="รหัสผ่าน"
            hint="ต้องมีอย่างน้อย 6 ตัวอักษร" prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              " autocomplete="new-password" variant="outlined" density="comfortable" color="primary" @click:append-inner="showPassword = !showPassword" />

          <v-text-field v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
            label="ยืนยันรหัสผ่าน" prepend-inner-icon="mdi-lock-check-outline" :append-inner-icon="showConfirmPassword
                ? 'mdi-eye-off-outline'
                : 'mdi-eye-outline'
              " autocomplete="new-password" variant="outlined" density="comfortable" color="primary"
            :rules="[confirmPasswordRule]" :disabled="loading || Boolean(successMessage)" @click:append-inner="
              showConfirmPassword = !showConfirmPassword
              " />

          <v-checkbox v-model="acceptTerms" color="primary" density="compact" class="terms-checkbox"
            :rules="[termsRule]" :disabled="loading || Boolean(successMessage)">
            <template #label>
              <span class="terms-label">
                ยอมรับ
                <NuxtLink to="/terms" target="_blank" @click.stop>
                  ข้อตกลงการใช้งาน
                </NuxtLink>
                และ
                <NuxtLink to="/privacy" target="_blank" @click.stop>
                  นโยบายความเป็นส่วนตัว
                </NuxtLink>
              </span>
            </template>
          </v-checkbox>

          <v-btn v-if="!successMessage" type="submit" block size="large" class="register-submit" :loading="loading">
            <v-icon icon="mdi-account-plus-outline" size="19" class="mr-2" />
            สมัครสมาชิก
          </v-btn>

          <v-btn v-else block size="large" variant="tonal" class="success-close-button" @click="closeModal">
            ปิดหน้าต่าง
          </v-btn>
        </v-form>

        <div class="security-note">
          <v-icon icon="mdi-shield-check-outline" size="17" />
          <span>
            ข้อมูลของคุณจะถูกใช้เพื่อจัดแผนการเรียนรู้เท่านั้น
          </span>
        </div>

        <p class="login-link">
          มีบัญชีอยู่แล้ว?
          <NuxtLink to="/login" @click="closeModal">
            เข้าสู่ระบบ
          </NuxtLink>
        </p>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.register-modal {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 16px !important;
  background: #fff !important;
  box-shadow: 0 30px 80px rgb(26 74 49 / 18%) !important;
}

.close-button {
  position: absolute;
  z-index: 5;
  top: 13px;
  right: 13px;
  color: #6e7c74 !important;
}

.close-button:hover {
  background: #eef6f1 !important;
  color: var(--primary-dark) !important;
}

.modal-content {
  position: relative;
  z-index: 2;
  padding: 38px 42px 34px;
}

.modal-decoration {
  position: absolute;
  z-index: 0;
  border: 1px solid #d8eee1;
  border-radius: 50%;
  pointer-events: none;
}

.decoration-one {
  top: -85px;
  right: -70px;
  width: 210px;
  height: 210px;
  background: rgb(225 246 234 / 55%);
}

.decoration-two {
  bottom: -100px;
  left: -100px;
  width: 220px;
  height: 220px;
}

.modal-header {
  margin-bottom: 25px;
  text-align: center;
}

.register-icon {
  display: grid;
  width: 52px;
  height: 52px;
  margin: 0 auto 15px;
  place-items: center;
  border-radius: 11px;
  background: #e3f7eb;
  color: var(--primary-dark);
}

.modal-header p {
  margin: 0;
  color: var(--primary-dark);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.3px;
}

.modal-header h2 {
  margin: 7px 0;
  color: var(--ink);
  font-size: 27px;
  line-height: 1.35;
  letter-spacing: -0.5px;
}

.modal-header>span {
  display: block;
  max-width: 370px;
  margin: 0 auto;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

.message-alert {
  margin-bottom: 18px;
  font-size: 12px;
}

.register-form {
  display: grid;
}

.register-form :deep(.v-field) {
  border-radius: 8px;
  background: #fff;
}

.register-form :deep(.v-field__input) {
  font-size: 13px;
}

.register-form :deep(.v-label) {
  font-size: 13px;
}

.terms-checkbox {
  margin-top: -7px;
  margin-bottom: 7px;
}

.terms-label {
  color: #69776f;
  font-size: 11px;
  line-height: 1.6;
}

.terms-label a {
  color: var(--primary-dark);
  font-weight: 700;
}

.register-submit {
  height: 47px !important;
  border-radius: 8px !important;
  background: var(--primary-dark) !important;
  color: #fff !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  box-shadow: none !important;
}

.register-submit:hover {
  background: #1f754f !important;
}

.success-close-button {
  border-radius: 8px !important;
  color: var(--primary-dark) !important;
  font-weight: 700 !important;
  text-transform: none !important;
}

.security-note {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 17px;
  color: #7c8982;
  font-size: 10px;
}

.security-note .v-icon {
  color: var(--primary-dark);
}

.login-link {
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 12px;
  text-align: center;
}

.login-link a {
  margin-left: 3px;
  color: var(--primary-dark);
  font-weight: 700;
}

@media (max-width: 600px) {
  .register-modal {
    margin: 12px;
    border-radius: 12px !important;
  }

  .modal-content {
    padding: 32px 20px 25px;
  }

  .modal-header h2 {
    font-size: 23px;
  }
}
</style>