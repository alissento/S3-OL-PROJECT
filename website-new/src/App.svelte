<script>
  import Footer from './lib/Footer.svelte'
  import Home from './lib/Home.svelte'
  import Product_listing from './lib/Product_listing.svelte'
  import './tailwind.css'
  import { Router, Route, Link } from "svelte-routing";

  let activeSection = $state('home');

  function changeSection(section) {
    activeSection = section;
  }
</script>

<main>
  <header class="bg-black text-white flex justify-between items-center">
    <div id="logo" class="flex items-center">
        <img id="football_image" src="./images/football_image.png" class="w-16 h-auto m-2.5" alt="football image">
        <div class="text-2xl font-bold text-left tracking-wider leading-[1]">
            <p onclick={() => changeSection('home')} class="text-white no-underline hover:brightness-50 transition-all duration-200 cursor-pointer uppercase">FOOTBALL<br>FOR YOU</p>
        </div>
    </div>
  <nav>
    <ul class="flex list-none justify-center">
        <li class="mx-15 text-4xl tracking-wider">
            <button onclick={() => changeSection('kits')} class="text-white no-underline hover:brightness-50 transition-all duration-200 mx-10 tracking-wider uppercase">Kits</button>
        </li>
        <li class="mx-15 text-4xl tracking-wider">
            <button onclick={() => changeSection('accessories')} class="text-white no-underline hover:brightness-50 transition-all duration-200 mx-10 tracking-wider uppercase">Accessories</button>
        </li>
        <li class="mx-15 text-4xl tracking-wider">
            <button onclick={() => changeSection('boots')} class="text-white no-underline hover:brightness-50 transition-all duration-200 mx-10 tracking-wider uppercase">Boots</button>
        </li>
    </ul>
  </nav>
  <div class="flex items-center">
    <img id="user_icon" src="./images/user_icon.png" class="w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="User">
    <img id="cart_icon" src="./images/shopping_cart_icon.png" class="w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="Cart">
  </div>
  </header>
  <Router>
    <Route path="/" component={Home} />
    <Route path="/products" component={Product_listing} />
  </Router>
  <Footer />
</main>