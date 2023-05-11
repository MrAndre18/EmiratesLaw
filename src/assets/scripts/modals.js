if ($("[data-type=js-open-btn]").width()) {
  const openBtns = $("[data-type=js-open-btn]");

  $(openBtns).each(function (index, btn) {
    $(btn).on("click", (e) => {
      e.preventDefault();

      const modalType = $(btn).data("modal").replace("-btn", ""),
        modal = $(`[data-modal=${modalType}]`);

      if (!$(modal).width()) return;

      $(modal).addClass("active");
      $(btn).addClass("active");
    });
  });
}

if (
  $("[data-type=js-modal]").width() &&
  $("[data-type=js-close-btn]").width()
) {
  const closeBtns = $("[data-type=js-close-btn]");

  $(closeBtns).each(function (index, btn) {
    $(btn).on("click", () => {
      const parentModal = btn.closest("[data-type=js-modal]");

      if (!$(parentModal).width()) return;

      $(parentModal).removeClass("active");

      const modalBtns = $(`[data-modal=${$(parentModal).data("modal")}-btn]`);
      $(modalBtns).removeClass("active");
    });
  });
}