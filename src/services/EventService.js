import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://gvacdata:8890',
//  baseURL: 'https://ranadata.janenlenneke.nl',
//  baseURL: 'https://ranadata.erfgoedhuisveldhoven.nl',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Accept:'Acess-Control-Allow-Origin: *',
  },
})

export default {
  getEvents(jaar, maand) {
    return apiClient.get("/?jaar=" + jaar + "&maand=" + maand)
  },


  getEvent(id) {
    return apiClient.get('?id=' + id)
  },
}