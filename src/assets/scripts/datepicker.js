import AirDatepicker from 'air-datepicker'

$(() => {
  const datePickers = $('[data-type=js-datepicker]')
  
  $(datePickers).each(function (index, element) {
    console.log("🚀 ~ file: datepicker.js:9 ~ $(element):", $(element)[0])
    new AirDatepicker($(element)[0], {
      range: true,
      multipleDatesSeparator: ' - ',
      dateFormat: 'dd.MM.yy',
      buttons: ['clear']
    })
  });
})