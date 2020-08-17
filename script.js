//event listener for search button
document.querySelector('#searchButton').addEventListener('click', function() {
    const inputTitleName = document.getElementById('songTitle');
    const searchBtn = inputTitleName.value;
    fetch(`https://api.lyrics.ovh/suggest/${searchBtn}`)
        .then(res => res.json())
        .then(data => displaySongNames(data))
    document.querySelector('#songLyrics').style.display = 'none';

})

function displaySongNames(title) {
    const lyricsName = document.getElementsByClassName('lyrics-name');
    const singerName = document.getElementsByClassName('singer-name');
    const lyricsFull = document.getElementsByClassName('full-lyrics');
    document.querySelector('#searchList').style.display = 'block';


    // loop for catching item
    for (let i = 0; i < 10; i++) {
        const songTitleName = title.data[i].title;
        const displayTitleName = title.data[i].album.title;
        const artistName = title.data[i].artist.name;

        lyricsName[i].innerHTML = songTitleName;
        singerName[i].innerHTML = artistName;
        document.querySelector('#songTitle').value = '';
        //event listener search lyric
        lyricsFull[i].addEventListener('click', function() {
            document.querySelector('#songLyrics').style.display = 'block';
            document.querySelector('#songDescription').innerHTML = `${songTitleName} ${displayTitleName}`;
            document.querySelector('#singerFullName').innerHTML = ` singer Name = ${artistName}`;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitleName}`)
                .then(resp => resp.json())
                .then(json => {
                    document.querySelector('#lyricsHead').innerHTML = 'Song Lyrics';
                    if (json.lyrics == undefined) {
                        alert('Lyrics Not Found');
                        document.querySelector('#songWithLyrics').innerHTML = 'Lyrics Not Found in These Site Please Try Another Song';
                        document.querySelector('#songWithLyrics').style.color = 'red';
                    } else {
                        document.querySelector('#songWithLyrics').innerHTML = json.lyrics;
                    }
                })
        })
    }
}