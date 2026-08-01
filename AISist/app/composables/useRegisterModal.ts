export const useRegisterModal = () => {
  const isOpen = useState<boolean>('register-modal-state', () => false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    open,
    close,
  }
}
