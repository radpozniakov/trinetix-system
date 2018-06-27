import Api from '@/services/Api'

export default {
  test(data) {
    return Api().post('test', data)
  },
}