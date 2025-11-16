// Loading Screen Handler
document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    const MIN_LOADING_MS = 3000; 
    const FADE_MS = 600;          
    const startedAt = performance.now();

    const hideLoaderNow = () => {
        if (loadingScreen) loadingScreen.style.display = "none";
    };

    // safety fallback in case 'load' never fires
    const fallbackTimer = setTimeout(hideLoaderNow, MIN_LOADING_MS + FADE_MS + 1000);

    window.addEventListener("load", function() {
        const elapsed = performance.now() - startedAt;
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
        // wait remaining visible time + fade time, then remove loader
        setTimeout(() => {
            hideLoaderNow();
            clearTimeout(fallbackTimer);
        }, remaining + FADE_MS);
    });
});


document.addEventListener("DOMContentLoaded", function(){
      var el = document.querySelector(".button-bird");
      var text = document.querySelector(".button-bird__text");
          el.addEventListener('click', function() {
            el.classList.toggle('active');

            if(el.classList.contains('active')){
            	console.log('true');
            	text.innerHTML = 'DONE';
            }else{
            	text.innerHTML = 'SEND';
            }
        });
    });

     (function () {
                const form = document.getElementById('contactForm');
                const countrySelect = document.getElementById('country-code');
                const phoneDisplay = document.getElementById('phone-display');
                const phoneHidden = document.getElementById('phone-hidden');

                form.addEventListener('submit', function (e) {
                    // Build final phone: remove + and spaces from display, avoid double code
                    const code = (countrySelect && countrySelect.value) ? countrySelect.value.toString().trim() : '';
                    const raw = (phoneDisplay && phoneDisplay.value) ? phoneDisplay.value.toString().trim() : '';

                    const normalized = raw.replace(/^\+/, '').replace(/\s+/g, '');

                    let final = normalized;
                    if (code && !normalized.startsWith(code)) {
                        final = code + normalized;
                    }

                    phoneHidden.value = final ? ('+' + final) : '';

                    // Remove any stray element with name="country-code" to be absolutely sure
                    // (Some templates or browser tools may have injected one previously.)
                    const stray = form.querySelectorAll('[name="country-code"]');
                    stray.forEach(el => el.remove());

                    // Also disable the select so it won't be submitted by any browser
                    if (countrySelect) countrySelect.disabled = true;

                    // Allow normal submit to continue
                });

                // Optional: If you ever re-enable the form or repopulate, re-enable country select
                // (Not necessary for most static pages.)
            })();
