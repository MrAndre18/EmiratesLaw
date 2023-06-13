import rates from './rates.json'

$(() => {
  if (!$('.FAQ-exchange__calculator').length) return

  // плагин для установки курсора в определенной позиции mask
  // $.fn.setCursorPosition = function(pos) {
  //   if ($(this).get(0).setSelectionRange) {
  //     $(this).get(0).setSelectionRange(pos, pos);
  //   } else if ($(this).get(0).createTextRange) {
  //     var range = $(this).get(0).createTextRange();
  //     range.collapse(true);
  //     range.moveEnd('character', pos);
  //     range.moveStart('character', pos);
  //     range.select();
  //   }
  // };

  //const APIkey = 'iU8TUcJWBkRDKAMHCGWXzlMfEp83bLDJGW4zth2Q'

  const calculator = $('.FAQ-exchange__calculator'),
        currencies = $('.FAQ-exchange__currencies .currencies-item'),
        rateInput = $(calculator).find('[data-type=calculator-source]').find('.calculator-item__value-input'),
        apdateTime = $('.FAQ-exchange__header-update span')

  let baseCurrency = $(calculator).find('[data-type=calculator-source]').data('currency-code')

  let actualRates = {
    base: baseCurrency,
    rates: {}
  }

  const setUpdateTime = () => {
    const lastUpdate = new Date(rates.meta.last_updated_at),
          date = lastUpdate.toISOString().slice(0,10).split('-').reverse().join('.'),
          time = lastUpdate.toISOString().split('T')[1].slice(0,5)
    
    apdateTime.text(`${date} ${time}`)
  }

  const hideCurrencyItem = currencyCode => {
    $('.currencies-list').find(`.currencies-item[data-currency-code=${currencyCode}]`).slideUp(400)
  }

  const setActualRates = () => {
    const curBaseRate = 1 / rates.data[actualRates.base].value
    
    $(currencies).each((index, element) => {
      actualRates.rates[$(element).data('currency-code')] = rates.data[$(element).data('currency-code')].value * curBaseRate
    })

    console.log(actualRates)
  }

  const setTargetRate = () => {
    const calculatorSourceRate = +$(calculator).find('[data-type=calculator-source]').find('.calculator-item__value-input').val().replace(',', '.'),
          calculatorTargetRate = $(calculator).find('[data-type=calculator-target]'),
          value = calculatorSourceRate ? actualRates.rates[$(calculatorTargetRate).data('currency-code')] * calculatorSourceRate : actualRates.rates[$(calculatorTargetRate).data('currency-code')]

    $(calculatorTargetRate).find('.calculator-item__value-input').val(value.toFixed(2).replace('.', ','))
  }

  const showActualRates = () => {
    $(currencies).each((index, element) => {
      const elementValue = $(element).find('.currencies-item__value')

      elementValue.text(actualRates.rates[$(element).data('currency-code')].toFixed(2).replace('.', ','))
    })
  }

  const initialize = () => {
    hideCurrencyItem(baseCurrency)
    setActualRates()
    showActualRates()
    setTargetRate()
    setUpdateTime()

    // $(rateInput).on('click', e => {
    //   $(e.currentTarget).setCursorPosition(0)
    // }).mask("?999 999 999,00",{
    //   placeholder: "",
    //   autoclear: false
    // })

    $(rateInput).on('input', e => {
      setTargetRate()
    })
  }

  initialize()

  // ЗАПРОС ПО API

  // $.get(`https://api.currencyapi.com/v3/latest?apikey=${APIkey}`)
  // .done(data => {
  //   rates = data

  //   setRates()
  // })
})