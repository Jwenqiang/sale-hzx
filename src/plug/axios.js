let Axios

module.exports = () =>
  new Promise((resolve, reject) => {
    if (Axios) {
      resolve(Axios)
    } else {
      import(/* webpackChunkName: "axios" */ 'axios')
        .then(axios => {
          Axios = axios
          resolve(axios)
        })
        .catch(reject)
    }
  })
