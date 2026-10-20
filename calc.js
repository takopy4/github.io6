/*jslint browser */
"use strict";

const basePrices = {
    keyboard: 990,
    headphones: 2490,
    monitor: 15900
};
const warrantyPrice = 1990;

function getProduct() {
    return document.querySelector("input[name='product']:checked").value;
}

function updateVisibility(product) {
    document.getElementById("option-group").hidden = (product !== "headphones");
    document.getElementById("property-group").hidden = (product !== "monitor");
}

function calculate() {
    const product = getProduct();
    const quantityText = document.getElementById("quantity").value.trim();
    const result = document.getElementById("result");
    const pattern = /^[0-9]+$/;
    let price = basePrices[product];

    updateVisibility(product);

    if (!pattern.test(quantityText)) {
        result.className = "error";
        result.textContent = "Ошибка: в поле количества допустимы только цифры (целое число).";
        return;
    }

    if (product === "headphones") {
        price += parseInt(document.getElementById("option").value, 10);
    }
    if (product === "monitor" && document.getElementById("property").checked) {
        price += warrantyPrice;
    }

    result.className = "";
    result.textContent = "Стоимость заказа: " + (price * parseInt(quantityText, 10)) + " ₽";
}

function init() {
    const form = document.getElementById("calc-form");
    form.addEventListener("input", calculate);
    form.addEventListener("change", calculate);
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    calculate();
}

document.addEventListener("DOMContentLoaded", init);
