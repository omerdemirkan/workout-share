const options = [
    {display: 'General', path: '/', activeColor: '#00e5ff', idleColor: '#04a8af', darkColor: '#2f868a'},
    {display: 'Powerlifting', path: '/powerlifting', activeColor: '#ff0000', idleColor: '#af0404', darkColor: '#822c2c'},
    {display: 'Bodybuilding', path: '/bodybuilding', activeColor: '#007fff', idleColor: '#0460af', darkColor: '#275882'},
    {display: 'Weightlifting', path: '/weightlifting', activeColor: '#ffb900', idleColor: '#af8004', darkColor: '#856f34'},
    {display: 'Endurance', path: '/endurance', activeColor: '#68ff00', idleColor: '#51af04', darkColor: '#568530'},
    {display: 'Crossfit', path: '/crossfit', activeColor: '#00ff9d', idleColor: '#04af78', darkColor: '#308569'}
]

const colorsByPath = path => {
    let foundColors = null;
    options.forEach(option =>{
        if (option.path === path) {
            foundColors = {
                activeColor: option.activeColor,
                idleColor: option.idleColor,
                darkColor: option.darkColor
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
                idleColor: option.idleColor,
                darkColor: option.darkColor
            }
        }
    });
    return foundColors;
}