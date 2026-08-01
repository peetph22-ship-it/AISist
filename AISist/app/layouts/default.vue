<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const profileMenu = ref(false)

const displayName = computed(() => {
  const metadata = user.value?.user_metadata

  return (
    metadata?.display_name ||
    metadata?.full_name ||
    metadata?.name ||
    user.value?.email?.split('@')[0] ||
    'ผู้ใช้งาน'
  )
})

const avatarText = computed(() => {
  return displayName.value.trim().charAt(0).toUpperCase() || 'A'
})

const logout = async () => {
  profileMenu.value = false

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('ไม่สามารถออกจากระบบได้:', error.message)
    return
  }

  await navigateTo('/')
}
</script>

<template>
  <div class="app-layout">
    <header class="site-header">
      <div class="header-content">
        <NuxtLink to="/" class="brand" aria-label="AISist หน้าแรก">
          <span class="brand-mark" aria-hidden="true">
            <v-icon icon="mdi-school-outline" size="20" />
          </span>

          <span><em>AIS</em>ist</span>
        </NuxtLink>

        <nav class="navigation" aria-label="เมนูหลัก">
          <NuxtLink to="/" exact-active-class="router-link-active">
            <v-icon icon="mdi-view-grid-outline" size="17" />
            หน้าหลัก
          </NuxtLink>

          <NuxtLink to="/roadmap">
            <v-icon icon="mdi-map-marker-path" size="17" />
            แผนการเรียน
          </NuxtLink>

          <NuxtLink to="/assessment">
            <v-icon icon="mdi-chart-box-outline" size="17" />
            ประเมินทักษะ
          </NuxtLink>

          <NuxtLink to="/mentors">
            <v-icon icon="mdi-account-tie" size="17" />
            พี่เลี้ยง
          </NuxtLink>
        </nav>

        <!-- ยังไม่ได้เข้าสู่ระบบ -->
        <div v-if="!user" class="header-actions guest-actions">
          <v-btn to="/login" variant="text" class="login-button" prepend-icon="mdi-login">
            เข้าสู่ระบบ
          </v-btn>

          <v-btn to="/register" class="register-button" prepend-icon="mdi-account-plus-outline">
            สมัครสมาชิก
          </v-btn>
        </div>

        <!-- เข้าสู่ระบบแล้ว -->
        <div v-else class="header-actions">
          <v-badge dot color="error" location="top end" offset-x="9" offset-y="9">
            <v-btn to="/notifications" icon="mdi-bell-outline" variant="text" class="icon-button"
              aria-label="การแจ้งเตือน" />
          </v-badge>

          <v-menu v-model="profileMenu" location="bottom end" :offset="8">
            <template #activator="{ props }">
              <v-btn v-bind="props" variant="text" class="profile-button" aria-label="เปิดเมนูโปรไฟล์">
                <v-avatar size="34" class="avatar">
                  {{ avatarText }}
                </v-avatar>

                <span class="profile-name">
                  {{ displayName }}
                </span>

                <v-icon icon="mdi-chevron-down" size="18" class="chevron" aria-hidden="true" />
              </v-btn>
            </template>

            <v-list class="profile-menu" density="compact">
              <v-list-item to="/profile" prepend-icon="mdi-account-outline" title="โปรไฟล์ของฉัน" />

              <v-list-item to="/dashboard" prepend-icon="mdi-view-dashboard-outline" title="แดชบอร์ด" />

              <v-list-item to="/roadmap" prepend-icon="mdi-map-marker-path" title="แผนการเรียนของฉัน" />

              <v-divider class="my-1" />

              <v-list-item prepend-icon="mdi-logout" title="ออกจากระบบ" class="logout-item" @click="logout" />
            </v-list>
          </v-menu>
        </div>
      </div>
    </header>

    <main class="page-content">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-content">
        <NuxtLink to="/" class="footer-brand">
          <span class="brand-mark" aria-hidden="true">
            <v-icon icon="mdi-school-outline" size="16" />
          </span>

          <span><em>AIS</em>ist</span>
        </NuxtLink>

        <p>พื้นที่เล็ก ๆ สำหรับเริ่มต้นค้นหาเส้นทางของตัวเอง</p>

        <small>© 2026 AISist</small>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --primary: #59c993;
  --primary-dark: #27885e;
  --ink: #17261e;
  --muted: #66756c;
  --line: #e0ebe5;
  --surface: #ffffff;
  --page: #fbfefc;

  font-family:
    "Noto Sans Thai",
    "Sukhumvit Set",
    Tahoma,
    system-ui,
    sans-serif;

  color: var(--ink);
  background: var(--page);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  margin: 0;
  background: var(--page);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.app-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: var(--page);
}

/* Header */

.site-header {
  position: relative;
  z-index: 50;
  border-bottom: 1px solid var(--line);
  background: rgb(255 255 255 / 94%);
  backdrop-filter: blur(12px);
}

.header-content,
.page-content,
.footer-content {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

.header-content {
  display: flex;
  min-height: 70px;
  align-items: center;
  gap: 38px;
}

/* Brand */

.brand,
.footer-brand {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 9px;
  color: var(--ink);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.7px;
}

.brand>span:last-child em,
.footer-brand>span:last-child em {
  color: var(--primary-dark);
  font-style: normal;
}

.brand-mark {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 7px;
  background: var(--primary);
  color: #fff;
}

/* Navigation */

.navigation {
  display: flex;
  align-self: stretch;
  align-items: stretch;
  gap: 25px;
  margin-left: 18px;
}

.navigation a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.16s ease;
}

.navigation a::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  background: transparent;
  content: "";
}

.navigation a:hover,
.navigation a.router-link-active {
  color: var(--primary-dark);
}

.navigation a.router-link-active::after {
  background: var(--primary);
}

/* Header actions */

.header-actions {
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 7px;
}

.guest-actions {
  gap: 8px;
}

.login-button {
  min-height: 40px !important;
  border-radius: 7px !important;
  padding-inline: 13px !important;
  color: var(--primary-dark) !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  text-transform: none !important;
}

.login-button:hover {
  background: #edf7f1 !important;
}

.register-button {
  min-height: 40px !important;
  border-radius: 7px !important;
  padding-inline: 16px !important;
  background: var(--primary-dark) !important;
  color: #fff !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  box-shadow: none !important;
  transition:
    background 0.18s ease,
    transform 0.18s ease !important;
}

.register-button:hover {
  transform: translateY(-1px);
  background: #1f754f !important;
}

.icon-button {
  width: 38px !important;
  height: 38px !important;
  border-radius: 7px !important;
  color: #4e5b55 !important;
}

.icon-button:hover {
  background: #f1f5f2 !important;
  color: var(--primary-dark) !important;
}

/* Profile */

.profile-button {
  min-width: 0 !important;
  min-height: 42px;
  border: 1px solid transparent;
  border-radius: 7px !important;
  padding: 4px 7px 4px 4px !important;
  color: var(--ink) !important;
  text-transform: none !important;
}

.profile-button:hover {
  border-color: var(--line);
  background: #f8faf9 !important;
}

.avatar {
  border: 1px solid #d3e6dc;
  border-radius: 7px !important;
  background: #e0f8eb;
  color: var(--primary-dark);
  font-size: 13px;
  font-weight: 800;
}

.profile-name {
  max-width: 120px;
  overflow: hidden;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  margin-left: 3px;
  color: #7d8983;
}

.profile-menu {
  min-width: 215px;
  border: 1px solid var(--line);
  border-radius: 9px !important;
  padding: 6px !important;
  box-shadow: 0 14px 34px rgb(27 66 45 / 12%) !important;
}

.profile-menu .v-list-item {
  min-height: 40px;
  border-radius: 6px;
  color: #405048;
  font-size: 12px;
}

.profile-menu .v-list-item:hover {
  background: #f1f8f4;
  color: var(--primary-dark);
}

.profile-menu .logout-item {
  color: #ba3f3f;
}

.profile-menu .logout-item:hover {
  background: #fff2f2;
  color: #a43232;
}

/* Page */

.page-content {
  flex: 1;
  padding-top: 32px;
}

/* Footer */

.site-footer {
  margin-top: 64px;
  border-top: 1px solid var(--line);
  background: var(--surface);
}

.footer-content {
  display: flex;
  min-height: 78px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: var(--muted);
}

.footer-brand {
  font-size: 16px;
}

.footer-brand .brand-mark {
  width: 26px;
  height: 26px;
  border-radius: 6px;
}

.footer-content p {
  margin: 0;
  font-size: 11px;
}

.footer-content small {
  color: #8a948f;
  font-size: 10px;
}

/* Tablet */

@media (max-width: 930px) {
  .header-content {
    gap: 22px;
  }

  .navigation {
    gap: 15px;
    margin-left: 0;
  }

  .navigation a {
    font-size: 12px;
  }

  .navigation a .v-icon {
    display: none;
  }

  .profile-name,
  .chevron {
    display: none;
  }

  .login-button .v-icon,
  .register-button .v-icon {
    display: none;
  }
}

/* Mobile */

@media (max-width: 680px) {

  .header-content,
  .page-content,
  .footer-content {
    width: min(100% - 32px, 1180px);
  }

  .header-content {
    min-height: 61px;
    gap: 13px;
  }

  .brand {
    font-size: 18px;
  }

  .brand-mark {
    width: 29px;
    height: 29px;
  }

  .navigation {
    display: none;
  }

  .header-actions {
    gap: 3px;
  }

  .profile-button {
    padding-right: 2px !important;
  }

  .login-button {
    min-width: 0 !important;
    padding-inline: 9px !important;
  }

  .register-button {
    min-width: 0 !important;
    padding-inline: 12px !important;
  }

  .page-content {
    padding-top: 22px;
  }

  .site-footer {
    margin-top: 42px;
  }

  .footer-content {
    min-height: 70px;
  }

  .footer-content p {
    display: none;
  }
}

@media (max-width: 410px) {
  .login-button {
    min-width: 38px !important;
    width: 38px;
    padding: 0 !important;
    font-size: 0 !important;
  }

  .login-button .v-icon {
    display: inline-flex;
    margin: 0 !important;
    font-size: 20px !important;
  }

  .register-button {
    padding-inline: 10px !important;
  }

  .register-button .v-icon {
    display: none;
  }
}
</style>