export default() => {
    const filterTabs = document.querySelector(".tabs__list");
    const filterButtons = document.querySelectorAll(".tabs__item-button");

    const handleActiveTab = (tabs, event, className) => {
        tabs.forEach((tab) => {
          tab.classList.remove(className);
        });
      
        if (!event.target.classList.contains(className)) {
          event.target.classList.add(className);
        }
    };

    filterTabs.addEventListener("click", (event) => {
    const root = document.documentElement;
    const targetTranslateValue = event.target.dataset.translateValue;

    if (event.target.classList.contains("filter-button")) {
        root.style.setProperty("--translate-filters-slider", targetTranslateValue);
        handleActiveTab(filterButtons, event, "js-active");
    }
});
}