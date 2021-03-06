import MetaMaskOnboarding from '@metamask/onboarding'

export const isMetaMaskInstalled = () => {
  // Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

let onboarding = null
export const goToInstallMetaMask = () => {
  const forwarderOrigin = window.location.url
  onboarding = onboarding || new MetaMaskOnboarding({ forwarderOrigin })
  onboarding.startOnboarding()
}

export const connectMetaMask = async () => {
  try {
    const { ethereum } = window
    const newAccounts = await ethereum.request({
      method: 'eth_requestAccounts'
    })
    return newAccounts
  } catch (error) {
    console.error('Error when connectMetaMask', error)
    return []
  }
}

export const getAccountsByMetaMask = async () => {
  try {
    const { ethereum } = window
    const accounts = await ethereum.request({
      method: 'eth_accounts'
    })
    return accounts
  } catch (error) {
    console.error('Error when getAccountsByMetaMask', error)
    return []
  }
}

export default {
  isMetaMaskInstalled,
  goToInstallMetaMask,
  connectMetaMask,
  getAccountsByMetaMask
}
