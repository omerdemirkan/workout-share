const mapRouteToType = [
    {route: '/', type: 'all'},
    {route: '/powerlifting', type: 'powerlifting'},
    {route: '/bodybuilding', type: 'bodybuilding'},
    {route: '/weightlifting', type: 'weightlifting'},
    {route: '/endurance', type: 'endurance'},
    {route: '/crossfit', type: 'crossfit'},
    {route: '/liked', type: 'myFavorites'},
    {route: '/posted', type: 'myWorkouts'},
    {route: '/my-favorites', type: 'myFavorites'},
    {route: '/my-workouts', type: 'myWorkouts'}
]

const routeToType = route => {
    let type = null;
    mapRouteToType.forEach(obj => {
        if (route === obj.route) {
            type = obj.type;
        }
    });
    return type;
}

export default routeToType;