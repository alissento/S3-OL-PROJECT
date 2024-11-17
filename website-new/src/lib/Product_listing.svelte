<script>
    import { onMount } from 'svelte';

    let props = $props();
    let products = $state([]);
    let error = $state(null);

    async function loadStuff() {
        const apiURLTerraform = 'https://api.nknez.tech';
        const apiUrl = `${apiURLTerraform}/loadProducts`;

        try {
            const response = await fetch(`${apiUrl}?product_tag=${props.product_tag}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            products = await response.json();
            console.log(products);
        } catch (err) {
            console.error('Error:', err);
            error = 'Error with fetching.';
        }
    }

    onMount(() => {
        loadStuff();
    });
</script>

{#if error}
    <div id="main_content">{error}</div>
{:else}
    <div id="main_content" class="flex justify-center items-start flex-wrap w-full">
        {#each products as product}
            <div class="flex flex-col items-center text-center m-5">
                <img
                    src={`images/${product.photoID}`}
                    alt={product.productLabel}
                    class="h-64 w-56 mb-2.5 rounded-[10%] border-2 border-black cursor-pointer"
                />
                <p class="text-[22px] font-bold text-center">{product.productLabel}</p>
                <p class="text-3xl font-bold text-center">${product.price}€</p>
            </div>
        {/each}
    </div>
{/if}