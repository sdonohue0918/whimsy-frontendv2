// export default utensils = (function() {

//     let canvas = document.getElementById('canvas')
//     let context = canvas.getContext('2d')

//     return {
//         addStroke: () => context.strokeRect(50,50,50,50),
//         addFilledRectangle: () => context.fillRect(25,25,100,100),
//         addTriangle: () => {
//             context.beginPath()
//             context.moveTo(75, 50)
//             context.lineTo(100, 75)
//             context.lineTo(100, 25)
//             context.fill
//         }
//     }
// })()



export function addStroke(ctx) {
    ctx.fillStyle = '#f58d42'
    ctx.fillRect(50, 50, 50, 50)

} 

export default function addTriangle(ctx) {
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fillStyle = '#f58d42'
    ctx.fill();
}

