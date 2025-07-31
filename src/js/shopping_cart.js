function formatCurrency(value) {
  return `$${value.toLocaleString('es-MX')}`;
}

// Inicializar el carrito
const cartItems = document.querySelectorAll('.row.align-items-center');

function updateCartTotal() {
  let subtotal = 0;
  cartItems.forEach(row => {
    const priceEl = row.querySelector('.text-success');
    const quantityEl = row.querySelector('input');
    const subtotalEl = row.querySelector('.col-md-3.text-end p');

    if (!priceEl || !quantityEl || !subtotalEl) return;

    const price = parseInt(priceEl.textContent.replace(/[^\d]/g, ''));
    const quantity = parseInt(quantityEl.value);
    const itemSubtotal = price * quantity;
    subtotal += itemSubtotal;

    subtotalEl.textContent = formatCurrency(itemSubtotal);
  });

  // Update resumen
  const subtotalText = document.querySelector('div span:nth-child(2)');
  const envio = 20;
  const impuestos = 0.16;
  const total = subtotal + envio + subtotal * impuestos;

  document.querySelectorAll('.col-md-4 span')[1].textContent = formatCurrency(subtotal);
  document.querySelectorAll('.col-md-4 span')[7].textContent = formatCurrency(total);
}

function setupButtons() {
  cartItems.forEach(row => {
    const minusBtn = row.querySelector('button.btn-outline-dark:first-child');
    const plusBtn = row.querySelector('button.btn-outline-dark:last-child');
    const quantityInput = row.querySelector('input');
    const deleteBtn = row.querySelector('button.btn-close');

    minusBtn?.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) quantityInput.value = value - 1;
      updateCartTotal();
    });

    plusBtn?.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
      updateCartTotal();
    });

    deleteBtn?.addEventListener('click', () => {
      row.remove();
      updateCartTotal();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupButtons();
  updateCartTotal();
});
