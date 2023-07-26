import { axiosInstance } from '@/plugins/axios'

export function useApi() {
  const get = async (url) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return (await axiosInstance.get(url)).data
    } catch (e) {
      throw e
    }
  }

  const post = async (url, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return (await axiosInstance.post(url, data)).data
    } catch (e) {
      throw e
    }
  }

  const put = async (url, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return (await axiosInstance.put(url, data)).data
    } catch (e) {
      throw e
    }
  }

  const destroy = async (url) => {
    return await axiosInstance.delete(url)
  }

  return {
    get,
    post,
    put,
    destroy
  }
}
