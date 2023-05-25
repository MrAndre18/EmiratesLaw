const content = $('.content'),
      loader = $('.loader')

$(() => {
  $(content).addClass('visible')
  $(loader).fadeOut("slow")
})