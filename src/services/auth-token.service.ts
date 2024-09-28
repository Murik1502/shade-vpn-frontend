import { retrieveLaunchParams } from '@telegram-apps/sdk'

export const getAccessToken = () => {
  const { initDataRaw } = retrieveLaunchParams()

  const accessToken = initDataRaw

  return accessToken || null
}
