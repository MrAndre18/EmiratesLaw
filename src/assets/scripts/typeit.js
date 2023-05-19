import TypeIt from "typeit";

$(() => {
  const TypeItElems = $('[data-type="js-typeit"]')
  
  $(TypeItElems).each(function (index, element) {
    const animDuration = 2000;
    const myTypeItInstance = new TypeIt(element, {
      speed: 100,
      cursor: true,
      waitUntilVisible: false,
      loop: true,
      deleteSpeed: 60,
      lifeLike: false,
      startDelay: 0,
    });
    
    myTypeItInstance
    .type("Всё о законодательстве ОАЭ").pause(animDuration)
    .delete()
    .type("Всё о жизни в ОАЭ").pause(animDuration)
    .delete()
    .type("Всё о работе в ОАЭ").pause(animDuration)
    .delete()
    .type("Всё о бизнесе в ОАЭ").pause(animDuration)
    .delete()
    .type("Всё о государственном устройстве ОАЭ").pause(animDuration)
    .delete()
    .type("Всё о свободных экономических зонах ОАЭ").pause(animDuration)
    .delete()
    .go();
  });
})