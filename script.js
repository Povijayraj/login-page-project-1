const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateName() {
      const ok = nameInput.value.trim().length > 0;
      nameError.textContent = ok ? '' : 'Name cannot be empty.';
      return ok;
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      const ok = emailRegex.test(value);
      emailError.textContent = ok ? '' : 'Enter a valid email address.';
      return ok;
    }

    function validatePassword() {
      const p = passwordInput.value;

      // strength rules (basic)
      const lenOk = p.length >= 6;
      const hasUpper = /[A-Z]/.test(p);
      const hasLower = /[a-z]/.test(p);
      const hasDigit = /\d/.test(p);
      const hasSymbol = /[^A-Za-z0-9]/.test(p);

      // Consider "strong enough" if it meets minimum length AND at least 2 of the categories.
      const categories = [hasUpper, hasLower, hasDigit, hasSymbol];
      const categoryCount = categories.filter(Boolean).length;
      const ok = lenOk && categoryCount >= 2;

      if (ok) {
        passwordError.textContent = '';
        return true;
      }

      if (!lenOk) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        return false;
      }

      passwordError.textContent = 'Password should include at least 2 types: uppercase, lowercase, numbers, or symbols.';
      return false;
    }

    function updateButtonState() {
      const ok = validateName() && validateEmail() && validatePassword();
      submitBtn.disabled = !ok;
    }

    nameInput.addEventListener('input', updateButtonState);
    emailInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);

    form.addEventListener('submit', (e) => {
      const ok = validateName() && validateEmail() && validatePassword();
      updateButtonState();
      if (!ok) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      alert('Registration successful!');
      form.reset();
      nameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
      submitBtn.disabled = true;
    });

    // initial state
    submitBtn.disabled = true;