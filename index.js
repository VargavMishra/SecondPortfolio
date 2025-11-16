// Loading Screen Handler
document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = "none";
        }
    }, 3000);
    
    // Hide when page fully loads
    window.addEventListener("load", function() {
        if (loadingScreen) {
            loadingScreen.style.display = "none";
        }
    });

    // ... rest of your existing code ...
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
