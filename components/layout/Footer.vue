<template>
  <div>
    <footer class="dark:bg-black text-center text-white">
      <div class="flex justify-center">
        <div class="flex flex-wrap justify-between max-w-lg mb-9 mt-10">
          <div id="icon"></div>
          <nav class="hidden md:flex justify-between align-bottom mt-2 space-x-10">
            <div class="hidden md:flex align-bottom">
            </div>
          </nav>
          <div id="copyright" class="font-normal text-xs text-gray-700 dark:text-gray-200">
            © {{ new Date().getFullYear() }}. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

