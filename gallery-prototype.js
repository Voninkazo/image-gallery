console.log("let's code our gallery!");

function Gallery(gallery) {
    if (!gallery) {
        throw Error('No Gallery Found!!!');
    }
    this.gallery = gallery;
    this.images = Array.from(gallery.querySelectorAll('img'));
    this.modal = document.querySelector('.modal');
    this.prevButton = this.modal.querySelector('.prev');
    this.nextButton = this.modal.querySelector('.next');
    this.images.forEach(image => {
        image.addEventListener('click', e => this.showImage(e.currentTarget));
    });

    this.showNextImage = this.showNextImage.bind(this);
    this.showPreviousImage = this.showPreviousImage.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    // loop over each image
    this.images.forEach(image => {
        // attache an event listener for each image
        image.addEventListener('keyup', e => {
            // when that is keyup'd, check if it is an enter
            if (e.key === "Enter") {
                // if it was, show the image
                const imageThatWeClicked = e.currentTarget;
                this.showImage(e.currentTarget);
            }
        });
    })
}


Gallery.prototype.handleClickOutside = function(e) {
    if (e.currentTarget === e.target) {
        this.closeModal();
    }
}

Gallery.prototype.openModal = function() {
    console.info('Opening modal...');
    if (this.modal.matches('.open')) {
        console.info('Modal already open');
        return;
    }
    this.modal.classList.add('open');
    this.modal.addEventListener('click', this.handleClickOutside);
    window.addEventListener('keydown', this.handleEscapeKey);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPreviousImage);
}

Gallery.prototype.closeModal = function() {
    this.modal.classList.remove('open');
    // add events listeners for clicks and keyboard events
    window.removeEventListener('keyup', this.handleEscapeKey);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.modal.removeEventListener('click', this.handleClickOutside);
    this.prevButton.removeEventListener('click', this.showPreviousImage);
}

Gallery.prototype.showNextImage = function() {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementSibling);
}

Gallery.prototype.showPreviousImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementSibling);
}

Gallery.prototype.handleEscapeKey = function(e) {
    if (e.key === "Escape") return this.closeModal();
    if (e.key === "ArrowRight") return this.showNextImage();
    if (e.key === "ArrowLeft") return this.showPreviousImage();
};

Gallery.prototype.showImage = function(el) {
    if (!el) {
        console.info('no image to show');
        return;
    }
    // update the modal
    console.log(el);
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.dataset.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();

}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
const galleryBeautiful = new Gallery(document.querySelector('.gallery-beautiful'));
const galleryFriends = new Gallery(document.querySelector('.gallery-onja-friends'));
console.log(gallery1, gallery2, galleryBeautiful, galleryFriends);