import TypeIt from "typeit";

$(() => {
  const TypeItElems = $('[data-type="js-typeit"]')
  
  $(TypeItElems).each(function (index, element) {
    const myTypeItInstance = new TypeIt(element, {
      speed: 100,
      deleteSpeed: null,
      cursor: false,
      breakLines: false,
      waitUntilVisible: false,
      loop: true,
      nextStringDelay: [3000, 0],
      //startDelay: 100,
      deleteSpeed: 60,
      lifeLike: false,
    });
    
    myTypeItInstance.go();
  });
})