const applicationState = {
  requests: [],
  plumbers: [] 
}

const API = "http://localhost:8088"


export const fetchExternalData = () => {
   return Promise.all([
   fetch(`${API}/requests`),
   fetch(`${API}/plumbers`)
   ])
       .then(responses => {
           return Promise.all(responses.map(response =>{
               return response.json()
           }))
       })
       .then( externalData => {
               // Store the external state in application state
               applicationState.requests = externalData[0]
               applicationState.plumbers = externalData[1]
           }
       )
}
export const getRequests = () => {
   return applicationState.requests.map(request =>({...request}))
}
export const getPlumbers = () => {
   return applicationState.plumbers.map(plumber => ({...plumber}))
}


const mainContainer = document.querySelector("#container");

export const sendRequest = (userServiceRequest) => {
   const fetchOptions = {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(userServiceRequest)
   }

   return fetch(`${API}/requests`, fetchOptions)
       .then(response => response.json())
       .then(() => {
           
           mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
       })
}

export const sendCompletion = (plumberCompletion) => {
   const fetchCompletions = {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(plumberCompletion)
   }

   return fetch(`${API}/completions`, fetchCompletions)
       .then(response => response.json())
       .then(() => {
       
       })
}

export const deleteRequest = (id) => {
   return fetch(`${API}/requests/${id}`, { method: "DELETE" })
       .then(
           () => {
               mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
           }
       )
}