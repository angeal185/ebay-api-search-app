scrollTo = (element, to, duration) ->
  if duration < 0
    return
  difference = to - (element.scrollTop)
  perTick = difference / duration * 2
  setTimeout (->
    element.scrollTop = element.scrollTop + perTick
    scrollTo element, to, duration - 2
    return
  ), 10
  return

_cb_findItemsByKeywords = (root) ->
  items = root.findItemsByKeywordsResponse[0].searchResult[0].item or []
  html = []
  html.push '<div class="col s12">'
  i = 0
  while i < items.length
    item = items[i]
    title = item.title
    pic = item.galleryPlusPictureURL
    viewitem = item.viewItemURL
    local = item.location
    postcode = item.postalCode
    if null != title and null != viewitem
      html.push '<div class="col s12 m6 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + pic + '"></div><div class="card-content"><span class="card-title activator e-blue truncate">' + title + '<i class="material-icons right">more_vert</i></span><p class="">Global ID: <span class="e-red">' + item.globalId + '</span></p><p class="">Price: <span class="e-red">' + item.sellingStatus[0].currentPrice[0].__value__ + 'AUD</span></p><p class="">Location: <span class="e-red">' + local + '</span></p><p class="">Shipping: <span class="e-red">' + item.shippingInfo[0].shippingType + '</span></p></div><div class="card-action"><a href="' + viewitem + '" target="_blank">View item</a></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Item Info<i class="material-icons right">close</i></span><p>Title: <span class="e-blue">' + title + '</span></p><p>ID: <span class="e-blue">' + item.itemId + '</span></p><p>Category: <span class="e-blue">' + item.primaryCategory[0].categoryName + '</span></p><p>location: <span class="e-blue">' + local + '</span></p><p>country: <span class="e-blue">' + item.country + '</span></p><p>postcode: <span class="e-blue">' + postcode + '</span></p><p>condition: <span class="e-blue">' + item.condition[0].conditionDisplayName + '</span></p><p>Selling Status: <span class="e-blue">' + item.sellingStatus[0].currentPrice[0].__value__ + '</span></p><p>shipping cost: <span class="e-blue">' + item.shippingInfo[0].shippingServiceCost[0].__value__ + '</span></p><p>Shipping Type: <span class="e-blue">' + item.shippingInfo[0].shippingType + '</span></p><p>shipping To: <span class="e-blue">' + item.shippingInfo[0].shipToLocations + '</span></p></div></div></div>'
    ++i
  html.push '</div>'
  document.getElementById('results').innerHTML = html.join('')
  return

buildURLArray = ->
  i = 0
  while i < filterarray.length
    itemfilter = filterarray[i]
    for index of itemfilter
      if itemfilter[index] != ''
        if itemfilter[index] instanceof Array
          r = 0
          while r < itemfilter[index].length
            value = itemfilter[index][r]
            urlfilter += '&itemFilter(' + i + ').' + index + '(' + r + ')=' + value
            r++
        else
          urlfilter += '&itemFilter(' + i + ').' + index + '=' + itemfilter[index]
    i++
  return

$('.modal').modal
  dismissible: true
  opacity: .8
  inDuration: 400
  outDuration: 200
  startingTop: '4%'
  endingTop: '10%'

document.getElementById('to-top').onclick = ->
  scrollTo document.body, 0, 100
  return

filterarray = [
  {
    'name': 'MaxPrice'
    'value': '1000'
    'paramName': 'Currency'
    'paramValue': 'AUD'
  }
  {
    'name': 'FreeShippingOnly'
    'value': 'true'
    'paramName': ''
    'paramValue': ''
  }
  {
    'name': 'ListingType'
    'value': 'FixedPrice'
    'paramName': ''
    'paramValue': ''
  }
]
urlfilter = ''
buildURLArray filterarray
(->
  $(document).ready ->
    $('#driver').click (event, val) ->
      operation = 'findItemsByKeywords'
      apikey = 'beneaves-devApp-PRD-78df3d054-db1dc4cd'
      locale = 'EBAY-AU'
      kw = $('#jsonSearch').val()
      entries = 50
      url = 'http://svcs.ebay.com/services/search/FindingService/v3?OPERATION-NAME=' + operation + '&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=' + apikey + '&GLOBAL-ID=' + locale + '&RESPONSE-DATA-FORMAT=JSON&callback=_cb_' + operation + '&REST-PAYLOAD&keywords=' + kw + urlfilter + '&paginationInput.entriesPerPage=' + entries + '&paginationInput.pageNumber=2'
      $.getScript url
      return
    return
  return
).call this