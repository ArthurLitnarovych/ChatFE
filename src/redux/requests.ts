import inMemoryJWT from "../services/inMemoryJWT"

export class Request {
    static url = 'http://localhost:8080/api/'

    static async request(url: string, options: any = {}) {
        const token = inMemoryJWT.getToken() || ''

        const response: Response = await fetch(`${Request.url}${url}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  credentials: "include",
                ...options,
            }
        )

        if(response.status === 401) {
            let new_token = null
            await fetch(`${Request.url}auth/refresh`, 
                {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    method: 'POST'
                }
            ).then(async (res) => {
                const data = await res.json()
                console.log(data)
                inMemoryJWT.setToken(data.accessToken, data.accessTokenExpiration)
                new_token = data.accessToken
            }).catch(err => {
                inMemoryJWT.setToken(null, null)
            })

            const response: Response = await fetch(`${Request.url}${url}`, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${new_token}`
                    },
                    credentials: "include",
                    ...options,
                }
            )

            if(!response.ok) {
                const { error } = await response.json()
                throw error
            }
    
            const data = await response.json()
            return data
        }
            
        if(!response.ok) {
            const { error } = await response.json()
            throw error
        }

        const data = await response.json()
        return data
    }

    static async get(url: string) {
        const res = await Request.request(url)
        return res
    }

    static async post(url: string, body: any = {}) {
        const res = await Request.request(url, { body: JSON.stringify(body), method: 'POST', })
        return res
    }

    static async delete(url: string) {
        const res = await Request.request(url, { method: 'DELETE', })
        return res
    }
}
