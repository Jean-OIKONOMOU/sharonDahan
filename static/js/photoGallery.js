document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.querySelector('.hamburger-menu input');
    checkbox.addEventListener('change', () => {
        document.body.style.overflow = checkbox.checked ? 'hidden' : '';
    });

    const cross = document.createElement('div')
    const ligthbox = document.createElement('div')
    ligthbox.id = 'lightbox'
    document.body.appendChild(ligthbox)
    cross.id = 'fakeCross'
    document.body.appendChild(cross)
    cross.innerHTML = '&times;'


    const images = document.querySelectorAll('img')
    images.forEach(image => {
        image.addEventListener('click', e => {
            ligthbox.classList.add('active')
            cross.classList.add('active')
            const img = document.createElement('img')
            img.src = image.src
            while (ligthbox.firstChild) {
                ligthbox.removeChild(ligthbox.firstChild)
            }
            ligthbox.appendChild(img)
            document.body.style.overflow = 'hidden';
        })
    })


    ligthbox.addEventListener('click', e => {
        // if (e.target !== e.currentTarget) return
        ligthbox.classList.remove('active')
        cross.classList.remove('active')
        document.body.style.overflow = '';
    })

    cross.addEventListener('click', e => {
        // if (e.target !== e.currentTarget) return
        ligthbox.classList.remove('active')
        cross.classList.remove('active')
        document.body.style.overflow = '';
    })

});



