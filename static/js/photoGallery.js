console.log('hello!')
const ligthbox = document.createElement('div')
ligthbox.id = 'lightbox'
document.body.appendChild(ligthbox)

const images = document.querySelectorAll('img')
images.forEach(image => {
    image.addEventListener('click', e => {
        ligthbox.classList.add('active')
        const img = document.createElement('img')
        img.src = image.src
        while (ligthbox.firstChild) {
            ligthbox.removeChild(ligthbox.firstChild)
        }
        ligthbox.appendChild(img)
    })
})


ligthbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    ligthbox.classList.remove('active')

})







