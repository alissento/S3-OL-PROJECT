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
                'Content-Type': 'text/plain'
            }
        });
    
    const data = await response.text();
    document.getElementById('content').textContent = data;
    } catch (error) 
    {
        console.error('Error:', error);
        document.getElementById('content').textContent = 'Error with fetching.';
    }
}