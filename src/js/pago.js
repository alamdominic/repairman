(function () {
    const form = document.getElementById('paymentForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validación manual para Bootstrap form validation styling
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const monto = form.monto.value.trim();
        const voucherFile = form.voucher.files[0];

        if (!nombre || !email || !monto || !voucherFile) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const numeroWhatsApp = '522213601451';
        const mensaje =
            `Hola, soy ${nombre}.
Les confirmo que he realizado un depósito por un monto de $${monto}.
Mi correo es: ${email}.
Adjunté el comprobante de pago.

Gracias.`;

        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        if (confirm('Se abrirá WhatsApp para enviar la confirmación. ¿Deseas continuar?')) {
            window.open(urlWhatsApp, '_blank');
        }

        form.reset();
        form.classList.remove('was-validated');
    });
})();
