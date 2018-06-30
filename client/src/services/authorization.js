import Api from '@/services/API'

export default {
  login(data) {
    return Api().post('managers/login', data)
  },
  logOut(data){
    return Api().post('managers/logout', data)
    //return Api().post('test', data)
  },
  handshake(){
    return Api().get('/t')
  }
}