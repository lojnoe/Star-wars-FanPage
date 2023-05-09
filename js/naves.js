const el = document.getElementById('poster')
const height = el.clientHeight
const width = el.clientWidth

el.addEventListener('mousemove',(evt) => {
    const {layerX, layerY} = evt
    
    const yRotation=(
        (layerX - width / 2) / width 
    ) * 20

    const xRotation=(
        (layerY - height / 2)/ height 
    ) * 20

    const string= 'perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateX(${yRotation}'
      
    el.style.transform = string
    
})

el.addEventListener('mouseout',()=> {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})