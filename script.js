inpFile = document.querySelector('.inp-file')
ChooseImage = document.querySelector('.choose-image')
const PreviewImage = document.querySelector('.preview-image img')
Container = document.querySelector('.container')
FilterName = document.querySelector('.slider p.name')
FilterValue = document.querySelector('.slider p.value')
let inpRange = document.querySelector('input[type="range"]')
let SelectedFilter = document.querySelector('.filter .active')
const RotateButtons = document.querySelectorAll('.rotate .options button')
ResetImage = document.querySelector('.reset-image')
SaveImage = document.querySelector('.save-image')
FilterOptions = document.querySelectorAll('.filter button')



let brightness = 100
let contrast = 100
let blur = 0
let grayscale = 0
let saturate = 100
let opacity = 100
let rotate = 0
let vertical = 1
let horizontal = 1

// function loadImg(){
//     file = inpFile.files[0] //retrieves the first selected file 
//     if(file){
//         PreviewImage.src = URL.createObjectURL(file)  //creates a temporary URL representing the file.
//     }
//     Container.classList.remove('disable')
// }

function loadImg(){
    try {
        let file = inpFile.files[0] //retrieves the first selected file 
        if(file){
            const objectURL = URL.createObjectURL(file) //creates temporary URL
            PreviewImage.src = objectURL // displays the image
            PreviewImage.onload = () => URL.revokeObjectURL(objectURL) // Uses onload to revoke (free up) the object URL once the image loads.
            Container.classList.remove('disable') // remove disable class to make container active
        }
    } catch(error) {
        console.error('Error loading image:', error)
    }
}

inpFile.addEventListener('change', loadImg)
ChooseImage.addEventListener('click', function(){//When the button is clicked. Programmatically clicks the hidden file input (inpFile.click()), opening the file selection dialog.
    inpFile.click()
})




FilterOptions.forEach(function(option){
    option.addEventListener('click' , function(){
        document.querySelector('.filter .active').classList.remove('active') // Remove previous active filter
        option.classList.add('active') // set new active filter
        FilterName.innerText = option.innerText // updatees filter name display
        
        
        if(option.id === 'brightness'){
            inpRange.max = 200;
            inpRange.value = brightness
            FilterValue.innerText = `${brightness}%`
        }
        else if(option.id === 'contrast'){
            inpRange.max = 200
            inpRange.value = contrast
            FilterValue.innerText = `${contrast}%`
        }
        else if(option.id === 'blur'){
            inpRange.max = 10
            inpRange.value = blur
            FilterValue.innerText = `${blur}px`
        }
        else if(option.id === 'grayscale'){
            inpRange.max = 100
            inpRange.value = grayscale
            FilterValue.innerText = `${grayscale}%`
        }
        else if(option.id === 'saturate'){
            inpRange.max = 200
            inpRange.value = saturate
            FilterValue.innerText = `${saturate}%`
        }
        else if (option.id === 'opacity'){
            inpRange.max = 100;
            inpRange.value = opacity
            FilterValue.innerText = `${opacity}%`
        }

    })
})

inpRange.addEventListener('input', function(){
    // FilterValue.innerText = inpRange.value + "%"
    let SelectedFilter = document.querySelector('.filter .active')

    if (SelectedFilter.id === 'brightness') {
        brightness = inpRange.value
        FilterValue.innerText = `${brightness}%`
    }
    else if(SelectedFilter.id === 'contrast'){
        contrast = inpRange.value
        FilterValue.innerText = `${contrast}%`
    }
    else if(SelectedFilter.id === 'blur'){
        blur = inpRange.value
        FilterValue.innerText = `${blur}px`  // Changed to px
    }
    else if(SelectedFilter.id === 'grayscale'){
        grayscale = inpRange.value
        FilterValue.innerText = `${grayscale}%`
    }
    else if(SelectedFilter.id === 'saturate'){
        saturate = inpRange.value
        FilterValue.innerText = `${saturate}%`
    }
    else if(SelectedFilter.id === 'opacity'){
        opacity = inpRange.value
        FilterValue.innerText = `${opacity}%`
    }
    applyFilterImg()
})

RotateButtons.forEach(function(option){
    option.addEventListener('click', function(){
        if(option.id == 'left'){
            rotate -= 90
        }
        else if(option.id == 'right'){
            rotate += 90
        }
        else if(option.id == 'vertical'){
            vertical = vertical == 1 ? -1 : 1
        }
        else if(option.id == 'horizontal'){
            horizontal = horizontal == 1 ? -1 : 1
        }

        applyFilterImg()
    })
})

// RotateButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         switch(button.id) {
//             case 'left':
//                 rotate -= 90;
//                 break;
//             case 'right':
//                 rotate += 90;
//                 break;
//             case 'vertical':
//                 vertical = vertical === 1 ? -1 : 1;
//                 break;
//             case 'horizontal':
//                 horizontal = horizontal === 1 ? -1 : 1;
//                 break;
//         }
        
//         // Apply transformation directly
//         applyFilterImg();
        
//         // Debug log
//         console.log('Rotation:', rotate, 'Vertical:', vertical, 'Horizontal:', horizontal);
//     });
// });

function applyFilterImg() {
    // Apply both transform and filter
    PreviewImage.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical})`;
    PreviewImage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%) opacity(${opacity}%) blur(${blur}px)`;
//Applies transformations (rotate, flip) using CSS transform.
//Applies filters (brightness, contrast, etc.) using CSS filter.
}

ResetImage.addEventListener('click', function(){
    brightness = 100;
    contrast = 100;
    blur = 0;
    grayscale = 0;
    saturate = 100;
    opacity = 100;
    rotate = 0;
    vertical = 1;
    horizontal = 1;

    FilterOptions[0].click();
    // inpRange.value = brightness;
    // FilterValue.innerText = brightness + "%"
    applyFilterImg();
})



SaveImage.addEventListener('click', function(){
    if (!PreviewImage.src) {
        alert('Please choose an image first')
        return
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")
    canvas.width = PreviewImage.naturalWidth;
    canvas.height = PreviewImage.naturalHeight;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%) opacity(${opacity}%) blur(${blur}px)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI /180);
    }
    ctx.scale(vertical, horizontal);
    ctx.drawImage(PreviewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)

    const link = document.createElement("a")
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
})



