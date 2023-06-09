function slider({container, slide , nextArrow , prevArrow , totalCounter , currentCounter , wrapper , field}) {

    let slideIndex = 1;
    let offset = 0 ;

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container), //94
          previousSlide = document.querySelector(prevArrow),
          nextSlide = document.querySelector(nextArrow);
          
    const totalSlidesNum = document.querySelector(totalCounter),
          currentSlidesNum = document.querySelector(currentCounter);

    const slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    

    if(slides.length < 10){
        totalSlidesNum.textContent = `0${slides.length}`; 
        currentSlidesNum.textContent = `0${slideIndex}`;
        }else {
            totalSlidesNum.textContent = slides.length;
            currentSlidesNum.textContent = `${slideIndex}`;
        }

        slidesField.style.width = 100 * slides.length + '%' ;
        slidesField.style.display = 'flex';
        slidesField.style.transition = '1s all';


        slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
      });

        slider.style.position = 'relative'; //94
    const indicators = document.createElement('ol'); //94
    const dots = [];
    indicators.classList.add('carusel-indicators'); //94
    indicators.style.cssText = `position: absolute; 
                            right: 0;
                            bottom: 0;
                            left: 0;
                            z-index: 15;
                            display: flex;
                            justify-content: center;
                            margin-right: 15%;
                            margin-left: 15%;
                            list-style: none;` ; //94

    slider.append(indicators); //94

    for(let i = 0 ; i < slides.length ; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        dot.style.cssText = `   box-sizing: content-box;
                                flex: 0 1 auto;
                                width: 30px;
                                height: 6px;
                                margin-right: 3px;
                                margin-left: 3px;
                                cursor: pointer;
                                background-color: #34fcfb;
                                background-clip: padding-box;
                                border-top: 10px solid transparent;
                                border-bottom: 10px solid transparent;
                                opacity: .5;
                                transition: opacity .6s ease; ` ;
        if(i == 0) {
            dot.style.opacity = 1 ;
        }
        indicators.append(dot);
        dots.push(dot);
    
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }

    function opacityChanger(arr){
        arr.forEach(dot => dot.style.opacity = '.5');
        arr[slideIndex -1].style.opacity = 1 ;
    }

    nextSlide.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1) ) { //500px
            offset = 0;
        }else{
            offset +=  deleteNotDigits(width)  ;
        }

    slidesField.style.transform = `translateX(-${offset}px)`

    if(slideIndex == slides.length) {
        slideIndex = 1;
        } else {
            slideIndex++ ;
            }

    if(slides.length < 10){
        currentSlidesNum.textContent =`0${slideIndex}`;
        }else {
            currentSlidesNum.textContent = slideIndex;
        }
    
        // dots.forEach(dot => dot.style.opacity = '.5');
        // dots[slideIndex -1].style.opacity = 1 ;
        opacityChanger(dots);
});

    previousSlide.addEventListener('click', () => {
        if(offset == 0 ) { 
            offset =  deleteNotDigits(width)  * (slides.length - 1)
        }else{
            offset -=  deleteNotDigits(width) ;
        }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == 1) {
        slideIndex = slides.length;
        } else {
            slideIndex-- ;
            }

    if(slides.length < 10){
        currentSlidesNum.textContent =`0${slideIndex}`;
            }else {
                currentSlidesNum.textContent = slideIndex;
                }

  //  dots.forEach(dot => dot.style.opacity = '.5');
  //  dots[slideIndex -1 ].style.opacity = 1 ;
    opacityChanger(dots);
 
});


    dots.forEach(dot => {
    dot.addEventListener('click' , (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo ;
        offset = deleteNotDigits(width)  * (slideTo - 1) ;
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10){
            currentSlidesNum.textContent =`0${slideIndex}`;
            }else {
                currentSlidesNum.textContent = slideIndex;
            }

        // dots.forEach(dot => dot.style.opacity = '.5');
        // dots[slideIndex -1].style.opacity = 1 ;
            opacityChanger(dots);
    })
})

}

export default slider;