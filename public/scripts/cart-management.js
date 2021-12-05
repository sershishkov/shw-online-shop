const addToCartButtonElement = document.querySelector(
  '#product-details button'
);

const cartBadgeElement = document.querySelector('.nav-items .badge');

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  // console.log('productId--',productId)
  // console.log('csrfToken--',csrfToken)

  let response;

  try {
    response = await fetch(`/cart/items`, {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('Something went wrong 28', error.message);
    alert('Something went wrong 29');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong 34');
    console.log('Something went wrong 35', response);
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;
  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElement.addEventListener('click', addToCart);
