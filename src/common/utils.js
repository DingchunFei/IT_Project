import axios from "axios";
export default {
  readTabContent: function(id){
      //返回promise对象
      return new Promise(resolve => {
        let data = JSON.parse(sessionStorage.getItem("tab"+id))
        // console.log(data)
        if(data === null) {
          axios.get('/tab/' + id).then(res => {
            data = res.data.data
            sessionStorage.setItem("tab" + id, JSON.stringify(data))
            resolve(data)
          })
        }
        else {
          resolve(data)
        }
      })
  },
  readAboutMeContent: function(id){
    //返回promise对象
    return new Promise(resolve => {
      let data = JSON.parse(sessionStorage.getItem("tab"+id))
      // console.log(data)
      if(data === null) {
        axios.get('/tab/' + id).then(res => {
          data = res.data.data
          sessionStorage.setItem("tab" + id, JSON.stringify(data))
          resolve(data)
        })
      }
      else {
        resolve(data)
      }
    })
  },
}