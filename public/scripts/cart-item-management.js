const cartItemUpdateFormElements = document.querySelectorAll(
  '.cart-item-management'
);

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;
  let response;
  try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-type': 'aplication/json',
      },
    });
  } catch (error) {
    alert('Something went wrong in "cart-item-management line 25"');
  }

  if (!response.ok) {
    alert('Something went wrong in "cart-item-management line 29"');
  }

  const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener('submit', updateCartItem);
}
