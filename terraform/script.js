async function loadStuff(api_route) 
{
    const apiUrl = '${api_url}'+api_route;
    try 
    {
        const response = await fetch(apiUrl, 
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json'
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

function goToStuff(route) 
{
    window.history.pushState({}, '', route);
    loadStuff(route);
}

window.onload = function () 
{
    if (window.location.pathname === '/kits') 
    {
        loadStuff();
    }
};