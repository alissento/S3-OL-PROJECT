<script>
    import { onMount } from 'svelte';
    let ads = [];
    async function homePage() {
        const apiURLTerraform = 'https://api.nknez.tech';
        const apiUrl = apiURLTerraform+'/'; // apiURL based on Terraform output and the API route

        try {
            const response = await fetch(apiUrl, {
                method: 'GET', // GET request
                headers: 
                {
                    'Accept': 'application/json' // Accepting JSON response
                }
            });

            console.log(response);
            ads = await response.json(); // Parsing the JSON response
            console.log(ads);
        } catch (error) {
            console.error('Error:', error);
            ads = [];
        }  
    }

    onMount(() => {
        homePage();
    });
</script>

<main id="main_content" class="flex justify-center items-center flex-wrap w-full">
    {#if ads.length > 0}
        {#each ads as ad}
            <div class="flex flex-col items-center text-center m-10">
                <img src={`images/${ad.ad_photo}`} alt={ad.ad_label} class="h-[422px] w-[352px] mb-2.5 rounded-[10%] border-2 border-black cursor-pointer" />
                <p class="text-[26px] font-bold text-center">{ad.ad_label}</p>
            </div>
        {/each}
    {:else}
        <p class="text-[26px] font-bold text-center">No ads available</p>
    {/if}
</main>