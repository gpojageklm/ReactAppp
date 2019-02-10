import agent from 'superagent'
 
const baseGetURL = 'https://api.ute1.klm.com/socialmedia/smis/conversation/customer/'
const basePostURL = 'https://api.ute1.klm.com/socialmedia/smis/conversation/'
export const get = (uri) => 
    new Promise ((resolve, reject) => {
    const requestUri = baseGetURL + uri;
    agent.get(requestUri)
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', true)
    .end((error, result) => {
       error ? reject(error) : resolve(result)
    })
})
    
export const post = (uri, payload) => 
    new Promise ((resolve, reject) => {
    const requestUri = basePostURL + uri;
    agent.post(requestUri)
    .send(payload)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', true)
    .end((error, result) => {
        error ? reject(error) : resolve(result)
    })
})


export const put = (uri, payload) => {
    const requestUri = basePostURL + uri;
    agent.put(requestUri)
    .send(payload)
    .end((error, result) => {
        console.log(error);
    })
}