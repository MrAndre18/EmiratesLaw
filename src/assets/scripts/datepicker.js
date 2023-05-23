import AirDatepicker from 'air-datepicker'

$(() => {
  const datePickers = $('[data-type=js-datepicker]')
  
  $(datePickers).each(function (index, element) {
    if ($(element).data('datepicker-type') == "all") {
      new AirDatepicker($(element)[0], {
        range: true,
        multipleDatesSeparator: ' - ',
        dateFormat: $(element).data('date-format'),
        buttons: ['today', 'clear'],
        maxDate: new Date(),
      })
    } else {
      new AirDatepicker($(element)[0], {
        range: true,
        multipleDatesSeparator: ' - ',
        dateFormat: $(element).data('date-format'),
        buttons: ['today', 'clear'],
        maxDate: new Date(),
        minView: $(element).data('datepicker-type'),
        view: $(element).data('datepicker-type'),
      })
    }
  });
})