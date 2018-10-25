import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAPIbyEOATBcdT9bFo9czicCFqJJvZ3XRE",
    authDomain: "projecthacktive.firebaseapp.com",
    databaseURL: "https://projecthacktive.firebaseio.com",
    projectId: "projecthacktive",
    storageBucket: "projecthacktive.appspot.com",
    messagingSenderId: "949001591941"
};

firebase.initializeApp(config);
const database = firebase.database();

export {database as default };
// database.ref('topLyrics').push({
//    lyricid: '150178898',
//    artist: 'Clean Bandit feat. Demi Lovato',
//    track_name: 'Solo',
//    lyric_body: 'It-solo, solo, everybody It-solo, e-e-everybody It-solo, solo, everybody Woop, woop, woop, woop, woop, woop, woop I never meant to leave you hurtin I never meant to do the worst thing Not to you (s-solo, solo, everybody) Cause every time I read your message I wish I wasnt one of your exes Now Im the fool (s-solo, solo, everybody) Since you been gone been dancing on my own Theres boys up in my zone, but they cant turn me on Cause baby, youre the only one Im coming for I cant take no more, no more, no more I wanna f-woop-woop-woop, but Im broken hearted Cr-cr-cry, but I like to party T-t-touch, but I got nobody Here on my own I wanna f-woop-woop-woop, but Im broken hearted Cr-cr-cry, since the day we parted T-t-touch, but I got nobody So, I do it solo It-solo, solo, everybody It-solo, e-e-everybody It-solo, solo, everybody',
//    album_photo: 'https://99designs-blog.imgix.net/wp-content/uploads/2017/12/Retro-youth-album-cover.jpeg?auto=format&q=60&fit=max&w=930'
// })