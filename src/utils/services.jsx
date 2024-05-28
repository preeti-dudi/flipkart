class APIService {
  // Base URL for API requests
  baseUrl = "https://fakestoreapi.com";

  // Method to make GET requests
  async get(endpoint, auth = true, params = {}) {
    try {
      // Retrieve token from local storage if authentication is enabled
      const token = auth ? await localStorage.getItem('token') : null;

      // Construct request options
      const requestOptions = {
        method: "GET",
        params,
        headers: auth && token
          ? {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
          : { Accept: "application/json", "Content-Type": "application/json" },
      };

      // Perform the fetch request
      const response = await fetch(`${this.baseUrl}/${endpoint}`, requestOptions)
        .then(async (res) => {

          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return await res.json()
        })
        .catch((err) => {
          err;
        });

      // Return the response data
      return response;
    } catch (error) {
      // Handle errors and throw appropriate message
      throw error.response ? error.response.data : error.message;
    }
  }

  // Method to make POST requests
  async post(endpoint, auth = true, data = {}) {
    try {
      // Retrieve token from local storage if authentication is enabled
      const token = auth ? await localStorage.getItem('token') : null;

      // Construct request options
      const requestOptions = {
        method: "POST",
        headers: auth && token
          ? {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
          : { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
      };

      // Perform the fetch request
      const response = await fetch(`${this.baseUrl}/${endpoint}`, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return await res.json()
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });

    // Return the response data
    return response;
  
      
    } catch (error) {
      // Handle errors and throw appropriate message
      throw error.response ? error.response.data : error.message;
    }
  }
}

// Export APIService class
export default APIService;
