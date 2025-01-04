<template>
    <div id="discount" class="w-full h-12 bg-white text-center text-lg text-black flex items-center justify-center font-bricolage">
        <span class="font-normal mr-8">Become a club member and get the 10% discount</span>
        <RouterLink to="/register" class="font-bold"><button class="px-10 py-1 bg-blue-700 text-white rounded-sm">Register for free</button></RouterLink>
    </div>
    <footer class="bg-blue-700 text-white flex justify-between items-center p-5 text-2xl font-bricolage font-semibold">
        <div class="flex-1 text-left ml-10">
            CONTACT US FOR ANY QUESTIONS!
        </div>
        <div class="flex-1 text-center hover:brightness-50 transition-all duration-200">
            <a href="mailto:contact@fbforyou.com" class="text-white no-underline">contact@fbforyou.com</a>
        </div>
        <div class="flex-1 text-right hover:brightness-50 transition-all duration-200 mr-10">
            <a href="tel:+31061234567" class="text-white no-underline">+31 06 12345678</a>
        </div>
    </footer>
</template>
