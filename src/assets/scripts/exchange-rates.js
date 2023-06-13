import rates from './rates.json'

$(() => {
  if (!$('.FAQ-exchange__calculator').length) return

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

  const calculateActualRates = () => {
    const curBaseRate = 1 / rates.data[actualRates.base].value
    
    $(currencies).each((index, element) => {
      actualRates.rates[$(element).data('currency-code')] = rates.data[$(element).data('currency-code')].value * curBaseRate
    })
  }

  const calculateTargetRate = () => {
    const calculatorSourceRate = +$(calculator).find('[data-type=calculator-source]').find('.calculator-item__value-input').val().replace(',', '.'),
          calculatorTargetRate = $(calculator).find('[data-type=calculator-target]'),
          value = calculatorSourceRate ? actualRates.rates[$(calculatorTargetRate).data('currency-code')] * calculatorSourceRate : actualRates.rates[$(calculatorTargetRate).data('currency-code')]

    $(calculatorTargetRate).find('.calculator-item__value-input').val(value.toLocaleString('ru', {
      style: 'currency',
      currency: $(calculatorTargetRate).data('currency-code'),
      currencyDisplay: 'symbol'
    }))
  }

  const showActualRates = () => {
    $(currencies).each((index, element) => {
      const elementValue = $(element).find('.currencies-item__value')

      elementValue.text(actualRates.rates[$(element).data('currency-code')].toLocaleString('ru', {
        style: 'currency',
        currency: $(element).data('currency-code'),
        currencyDisplay: 'symbol'
      }))
    })
  }

  const changeCurrency = choosedCurrency => {
    const newCurrencyCode = $(choosedCurrency).parents('.first-level__item').data('currency-code'),
          calculatorItem = $(choosedCurrency).parents('.calculator-item'),
          oldCurrencyCode = $(calculatorItem).data('currency-code')

    if (newCurrencyCode === oldCurrencyCode) return
    
    $(calculatorItem).attr('data-currency-code', newCurrencyCode)
    $(calculatorItem).data('currency-code', newCurrencyCode)

    if ($(calculatorItem).data('type') === "calculator-source") {
      baseCurrency, actualRates.base = newCurrencyCode
      calculateActualRates()
      showActualRates()
    }

    $(currencies).each((index, element) => {
      if ($(element).data('currency-code') === newCurrencyCode) {
        const oldImg = $(calculatorItem).find('.calculator-item__flag picture'),
              newImg = $(element).find('.currencies-item__flag picture').clone()

        $(newImg).find('img').removeClass('currencies-item__flag-img')
        $(newImg).find('img').addClass('calculator-item__flag-img')
        $(oldImg).replaceWith(newImg)

        if ($(calculatorItem).data('type') === "calculator-source")
          $(element).slideUp(400)
      } else if ($(element).data('currency-code') === oldCurrencyCode) {
        if ($(calculatorItem).data('type') === "calculator-source")
          $(element).slideDown(400)
      }
    })

    calculateTargetRate()
  }

  const checkCurrencyChange = () => {
    const ratesVariants = $(calculator).find('.calculator-item').find('.first-level__item-input')

    $(ratesVariants).on('click', e => {
      changeCurrency(e.currentTarget)
    })
  }

  const initialize = () => {
    hideCurrencyItem(baseCurrency)
    calculateActualRates()
    showActualRates()
    calculateTargetRate()
    setUpdateTime()

    $(rateInput).on('input', e => {
      const input = e.currentTarget

      $(input).val($(input).val().replace(/[^\d\.,]/g, ''))
      $(input).val($(input).val().replace(/\./g, ','))
      if ($($(input).val().match(/,/g)).length > 1) {
        $(input).val($(input).val().substr(0, $(input).val().lastIndexOf(",")))
      }
      
      calculateTargetRate()
    })

    $(rateInput).on('blur', e => {
      const input = e.currentTarget

      if (!$(input).val()) $(input).val(1)
    })
  }

  initialize()
  checkCurrencyChange()

  // ЗАПРОС ПО API

  // $.get(`https://api.currencyapi.com/v3/latest?apikey=${APIkey}`)
  // .done(data => {
  //   rates = data

  //   setRates()
  // })
})