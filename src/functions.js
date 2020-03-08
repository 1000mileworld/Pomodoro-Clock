export function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    return display;
}

export function convertNum(num){
    const prefix = num < 10 ? '0' : '';
    return prefix + num + ':00';
}

