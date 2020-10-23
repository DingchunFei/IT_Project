import axios from "axios";
export default {
  //读取tab内容
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
  //读取About Me的内容
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
  //添加图片
  //输入FormData：图片文件
  //返回String：图片名
  createImage: function(file){
    return new Promise(resolve => {
      axios.post('/file', file,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(res => {
        resolve(res.data.data.file_id)
      }).catch(error => {
        console.log(error)
      })
    })
  },
  //读取图片
  //输入String：图片名（无后缀）
  //返回Blob：图片的blob格式数据
  readImage: function (fileName) {
    return new Promise(resolve => {
      axios.get('/file/'+fileName, { responseType: 'blob'}).then(res => {
        resolve(res.data)
      })
    })
  },

  readProfile: function () {
    return new Promise(resolve => {
      axios.get('/profile', {}).then(res => {
        resolve(res.data)
      })
    })
  },
  updateProfile: function (profile) {
    return new Promise(resolve => {
      axios.post('/profile',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          fist_name: profile.firstName,
          last_name: profile.lastName,
          avatar: profile.avatar,
          theme: profile.theme,
        }).then(res => {
        resolve(res.data)
      }).catch(error => {
        console.log(error)
      })
    })
  },

  //读取文件
  //输入String：图片名（无后缀）
  //返回Blob：图片的blob格式数据
  readFile: function (fileName) {
    return new Promise(resolve => {
      axios.get('/file/'+fileName, { responseType: 'blob'}).then(res => {
        resolve(res.data)
      })
    })
  },

  //更新文件
  updateFile: function () {

  }
}