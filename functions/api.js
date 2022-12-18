/**
 * Download data from the specified URL
 * 
 * @async
 * @function fetchJSON
 * @param {string} url - The URL to download from 
 * @returns {Promise<string>} TodoList from the URL
 */
export async function fetchJSON(url) {

    const response = await fetch(url)
    if(response.ok) {
        return response.json()
    }
}