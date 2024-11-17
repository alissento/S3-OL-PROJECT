export async function loadAds() {
    const apiURLTerraform = '${api_url}'
    const apiUrl = apiURLTerraform+'/'; // apiURL based on Terraform output and the API route

    window.history.pushState({}, '', '/');
    try {
        const response = await fetch(apiUrl, {
            method: 'GET', // GET request
            headers: 
            {
                'Accept': 'application/json' // Accepting JSON response
            }
        });
    
    const ads = await response.json(); // Parsing the JSON response

    const mainContent = document.getElementById('main_content');
    mainContent.className = 'flex justify-center items-center flex-wrap w-full';
    mainContent.innerHTML = ''; // Clearing and formatting the main content

    ads.forEach(ad => { // Creating a div for each ad
        const adDiv = document.createElement('div');
        adDiv.className = 'flex flex-col items-center text-center m-10'; // Creating and formatting the div

        const img = document.createElement('img');
        img.src = `images/$${ad.ad_photo}`;
        img.alt = ad.ad_label;
        img.className = 'h-[422px] w-[352px] mb-2.5 rounded-[10%] border-2 border-black cursor-pointer'; // Creating the image element and formatting it

        adDiv.appendChild(img);

        const label = document.createElement('p');
        label.className = 'text-[26px] font-bold text-center';
        label.textContent = ad.ad_label; // Creating a label element with the ad name
        adDiv.appendChild(label);

        mainContent.appendChild(adDiv); // Add everything to the main content
    });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('ads').textContent = 'Error with fetching.'; // Error message if there is an issue with fetching
    }
}