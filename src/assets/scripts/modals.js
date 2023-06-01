if ($("[data-type=js-open-btn]").length) {
  const openBtns = $("[data-type=js-open-btn]");

  $(openBtns).each(function (index, btn) {
    $(btn).on("click", (e) => {
      e.preventDefault();

      const modalType = $(btn).data("modal").replace("-btn", ""),
        modal = $(`[data-modal=${modalType}]`);

      if (!$(modal).length) return;

      $(modal).addClass("active");
      $(btn).addClass("active");
    });
  });
}

if (
  $("[data-type=js-modal]").length &&
  $("[data-type=js-close-btn]").length
) {
  const closeBtns = $("[data-type=js-close-btn]");

  $(closeBtns).each(function (index, btn) {
    $(btn).on("click", () => {
      const parentModal = btn.closest("[data-type=js-modal]");

      if (!$(parentModal).length) return;

      $(parentModal).removeClass("active");

      const modalBtns = $(`[data-modal=${$(parentModal).data("modal")}-btn]`);
      $(modalBtns).removeClass("active");
    });
  });
}