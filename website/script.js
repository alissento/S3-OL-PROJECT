async function loadStuff(api_route) 
{
    window.history.pushState({}, '', api_route);
    const apiURLTerraform = '${api_url}'
    const apiUrl = apiURLTerraform+api_route;
    try 
    {
        const response = await fetch(apiUrl, 
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json'
            }
        });
    
    const data = await response.json();
    document.getElementById('content').textContent = JSON.stringify(data, null, 2);
    } catch (error) 
    {
        console.error('Error:', error);
        document.getElementById('content').textContent = 'Error with fetching.';
    }
}