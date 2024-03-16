const getData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error))
  })
}

const renderPosts = (posts) => {
  const postList = document.querySelector('.swiper-wrapper')
  posts.forEach((post) => {
    const listItem = document.createElement('div')
    listItem.className = 'swiper-slide'
    listItem.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`
    postList.appendChild(listItem)
  })
}

const renderError = (error) => {
  const postList = document.querySelector('.swiper-wrapper')
  const errorText = document.createElement('p')
  errorText.className = 'errorText'
  errorText.textContent = error
  postList.appendChild(errorText)
}

getData('https://jsonplaceholder.typicode.com/posts')
  .then((data) => {
    renderPosts(data)
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      loop: false,

      slidesPerView: 4,

      spaceBetween: 30,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    })
  })
  .catch((error) => {
    renderError('ERROR NOT FOUND')
    const swiperButtonPrev = document.querySelector('.swiper-button-prev')
    const swiperButtonNext = document.querySelector('.swiper-button-next')
    swiperButtonPrev.style.display = 'none'
    swiperButtonNext.style.display = 'none'
    console.log('ERROR')
  })
