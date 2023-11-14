
(function (){
  
  const cartButton = document.getElementById("cart-button");
  const cart = document.getElementById("cart");

  
  cartButton.addEventListener("click", () => {
    if (cart.style.visibility === "visible") {
      cart.style.visibility = "hidden";
    } else {
      cart.style.visibility = "visible";
    }
  });

})();