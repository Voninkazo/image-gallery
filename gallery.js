console.log("let's code our gallery!");

function Gallery(gallery) {
    if (!gallery) {
        throw Error('No Gallery Found!!!');
    }
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    function handleClickOutside(e) {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

    function openModal() {
        console.info('Opening modal...');
        if (modal.matches('.open')) {
            console.info('Modal already open');
            return;
        }
        modal.classList.add('open');
        modal.addEventListener('click', handleClickOutside);
        window.addEventListener('keydown', handleEscapeKey);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPreviousImage);
    }

    function closeModal() {
        modal.classList.remove('open');
        // add events listeners for clicks and keyboard events
        window.removeEventListener('keyup', handleEscapeKey);
        nextButton.removeEventListener('click', showNextImage);
        modal.removeEventListener('click', handleClickOutside);
        prevButton.removeEventListener('click', showPreviousImage);
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementSibling);
    }

    function showPreviousImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementSibling);
    }

    function handleEscapeKey(e) {
        if (e.key === "Escape") return closeModal();
        if (e.key === "ArrowRight") return showNextImage();
        if (e.key === "ArrowLeft") return showPreviousImage();
    };

    function showImage(el) {
        if (!el) {
            console.info('no image to show');
            return;
        }
        // update the modal
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.dataset.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        currentImage = el;
        openModal();

    }

    images.forEach(image => {
        image.addEventListener('click', e => showImage(e.currentTarget));
    });

    // loop over each image
    images.forEach(image => {
        // attache an event listener for each image
        image.addEventListener('keyup', e => {
            // when that is keyup'd, check if it is an enter
            if (e.key === "Enter") {
                // if it was, show the image
                showImage(e.currentTarget);
            }
        });
    })
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
const galleryBeautiful = Gallery(document.querySelector('.gallery-beautiful'));
const galleryFriends = Gallery(document.querySelector('.gallery-onja-friends'))