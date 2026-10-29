// 기능 1: 레시피 카테고리 필터
const filterButtons = document.querySelectorAll(".filter-button");
const recipeCards = document.querySelectorAll(".recipe-card[data-category]");
const filterStatus = document.querySelector("#filter-status");
const emptyMessage = document.querySelector("#empty-message");

if (filterButtons.length > 0 && recipeCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      recipeCards.forEach((card) => {
        const shouldShow =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;

        card.hidden = !shouldShow;
        if (shouldShow) visibleCount += 1;
      });

      if (filterStatus) {
        const categoryNames = {
          all: "전체 레시피",
          korean: "한식",
          western: "양식",
          dessert: "디저트",
        };
        filterStatus.textContent = `${categoryNames[selectedCategory]} ${visibleCount}개를 보여주고 있어요.`;
      }

      if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
      }
    });
  });
}

// 기능 2: 선택한 인분에 맞춰 재료 양 계산
const servingsSelect = document.querySelector("#servings");
const ingredientAmounts = document.querySelectorAll("[data-amount][data-unit]");

if (servingsSelect && ingredientAmounts.length > 0) {
  const baseServings = 2;

  function formatAmount(amount) {
    return Number.isInteger(amount)
      ? String(amount)
      : String(Number(amount.toFixed(2)));
  }

  function updateIngredientAmounts() {
    const selectedServings = Number(servingsSelect.value);

    ingredientAmounts.forEach((ingredient) => {
      const baseAmount = Number(ingredient.dataset.amount);
      const unit = ingredient.dataset.unit;
      const calculatedAmount = (baseAmount * selectedServings) / baseServings;
      ingredient.textContent = `${formatAmount(calculatedAmount)} ${unit}`;
    });
  }

  servingsSelect.addEventListener("change", updateIngredientAmounts);
  updateIngredientAmounts();
}
