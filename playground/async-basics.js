/**
 * Created by RJB on 01/07/2018.
 */
console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Second setTimeout')
}, 0);

console.log('Finishing up');
