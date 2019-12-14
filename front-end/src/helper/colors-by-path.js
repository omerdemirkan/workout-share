const options = [
    {display: 'All', path: '/', activeColor: '#00e5ff', idleColor: '#04a8af'},
    {display: 'General', path: '/', activeColor: '#00e5ff', idleColor: '#04a8af'},
    {display: 'Powerlifting', path: '/powerlifting', activeColor: '#ff0000', idleColor: '#af0404'},
    {display: 'Bodybuilding', path: '/bodybuilding', activeColor: '#007fff', idleColor: '#0460af'},
    {display: 'Weightlifting', path: '/weightlifting', activeColor: '#ffb900', idleColor: '#af8004'},
    {display: 'Endurance', path: '/endurance', activeColor: '#68ff00', idleColor: '#51af04'},
    {display: 'Crossfit', path: '/crossfit', activeColor: '#00ff9d', idleColor: '#04af78'},
]

const colorsByPath = path => {
    let foundColors = null;
    options.forEach(option =>{
        if (option.path === path) {
            foundColors = {
                activeColor: option.activeColor,
                idleColor: option.idleColor
            }
        }
    });
    return foundColors;
}

export default colorsByPath;

export const colorsByDisplay = display => {
    let foundColors = null;
    options.forEach(option =>{
        if (option.display === display) {
            foundColors = {
                activeColor: option.activeColor,
                idleColor: option.idleColor
            }
        }
    });
    return foundColors;
}